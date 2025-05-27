require("dotenv").config(); // 환경변수 가장 먼저 불러오기

const puppeteer = require("puppeteer");
const path = require("path");
const Resume = require("../models/Resume");
const Education = require("../models/Education");
const Career = require("../models/Career");
const Certificate = require("../models/Certificate");
const Skills = require("../models/Skills");
const OtherInfo = require("../models/OtherInfo");
const CompanyTest = require("../models/CompanyTest");
const CompanyKeyword = require("../models/CompanyKeyword");
//const Wishlist = require("../models/Wishlist");
//const { v4: uuidv4 } = require("uuid");

const { OpenAI } = require("openai");

// 환경변수 제대로 들어있는지 확인
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY가 .env에서 로드되지 않았습니다!");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 추천 후보차 생성
exports.recommendCandidate = async (req, res) => {
  try {
    const { company, required, preferred, etc } = req.body;

    // 초안 : 요구사항 부분을 gpt한데 db 검색(skills)하는 코드를 짜게 해서 그 결과로 일단 1차 필터링
    const queryInstruction = `
[필수 사항]
${required}

[우대 사항]
${preferred}

위 내용을 기반으로 MongoDB 쿼리의 조건식을 만들어줘. 조건은 "skills" 콜렉션을 대상으로 하며, "skill_name" 필드를 기준으로 포함 여부를 판단해줘.
MongoDB filter 객체 형식(JSON)으로 출력해줘. 예: { "skill_name": { "$in": ["java", "python"] } }

단, 내용이 문장이라면 중요한 기술 키워드만 추출해서 사용해줘. 예를 들어 "zustand를 통한 상태관리 경험" → "zustand"
    `;
    const queryResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "너는 Node.js와 MongoDB를 잘 아는 백엔드 개발자야. 사용자 요구사항을 기반으로 적절한 필터 조건을 만드는 역할이야.",
        },
        { role: "user", content: queryInstruction },
      ],
      temperature: 0.2,
    });

    let queryFilter;
    try {
      queryFilter = JSON.parse(queryResponse.choices[0].message.content);
    } catch (err) {
      console.error("쿼리 생성 오류:", err);
      return res.status(500).json({ success: false, message: "서버 오류" });
    }

    console.log("GPT 기반 필터 조건:", queryFilter);

    // 이력서 필터링
    //const resumes = await Resume.find();
    //const resumeData = [];

    const filteredResumes = await Skills.find(queryFilter).distinct(
      "resume_id"
    );

    console.log("필터링된 이력서 목록:", filteredResumes);

    const resumes = await Resume.find({ resume_id: { $in: filteredResumes } });
    const resumeData = resumes.map((resume) => ({
      resume_id: resume.resume_id,
      name: resume.name,
      filePath: resume.filePath,
      keyword: resume.keyword,
    }));

    // TODO : 프롬프트 수정
    const gptInput = `
[회사 정보]
- 회사명: ${company}
- 필수 사항: ${required}
- 우대 사항: ${preferred}
- 기타: ${etc}

[이력서 목록]
${resumeData
  .map(
    (r, i) =>
      `${i + 1}. resume_id: ${r.resume_id}, 이름: ${
        r.name
      }, 키워드: [${r.keyword.join(", ")}]`
  )
  .join("\n")}

이 회사의 요구사항에 가장 적합한 후보자 6명을 순위와 점수(1~5점)를 포함하여 추천해줘. 추천 이유도 함께 아래 JSON 형식으로 답변해줘:


{
  "recommendations": [
    {
      "resume_id": "...",
      "keyword": [...],
      "filePath": "...",
      "reason": "...",
      "score": 0.0
    }
  ]
}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "너는 채용 매니저야. 기업의 채용 조건에 맞는 적절한 이력서를 추천하는 것이 역할이야.",
        },
        {
          role: "user",
          content: gptInput,
        },
      ],
      temperature: 0.3,
    });

    const gptResponse = completion.choices[0].message.content;

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(gptResponse);
    } catch (e) {
      // fallback: 대괄호 안에서 문자열들만 추출
      parsedResponse = gptResponse;
    }
    console.log(parsedResponse);

    return res.status(200).json(parsedResponse);
  } catch (err) {
    console.error("후보자 추천 오류:", err);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
};

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
    const { required, preferred, etc } = req.body;

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
    const queryText = queryResponse.choices[0].message.content;
    try {
      queryFilter = JSON.parse(queryText);
    } catch (e) {
      console.error("GPT 응답 JSON 파싱 실패 (필터):", queryText);
      return res
        .status(500)
        .json({ success: false, message: "GPT 필터 응답 오류" });
    }

    console.log("GPT 기반 필터 조건:", queryFilter);

    // 이력서 필터링
    //const resumes = await Resume.find();
    //const resumeData = [];
    const filteredResumes = await Skills.find(queryFilter).distinct(
      "resume_id"
    );
    const resumes = await Resume.find({ resume_id: { $in: filteredResumes } });

    // 이력서 준비
    const resumeData = await Promise.all(
      resumes.map(async (resume) => {
        const skills = await Skills.find({ resume_id: resume.resume_id });
        const education = await Education.find({ resume_id: resume.resume_id });
        const career = await Career.find({ resume_id: resume.resume_id });

        return {
          resume_id: resume.resume_id,
          name: resume.name,
          keyword: resume.keyword || [],
          skills: skills.map((s) => s.skill_name), // skill_name만 추출
          career: career.map((c) => ({
            company: c.company,
            position: c.position,
            startDate: c.start_date,
            endDate: c.end_date,
            description: c.description,
          })),
        };
      })
    );

    // TODO : 프롬프트 수정
    const gptInput = `
[회사 정보]
- 필수 사항: ${required}
- 우대 사항: ${preferred}
- 기타: ${etc}

[이력서 목록]
${resumeData
  .map(
    (r, i) =>
      `${i + 1}. resume_id: ${r.resume_id}, 이름: ${r.name}
- 키워드: [${r.keyword.join(", ")}]
- 기술: [${r.skills.join(", ")}]
- 경력: ${r.career
        .map(
          (c) => `${c.company} (${c.position}, ${c.startDate} ~ ${c.endDate})`
        )
        .join("; ")}`
  )
  .join("\n")}

위 이력서 목록 중, 회사의 요구조건에 가장 부합하는 후보자 6명을 추천해줘. 반드시 위 목록에 있는 후보자만 사용할 것. 아래 JSON 형식으로 출력:

{
  "recommendations": [
    {
      "resume_id": "...",
      "keyword": [...],
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
      console.error("GPT 응답 JSON 파싱 실패:", gptResponse);
      return res
        .status(500)
        .json({ success: false, message: "GPT 추천 응답 오류" });
    }

    // 최대 5명까지만 응답
    parsedResponse.recommendations =
      parsedResponse.recommendations &&
      Array.isArray(parsedResponse.recommendations)
        ? parsedResponse.recommendations.slice(0, 5)
        : [];

    console.log("추천 결과:", parsedResponse);

    return res.status(200).json(parsedResponse);
  } catch (err) {
    console.error("후보자 추천 오류:", err.stack);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
};

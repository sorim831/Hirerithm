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

    const resumes = await Resume.find();
    const resumeData = [];

    for (const resume of resumes) {
      resumeData.push({
        resume_id: resume.resume_id,
        name: resume.name,
        filePath: resume.filePath,
        keyword: resume.keyword,
      });
    }

    const gptInput = `
[회사 정보]
- 회사명: ${company} //여기서 회사 키워드도 가져올지 미정
- 필수 사항: ${required}
- 우대 사항: ${preferred}
- 기타: ${etc}

[이력서 목록]
${resumeData.map((r, i) => `${i + 1}. resume_id: ${r.resume_id}, 이름: ${r.name}, 키워드: [${r.keyword.join(", ")}]`).join("\n")}

이 회사의 요구사항에 가장 적합한 후보자 3~5명을 추천해줘.(순위여부 미정) 추천 이유와 함께 아래 JSON 형태로 답변해줘:

{
  "recommendations": [
    {
      "resume_id": "...",
      "keyword": [...],
      "filePath": "...",
      "reason": "..."
    }
  ]
}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
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
      parsedResponse =
        gptResponse.match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) || [];
    }
    console.log(parsedResponse);

    return res.status(200).json(parsedResponse);
  } catch (err) {
    console.error("후보자 추천 오류:", err);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
};

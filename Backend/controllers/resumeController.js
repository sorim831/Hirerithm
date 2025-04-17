const puppeteer = require("puppeteer"); 
const path = require("path");
const Resume = require("../models/Resume");
const Education = require("../models/Education");
const Career = require("../models/Career");
const Certificate = require("../models/Certificate");
const Skills = require("../models/Skills");
const OtherInfo = require("../models/OtherInfo");
const { v4: uuidv4 } = require("uuid");

exports.uploadResume = async (req, res) => {
  // 이력서 업로드 & db저장
  try {
    const {
      birth_date,
      gender,
      address,
      phone,
      current_salary,
      desired_salary,
      education, // 여기부터 otherinfo까지 stringified 배열로 보내주세요
      career,
      certificates,
      skills,
      otherinfo,
      htmlContent, // 프론트에서 htmlContent 전달 받음
    } = req.body;

    const resumeId = uuidv4();
    const filename = `Resume_${resumeId}.pdf`;
    const pdfPath = path.join(__dirname, "../pdf/resumes", filename);

    // htmlContent를 pdf로 변환
    if (htmlContent) {
      const browser = await puppeteer.launch({ headless: "new" }); // Puppeteer 실행
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: "networkidle0" });
      await page.pdf({
        path: pdfPath,
        format: "A4",
        printBackground: true,
      });
      await browser.close();
    }


    // DB 저장
    const resume = new Resume({
      resume_id: resumeId,
      //filePath: `../pdf/resumes/${filename}`,
      filePath: `${pdfPath}`,
      keyword: [],
      birth_date,
      gender,
      address,
      phone,
      current_salary,
      desired_salary,
      createdAt: new Date(),
    });
    await resume.save();

    // 여기부터 stringified 배열로 보내주세요

    // 교육사항 저장
    if (education) {
      const eduArray = JSON.parse(education);
      for (const edu of eduArray) {
        await Education.create({
          resume_id: resume._id,
          start_year: edu.start_year,
          end_year: edu.end_year,
          school_name: edu.school_name,
          major: edu.major,
          graduation_status: edu.graduation_status,
        });
      }
    }

    // 경력 저장
    if (career) {
      const careerArray = JSON.parse(career);
      for (const job of careerArray) {
        await Career.create({
          resume_id: resume._id,
          company_name: job.company_name,
          position: job.position,
          description: job.description,
          start_year: job.start_year,
          end_year: job.end_year,
        });
      }
    }

    // 자격증 저장
    if (certificates) {
      const certArray = JSON.parse(certificates);
      for (const cert of certArray) {
        await Certificate.create({
          resume_id: resume._id,
          certificate_name: cert.certificate_name,
          issued_date: cert.issued_date,
          issuing_org: cert.issuing_org,
          certificate_number: cert.certificate_number,
        });
      }
    }

    // 기술 저장
    if (skills) {
      const skillArray = JSON.parse(skills);
      for (const skill of skillArray) {
        await Skills.create({
          resume_id: resume._id,
          skill_name: skill,
        });
      }
    }

    // 기타 정보 저장
    if (otherinfo) {
      const etcArray = JSON.parse(otherinfo);
      for (const info of etcArray) {
        await OtherInfo.create({
          resume_id: resume._id,
          content: info,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "이력서 업로드 및 저장 완료",
      resume_id: resume._id,
    });
  } catch (err) {
    console.error("업로드 오류:", err);
    return res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

exports.keywordResume = async (req, res) => {
  //TODO : 이력서 키워드화 : 여기에 GPT 사용
};

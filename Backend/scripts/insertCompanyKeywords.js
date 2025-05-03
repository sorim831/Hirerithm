const fs = require("fs");
const path = require("path");
const db = require("../config/db"); // DB 연결 모듈 불러오기
const CompanyKeyword = require("../models/CompanyKeyword");

const inputDir = path.resolve(__dirname, "../output_json"); 
// 카테고리 매핑

const categoryMap = {
    "Teamculture": "Teamculture",
    "Evaluation": "Evaluation",
    "Pay Level": "Pay Level",
    "Vision & Direction": "Vision & Direction",
    "Welfare Quality": "Welfare Quality",
    "Workload": "Workload",
  };

  async function insertKeywordsFromFiles() {
    await db.connect(); // DB 연결
  
    const files = fs.readdirSync(inputDir);
  
    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const rawData = fs.readFileSync(filePath, "utf-8");
      const keywordData = JSON.parse(rawData);
  
      const companyName = file.replace("_category_summary.json", "");
  
      for (const entry of keywordData) {
        const rawCategory = entry.category_name;
        const category = categoryMap[rawCategory];
  
        if (!category) {
          console.log(`존재하지 않는 카테고리 "${rawCategory}" in file ${file}`);
          continue;
        }
  
        const newKeyword = new CompanyKeyword({
          company_name: companyName,
          category: category,
          score: parseFloat(entry.average_score.toFixed(2)),
          count: entry.count,
        });
  
        try {
          await newKeyword.save();
          console.log(`저장 완료! : ${companyName} - ${category}`);
        } catch (err) {
          console.error(`에러 발생 : ${companyName} - ${category}:`, err.message);
        }
      }
    }
  
    // 종료
    await db.disconnect();
    console.log("database disconnected");
  }
  
  insertKeywordsFromFiles();
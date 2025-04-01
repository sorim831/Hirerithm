require("dotenv").config(); // 환경변수 로드
const User = require("../models/Recruiter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

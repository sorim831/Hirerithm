const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Recruiter");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
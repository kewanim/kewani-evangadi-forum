const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAnswer, postAnswer } = require("../controller/answerController");

// POST an answer (login required)
router.post("/", authMiddleware, postAnswer);

// GET answers for a question
router.get("/:question_id", getAnswer);

module.exports = router;

const { StatusCodes } = require("http-status-codes");
const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} = require("firebase/firestore");
const db = require("../db/dbConfig");

const MAX_ANSWER = 5000;

// POST an answer (the author comes from the verified login token, never the request body)
async function postAnswer(req, res) {
  const { answer, questionid } = req.body;

  if (!answer || !questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Answer and question are required" });
  }
  if (answer.length > MAX_ANSWER) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Answer must be at most ${MAX_ANSWER} characters` });
  }

  try {
    // Make sure the question exists before attaching an answer to it
    const questionDoc = await getDoc(doc(db, "questions", String(questionid)));
    if (!questionDoc.exists()) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Question not found" });
    }

    await addDoc(collection(db, "answers"), {
      username: req.user.username,
      answer: answer.trim(),
      questionid: String(questionid),
      createdAt: new Date().toISOString(),
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Answer posted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

// GET answers for a question
async function getAnswer(req, res) {
  const questionid = req.params.question_id;

  try {
    const snapshot = await getDocs(
      query(collection(db, "answers"), where("questionid", "==", questionid))
    );
    const answers = snapshot.docs
      .map((d) => {
        const data = d.data();
        return {
          answerid: d.id,
          username: data.username || "Anonymous",
          answer: data.answer,
          createdAt: data.createdAt,
        };
      })
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

    return res.status(StatusCodes.OK).json({ answers });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

module.exports = { postAnswer, getAnswer };

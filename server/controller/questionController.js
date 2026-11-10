const { StatusCodes } = require("http-status-codes");
const {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} = require("firebase/firestore");
const db = require("../db/dbConfig");

const MAX_TITLE = 200;
const MAX_DESCRIPTION = 5000;

// Shape an answer document the way the frontend expects it
function toAnswer(snapshotDoc) {
  const data = snapshotDoc.data();
  return {
    answerid: snapshotDoc.id,
    username: data.username || "Anonymous",
    answer: data.answer,
    createdAt: data.createdAt,
  };
}

// Post a question (the author comes from the verified login token, never the request body)
async function postQuestion(req, res) {
  const { title, description, tag } = req.body;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Title and description are required" });
  }
  if (title.length > MAX_TITLE || description.length > MAX_DESCRIPTION) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `Title must be at most ${MAX_TITLE} characters and description at most ${MAX_DESCRIPTION}`,
    });
  }

  try {
    const docRef = await addDoc(collection(db, "questions"), {
      username: req.user.username,
      title: title.trim(),
      description: description.trim(),
      tag: tag || "General", // Firestore rejects undefined fields
      createdAt: new Date().toISOString(),
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Question posted successfully", id: docRef.id });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

// Get all questions, newest first (capped at 200)
async function getAllQuestions(req, res) {
  try {
    const snapshot = await getDocs(
      query(collection(db, "questions"), orderBy("createdAt", "desc"), limit(200))
    );
    const questions = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        questionid: d.id,
        username: data.username || "Anonymous",
        title: data.title,
        description: data.description,
        tag: data.tag,
        createdAt: data.createdAt,
      };
    });

    // The frontend reads the list from `message`
    return res.status(StatusCodes.OK).json({ message: questions });
  } catch (err) {
    console.error("Database Error: ", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

// Get one question with its answers (answers live in the top-level `answers` collection)
async function getQuestionAndAnswer(req, res) {
  const questionId = req.params.question_id;

  try {
    const questionDoc = await getDoc(doc(db, "questions", questionId));
    if (!questionDoc.exists()) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Question not found" });
    }
    const data = questionDoc.data();

    const answersSnapshot = await getDocs(
      query(collection(db, "answers"), where("questionid", "==", questionId))
    );
    const answers = answersSnapshot.docs
      .map(toAnswer)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

    return res.status(StatusCodes.OK).json({
      questionid: questionDoc.id,
      title: data.title,
      description: data.description,
      tag: data.tag,
      qtn_username: data.username || "Anonymous",
      qtn_createdAt: data.createdAt,
      answers,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching question details" });
  }
}

module.exports = { postQuestion, getAllQuestions, getQuestionAndAnswer };

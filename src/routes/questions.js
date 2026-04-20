const express = require('express');
const router = express.Router();

let questions = [
  {
    id: 1,
    question: "Capital of Finland?",
    options: ["Helsinki", "Oslo", "Stockholm", "Copenhagen"],
    correct: "Helsinki"
  }
];

let idCounter = questions.length + 1;

router.get('/', (req, res) => {
  res.json(questions);
});

router.get('/:qId', (req, res) => {
  const id = parseInt(req.params.qId);
  const question = questions.find(q => q.id === id);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.json(question);
});

router.post('/', (req, res) => {
  const { question, options, correct } = req.body;

  if (!question || !options || !correct) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newQuestion = {
    id: idCounter++,
    question,
    options,
    correct
  };

  questions.push(newQuestion);

  res.status(201).json(newQuestion);
});

router.put('/:qId', (req, res) => {
  const id = parseInt(req.params.qId);
  const { question, options, correct } = req.body;

  const questionItem = questions.find(q => q.id === id);

  if (!questionItem) {
    return res.status(404).json({ message: "Question not found" });
  }

  if (!question || !options || !correct) {
    return res.status(400).json({
      message: "question, options, and correct answer are required"
    });
  }

  questionItem.question = question;
  questionItem.options = Array.isArray(options) ? options : [];
  questionItem.correct = correct;

  res.json(questionItem);
});

router.delete('/:qId', (req, res) => {
  const id = parseInt(req.params.qId);
  const index = questions.findIndex(q => q.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Question not found" });
  }

  questions.splice(index, 1);

  res.json({ message: "Deleted successfully" });
});

router.post('/:qId/answer', (req, res) => {
  const id = parseInt(req.params.qId);
  const { answer } = req.body;

  const question = questions.find(q => q.id === id);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  const isCorrect =
    question.correct.toLowerCase() === answer.toLowerCase();

  res.json({
    correct: isCorrect,
    correctAnswer: question.correct
  });
});

module.exports = router;
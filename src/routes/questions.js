const express = require('express');
const router = express.Router();
let score = 0

// Temporary in-memory storage (we’ll replace with database later)
let questions = [];
let attempts = [];
//let score = 0;

// GET all questions
router.get('/', (req, res) => {
  res.json(questions);
});

// POST a new question
router.post('/', (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  const newQuestion = {
    id: questions.length + 1,
    question,
    answer
  };

  questions.push(newQuestion);

  res.status(201).json(newQuestion);
});
router.post('/:id/answer', (req, res) => {
  const questionId = parseInt(req.params.id);
  const { answer } = req.body;

  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  if (!answer) {
    return res.status(400).json({ error: 'Answer is required' });
  }

  const isCorrect =
  question.answer.toLowerCase() === answer.toLowerCase();

if (isCorrect) {
  score++;
}

res.json({
  correct: isCorrect,
  correctAnswer: question.answer,
  score: score
});
});
router.post('/:id/answer', (req, res) => {
  const questionId = parseInt(req.params.id);
  const { answer } = req.body;

  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  if (!answer) {
    return res.status(400).json({ error: 'Answer is required' });
  }

  const isCorrect =
    question.answer.toLowerCase() === answer.toLowerCase();

  res.json({
    correct: isCorrect,
    correctAnswer: question.answer
  });
});
module.exports = router;
const express = require('express');
const QuestionController = require('../controllers/question')
const { validate_create_question, validate_question_id_param, validate_answer_question } = require('../validations/question.validation')

const router = express.Router();

router.get('/question', QuestionController.all);
router.get('/question/:id', validate_question_id_param, QuestionController.one);
router.post('/question', isUser, validate_create_question, QuestionController.create);
router.post('/question/:id/subscribe', isUser, validate_question_id_param, QuestionController.subscribe);
router.post('/question/:id/answer', isUser, validate_question_id_param, validate_answer_question, QuestionController.answer);
router.patch('/question/:id/upvote', isUser, validate_question_id_param, QuestionController.upvote);
router.patch('/question/:id/downvote', isUser, validate_question_id_param, QuestionController.downvote);
router.patch('/question/:id', isUser, validate_question_id_param, QuestionController.update);

/**
 * Search Route
 */
router.get('/search', QuestionController.search);
module.exports = router;

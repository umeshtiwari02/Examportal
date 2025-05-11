package com.examserver.controllers;

import com.examserver.models.exam.Question;
import com.examserver.models.exam.Quiz;
import com.examserver.services.QuestionService;
import com.examserver.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // adding question
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // updating question
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    // get all questions of any Quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable Long quizId) {
//        Quiz quiz = new Quiz();
//        quiz.setQid(quizId);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();

        List<Question> list = new ArrayList<>(questions);

        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        // setting the answer to empty while giving test.
        list.forEach(
                (q) -> {
                    q.setAnswer("");
                }
        );

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    // getting all the questions
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setQid(quizId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    // get single question
    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable Long questionId) {
        return this.questionService.getQuestion(questionId);
    }

    // delete question
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId) {
        this.questionService.deleteQuestion(questionId);
    }

    // evaluate quid
    @PostMapping("/evaluate-quiz")
    public ResponseEntity<?> evaluateQuiz(@RequestBody List<Question> questions) {

        double marksGot = 0.0;
        int correctAnswers = 0;
        int attempted = 0;

        for (Question q : questions) {
            // single question
            Question question = this.questionService.getQ(q.getQid());
            if (question.getAnswer().equals(q.getGivenAnswer())) {
                // correct
                correctAnswers++;

                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
                marksGot += marksSingle;
            }

            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Map<String, Object> map = Map.of( "marksGot", marksGot,
                "attempted", attempted,
                "correctAnswers", correctAnswers);
        return ResponseEntity.ok(map);
    }
}

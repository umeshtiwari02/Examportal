package com.examserver.services;

import com.examserver.models.exam.Question;
import com.examserver.models.exam.Quiz;

import java.util.Set;

public interface QuestionService {

    public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public Question getQuestion(Long qid);

    public Set<Question> getQuestions();

    public Set<Question> getQuestionsOfQuiz(Quiz quiz);

    public void deleteQuestion(Long qid);

    public Question getQ(Long qid);
}

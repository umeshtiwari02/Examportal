package com.examserver.services;

import com.examserver.models.exam.Category;
import com.examserver.models.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public Set<Quiz> getQuizzes();

    public Quiz getQuiz(Long qid);

    public void deleteQuiz(Long qid);

    public List<Quiz> getQuizzesOfCategory(Category category);

    public  List<Quiz> getActiveQuizzes();

    public List<Quiz> getActiveQuizzesOfCategory(Category category);
}

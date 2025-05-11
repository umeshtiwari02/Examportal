package com.examserver.services.impl;

import com.examserver.models.exam.Question;
import com.examserver.models.exam.Quiz;
import com.examserver.repositories.QuestionRepository;
import com.examserver.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question getQuestion(Long qid) {
        return this.questionRepository.findById(qid).get();
    }

    @Override
    public Set<Question> getQuestions() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long qid) {
        this.questionRepository.deleteById(qid);
    }

    @Override
    public Question getQ(Long qid) {
        return this.questionRepository.getOne(qid);
    }
}

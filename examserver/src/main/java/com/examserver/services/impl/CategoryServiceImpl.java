package com.examserver.services.impl;

import com.examserver.models.exam.Category;
import com.examserver.repositories.CategoryRepository;
import com.examserver.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return new LinkedHashSet<>(categories);
    }

    @Override
    public Category getCategory(Long cid) {
        return this.categoryRepository.findById(cid).get();
    }

    @Override
    public void deleteCategory(Long cid) {
        this.categoryRepository.deleteById(cid);
    }
}

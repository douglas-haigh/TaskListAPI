package com.example.tasklist.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
public class TaskController {
    TaskRepository taskRepository;
    @Autowired
    public TaskController(final TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return taskRepository.getTasks();
    }

}

package com.example.tasklist.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.tasklist.entity.Task;

import java.util.List;

@RestController()
public class TaskController {
    TaskRepository2 taskRepository;
    @Autowired
    public TaskController(final TaskRepository2 taskRepository) {

        this.taskRepository = taskRepository;
    }

//    @GetMapping("/tasks")
//    public List<Task> getTasks() {
//
//        return taskRepository.getTasks();
//    }

//    @PostMapping("/tasks/new")
//    public String addTask(@RequestParam() String content, @RequestParam() Priority priority, @RequestParam() Status status) {
//        Task task = new Task(content, priority, status);
//        taskRepository.addTask(task);
//        return "Successfully added task";
//    }

}

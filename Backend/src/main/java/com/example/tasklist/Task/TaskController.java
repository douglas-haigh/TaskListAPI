package com.example.tasklist.Task;

import com.example.tasklist.TaskListApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.tasklist.entity.Task;


@RestController()
public class TaskController {
    TaskRepository taskRepository;
    private static final Logger log = LoggerFactory.getLogger(TaskListApplication.class);

    @Autowired
    public TaskController(final TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    public Iterable<Task> getTasks() {
        return taskRepository.findAll();
    }

    @PostMapping("/tasks/new")
    public Long addTask(@RequestBody Task task) {
        taskRepository.save(task);
        return task.getId();
    }
    @DeleteMapping("/tasks/complete")
    public String completeTask(@RequestParam Long taskId) {
        log.info("Delete Mapping endpoint hit");
        taskRepository.deleteById(taskId);
        log.info("deleting task with id = " + taskId);
        return "task completed";
    }
}

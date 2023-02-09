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
        return taskRepository.findByOrderByPriority();
    }

    @PatchMapping("/tasks/updateStatus")
    public void updateTask(@RequestParam Long taskId, @RequestParam Status newStatus) {
        log.info("Update Status endpoint hit");
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setStatus(newStatus);
        taskRepository.save(task);
        log.info("Task Status updated with id  = " + taskId);
    }

    @PostMapping("/tasks/new")
    public Long addTask(@RequestBody Task task) {
        taskRepository.save(task);
        System.out.println(task.getId());
        log.info(task.getId().toString());
        return task.getId();

    }
    @PatchMapping("/tasks/complete")
    public void completeTask(@RequestParam Long taskId) {
        log.info("Complete task endpoint hit");
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setStatus(Status.COMPLETED);
        taskRepository.save(task);
        log.info("Complete Task with id = " + taskId);
    }
}

package com.example.tasklist.Task;

import com.example.tasklist.TaskListApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.tasklist.entity.Task;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@RestController()
public class TaskController {
    TaskRepository taskRepository;
    private static final Logger log = LoggerFactory.getLogger(TaskListApplication.class);

    @Autowired
    public TaskController(final TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskRepository.findByOrderByPriority();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PatchMapping("/tasks/status")
    public ResponseEntity updateTask(@RequestParam Long taskId, @RequestParam Status newStatus) {

        Task task = taskRepository.findById(taskId).orElseThrow();

        task.setStatus(newStatus);
        taskRepository.save(task);
        log.info("Task Status updated with id  = " + taskId);

        if (newStatus == Status.COMPLETED) {
            Instant timestamp = Instant.now();
            LocalDate completionDate = timestamp.atZone(ZoneId.systemDefault()).toLocalDate();
            task.setCompletionDate(completionDate);
            log.info("Completed task with id = " + taskId + " at time: " + timestamp);
            return ResponseEntity.ok(timestamp);
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/tasks/new")
    public ResponseEntity addTask(@RequestBody Task task) {
        taskRepository.save(task);

        System.out.println(task.getId());
        log.info(task.getId().toString());

        return ResponseEntity.created(URI.create("/task/" + task.getId())).build();
    }

    @DeleteMapping("/tasks/completed")
    public ResponseEntity<Void> clearCompletedTasks() {
        log.info("DELETE endpoint hit");
        taskRepository.deleteTasksByStatus(Status.COMPLETED);
        log.info("completed tasks deleted from database");
        return ResponseEntity.noContent().build();
    }

}

package com.example.tasklist;

import com.example.tasklist.Task.Priority;
import com.example.tasklist.Task.Status;
import com.example.tasklist.Task.TaskRepository;
import com.example.tasklist.entity.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskListApplication implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(TaskListApplication.class);
    private final TaskRepository taskRepository;

    @Autowired
    public TaskListApplication(TaskRepository pTaskRepository) {
        this.taskRepository = pTaskRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(TaskListApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        log.info("deleting previous data");
        taskRepository.deleteAll();
        log.info("inserting data");
        taskRepository.save(new Task("Do Washing", Priority.MEDIUM, Status.NOT_STARTED));
        taskRepository.save(new Task("Feed Cats", Priority.HIGH, Status.NOT_STARTED));
        taskRepository.save(new Task("Book tickets", Priority.LOW, Status.COMPLETED));

        log.info("Tasks found with findAll():");
        log.info("-------------------------------");
        for (Task task : taskRepository.findAll()) {
            log.info(task.toString());
        }
    }
}

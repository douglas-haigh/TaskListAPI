package com.example.tasklist.Task;


import org.springframework.stereotype.Repository;
import java.util.LinkedList;
import java.util.List;

@Repository
public class TaskRepository {
    private final List<Task> tasks;
    public TaskRepository() {
        this.tasks = new LinkedList<Task>();
        this.tasks.add( new Task("Do Washing", Priority.MEDIUM, Status.NOT_STARTED));
        this.tasks.add( new Task("Book train", Priority.HIGH, Status.COMPLETED));
        this.tasks.add( new Task("Ring mum", Priority.LOW, Status.IN_PROGRESS));
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void addTask(Task task) {
        tasks.add(task);
    }

}

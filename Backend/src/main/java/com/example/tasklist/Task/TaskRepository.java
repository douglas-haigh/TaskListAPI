package com.example.tasklist.Task;


import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
public class TaskRepository {

    private List<Task> tasks;

    public TaskRepository() {
        this.tasks = new LinkedList<Task>();
        this.tasks.add( new Task("Do Washing", Priority.MEDIUM, false));
        this.tasks.add( new Task("Book train", Priority.HIGH, false));
        this.tasks.add( new Task("Ring mum", Priority.LOW, true));
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void addTask(Task task) {
        tasks.add(task);
    }

}

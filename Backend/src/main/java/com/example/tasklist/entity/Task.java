package com.example.tasklist.entity;

import com.example.tasklist.Task.Priority;
import com.example.tasklist.Task.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Entity
//@Table(name="TASKS")
public class Task {
    private Long id;
    String content;
    Priority priority;
    Status status;
    LocalDate completionDate;

    protected Task() {}
    public Task(String pContent, Priority pPriority, Status pStatus) {
        this.content = pContent;
        this.priority = pPriority;
        this.status = pStatus;
    }

    public String toString() {
        return String.format(
                "[id=%d, content='%s', priority='%s', status='%s']",
                id, content, priority, status);
    }
    public void completeTask() {
        Instant timestamp = Instant.now();
        LocalDate completionDate = timestamp.atZone(ZoneId.systemDefault()).toLocalDate();
        this.setCompletionDate(completionDate);
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name = "increment", strategy="increment")
    public Long getId() {
        return id;
    }

    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}
    public Priority getPriority() {return priority;}
    public void setPriority(Priority priority) {this.priority = priority;}
    public Status getStatus() {return status;}
    public void setStatus(Status status) {this.status = status;}
    public LocalDate getCompletionDate() {return completionDate;}
    public void setCompletionDate(LocalDate completionDate) {this.completionDate = completionDate;}


}
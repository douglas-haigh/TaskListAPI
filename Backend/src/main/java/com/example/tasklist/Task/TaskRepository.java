package com.example.tasklist.Task;

import com.example.tasklist.entity.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

}


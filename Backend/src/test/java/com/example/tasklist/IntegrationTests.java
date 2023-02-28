package com.example.tasklist;


import com.example.tasklist.Task.Priority;
import com.example.tasklist.Task.Status;
import com.example.tasklist.Task.TaskController;
import com.example.tasklist.Task.TaskRepository;
import com.example.tasklist.entity.Task;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static com.example.tasklist.Task.Priority.*;
import static com.example.tasklist.Task.Status.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@WebMvcTest
//@AutoConfigureMockMvc
//public class IntegrationTests {
//    @Autowired
//    MockMvc mockMvc;
//    TaskRepository taskRepository;
//
//    @Autowired
//    TaskController taskController = new TaskController(taskRepository);
//
//    @Test
//    public void testGetAllTasks() throws Exception {
//
//        Task task1 = new Task("Sample task one", LOW, NOT_STARTED);
//        Task task2 = new Task("Sample task two", MEDIUM, IN_PROGRESS);
//        Task task3 = new Task("Sample task three", HIGH, COMPLETED);
//
//        List<Task> taskList = List.of(task1,task2,task3);
//
//        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        Assertions.assertThat(taskList).hasSize(3);
//        System.out.println(taskList);
//
//    }
//
//
//}

package com.example.tasklist.Task;

import com.example.tasklist.entity.Task;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @MockBean
    TaskRepository mockRepository;
    @Autowired
    MockMvc mockMvc;
    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void testGetAllReturnsTasks() throws Exception {

        when(mockRepository.findByOrderByPriority()).thenReturn(List.of(
                new Task("Sample task one", Priority.LOW, Status.NOT_STARTED),
                new Task("Sample task two", Priority.MEDIUM, Status.IN_PROGRESS),
                new Task("Sample task three", Priority.HIGH, Status.COMPLETED)));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                .andExpect(status().isOk())
                .andReturn();

        String stringResult = result.getResponse().getContentAsString();
        List taskList = objectMapper.readValue(stringResult, List.class);

        Assertions.assertThat(taskList).hasSize(3);

        System.out.println(taskList);
    }

    @Test
    public void testAddTaskCreatesATask() throws Exception {

        Task task = new Task("Sample task to add", Priority.LOW, Status.IN_PROGRESS);
                task.setId(1L);

        String taskJson = objectMapper.writeValueAsString(task);
        System.out.println(taskJson);

        when(mockRepository.save(task)).thenReturn(task);

        MvcResult result = mockMvc.perform(

                post("/tasks/new")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskJson)
                )
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andReturn();
        }


}

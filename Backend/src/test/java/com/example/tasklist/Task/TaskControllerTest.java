package com.example.tasklist.Task;

import com.example.tasklist.entity.Task;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.invocation.InvocationOnMock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static com.example.tasklist.Task.Priority.*;
import static com.example.tasklist.Task.Status.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @MockBean
    TaskRepository mockRepository;
    @Autowired
    MockMvc mockMvc;
    ObjectMapper objectMapper = new ObjectMapper();
    @BeforeEach
    public void setUp() {

    }

    @Test
    public void testGetAllReturnsTasks() throws Exception {

        when(mockRepository.findByOrderByPriority()).thenReturn(List.of(
                new Task("Sample task one", LOW, NOT_STARTED),
                new Task("Sample task two", Priority.MEDIUM, IN_PROGRESS),
                new Task("Sample task three", Priority.HIGH, Status.COMPLETED)));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/tasks"))
                .andExpect(status().isOk())
                .andReturn();

        String stringResult = result.getResponse().getContentAsString();
        List taskList = objectMapper.readValue(stringResult, List.class);

        Assertions.assertThat(taskList).hasSize(3);

        System.out.println("Task list: " + taskList);
    }

    @Test
    public void testAddTaskCreatesATask() throws Exception {

        Task task = new Task("Sample task to add", LOW, IN_PROGRESS);

        task.setId(1L);

        String taskJson = objectMapper.writeValueAsString(task);
        System.out.println(taskJson);

        when(mockRepository.save(task)).thenReturn(task);
        when(mockRepository.findAll()).thenReturn(List.of(task));

        MvcResult result = mockMvc.perform(

                post("/tasks/new")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskJson)
                )
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andReturn();

        System.out.println(mockRepository.findAll());
        }

    @Test
    public void testCompleteTaskUpdatesStatus() throws Exception {

        Task task = new Task("sample task to complete", HIGH, IN_PROGRESS);
        task.setId(1L);

        String taskJson = objectMapper.writeValueAsString(task);
        System.out.println("Task JSON = " + taskJson);

        when(mockRepository.save(task)).thenReturn(task);
        when(mockRepository.findAll()).thenReturn(List.of(task));
        when(mockRepository.findById(1L)).thenReturn(Optional.of(task));

        System.out.println("Task repo = " +  mockRepository.findAll());
        System.out.println("Log information: \n");

        MvcResult result = mockMvc.perform(
                patch("/tasks/complete")
                        .param("taskId", task.getId().toString())
                )
                .andExpect(status().isOk())
                .andReturn();

        String completionDate = result.getResponse().getContentAsString();

        System.out.println("Task after PATCH endpoint hit: " + task);
        System.out.println("Date of completion = "  + completionDate);

        assertEquals("2023", completionDate.substring(1,5));
        assertEquals(COMPLETED, task.getStatus());
    }

    @Test
    public void testUpdateTaskUpdatesStatus() throws Exception {

        Task task = new Task("sample task to update status", LOW, IN_PROGRESS);
        task.setId(1L);

        String taskJson = objectMapper.writeValueAsString(task);
        System.out.println("Task JSON = " + taskJson);

        when(mockRepository.save(task)).thenReturn(task);
        when(mockRepository.findAll()).thenReturn(List.of(task));
        when(mockRepository.findById(1L)).thenReturn(Optional.of(task));

        MvcResult result = mockMvc.perform(
                patch("/tasks/updateStatus")
                        .param("taskId", task.getId().toString())
                        .param("newStatus", NOT_STARTED.toString())
                )
                .andExpect(status().isNoContent())
                .andReturn();

        System.out.println("Task after PATCH endpoint hit: " + task);
        assertEquals(NOT_STARTED, task.getStatus());

    }

    @Test
    public void testDeleteCompletedTasks() throws Exception {

        Task task = new Task("Sample task to be deleted", LOW, COMPLETED);
        task.setId(1L);
        ArrayList<Task> taskList = new ArrayList<>();
        taskList.add(task);

        when(mockRepository.save(task)).thenReturn(task);
        System.out.println("Tasks before endpoint hit: " + taskList);

        when(mockRepository.findAll()).thenReturn(taskList);
        doAnswer((InvocationOnMock invocation) -> {
            taskList.remove(task);
            return null;
        }).when(mockRepository).deleteTasksByStatus(COMPLETED);

        MvcResult result = mockMvc.perform(
                delete("/tasks/completed/delete"))
                    .andExpect(status().isNoContent())
                    .andReturn();

        assertEquals(mockRepository.findAll(), new ArrayList<>());
        Assertions.assertThat(taskList).hasSize(0);
        System.out.println("Tasks after endpoint hit: " + taskList);
    }
}

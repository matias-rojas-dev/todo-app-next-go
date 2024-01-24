package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Task struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Status bool   `json:"status"`
}

var tasks []Task

func getTasks(c *gin.Context) {
	c.JSON(http.StatusOK, tasks)
}

func getTaskByID(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	for _, task := range tasks {
		if task.ID == taskID {
			c.JSON(http.StatusOK, task)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

func createTask(c *gin.Context) {
	var newTask Task
	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task data"})
		return
	}

	newTask.ID = len(tasks) + 1
	newTask.Status = true
	tasks = append(tasks, newTask)
	c.JSON(http.StatusCreated, newTask)
}

func updateTask(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var taskToUpdate *Task
	for index, task := range tasks {
		if task.ID == taskID {
			taskToUpdate = &tasks[index]
			break
		}
	}

	if taskToUpdate == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	var requestBody map[string]interface{}
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task data"})
		return
	}

	for key, value := range requestBody {
		switch key {
		case "name":
			if name, ok := value.(string); ok {
				taskToUpdate.Name = name
			}

		case "status":
			if status, ok := value.(bool); ok {
				taskToUpdate.Status = status
			}
		}
	}

	c.JSON(http.StatusOK, taskToUpdate)
}

func deleteTaskByID(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	for index, task := range tasks {
		if task.ID == taskID {
			tasks = append(tasks[:index], tasks[index+1:]...)
			c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	tasks = []Task{
		{
			ID:   1,
			Name: "Tarea 1",
			Status: true,
		},
	}

	router.GET("/tasks", getTasks)
	router.GET("/tasks/:id", getTaskByID)
	router.POST("/tasks", createTask)
	router.PATCH("/tasks/:id", updateTask)
	router.DELETE("/tasks/:id", deleteTaskByID)

	if err := router.Run(":3001"); err != nil {
		log.Fatal(err)
	}
}

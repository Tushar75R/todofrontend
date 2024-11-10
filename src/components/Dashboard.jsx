// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseUrl } from "../constant/config";
import AddTaskDialog from "./AddTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import TaskCard from "./TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingTasks, setFetchingTasks] = useState(true);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
    priority: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setFetchingTasks(true);
      const response = await fetch(`${BaseUrl}/api/getTask`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setTasks(data.task);
      } else {
        toast.error("Failed to fetch tasks");
      }
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
      setFetchingTasks(false);
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/api/addTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskForm),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Task added successfully");
        fetchTasks();
        setOpenAddDialog(false);
      }
    } catch (error) {
      toast.error("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/api/${editTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskForm),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Task updated successfully");
        fetchTasks();
        setOpenEditDialog(false);
      }
    } catch (error) {
      toast.error("Error updating task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/api/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Task deleted successfully");
        fetchTasks();
      }
    } catch (error) {
      toast.error("Error deleting task");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: true }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Task marked as completed");
        fetchTasks();
      }
    } catch (error) {
      toast.error("Error marking task as completed");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BaseUrl}/api/search?query=${searchQuery}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      toast.error("Error searching tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate,
      priority: task.priority,
    });
    setEditTaskId(task._id);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortBy === "priority") {
        return a.priority - b.priority;
      } else if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
    setTasks(sortedTasks);
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        bgcolor: "white",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add Task
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        sx={{ marginLeft: 2 }}
      />
      <FormControl sx={{ margin: 1, minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select onChange={handleSort}>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {fetchingTasks ? (
          <CircularProgress />
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              handleOpenEditDialog={handleOpenEditDialog}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
            />
          ))
        )}
      </Box>
      <AddTaskDialog
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        handleAddTask={handleAddTask}
        taskForm={taskForm}
        handleChange={handleChange}
        loading={loading}
      />
      <EditTaskDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        handleEditTask={handleEditTask}
        taskForm={taskForm}
        handleChange={handleChange}
        loading={loading}
      />
      <ToastContainer />
    </Container>
  );
};

export default Dashboard;

// src/components/TaskCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

const TaskCard = ({
  task,
  handleOpenEditDialog,
  handleDeleteTask,
  handleCompleteTask,
}) => {
  const isTaskOverdue = (task) => {
    return new Date(task.dueDate) < new Date() && !task.isDone;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <Card sx={{ marginBottom: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              variant="h6"
              style={{
                textDecoration:
                  task.isDone || isTaskOverdue(task) ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Category: {task.category}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Due Date: {new Date(task.dueDate).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Priority: {task.priority}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Time Left:{" "}
              {Math.floor(
                (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </Typography>
          </div>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleOpenEditDialog(task)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => handleCompleteTask(task._id)}
            >
              Complete
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;

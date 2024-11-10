// src/components/EditTaskDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditTaskDialog = ({
  open,
  handleClose,
  handleEditTask,
  taskForm,
  handleChange,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={taskForm.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={taskForm.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          value={taskForm.category}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="dueDate"
          label="Due Date"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={taskForm.dueDate}
          onChange={handleChange}
        />
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={taskForm.priority}
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEditTask} disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;

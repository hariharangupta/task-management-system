"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Typography,
  Tooltip,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Chip,
} from "@mui/material";

import { statusColors } from "../utils/index";

const AllTasks = () => {
  const router = useRouter();
  const [tasksData, setTasksData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("taskData"));
    if (data) {
      setTasksData(Array.isArray(data) ? data : [data]);
    }
  }, []);

  const capitalFunction = (value) => {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  };

  const deleteTask = (createdAt) => {
    const updatedTasks = tasksData.filter(
      (task) => task.createdAt !== createdAt
    );
    setTasksData(updatedTasks);
    localStorage.setItem("taskData", JSON.stringify(updatedTasks));
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTaskToDelete(null);
  };

  const handleDeleteModal = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.createdAt);
    }
    handleCloseModal();
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const editTask = (task) => {
    const taskDataString = encodeURIComponent(JSON.stringify(task));
    router.push(`/addTask?taskData=${taskDataString}&type=edit`);
  };

  console.log(tasksData);

  return (
    <div className="flex flex-col items-center min-h-screen bg-stone-100 overflow-y-auto p-3 w-full">
      <div className="bg-white shadow-md rounded-lg p-6 w-full min-h-screen">
        <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Task Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksData.length > 0 ? (
                tasksData.map((task) => (
                  <TableRow key={task.createdAt}>
                    <TableCell>
                      {capitalFunction(task.taskName) || "-"}
                    </TableCell>
                    <TableCell>
                      {capitalFunction(task.taskDescription)}
                    </TableCell>
                    <TableCell>{task.createdAt}</TableCell>
                    <TableCell>{capitalFunction(task.category)}</TableCell>
                    <TableCell>
                      <Tooltip title={task.assignee} arrow placement="right">
                        <Avatar>{task.assignee.charAt(0).toUpperCase()}</Avatar>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{task.dueDate || "-"} </TableCell>
                    <TableCell>
                      <Chip
                        label={task.taskStatus}
                        sx={{
                          backgroundColor:
                            statusColors[task.taskStatus] || "gray",
                          color: "white",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        color="inherit"
                        onClick={() => editTask(task)}
                        startIcon={<EditIcon />}
                      ></Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        color="inherit"
                        onClick={() => handleDeleteClick(task)}
                        startIcon={<DeleteIcon />}
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow colSpan={9} align="center">
                  <TableCell>
                    <Typography
                      variant="body2"
                      className="text-stone-400"
                      align="center"
                    >
                      No tasks available.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            className="text-white bg-stone-900"
          >
            No
          </Button>
          <Button
            onClick={handleDeleteModal}
            variant="contained"
            className="text-white  bg-stone-900"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        onClose={handleToastClose}
        message="Record successfully deleted"
        autoHideDuration={3000}
      />
    </div>
  );
};

export default AllTasks;

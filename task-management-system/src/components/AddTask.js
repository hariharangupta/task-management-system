"use client";
import React, { useEffect, useState } from "react";
import { TaskTypeOptions, TaskPriority, Assignees } from "../utils/index";
import { useSearchParams, useRouter } from "next/navigation";

const AddTask = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editTaskData = searchParams.get("taskData");
  const typeOfTask = searchParams.get("type");

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskStatus: "inProgress",
    createdAt: "",
    taskDescription: "",
    dueDate: "",
    priority: "Low",
    category: "",
    assignee: "",
  });

  const [taskType, setTaskType] = useState("new");

  useEffect(() => {
    if (typeOfTask === "edit" && editTaskData) {
      const editTask = JSON.parse(editTaskData);
      setTaskData(editTask);
      setTaskType(typeOfTask);
    }
  }, [typeOfTask, editTaskData]);

  const handleTaskData = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitTaskData = (e) => {
    e.preventDefault();
    console.log(taskData, "taskData");

    const newTask = {
      ...taskData,
      createdAt:
        taskType === "new" ? new Date().toISOString() : taskData.createdAt,
    };

    console.log(newTask, "newTask");

    const existingTasks = JSON.parse(localStorage.getItem("taskData")) || [];

    let updatedTasks;

    if (typeOfTask !== "edit") {
      updatedTasks = [...existingTasks, newTask];
    } else {
      updatedTasks = existingTasks.map((task) =>
        task.createdAt === taskData.createdAt ? newTask : task
      );
    }

    localStorage.setItem("taskData", JSON.stringify(updatedTasks));

    setTaskData({
      taskName: "",
      taskStatus: "inProgress",
      createdAt: "",
      taskDescription: "",
      dueDate: "",
      priority: "Low",
      category: "",
      assignee: "",
    });

    router.push("/allTasks");
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-auto  sm:p-0 md:p-6">
      <div className=" shadow-md rounded-lg p-6 w-full max-w-6xl border border-stone-300">
        <h2 className="text-xl font-bold mb-4">
          {taskType === "edit" ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={submitTaskData}>
          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="taskName">
              Task Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={taskData.taskName}
              name="taskName"
              onChange={handleTaskData}
              placeholder="Task Name"
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="taskStatus">
              Task Status <span className="text-red-600">*</span>
            </label>
            <select
              name="taskStatus"
              value={taskData.taskStatus}
              onChange={handleTaskData}
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              {TaskTypeOptions.map((task) => (
                <option key={task.value} value={task.value}>
                  {task.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-stone-700 mb-2"
              htmlFor="taskDescription"
            >
              Task Description
            </label>
            <textarea
              value={taskData.taskDescription}
              name="taskDescription"
              onChange={handleTaskData}
              placeholder="Task Description"
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="dueDate">
              Due Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              value={taskData.dueDate}
              name="dueDate"
              onChange={handleTaskData}
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="priority">
              Priority <span className="text-red-600">*</span>
            </label>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleTaskData}
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            >
              {TaskPriority.map((taskPriority) => (
                <option key={taskPriority.value} value={taskPriority.value}>
                  {taskPriority.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              value={taskData.category}
              name="category"
              onChange={handleTaskData}
              placeholder="Work"
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-stone-700 mb-2" htmlFor="assignee">
              Assignee <span className="text-red-600">*</span>
            </label>
            <select
              name="assignee"
              value={taskData.assignee}
              onChange={handleTaskData}
              className="border border-stone-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            >
              <option value="">Select Assignee</option>
              {Assignees.map((assignee) => (
                <option key={assignee.name} value={assignee.name}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-stone-900 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-stone-700 transition duration-200"
          >
            {taskType === "edit" ? "Edit Task" : "Add New Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

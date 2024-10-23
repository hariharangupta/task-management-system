export const TaskTypeOptions = [
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "New Task", value: "New Task" },
  { label: "On Hold", value: "On Hold" },
  { label: "Pending Review", value: "Pending Review" },
  { label: "Cancelled", value: "Cancelled" },
];

export const TaskPriority = [
  { label: "Low ", value: "low" },
  { label: "Medium ", value: "medium" },
  { label: "High ", value: "high" },
];

export const Assignees = [
  { name: "Hari", id: "1" },
  { name: "Sai", id: "2" },
  { name: "Kumar", id: "3" },
  { name: "Teja", id: "4" },
  { name: "John", id: "5" },
  { name: "Parsad", id: "6" },
];

export const DashboardData = [
  {
    name: "All Tasks",
    description:
      "View and manage all your tasks in one place. Track your progress and update task statuses efficiently.",
    path: "/allTasks",
  },
  {
    name: "Add Task",
    description:
      " Create a new task quickly and easily. Fill in the necessary details and start tracking your work!",
    path: "/addTask",
  },
];

export const statusColors = {
  "In Progress": "orange",
  Completed: "green",
  "New Task": "blue",
  "On Hold": "yellow",
  "Pending Review": "purple",
  Cancelled: "red",
};

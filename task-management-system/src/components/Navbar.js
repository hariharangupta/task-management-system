import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center w-full h-16 bg-slate-900 px-4 md:px-9 py-2 text-white">
      <div>
        <h1 className="text-lg font-bold">Task Management</h1>
      </div>
      <div className="hidden md:flex">
        <ul className="flex">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li className="px-6">
            <Link href="/allTasks">All Tasks</Link>
          </li>
          <li>
            <Link href="/addTask">Add Task</Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 right-0 w-full bg-slate-800 md:hidden">
          <ul className="flex flex-col p-4">
            <li className="py-2">
              <Link href="/" onClick={toggleMenu}>
                Dashboard
              </Link>
            </li>
            <li className="py-2">
              <Link href="/allTasks" onClick={toggleMenu}>
                All Tasks
              </Link>
            </li>
            <li className="py-2">
              <Link href="/addTask" onClick={toggleMenu}>
                Add Task
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

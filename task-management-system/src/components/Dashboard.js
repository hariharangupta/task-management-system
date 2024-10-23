"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DashboardData } from "../utils/index";

const Dashboard = () => {
  const router = useRouter();

  const handlePath = (path) => {
    router.push(path);
  };

  return (
    <div className=" min-h-screen overflow-y-auto ">
      <div className="bg_image h-72"></div>
      <div className="flex justify-center items-center mt-5">
        {DashboardData.map((data) => {
          return (
            <div
              className="bg-white border border-stone-300 shadow-md rounded-lg p-6 w-full min-h-52 max-w-md md:mx-5 mb-6 md:mb-0 transition-transform hover:scale-105 cursor-pointer text-center justify-center items-center flex flex-col"
              onClick={() => handlePath(data.path)}
            >
              <h2 className="text-xl font-semibold mb-4">{data.name}</h2>
              <p className="tex-white">{data.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
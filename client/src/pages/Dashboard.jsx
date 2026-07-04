import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getAllTask } from "../api/api";

const Dashboard = () => {
     const [taskStats, setTaskStats] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    completed: 0,
  });

 const fetchTasks = async () => {
      try {
        const res = await getAllTask()
        console.log('task',res)
        const tasks = res.task;

        const total = tasks.length;
        const pending = tasks.filter(t => t.status === "Pending").length;
        const inprogress = tasks.filter(t => t.status === "Inprogress").length;
        const completed = tasks.filter(t => t.status === "Completed").length;

        setTaskStats({ total, pending, inprogress, completed });
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }

     useEffect(()=>{
        fetchTasks()
    },[])

  return (
  
<main className="p-4 w-100 bg-light" style={{ minHeight: "100vh" }}>
  <div className="d-flex gap-3 mb-4">
    <div className="card p-3 flex-fill dashboard-card total">
      <div className="d-flex align-items-center">
        {/* Left half: icon */}
        <div className="flex-shrink-0 me-3 icon-section">
          <i className="bi bi-list-task fs-1"></i>
        </div>
        {/* Right half: number + label */}
        <div className="flex-grow-1 text-end content-section">
          <div className="fs-1 fw-bold">{taskStats.total}</div>
          <div className="small">Total Tasks</div>
        </div>
      </div>
    </div>

    <div className="card p-3 flex-fill dashboard-card pending">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3 icon-section">
          <i className="bi bi-hourglass-split fs-1"></i>
        </div>
        <div className="flex-grow-1 text-end content-section">
          <div className="fs-1 fw-bold">{taskStats.pending}</div>
          <div className="small">Pending</div>
        </div>
      </div>
    </div>

    <div className="card p-3 flex-fill dashboard-card inprogress">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3 icon-section">
          <i className="bi bi-arrow-repeat fs-1"></i>
        </div>
        <div className="flex-grow-1 text-end content-section">
          <div className="fs-1 fw-bold">{taskStats.inprogress}</div>
          <div className="small">In Progress</div>
        </div>
      </div>
    </div>

    <div className="card p-3 flex-fill dashboard-card completed">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3 icon-section">
          <i className="bi bi-check-circle-fill fs-1"></i>
        </div>
        <div className="flex-grow-1 text-end content-section">
          <div className="fs-1 fw-bold">{taskStats.completed}</div>
          <div className="small">Completed</div>
        </div>
      </div>
    </div>
  </div>

  {/* <Outlet /> */}
</main>
        
  );
};

export default Dashboard;
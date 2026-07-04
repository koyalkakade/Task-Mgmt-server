import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTASK, getTaskById, updateTask } from "../../api/taskAPI"; // adjust imports
import { toast } from "react-toastify";
import { FaTasks, FaAlignLeft, FaCalendarAlt } from "react-icons/fa";

const CreateUpdateTask = () => {
  const { ID } = useParams(); // route param
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const isEdit = Boolean(ID);

  // Fetch task if editing
  useEffect(() => {
    if (isEdit) {
      const fetchTask = async () => {
        try {
          const res = await getTaskById(ID);
          const task = res.task;
          setTitle(task.title);
          setDescription(task.description);
          setStartDate(task.startDate);
          setEndDate(task.endDate);
          setStatus(task.status);
        } catch (error) {
          toast.error("Failed to load task");
        }
      };
      fetchTask();
    } else {
    // reset fields for create mode
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setStatus("Pending");
  }
  }, [ID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { title, description, startDate, endDate };
      if (isEdit) {
        payload.status = status; // include status only when updating
      }

      let res;
      if (isEdit) {
        res = await updateTask(ID, payload);
      } else {
        res = await createTASK(payload);
      }

      toast.success(res.msg);
      navigate("/dashboard/all-tasks");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <FaTasks className="me-2" />
            {isEdit ? "Update Task" : "Create Task"}
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Task Title</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaTasks />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaAlignLeft />
                </span>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="form-label">End Date</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Status field only for update */}
            {isEdit && (
              <div className="mb-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Inprogress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {isEdit ? "Update Task" : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateTask;

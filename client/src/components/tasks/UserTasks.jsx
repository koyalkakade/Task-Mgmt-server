import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getAssignTaskByUser } from "../../api/assignTask";

const UserTasks = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState("");
    const [users, setUsers] = useState([]);

    const tasksPerPage = 10;


    const handleSubmit = async () => {
        try {
            const res = await getAssignTaskByUser(selectedUser);
            const taskArray = res.details.tasks;
            console.log(taskArray);

            // const res1 = res.task;
            //  setTitle(task.title);
            //  setDescription(task.description);
            //  setStartDate(task.startDate);
            //  setEndDate(task.endDate);
            //  setStatus(task.status);
            //console.log(res1)
            // const data = res1.map(({ Task }) => Task);
            setTasks(taskArray);
        } catch (error) {
            toast.error("This user have not assign task");
        }
    };
    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.allUser);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };



    useEffect(() => {
        fetchUsers();
    }, []);


    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const lastIndex = currentPage * tasksPerPage;
    const firstIndex = lastIndex - tasksPerPage;

    const currentTasks = tasks.slice(firstIndex, lastIndex);

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Users Tasks</h4>
                </div>

                <div className="card-body">
                    {/* Top Filter Navbar */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-5 d-flex ">
                            <div>
                                <select
                                    className="form-select"
                                    value={selectedUser}
                                    onChange={(e) =>
                                        setSelectedUser(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Select User
                                    </option>

                                    {users?.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-primary ms-2" onClick={handleSubmit}>
                                    Show Tasks
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* Task Table */}
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentTasks.length > 0 ? (
                                    currentTasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <span
                                                    className={
                                                        task.status === "Completed"
                                                            ? "badge bg-success"
                                                            : task.status === "Inprogress"
                                                                ? "badge bg-warning text-dark"
                                                                : "badge bg-danger"
                                                    }
                                                >
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td>{task.startDate}</td>
                                            <td>{task.endDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No tasks found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default UserTasks
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './pages/Layout'
import CreateUpdateTask from './components/tasks/CreateUpdateTask'
import AllTasks from './components/tasks/AllTasks'
import Dashboard from './pages/Dashboard'
import MyTask from './components/tasks/MyTask'
import UserTasks from './components/tasks/UserTasks'
import Profile from './components/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute ><Layout /></ProtectedRoute>} >
          <Route index path='Dashboard' element={<Dashboard />} />
          <Route path="create-task" element={<CreateUpdateTask />} />
          <Route path="edit-task/:ID" element={<CreateUpdateTask />} />
          <Route path="all-tasks" element={<AllTasks />}></Route>
          <Route path="my-tasks" element={<MyTask />}></Route>
          <Route path="users" element={<UserTasks />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
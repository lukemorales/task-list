import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList as initialTaskList } from "./siteData/taskList"
import { Priority, Task } from "./types/task"

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTaskList)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const addTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      priority,
      status: "TO_DO",
      progress: 0,
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
    setShowAddEditModal(false)
  }

  const handleCloseModal = () => {
    setShowAddEditModal(false)
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const handleDeleteClick = (taskId: string) => {
    setTaskToDelete(taskId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete)
      setTaskToDelete(null)
      setShowDeleteModal(false)
    }
  }

  const handleDeleteCancel = () => {
    setTaskToDelete(null)
    setShowDeleteModal(false)
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={() => setShowAddEditModal(true)} />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      </div>
      {showAddEditModal && <AddEditTaskForm onAdd={addTask} onClose={handleCloseModal} />}
      {showDeleteModal && <DeleteModal onDelete={handleDeleteConfirm} onCancel={handleDeleteCancel} />}
    </div>
  )
}

export default App

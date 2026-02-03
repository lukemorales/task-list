import classNames from "classnames"
import { FormEvent, useState } from "react"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import { Priority } from "../../types/task"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

interface AddEditTaskFormProps {
  onAdd: (title: string, priority: Priority) => void
  onClose: () => void
}

const AddEditTaskForm = ({ onAdd, onClose }: AddEditTaskFormProps) => {
  const [title, setTitle] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<Priority>("MEDIUM")

  const resetForm = () => {
    setTitle("")
    setSelectedPriority("MEDIUM")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim(), selectedPriority)
      resetForm()
      onClose()
    }
  }

  const isAddDisabled = !title.trim()

  return (
    <Modal onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close className="cp" onClick={handleClose} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {(["HIGH", "MEDIUM", "LOW"] as Priority[]).map((priority) => (
                <li
                  key={priority}
                  className={classNames(priority.toLowerCase(), {
                    [`${priority.toLowerCase()}-selected`]: selectedPriority === priority,
                  })}
                  onClick={() => setSelectedPriority(priority)}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add" onClick={handleSubmit} disabled={isAddDisabled} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm

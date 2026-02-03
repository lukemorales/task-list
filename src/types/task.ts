export type Priority = "HIGH" | "MEDIUM" | "LOW"

export type Status = "TO_DO" | "IN_PROGRESS" | "DONE"

export interface Task {
  id: string
  title: string
  priority: Priority
  status: Status
  progress: number
}

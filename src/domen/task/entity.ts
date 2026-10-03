export interface Task{
    id: number
    userId: number
    title: string
    description: string
    status: "todo" | "in_progress" | "done"
    priority: "low" | "medium" | "high"
    createdAt: Date
    updatedAt: Date
}
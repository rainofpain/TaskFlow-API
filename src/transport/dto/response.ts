export interface UserResponse{
    id:number
    email:string
    name:string
    createdAt:Date
}

export interface TaskResponse{
    id:number
    title:string
    description:string
    status: "todo" | "in_progress" | "done";
    priority:"low" | "medium" | "high"
    createdAt:Date
    updatedAt:Date
}
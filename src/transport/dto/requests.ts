export interface RegisterRequest{
    name:string,
    email:string,
    password:string
}

export interface LoginRequest{
    email:string,
    password:string
}

export interface CreateTask{
    userId: number,
    title:string,
    description:string,
    priority:"low" | "medium" | "high",
    status: "todo" | "in_progress" | "done"
}

export interface ChangeTask{
    title:string,
    description:string,
    priority:"low" | "medium" | "high",
    status: "todo" | "in_progress" | "done"
}


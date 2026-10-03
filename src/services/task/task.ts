import type { TaskRepository } from "../../domen/task/repository.js"
import type { TaskServices } from "./task.types.js"
import type { UserRepository } from "../../domen/user/repository.js"

export function createTaskService(taskRepository: TaskRepository, userRepository: UserRepository): TaskServices{
    return{
        async addNewTask(data){
            const user = userRepository.getById(data.userId);
            if(!user){
                return undefined;
            }
            return await taskRepository.addNewTask(data);
        },
        async getAllTasks(status, userId, priority){
            return await taskRepository.getAllTasks(status, userId, priority);
        },
        
        async getTaskById(id){  
            if(!await taskRepository.getTaskById(id)){
                return undefined;
            }
            return await taskRepository.getTaskById(id)
        },

        async changeTaskById(id, data){
            return await taskRepository.changeTaskById(id, data)
        },

        async deleteTaskById(id){
            return await taskRepository.deleteTaskById(id);
        }
    }
}
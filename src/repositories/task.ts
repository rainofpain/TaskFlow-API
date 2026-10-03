import type { TaskRepository } from "../domain/task/repository.js";
import  { jsonTaskEditor } from "./utils/editJson.js";


export function createTaskRepository(): TaskRepository{
    return{
        async addNewTask(data){
            const taskStorage = await jsonTaskEditor.readJson('tasks');
            const currentDate = new Date();
            const task = {
                id: taskStorage.length + 1,
                userId:data.userId,
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                createdAt:currentDate,
                updatedAt: currentDate
            };

            taskStorage.push(task);
            await jsonTaskEditor.writeJson('tasks', taskStorage);
            return task;
        },

        async getAllTasks(status?, userId?, priority?){
            const taskStorage = await jsonTaskEditor.readJson('tasks');
            let newTaskStorage = [...taskStorage];
            if(status){
                newTaskStorage = newTaskStorage.filter(task=>task.status =status);
            }
            if(userId){
                newTaskStorage = newTaskStorage.filter(task=>task.userId =userId);
            }
            if(priority){
                newTaskStorage = newTaskStorage.filter(task=>task.priority =priority );
            }
            return newTaskStorage;
        },

        async getTaskById(id){
            const taskStorage = await jsonTaskEditor.readJson('tasks');
            const task = taskStorage.find(task=> task.id === id);
            return task;
        },

        async changeTaskById(id, data){
            const {title, description, status, priority} = data;
            const taskStorage = await jsonTaskEditor.readJson('tasks');
            const task = taskStorage.find(task=> task.id === id);
            const currentDate = new Date();

            if(!task){
                return undefined;
            }
            if(title){
                task.title = title;
            }
            if(description){
                task.description = description;
            }
            if(status){
                task.status = status;
            }
            if(priority){
                task.priority = priority;
            }
            task.updatedAt = currentDate;
            await jsonTaskEditor.writeJson('tasks', taskStorage);
            return task;
        },

        async deleteTaskById(id){
            const taskStorage = await jsonTaskEditor.readJson('tasks');
            const taskIndex = taskStorage.findIndex(task=> task.id === id);
            if(taskIndex !== -1){
                taskStorage.splice(taskIndex, 1);
                await jsonTaskEditor.writeJson('tasks', taskStorage);
                return true;
            }
            return false;
        }
    }
}
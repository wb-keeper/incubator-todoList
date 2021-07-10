import {TasksStateType} from "../App";
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskAT = {
    type: 'REMOVER-TASK',
    todolistId: string,
    id: string
}
export type AddTaskAT = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}
export type ChangeStatusAT = {
    type: 'CHANGE-STATUS',
    todolistId: string,
    id: string,
    isDone: boolean
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TITLE',
    todolistId: string,
    id: string,
    newTitle: string
}

type TasksType = RemoveTaskAT | AddTaskAT | ChangeStatusAT | ChangeTaskTitleAT | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: TasksType)  => {
    switch (action.type) {
        case "ADD-TASK": {
            const copyState = {...state}
            copyState[action.todolistId].push({id: v1(), title: action.title, isDone: false})
            return copyState
        }
        case "REMOVER-TASK": {
            const copyState = {...state}
            copyState[action.todolistId] = copyState[`${action.todolistId}`].filter(e => e.id !== action.id)
            return copyState
        }
        case "CHANGE-STATUS": {
            const copyState = {...state}
            const newTasks = copyState[action.todolistId].map(e => e.id === action.id ? {...e, isDone: action.isDone} : e)
            copyState[action.todolistId] = newTasks
            return copyState
        }
        case "CHANGE-TITLE": {
            const copyState = {...state}
            const newTasksTitle = copyState[action.todolistId].map(e => e.id === action.id ? {...e, title: action.newTitle} : e)
            copyState[action.todolistId] = newTasksTitle
            return copyState
        }
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.id] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (todolistId: string, id: string):RemoveTaskAT => ({type: 'REMOVER-TASK', todolistId, id})
export const AddTaskAC = (todolistId: string, title: string):AddTaskAT => ({type: 'ADD-TASK', todolistId, title})
export const ChangeStatusAC = (todolistId: string, id: string, isDone: boolean):ChangeStatusAT => ({type: 'CHANGE-STATUS', todolistId, id, isDone})
export const ChangeTaskTitleAC = (todolistId: string, id: string, newTitle: string):ChangeTaskTitleAT => ({type: 'CHANGE-TITLE', todolistId, id, newTitle})
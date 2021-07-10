import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';
import {act} from "react-dom/test-utils";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodolistType> = [], action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            debugger
            return state.filter(e => e.id !== action.id)
        case "ADD-TODOLIST":
            const newTask: TodolistType= {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...state, newTask]
        case "CHANGE-TODOLIST-FILTER":
            const todoListIndex = state.findIndex(e => e.id === action.id)
            let task = {...state.find(e => e.id === action.id)}
            task = [{...task, filter: action.filter}]
            let start = state.slice(0, todoListIndex)
            let end = state.slice(todoListIndex + 1)
            //@ts-ignore
            console.log([...start, ...task, ...end])
            //@ts-ignore
            return [...start, ...task, ...end]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(e => e.id === action.id ? {...e, title: action.title} : e)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, id: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}

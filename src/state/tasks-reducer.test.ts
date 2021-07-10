import {AddTaskAC, ChangeStatusAC, RemoveTaskAC, ChangeTaskTitleAC, tasksReducer} from './tasks-reducer'
import {v1} from 'uuid';
import {TasksStateType} from "../App";


let startState: TasksStateType

beforeAll(()=> {
    startState = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "Redux", isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "Redux Hook", isDone: true},
        ]
    }
})


test('The task has to be removed', () => {

const endState =  tasksReducer(startState, RemoveTaskAC('todolistId2', '2'))

    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(e => e.id !== '2')).toBeTruthy()

})

test('The task has to be added', () => {

    const endState =  tasksReducer(startState, AddTaskAC('todolistId2', 'New Task'))

    expect(endState['todolistId2'].length).toBe(4)

})

test('The task status must be changed', () => {

    const endState =  tasksReducer(startState, ChangeStatusAC('todolistId1', '1', false))

    expect(endState['todolistId1'][0].isDone).toBe(false)

})

test('The task title must be changed', () => {

    const endState =  tasksReducer(startState, ChangeTaskTitleAC('todolistId2', '2', 'I love React'))

    expect(endState['todolistId2'][1].title).toBe('I love React')

})
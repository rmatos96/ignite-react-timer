import { ActionTypes } from "./actions"
import { produce} from 'immer'

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interrupetdDate?: Date
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: String | null
}


export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0){
                return state
            }

            return produce(state, draft =>{
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interrupetdDate = new Date()
            })
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            const currentCycleInde = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleInde < 0){
                return state
            }

            return produce(state, draft =>{
                draft.activeCycleId = null
                draft.cycles[currentCycleInde].finishedDate = new Date()
            })
        default:
            return state
    }
    /* if (action.type === 'ADD_NEW_CYCLE') {
        return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id
        }
    }

    if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
            ...state,
            cycles: state.cycles.map(cycle => {
                if (cycle.id === state.activeCycleId) {
                    return { ...cycle, interrupetdDate: new Date() }
                } else {
                    return cycle
                }
            }),
            activeCycleId: null
        }
    }

    if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
        return {
            ...state,
            cycles: state.cycles.map(cycle => {
                if (cycle.id === state.activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            }),
            activeCycleId: null
        }
    } */


}
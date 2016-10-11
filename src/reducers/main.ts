import { 
    records as attRec,
    AttendanceRecord
} from "../mock/attendance-record";

import {
    AttendanceBySubject,
    calcAttRecForMonth
} from "../mock/data";

import { SubjectMap, subjects } from "../mock/subjects"

import { 
    DATE_SELECTED, ActionDateSelected,
    EMPTY, ActionEmpty
} from "../actions";


type Actions = ActionDateSelected | ActionEmpty;

type WeeklyRoutine = string[][];
export const routine: string[][] = [
    [],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
];


export interface State {
    routine: WeeklyRoutine;
    attRec: AttendanceRecord;
    subjects: SubjectMap;
}

// const getEntireAttendanceBySubject = (routine: string[][], records: AttendanceRecord) => {
//     let subjectsInRoutine = Array.from(
//         routine
//         .reduce((a, x) => a.concat(x))
//         .reduce((set, x) => set.add(x), new Set<string>())
//     ).map(subj => calcAttRecForMonth(subj, routine, ))
    
    
// }

const initialState: State = {
    routine,
    attRec,
    subjects 
}

function calcDayOfWeek (day: number, month: number, year: number): number {
    return new Date(year, month, day+1).getDay();
}

function findAllIndices<T> (arr: T[], value: T): number[] {
    return arr.reduce((a, x, i) => x === value ? a.concat(i) : a, new Array<number>())
}

export const attendance: Redux.Reducer<State> = (state = initialState, action: Actions) => {
    console.log("Reducer", action)
    switch (action.type) {
        case DATE_SELECTED:
            const d = action.day;
            const m = action.month;
            const sub = action.subjectCode;
            const routine = state.routine;
            const subs = state.subjects;
            const attRec = state.attRec.slice(); // Make a copy. Free to mutate.

            console.log("before:", state.attRec[m][d]);            

            const dayRoutine = routine[calcDayOfWeek(d, m, 2016)]
            // check if there was a class that day.
            let hours = findAllIndices(dayRoutine, sub)
            if (hours.length > 0) {
                // NOTE: currently we only set/unset the first hour of that subject in the day
                attRec[m][d][hours[0]] = attRec[m][d][hours[0]] === 1 ? 0 : 1 
            }

            console.log("after:", state.attRec[m][d]);            
            

            return {
                routine: routine,
                subjects: subs,
                attRec
            }

        case EMPTY:

        default:
            return state;
    }
}


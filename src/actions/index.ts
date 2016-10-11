export type DATE_SELECTED = 'DATE_SELECTED';
export const DATE_SELECTED: DATE_SELECTED = 'DATE_SELECTED';
export interface ActionDateSelected {
    type: DATE_SELECTED,
    day: number;
    month: number;
    subjectCode: string
}
export function dateSelected (subjectCode: string, day: number, month: number): ActionDateSelected {
    return {
        type: DATE_SELECTED,
        day,
        month,
        subjectCode
    }
}

export type EMPTY = 'EMPTY';
export const EMPTY: EMPTY = 'EMPTY';
export interface ActionEmpty {
    type: EMPTY
}
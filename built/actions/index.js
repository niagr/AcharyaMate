export const DATE_SELECTED = 'DATE_SELECTED';
export function dateSelected(subjectCode, day, month) {
    return {
        type: DATE_SELECTED,
        day,
        month,
        subjectCode
    };
}
export const EMPTY = 'EMPTY';

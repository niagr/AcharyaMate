export const routine = [
    [],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
];
// function calcAttendaceForSubjects (subjects: SubjectMap, attendanceRecord: AttendanceRecord) {
//     const attendanceBySubject: {[subjectCode: string]: {total: number, attended: number}} = {};
//     for (let dayOfMonth = 0; dayOfMonth < attendanceRecord[0].length; dayOfMonth++) {
//         let dayRoutine = routine[dayOfMonth % 7];
//         for (let hour = 0; hour < dayRoutine.length; hour++) {
//             const subjectCode = dayRoutine[hour];
//             attendanceBySubject[subjectCode].total++;
//             if (attendanceRecord[0][dayOfMonth][hour] === 1) {
//                 attendanceBySubject[subjectCode].attended++;
//             }
//         }
//     }
// }
function calcAttendanceForDay(subjects, attendance) {
    const res = {};
    for (let hour in subjects) {
        const subject = subjects[hour];
        res[subject] = res[subject] || { total: 0, attended: 0 };
        res[subject].total++;
        if (attendance[hour] === 1)
            res[subject].attended++;
    }
    return res;
}
// FIXME: Assumes starting day of the month is a Monday.
function calcAttendanceForMonth(weekRoutine, monthAttRec, month, year) {
    const res = {};
    const startDayOfWeek = new Date(year, month, 1).getDay();
    for (let day = 0; day < monthAttRec.length; day++) {
        const dayOfWeek = (startDayOfWeek + day) % 7;
        const dayRes = calcAttendanceForDay(weekRoutine[dayOfWeek], monthAttRec[day]);
        for (let subject in dayRes) {
            res[subject] = res[subject] || { total: 0, attended: 0 };
            res[subject].total += dayRes[subject].total;
            res[subject].attended += dayRes[subject].attended;
        }
    }
    return res;
}
function calcAttendanceForYear(weekRoutine, yearAttendanceRecord, year) {
    const res = {};
    for (let month = 0; month < 6; month++) {
        const monthRes = calcAttendanceForMonth(weekRoutine, yearAttendanceRecord[month], month, year);
        for (let subject in monthRes) {
            res[subject] = res[subject] || { total: 0, attended: 0 };
            res[subject].total += monthRes[subject].total;
            res[subject].attended += monthRes[subject].attended;
        }
    }
    return res;
}
function calcAttRecForDay(subject, dayRoutine, dayAttRec) {
    const res = (new Array(6)).fill(-1);
    for (let s = 0; s < dayRoutine.length; s++) {
        if (dayRoutine[s] === subject) {
            res[s] = dayAttRec[s] === 1 ? 1 : 0;
        }
        else {
            res[s] = -1;
        }
    }
    return res;
}
export function calcAttRecForMonth(subject, weekRoutine, monthAttRec, month, year) {
    const res = [];
    const startDayOfWeek = new Date(year, month, 1).getDay();
    for (let day = 0; day < monthAttRec.length; day++) {
        const dayOfWeek = (startDayOfWeek + day) % 7;
        res[day] = calcAttRecForDay(subject, weekRoutine[dayOfWeek], monthAttRec[day]);
    }
    return res;
}
// function calcAttRecForMonths (subject: string, months: number[], year: number) {
//     return months.map(m => calcAttRecForMonth(subject, routine, ))
// }
// const foo = calcAttRecForMonth('10IS51', routine as string[][], attendanceRecord[0], 0, 2016);
// console.log(foo);
// debugger 

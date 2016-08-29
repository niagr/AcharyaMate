import attendanceRecord from './attendance-record';
const routine = {
    0: ['10CS61', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    1: ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    2: ['10CS61', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    3: ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    4: ['10CS61', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    5: ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    6: []
};
function calcAttendaceForSubjects(subjects, attendanceRecord) {
    const attendanceBySubject = {};
    for (let dayOfMonth = 0; dayOfMonth < attendanceRecord[0].length; dayOfMonth++) {
        let dayRoutine = routine[dayOfMonth % 7];
        for (let hour = 0; hour < dayRoutine.length; hour++) {
            const subjectCode = dayRoutine[hour];
            attendanceBySubject[subjectCode].total++;
            if (attendanceRecord[0][dayOfMonth][hour] === 1) {
                attendanceBySubject[subjectCode].attended++;
            }
        }
    }
}
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
function calcAttendanceForMonth(weekRoutine, monthAttendanceRecord) {
    const res = {};
    for (let day = 0; day < monthAttendanceRecord.length; day++) {
        const dayRes = calcAttendanceForDay(weekRoutine[day % 7], monthAttendanceRecord[day]);
        for (let subject in dayRes) {
            res[subject] = res[subject] || { total: 0, attended: 0 };
            res[subject].total += dayRes[subject].total;
            res[subject].attended += dayRes[subject].attended;
        }
    }
    return res;
}
function calcAttendanceForYear(weekRoutine, yearAttendanceRecord) {
    const res = {};
    for (let month = 0; month < 6; month++) {
        const monthRes = calcAttendanceForMonth(weekRoutine, attendanceRecord[month]);
        for (let subject in monthRes) {
            res[subject] = res[subject] || { total: 0, attended: 0 };
            res[subject].total += monthRes[subject].total;
            res[subject].attended += monthRes[subject].attended;
        }
    }
    return res;
}
// console.log(routine[0], attendanceRecord[0][0]);
var start = process.hrtime();
calcAttendanceForYear(routine, attendanceRecord);
console.log((process.hrtime()[1] - start[1]) / 1000000);

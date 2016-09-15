import subjects, {SubjectMap} from './subjects';
import attendanceRecord, {AttendanceRecord} from './attendance-record';

interface SubjectAttendance {
    total: number;
    attended: number;
}

type AttendanceBySubject = {[subjectCode: string] : SubjectAttendance};


type WeeklyRoutine = {[dayOfWeek: number]: string[]};
export const routine: WeeklyRoutine = [
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    ['10CS56', '10IS51', '10CS52', '10CS53', '10CS54', '10CS55'],
    ['10CS55', '10CS55', '10CS54', '10CS54', '10IS51', '10CS54'],
    []
]

function calcAttendaceForSubjects (subjects: SubjectMap, attendanceRecord: AttendanceRecord) {
    const attendanceBySubject: {[subjectCode: string]: {total: number, attended: number}} = {};
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

function calcAttendanceForDay (subjects: string[], attendance: number[]): AttendanceBySubject {
    const res: AttendanceBySubject = {};
    for (let hour in subjects) {
        const subject = subjects[hour];
        res[subject] = res[subject] || {total: 0, attended: 0};
        res[subject].total++;
        if (attendance[hour] === 1)
            res[subject].attended++;
    }
    return res;
}

// FIXME: Assumes starting day of the month is a Monday.
function calcAttendanceForMonth (weekRoutine: WeeklyRoutine, monthAttendanceRecord: number[][]) {
    const res: AttendanceBySubject = {};
    for (let day = 0; day < monthAttendanceRecord.length; day++) {
        const dayRes = calcAttendanceForDay(weekRoutine[day % 7], monthAttendanceRecord[day])
        for (let subject in dayRes) {
            res[subject] = res[subject] || {total: 0, attended: 0};
            res[subject].total += dayRes[subject].total;
            res[subject].attended += dayRes[subject].attended;
        }
    }
    return res;
}

function calcAttendanceForYear (weekRoutine: WeeklyRoutine, yearAttendanceRecord: number[][][]) {
    const res: AttendanceBySubject = {};
    for (let month = 0; month < 6; month++) {
        const monthRes = calcAttendanceForMonth(weekRoutine, attendanceRecord[month]);
        for (let subject in monthRes) {
            res[subject] = res[subject] || {total: 0, attended: 0};
            res[subject].total += monthRes[subject].total;
            res[subject].attended += monthRes[subject].attended;
        }
    }
    return res;
}


function calcAttRecForDay (dayRoutine: string[], subject: string, dayAttRec: number[]): number[] {
    const res: number[] = [];
    for (let s = 0; s < dayRoutine.length; s++) {
        if (dayRoutine[s] === subject) {
            res[s] = dayAttRec[s] === 1 ? 1 : 0;
        } else {
            res[s] = -1;
        }
    }
    return res;
}

function calcAttRecForMonth (weekRoutine: string[][], subject: string, monthAttRec: number[][]): number[][] {
    const res: number[][] = [];
    for (let day = 0; day < monthAttRec.length; day++) {
        res[day] = calcAttRecForDay(dayRoutine, subject, monthAttRec[day]);
    }
    return res;
}

function calcAttRecForMonths (months: number[], ) {
    return months.map(m => calcAttRecForMonth(m))
}
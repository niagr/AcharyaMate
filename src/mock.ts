export interface Subject {
    title: string;
    professor: string;
}


export type SubjCode = "fs" | "cd" | "me" | "cn" | "st" | "unix";

export interface MockData {
    subjects: {[id: string] : Subject};
    routine: {[day: string]: SubjCode[]};
}

export let data: MockData = {
    subjects: {
        fs: {
            title: "File Structures",
            professor: "Yogesh"
        },
        cd: {
            title: "Compiler Design",
            professor: "Mahesh"
        },
        me: {
            title: "Management and Entrepreneurship",
            professor: "Kala"
        },
        cn: {
            title: "Computer Networks",
            professor: "Gangadhariah"
        },
        st: {
            title: "Software Testing",
            professor: "Chayapathi"
        },
        unix: {
            title: "Unix System Programming",
            professor: "Mithuna"
        }
    },
    routine: {
        Mon: ['fs', 'cd', 'me', 'cn', 'unix', 'st'],
        Tue: ['fs', 'cd', 'me', 'cn', 'unix', 'st'],
        Wed: ['fs', 'cd', 'me', 'cn', 'unix', 'st'],
        Thu: ['fs', 'cd', 'me', 'cn', 'unix', 'st'],
        Fri: ['fs', 'cd', 'me', 'cn', 'unix', 'st'],
        Sat: ['fs', 'cd', 'me', 'cn', 'unix', 'st']
    }
}
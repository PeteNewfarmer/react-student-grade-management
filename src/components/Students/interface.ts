export interface StudentsProps {}

export interface StudentsState {
    students: StudentsData[],
    inputName: string,
    inputGrade: string,
    fieldWithError: string
}

export interface StudentsData {
    name: string,
    grade: number
}
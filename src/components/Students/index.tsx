import React from 'react'
import { StudentsData, StudentsProps, StudentsState } from './interface'
import './style.css'
import { StudentsAbove90 } from '../StudentsAbove90'
import { StudentsBelow70 } from '../StudentsBelow70'

export const StudentsContext = React.createContext<StudentsData[]>([]);

export class Students extends React.Component<StudentsProps, StudentsState> {
    inputNameRef: React.RefObject<HTMLInputElement>
    inputGradeRef: React.RefObject<HTMLInputElement>


    constructor(props: StudentsProps) {
        super(props)

        this.state = {
            students: [
                {
                    name: "Peter",
                    grade: 90
                },
                {
                    name: "Leo",
                    grade: 93
                },
                {
                    name: "Sue",
                    grade: 89
                }
            ],
            inputName: "",
            inputGrade: "",
            fieldWithError: ""
        }

        this.inputGradeRef = React.createRef();
        this.inputNameRef = React.createRef();

    }

    // Type-xGeneric handleInputOnChange
    handleInputOnChange = (inputType: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        //const { fieldWithError } = this.state;
        //console.log(inputType)
        this.setState({ [inputType]: value } as Omit<StudentsState, 'students'>
            // Constructs a type by picking all properties from Type and then removing Keys
        )

        //if (fieldWithError === stateKey && value.length) this.setState({ fieldWithError: '' });
    }

    handleButtonClick = () => {
        if (this.areInputsValid()) {
            this.setState({
                students: [
                    ...this.state.students,
                    {
                        name: this.state.inputName,
                        grade: parseFloat(this.state.inputGrade),
                    }
                ],
                inputName: "",
                inputGrade: "",
            });
        }
    }

    areInputsValid = () => {
        if (!this.state.inputName) {
            this.inputNameRef.current && this.inputNameRef.current.focus();
            this.setState({ fieldWithError: 'inputName' });
        } else if (!this.state.inputGrade) {
            this.inputGradeRef.current && this.inputGradeRef.current.focus();
            this.setState({ fieldWithError: 'inputGrade' });
        }

        return this.state.inputName && this.state.inputGrade;
    }

    getErrorMessage = (field: string) => {
        return this.state.fieldWithError === field ? "Please fill out field" : '';
    }

    render() {
        return (
            <StudentsContext.Provider value={this.state.students}>
                <div>
                    <ul>
                        {
                            this.state.students.map(students =>
                                <li key={students.name}>{students.name} - {students.grade}</li>
                            )
                        }
                    </ul>
                    <label className="input-container">
                        { /* Viel mehr Typisierung/Interfaces in Udemy Kurs */}
                        <div className="input-label">Student Name</div>
                        {/* <input ref={ref} value={value} className={`input ${errorClassName}`} onChange={onChange} /> */}
                        <input ref={this.inputNameRef} onChange={this.handleInputOnChange("inputName")} value={this.state.inputName} ></input>
                        {this.getErrorMessage("inputName") && <div className="error-message">{this.getErrorMessage("inputName")}</div>}
                        <div className="input-label">Student Grade</div>
                        <input ref={this.inputGradeRef} onChange={this.handleInputOnChange("inputGrade")} value={this.state.inputGrade} ></input>
                        {this.getErrorMessage("inputGrade") && <div className="error-message">{this.getErrorMessage("inputGrade")}</div>}
                        <br />
                        <button className="btn btn-student-grade-button" onClick={this.handleButtonClick}>Add</button>
                    </label>
                    <StudentsAbove90 />
                    <StudentsBelow70 />
                </div>
            </StudentsContext.Provider>
        )
    }
}
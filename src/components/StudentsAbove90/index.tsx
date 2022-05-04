import React from 'react';
import { StudentsContext } from '../Students';

export const StudentsAbove90: React.FC = () => {
    return (
        <>
            <h1>Students With 90% and Above</h1>
            <StudentsContext.Consumer>
                {data => data.filter(students => students.grade >= 90)
                    .map(({ name, grade }) => <li key={name}>{name} - {grade}</li>)
                }
            </StudentsContext.Consumer>
        </>
    )
}
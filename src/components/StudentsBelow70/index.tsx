import React from 'react';
import { StudentsContext } from '../Students';

export const StudentsBelow70: React.FC = () => {
    return (
        <>
            <h1>Students With 70% and Below</h1>
            <StudentsContext.Consumer>
                {data => data.filter(students => students.grade <= 70)
                    .map((students) => <li key={students.name}>{students.name} - {students.grade}</li>)
                }
            </StudentsContext.Consumer>
        </>
    )
}
'use client'
import { useState } from 'react';

import Chat from './components/Chat';
import  Student  from './components/Student';


export default function Home() {
    const [statusStudent, setStatusStudent] = useState("basic");

    return (
        <div className='mainPage'>

            <h1>Świadek</h1>
            <Student status={statusStudent} />
            <Chat setStatusStudent={setStatusStudent}/>
        </div>
    );
}

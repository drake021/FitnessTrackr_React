import React, { useEffect, useState } from 'react';
import { fetchRoutines } from '../api/index.js';

const Routines = ({ user }) => {
    const [routineList, setRoutineList] = useState([]);

    useEffect(() => {
        fetchRoutines().then(routines => {
            setRoutineList(routines)
        })
            .catch(error => {
            });
    }, []);


    return (

        <div id="ralist-main">
            <h1>Routines</h1>
            {routineList.map(({ id, name, goal, creatorName, activities }) => (
                <div key={id} id="ralist">
                    <h3 >Routine:  {name}</h3>
                    <p>Goal:  {goal}</p>
                    <p>Creator:  {creatorName}</p>
                    {activities.map(({ id, name, description, duration, count }) =>
                        <div key={id}>
                            <h4>Activity:  {name}</h4>
                            <p>Description:  {description}</p>
                            <p>Duration:  {duration}</p>
                            <p>Count:  {count}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Routines;
import React, { useEffect, useState } from 'react';
import { fetchMyRoutines, createNewRoutine, deleteRoutine, deleteRoutineActivity } from '../api/index.js';
import { Link } from 'react-router-dom';


const MyRoutines = ({ user }) => {

    const [routineList, setRoutineList] = useState([]);
    const [goal, setGoal] = useState('');
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);


    useEffect(() => {

        fetchMyRoutines(user).then(routines => {
            setRoutineList(routines)
        })
            .catch(error => {
            });
    }, [user]);



    const renderNotLoggedIn = () => {
        return <>
            <div>
                <h2>Please login to view your routines.</h2>
                <Link to='/login'>
                <button>Login</button>
                </Link>
            </div>
        </>
    }

    const deleteRoutineButton = (id, user) => {
        return <>
        <button onClick={() => deleteRoutine(id, user)}>Delete</button>
        </>
    }

    const deleteRoutineActivityButton = (id, user) => {
        return <>
        <button onClick={() => deleteRoutineActivity(id, user)}>Delete</button>
        </>
    }


    const submitNewRoutine = () => {
        if (user) {
          return <div id="submit-routine">
            <header>
              <h1>Create New Routine</h1>
            </header>
            <form id="submit" onSubmit={async (event) => {
              event.preventDefault();
              alert("Routine Created!");
              try {
                await createNewRoutine(user.token, name, goal, isPublic);
              } catch (error) {
                console.error(error);
              }
    
            }}>
              <label id="name-label">Name</label>
              <input
                id="routine-name"
                type="text"
                placeholder="enter name..."
                value={name}
                onChange={function (e) {
                  setName(e.target.value)
                }}
              />
              <label id="goal-label">Goal</label>
              <input
                id="routine-goal"
                type="text"
                placeholder="enter goal..."
                value={goal}
                onChange={function (e) {
                  setGoal(e.target.value)
                }}
              />
            <label id="isPublic-label">Public Routine</label>
            <input
                id="isPublic"
                type="checkbox"
                value={isPublic}
                onChange={function (e) {
                    setIsPublic(true)
                }}
            />
              <button id="submit-button">Submit</button>
            </form>
          </div>
        } else {
          return null;
        }
      }



    if(user === null) {
        return <>
            {renderNotLoggedIn()}
        </>
    }
    console.log(user);
    return (
      
        <div className="activities">
            {submitNewRoutine()}
            <h1>My Routines</h1>
            {routineList.map(({ id, name, goal, creatorName, activities }) => (
                <div key={id} className="post">
                    <h3>Routine:  {name}</h3>
                    <p>Goal:  {goal}</p>
                    <p>Creator:  {creatorName}</p>
                    {deleteRoutineButton(id, user)}
                    {activities.map(({id, name, description, duration, count}) =>
                        <div key={id}>
                            <h4>Activity:  {name}</h4>
                            <p>Description:  {description}</p>
                            <p>Duration:  {duration}</p>
                            <p>Count:  {count}</p>
                            {deleteRoutineActivityButton(id, user)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

}

export default MyRoutines;
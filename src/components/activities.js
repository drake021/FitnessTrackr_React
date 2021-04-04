import React, { useEffect, useState } from 'react';
import { fetchActivities, createNewActivity } from '../api/index.js';

const Activities = ({ user }) => {
  const [ActivityList, setActivityList] = useState([]);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchActivities().then(activities => {
        setActivityList(activities)
      })
      .catch(error => {
      });
  }, []);

  const submitNewActivity = () => {
    if (user) {
      return <div id="submit-activity">
        <header>
          <h1>Create New Activity</h1>
        </header>
        <form id="submit" onSubmit={async (event) => {
          event.preventDefault();
          alert("Activity Created!");
          try {
            await createNewActivity(user.token, name, description);
          } catch (error) {
            console.error(error);
          }

        }}>
          <label id="name-label">Name</label>
          <input
            id="activity-title"
            type="text"
            placeholder="enter name..."
            value={name}
            onChange={function (e) {
              setName(e.target.value)
            }}
          />
          <label id="description-label">Description</label>
          <input
            id="actiity-description"
            type="text"
            placeholder="enter description..."
            value={description}
            onChange={function (e) {
              setDescription(e.target.value)
            }}
          />
          <button id="submit-button">Submit</button>
        </form>
      </div>
    } else {
      return null;
    }
  }
  return (
    <div className="activities">
      <h1>Activities</h1>
      {submitNewActivity()}
      {ActivityList.map(({ id, name, description }) => (
        <div key={id} className="post">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default Activities;
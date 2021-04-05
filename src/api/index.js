const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

//Login/Logout/Register

async function fetchRegister(username, password) {
    console.log("LOOK HEREERERE", username, password)
    return await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(console.error);
}

async function fetchLogin(username, password) {
    return await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(console.error)
}

async function fetchMe(token) {
    return await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(console.error)
}

//Routines

async function fetchRoutines() {
    try {
        const response = await fetch(`${BASE_URL}/routines`)
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const createNewRoutine = async (token, name, goal, isPublic) => {
    const resp = await fetch(`${BASE_URL}/routines`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        }
    );
    return await resp.json();
};

//My Routines


const fetchMyRoutines = async (user) => {
    const resp = await fetch(`${BASE_URL}/users/${user.username}/routines`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
        }
    );
    return await resp.json();
};


const deleteRoutine = async (id, user) => {

    await fetch(`${BASE_URL}/routines/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Routine Has Been Deleted');

        })
        .catch(console.error);
}

const deleteRoutineActivity = async (id, user) => {

    await fetch(`${BASE_URL}/routine_activities/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Routine Activity Has Been Deleted');

        })
        .catch(console.error);
}

const editRoutine = async (id, user, name, goal) => {
    await fetch(`${BASE_URL}/routines/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user.token
        },
        body: JSON.stringify({
            name: name,
            goal: goal
        })
    }).then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Routine has been edited');
        })
        .catch(console.error);
}






//Activities

async function fetchActivities() {
    try {
        const response = await fetch(`${BASE_URL}/activities`)
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const createNewActivity = async (token, name, description) => {
    const resp = await fetch(`${BASE_URL}/activities`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name,
                description
            })
        }
    );
    return await resp.json();
};



export {
    fetchActivities,
    createNewActivity,
    fetchRoutines,
    deleteRoutine,
    deleteRoutineActivity,
    createNewRoutine,
    editRoutine,
    fetchMyRoutines,
    fetchRegister,
    fetchLogin,
    fetchMe
};
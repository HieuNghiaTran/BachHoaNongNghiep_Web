const addSession = (data) => {

    return {
        type: 'ADD_SESSION',
        data
    }
    

}
const deleteSession = (data) => {

    return {
        type: 'DELETE_SESSION',
        data
    }

}

export  { addSession, deleteSession }
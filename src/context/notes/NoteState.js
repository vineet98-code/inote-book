import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:4000"
    const notesIntial = []
    const [notes, setNotes] = useState(notesIntial)

    // Add a new note
    const addNote = async (title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM4Mzg4ZGNlMGVjNTgwY2EzMzc3M2EiLCJlbWFpbCI6InZpbmVldDk4bG92ZUBnbWFpbC5jb20iLCJpYXQiOjE2NDA1MzI4Mjh9.u-iryUO8wBQ4d161Ruh9SG_d_lHfbxHXjnRVLio1aDQ"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        
       setNotes(notes.concat(note));
    }

    // Get all notes
    const getNotes = async () => {
        // Api call
        const response = await fetch(`${host}/api/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM4Mzg4ZGNlMGVjNTgwY2EzMzc3M2EiLCJlbWFpbCI6InZpbmVldDk4bG92ZUBnbWFpbC5jb20iLCJpYXQiOjE2NDA1MzI4Mjh9.u-iryUO8wBQ4d161Ruh9SG_d_lHfbxHXjnRVLio1aDQ"
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(notes);
    }

    // Delete a note
    const deleteNote = async (id) => {
        // Api call to edit note
        const response = await fetch(`${host}/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM4Mzg4ZGNlMGVjNTgwY2EzMzc3M2EiLCJlbWFpbCI6InZpbmVldDk4bG92ZUBnbWFpbC5jb20iLCJpYXQiOjE2NDA1MzI4Mjh9.u-iryUO8wBQ4d161Ruh9SG_d_lHfbxHXjnRVLio1aDQ"
            },

        });
        const json = await response.json();
        console.log(json);

        console.log("delete note" + id);
        const newNotes = notes.filter((note) => note._id !== id)
        setNotes(newNotes);

    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // Api call to edit note
        const response = await fetch(`${host}/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWM4Mzg4ZGNlMGVjNTgwY2EzMzc3M2EiLCJlbWFpbCI6InZpbmVldDk4bG92ZUBnbWFpbC5jb20iLCJpYXQiOjE2NDA1MzI4Mjh9.u-iryUO8wBQ4d161Ruh9SG_d_lHfbxHXjnRVLio1aDQ"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit a note
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        // setNotes(newNotes);
        setNotes(notes.concat(newNotes));
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
import React, { useState } from "react";
import notecontext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);
  // get  all  Note
  const getnotes = async () => {
    // todo api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(), // body data type must match "Content-Type" header
    });

    // parses JSON response into native JavaScript objects
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  // Add a Note
  const addnote = async (title, description, tag) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    // parses JSON response into native JavaScript objects
    const note = await response.json();
    setnotes(notes.concat(note));
    console.log("new note added");

    setnotes([...notes, note]);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    console.log("deleting note with id " + id);
    const newnotes = notes.filter((note) => note._id !== id);
    setnotes(newnotes);
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const json = response.json();
    console.log(json); // parses JSON response into native JavaScript objects

    // logic to edit in client
    setnotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title,
            description,
            tag,
          };
        } else {
          return note;
        }
      })
    );
  };

  return (
    <notecontext.Provider
      value={{ notes, addnote, deleteNote, editNote, getnotes }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default NoteState;

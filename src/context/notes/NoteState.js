import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "627bebbc6008c5557056410f2",
      "user": "627a7ca762486b365ed51035",
      "title": "my title",
      "description": "plz wake up early at 6:30",
      "tag": "personal",
      "date": "2022-05-11T17:00:44.162Z",
      "__v": 0
    },
    {
      "_id": "627bebbd600285557056410f4",
      "user": "627a7ca762486b365ed51035",
      "title": "my title",
      "description": "plz wake up early at 6:30",
      "tag": "personal",
      "date": "2022-05-11T17:00:45.924Z",
      "__v": 0
        
    },
    {
      "_id": "627bebbc6200285557056410f2",
      "user": "627a7ca762486b365ed51035",
      "title": "my title",
      "description": "plz wake up early at 6:30",
      "tag": "personal",
      "date": "2022-05-11T17:00:44.162Z",
      "__v": 0
    },
    {
      "_id": "627bebbd600855573056410f4",
      "user": "627a7ca762486b365ed51035",
      "title": "my title",
      "description": "plz wake up early at 6:30",
      "tag": "personal",
      "date": "2022-05-11T17:00:45.924Z",
      "__v": 0
          
    },
    {
      "_id": "627bebbd600853557056410f4",
      "user": "627a7ca762486b365ed51035",
      "title": "my title",
      "description": "plz wake up early at 6:30",
      "tag": "personal",
      "date": "2022-05-11T17:00:45.924Z",
      "__v": 0
          
    },
    {
      "_id": "627bebbd6300853557056410f4",
      "user": "627a7ca762486b365ed51035",
      "title": "my title",
      "description": "plz wake up early at 6:30",
      "tag": "personal",
      "date": "2022-05-11T17:00:45.924Z",
      "__v": 0
          
    }
  ]
  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title, description, tag) => {
    //TODO :API call
    console.log("Adding a new note")
    const note = {
      "_id": "627bebbd6300853557056410f4",
      "user": "627a7ca762486b365ed51035",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-05-11T17:00:45.924Z",
      "__v": 0
    
    };
    setNotes(notes.concat(note))
  };

  //Edit a note
  const editNote = (id,title,description,tag) => {
    
  };

  //Delete a note
  const deleteNote = (id) => {
    //ToDO api call
    console.log("deleting is completed " + id);
    const newNotes = notes.filter((note) => {return note._id!==id})
    setNotes(newNotes)
  }

    return (
        <NoteContext.Provider value={{ notes, setNotes ,addNote,editNote,deleteNote}} >
           {props.children}
        </NoteContext.Provider>
    )
    
}

export default NoteState;
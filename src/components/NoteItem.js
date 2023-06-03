import React from "react";
import { useContext } from "react";
import NoteContext from "../context/Notes/NotesContext";
export default function NoteItem(props) {
    const {deleteNote}=useContext(NoteContext);
  const { notes, updateNote } = props;
  return ( 
    <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{notes.title}</h5>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
                    updateNote(notes);
                }}></i>
            </div>
            <p className="card-text">{notes.discription}</p>
          </div>
        </div>
    </div>
  );
}

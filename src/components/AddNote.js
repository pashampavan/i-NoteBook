import React,{useContext,useState} from 'react'
import NoteContext from "../context/Notes/NotesContext";
export default function AddNote() {
const context=useContext(NoteContext);
const {AddNote}=context;
const [note, setNote]=useState({title:"",tag:"",discription:""});
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
    e.preventDefault();
    AddNote(note.title,note.discription,note.tag)
    setNote({title:"",tag:"",discription:""})
}
  return (
    <div className='container'>
        <h2>Add notes</h2>
        <form onSubmit={handleClick} className="my-3 " >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              discription
            </label>
            <input
              type="text"
              className="form-control"
              id="discription"
              name='discription'
              value={note.discription}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length < 5 || note.discription.length < 5} type="submit"  className="btn btn-primary">
            Add note
          </button>
        </form>
        <h2>Your notes</h2>
    </div>
  )
}

import React, { useContext, useEffect, useRef ,useState} from "react";
import NoteContext from "../context/Notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useHistory } from "react-router-dom";
export default function Notes() {
    const { notes, getAllNotes ,editNote} = useContext(NoteContext);
    const history=useHistory();
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getAllNotes();
        }
        else{
            history.push("/login")
        }
        // bhbb
    }, []);
    const [note, setNote]=useState({etitle:"",etag:"default",ediscription:"",etag:"",eid:""});
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({etitle:currentNote.title, ediscription:currentNote.discription, etag:currentNote.tag,eid:currentNote._id})
    };
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleOnClick=(e)=>{
        refClose.current.click();
        editNote(note.etitle,note.ediscription,note.etag,note.eid);
    }
    return (
        <>
            <div className="row my-3">
                <AddNote />
                <button
                    type="button"
                    style={{ display: "none" }}
                    ref={ref}
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Launch demo modal
                </button>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Modal title
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3 " action="/">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            name="etitle"
                                            value={note.etitle}
                                            aria-describedby="emailHelp"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="exampleInputPassword1"
                                            className="form-label"
                                        >
                                            discription
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ediscription"
                                            name="ediscription"
                                            value={note.ediscription}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="exampleInputPassword1"
                                            className="form-label"
                                        >
                                            Tag
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etag"
                                            name="etag"
                                            value={note.etag}
                                            onChange={onChange}
                                        />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    ref={refClose}
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button disabled={note.etitle.length < 5 || note.ediscription.length < 5} type="button" onClick={handleOnClick} className="btn btn-primary">
                                    Update notes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-2"> 

                {notes.length===0 &&  "no notes to display"}
                </div>
                {notes.map((note) => {
                    return (
                        <NoteItem key={note._id} notes={note} updateNote={updateNote} />
                    );
                })}
            </div>
        </>
    );
}

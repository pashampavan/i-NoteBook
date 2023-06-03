import NoteContext from "./NotesContext";
import { useState} from "react";
// import { useState } from "react";
const NoteState=(props)=>{
    const n=[];
      const [notes, setNotes]=useState(n);
      const [auth,setAuth]=useState("")
      const [alert,setAlert]=useState("iji");
      

      const getAllNotes=async ()=>{
        const response = await fetch("http://localhost:5000/api/notes/getallnotes", {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json=await response.json();
        setNotes(json)
      }
      const AddNote=async (title,discription,tag)=>{

        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
          body:JSON.stringify({"title":title,"discription":discription,"tag":tag})
        });
        const json=await response.json();
        setNotes(notes.concat(json.notes));
      }
      const editNote=async (title,discription,tag,id)=>{

        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body:JSON.stringify({"title":title,"discription":discription,"tag":tag})
        });
        const json=await response.json();
        console.log(json)
        let temp=[];
        let i=0;
        for(i=0;i < notes.length; i++)
        {
          let el=notes[i];
          if(el._id===id)
          {
            el.title=title;
            el.discription=discription;
            el.tag=tag;
          }
          temp.push(el);
        }
        setNotes(temp);
      }
      const deleteNote=async (id)=>{


        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json=await response.json();
        console.log(json)
        const newNote=notes.filter((Element)=>{return Element._id!==id});
        setNotes(newNote);
      }
        return(
            <NoteContext.Provider value={{notes,alert,AddNote,deleteNote,getAllNotes,editNote,auth,setAuth}}>
                    {props.children}
            </NoteContext.Provider>
        )
}

export default NoteState;
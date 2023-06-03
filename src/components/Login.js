import React,{useState,useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import NoteContext from '../context/Notes/NotesContext';
export default function Login(props){
    const history=useHistory();
    const [credentials,setCredentials]=useState({email:"",password:""});
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        localStorage.removeItem('token')
    },[])
    const handleClick=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({"email":credentials.email,"password":credentials.password})
          });
          const json=await response.json();
        //   console.log(json)
          if(json.success)
          {
            localStorage.setItem("token",json.authtoken);
            console.log("auth is-"+localStorage.getItem('token'))
            history.push("/")
            props.showAlert("success","successfully loged in")
          }
          else{
            props.showAlert("danger","error in log in")
          }

    }
    return (
        <div>
            <form onSubmit={handleClick} action="/login">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email"  value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password}  onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

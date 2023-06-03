import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
export default function Signup(props) {
    const history=useHistory();
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleClick=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({"name":credentials.name, "email":credentials.email,"password":credentials.password})
          });
          const json=await response.json();
          console.log(json)
          if(json.success)
          {
            // localStorage.setItem("token",json.authtoken)
            history.push("/login")
            props.showAlert("success","successfully signedup")
          }
          else{
            alert("User allready exists")
            props.showAlert("danger","error in signup")
          }

    }

  return (
    <div>
      <div>
            <form  onSubmit={handleClick} action="/login">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="email"  value={credentials.name} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email"  value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password}  minLength={5} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" value={credentials.cpassword}  minLength={5} required onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    </div>
  )
}

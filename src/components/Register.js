import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service";

const Register = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [message, setMessage] = useState("")

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleRegister = () => {
        AuthService
        .register(username, email, password, role)
        .then(()=> {
            window.alert("Registration Succeeds. You are now redirected to the login page.")
            navigate("/login")
        }).catch(err=>{
            console.log(err.response);
            setMessage(err.response.data)
        })
    }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {
            message && (
                <div className="alert alert-danger" role="alert">{message}</div>
            )
        }
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" onChange={handleChangeUsername}/>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" className="form-control" id="email" onChange={handleChangeEmail}/>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleChangePassword}/>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">role</label>
          <input type="text" className="form-control" id="role" onChange={handleChangeRole}/>
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleRegister}>
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register
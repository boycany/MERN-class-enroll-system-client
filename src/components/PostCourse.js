import { useState } from "react"
import { useNavigate } from "react-router-dom"
import courseService from "../services/course.service"
import LoginReminder from "./LoginReminder"

const PostCourse = ({ currentUser, setCurrentUser }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()
    const postCourse = () => {
        courseService.post(title, description, price).then(()=>{
            window.alert("New course has been created.")
            navigate("/course")
        }).catch(err=>{
            console.log(err.response);
            setMessage(err.response.data)
        })
    }

    return (
        <div style={{ padding: "3rem" }}>
            {
                !currentUser && (
                   <LoginReminder navigate={navigate} note={"posting a new course"}/>
                )
            }
            {
                currentUser && currentUser.user.role !== "instructor" && (
                    <h1>Only instructor can post new courses.</h1>
                )
            }
            {
                currentUser && currentUser.user.role === "instructor" && (
                    <div className="from-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" 
                                name="title" 
                                className="form-control" 
                                id="title" 
                                onChange={(e)=>setTitle(e.target.value)}
                        />
                        <br />
                        <label htmlFor="content">Content</label>
                        <textarea id="content" 
                                    className="form-control" 
                                    name="content"
                                    onChange={(e)=>setDescription(e.target.value)}
                        />
                        <br />
                        <label htmlFor="price">Price</label>
                        <input type="number" 
                            className="form-control" 
                            id="price" 
                            name="price"
                            onChange={(e)=>{setPrice(e.target.value)}}
                            />
                        <br />
                        <button className="btn btn-primary" onClick={postCourse}>Submit</button>
                        <br /><br />
                        {
                            message && (
                                <div className="alert alert-warning" role="alert">{message}</div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default PostCourse
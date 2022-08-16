import { useState } from "react"
import { useNavigate } from "react-router-dom"
import courseService from "../services/course.service"
import LoginReminder from "./LoginReminder"

const Enroll = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [result, setResult] = useState(null)

    const handleSearch = () => {
        courseService.getCourseByName(input)   
                     .then(response=>{
                        console.log('response :>> ', response);
                        setResult(response.data)
                     }).catch(err=>{
                        console.log(err);
                     })
    }    
    const handleEnroll = (e) => {
        // console.log(e.target.id);
        courseService
        .enroll(e.target.id, currentUser.user._id)
        .then(response=>{
            console.log('enroll  :>> ', response);
            window.alert("Done Enrollment")
            navigate("/course")
        }).catch(err=>{
            console.log(err);
        })
    }
    
    return (
        <div style={{ padding: "3rem" }}>
            {
                !currentUser && (
                   <LoginReminder navigate={navigate} note={"searching for courses"}/>
                )
            }
            {
                currentUser && currentUser.user.role !== "student" && (
                    <h1>Only student can enroll in courses.</h1>
                )
            }
            {
                currentUser && currentUser.user.role === "student" && (
                    <div className="search input-group mb-3">
                        <input type="text" className="form-control" onChange={(e)=>{ setInput(e.target.value) }} />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                )
            }
            {
                currentUser && result && result.length > 0 && (
                    <div>
                        <p>Data we got back from API.</p>
                        {
                            result.map(course=>{
                                return (
                                    <div className="card" style={{ width: "18rem" }} key={course._id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <p className="card-text">{course.description}</p>
                                            <p className="card-text">Price: {course.price}</p>
                                            <p className="card-text">Students: {course.students.length}</p>
                                            <a href="#" className="btn btn-secondary" onClick={handleEnroll} id={course._id}>Enroll</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Enroll
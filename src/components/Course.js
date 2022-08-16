import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import courseService from "../services/course.service"
import LoginReminder from "./LoginReminder"

const Course = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate()
    const [courseData, setCourseData] = useState(null)

    useEffect(()=>{
        console.log("useEffect working...");
        let _id
        if(currentUser){
            _id = currentUser.user._id
        }else{
            _id = ""
        }

        if(currentUser.user.role === "instructor"){
            courseService
            .get(_id)
            .then(response=>{
                setCourseData(response.data)
            }).catch(err=>{
                console.log(err);
            })
        }else if(currentUser.user.role === "student"){
            courseService
            .getEnrolledCourses(_id)
            .then(response=>{
                console.log("enroll response: >> ", response);
                setCourseData(response.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    }, [])
    
    return (
        <div style={{ padding: "3rem" }}>
            {
                !currentUser && (
                    <LoginReminder navigate={navigate} note={"seeing your courses."}/>
                ) 
            }
            {
                currentUser && currentUser.user.role === "instructor" && (
                    <div>
                        <h1>Instructor's Course Page</h1>
                    </div>
                )
            }
            {
                currentUser && currentUser.user.role === "student" && (
                    <div>
                        <h1>Student's Course Page</h1>
                    </div>
                )
            }
            {
                currentUser && courseData && courseData.length !== 0 && (
                    <div>
                        <p>Course data from server:</p>
                        {
                            courseData.map(course => {
                                return (
                                    <div className="card" style={{ width: "18rem" }} key={course._id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <p className="card-text">{course.description}</p>
                                            <p className="card-text">Student Count: {course.students.length}</p>
                                            <button className="btn btn-primary">{course.price}</button>
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

export default Course
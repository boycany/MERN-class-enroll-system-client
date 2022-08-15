import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import courseService from "../services/course.service"

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
        courseService.get(_id).then(response=>{
            console.log('response :>> ', response.data);
            setCourseData(response.data)
        }).catch(err=>{
            console.log(err);
        })
    }, [])
    
    return (
        <div style={{ padding: "3rem" }}>
            {
                !currentUser && (
                    <div>
                        <h3>You must login before seeing your courses</h3>
                        <button 
                            onClick={()=> navigate("/login")}
                            className="btn btn-secondary btn-md"
                        >
                                Take me to login page 
                        </button>
                    </div>   
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
            {
                currentUser && currentUser.user.role === "student" && (
                    <div>
                        <h1>Student's Course Page</h1>
                    </div>
                )
            }
        </div>
    )
}

export default Course
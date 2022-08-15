import { useNavigate } from "react-router-dom"

const Course = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate()
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
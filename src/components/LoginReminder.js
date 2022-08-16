const LoginReminder = ({navigate, note}) => {
    return (
        <div>
            <p>You must login before ${note}</p>
            <button 
                onClick={()=> navigate("/login")}
                className="btn btn-secondary btn-md"
            >
                    Take me to login page 
            </button>
        </div>
    )
}

export default LoginReminder
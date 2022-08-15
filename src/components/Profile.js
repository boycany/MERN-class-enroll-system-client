
const Profile = ({currentUser, setCurrentUser}) => {

    return (
        <div style={{ padding: "3rem" }}>
            {
                !currentUser 
                ? <h1>You must login before getting your profile.</h1>
                : <div>
                    <h1>Profile</h1>
                    <header className="jumbotron">
                        <h3><strong>{currentUser.user.username}</strong></h3>
                    </header>
                    <p>
                        <strong>ID: {currentUser.user._id}</strong>
                    </p>
                    <p>
                        <strong>E-mail: {currentUser.user.email}</strong>
                    </p>
                </div>
            }
        </div>
    )
}

export default Profile
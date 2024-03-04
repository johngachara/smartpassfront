import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";



export default function ViewUser() {
    const {userId} = useParams();
    const [userInfo, setUserInfo] = useState(null)
    const [userData,setUserData] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8000/api/user/${userId}`).then(
            (res) => {
                res.json().then(
                    (data) => {

                        const photoData = data.user_photo_data
                        const user_data = data.user_data
                        setUserData(user_data)

                        setUserInfo(photoData)
                    }
                )
            }
        )
    }, [userId])


    function Nav() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a href="#" className="navbar-brand">
                            KCA SMART PASS
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/'>Activate</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    return <div>
        <Nav />
        <div className="container mt-5">
        <h2>User Information</h2>
        {userInfo ? (
            <div className="card mt-3">
                <img src={`http://localhost:8000${userInfo.photo}`} className="card-img-top" alt="Identification Card"/>
                <div className="card-body">
                    <h5 className="card-title">Username: {userData.username}</h5>
                    <p className="card-text">{userData.first_name}</p>
                    <p className="card-text">{userData.last_name}</p>
                    <p className="card-text">{userData.email}</p>
                    <button className="btn btn-primary">Activate</button>
                </div>
            </div>

        ) : (
            <p>Loading user information...</p>
        )}
    </div>
    </div>
}
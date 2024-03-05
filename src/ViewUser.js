import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav } from "./Inactive";

export default function ViewUser() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [activateMessage, setActivateMessage] = useState("");
  const [activateDisabled, setActivateDisabled] = useState(false);
  const [declineDisabled, setDeclineDisabled] = useState(false);

  const activateButton = () => {
    fetch(`http://127.0.0.1:8000/api/activate/${userId}`, {
      method: "PUT",
    }).then((res) => {
      setActivateDisabled(true);
      setDeclineDisabled(true);
      setActivateMessage("User activated successfully!");
      window.location.href = "https://9rpknf-3000.csb.app/";
    });
  };

  const deactivateButton = () => {
    fetch(`http://127.0.0.1:8000/api/deactivate/${userId}`, {
      method: "DELETE",
    }).then((res) => {
      setActivateMessage("User deleted successfully!");
      window.location.href = "https://9rpknf-3000.csb.app/";
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${userId}`).then((res) => {
      res.json().then((data) => {
        const photoData = data.user_photo_data;
        const user_data = data.user_data;
        setUserData(user_data);
        setUserInfo(photoData);
      });
    });
  }, [userId]);

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h2>User Information</h2>
        {activateMessage && (
          <p className="alert alert-success">{activateMessage}</p>
        )}
        {userInfo ? (
          <div className="card mt-3">
            <img
              src={`http://127.0.0.1:8000${userInfo.photo}`}
              className="card-img-top"
              alt="Identification Card"
            />
            <div className="card-body">
              <h5 className="card-title">Username: {userData.username}</h5>
              <p className="card-text">{userData.first_name}</p>
              <p className="card-text">{userData.last_name}</p>
              <p className="card-text">{userData.email}</p>
              <button
                onClick={activateButton}
                disabled={activateDisabled}
                className="btn btn-primary"
              >
                Activate
              </button>
              <button
                style={{ marginLeft: 10 }}
                onClick={deactivateButton}
                disabled={declineDisabled}
                className="btn btn-danger"
              >
                Decline
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
}

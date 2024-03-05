import { useParams } from "react-router-dom";
import { Nav } from "./Inactive";
import { useEffect, useState } from "react";

export default function User() {
  const { user_id } = useParams();
  const [active_user_data, setActiveUserData] = useState([]);
  const [userInformation, setUserinformation] = useState([]);
  const [showActivate, setShowActivate] = useState(true);
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [activateMessage, setActivateMessage] = useState("");

  const activateButton = () => {
    fetch(`http://127.0.0.1:8000/api/activate/${user_id}`, {
      method: "PUT",
    }).then((res) => {
      console.log(res);
      setActivateMessage("User activated successfully!");
      setShowActivate(true);
      setShowDeactivate(false);
    });
  };

  const deactivateButton = () => {
    fetch(`http://127.0.0.1:8000/api/deactivate2/${user_id}`, {
      method: "PUT",
    }).then((res) => {
      console.log(res);
      setActivateMessage("User deactivated successfully!");
      setShowActivate(false);
      setShowDeactivate(true);
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setActiveUserData(data.user_data);
        setUserinformation(data.user_photo_data);
      });
  }, [user_id]);

  return (
    <div>
      <Nav />
      {activateMessage && (
        <p className="alert alert-success" role="alert" aria-live="assertive">
          {activateMessage}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </p>
      )}
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={`http://127.0.0.1:8000${userInformation.photo}`}
              className="d-block mx-lg-auto img-fluid"
              alt="User Photo"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              {active_user_data.username}'s Profile
            </h1>
            <p className="lead">
              {active_user_data.first_name} {active_user_data.last_name}
            </p>
            <p className="lead">Email: {active_user_data.email}</p>
            <button
              onClick={activateButton}
              disabled={showActivate}
              className="btn btn-primary btn-lg px-4 me-md-2"
            >
              Activate
            </button>
            <button
              style={{ marginLeft: 10 }}
              onClick={deactivateButton}
              disabled={showDeactivate}
              className="btn btn-danger btn-lg px-4"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

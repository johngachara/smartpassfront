import { useEffect, useState } from "react";
import { Nav } from "./Inactive";
import { Link } from "react-router-dom";

export default function Users() {
  const [actvatedUser, setActivatedUser] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/active").then((res) => {
      res.json().then((data) => {
        setActivatedUser(data.users);
      });
    });
  }, []);
  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h2>Active Users</h2>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {actvatedUser &&
              actvatedUser.map((i) => (
                <tr key={i.id}>
                  <td>
                    <Link to={{ pathname: `/active/${i.id}` }}>
                      {i.first_name}
                    </Link>
                  </td>
                  <td>{i.last_name}</td>
                  <td>{i.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

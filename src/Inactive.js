import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Smart() {
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


    // Example content sections
    function ActivateUsers() {
        const [user, setUser] = useState([]);
        useEffect(() => {
            fetch("http://127.0.0.1:8000/api/inactive").then((res) =>
                res.json().then((data) => {
                    console.log(data.data);
                    setUser(data.data);
                }),
            );
        }, []);
        return (
            <div className="container mt-5">
                <h2>User Activation Page</h2>
                <table className="table mt-3">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user
                        ? user.map((i) => (
                            <tr key={i.id}>
                                <td><Link to={{pathname:`user/${i.id}`}}>{i.first_name}</Link></td>
                                <td>{i.last_name}</td>
                                <td>{i.email}</td>
                            </tr>
                        ))
                        : "No Inactive Users"}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <Nav />
            <ActivateUsers />
        </div>
    );
}

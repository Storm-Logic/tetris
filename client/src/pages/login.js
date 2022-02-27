import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handle = () => {
        axios.post("http://localhost:5000/api/auth/login", {
            userName: username,
            password: password
        }).then(res => {
            const user = res.data.user;
            console.log(user);
            localStorage.setItem("id", user.userName);
            console.log(localStorage.getItem("id"));
            navigate("/lobby");
        }) .catch( err => {
            console.error(err);
        });

        // localStorage.setItem("token", res.data.token);
        // alert("Login successful");
    };

    return (
        <div>
            <input placeholder = "Username"  onChange={(e) => setUsername(e.target.value)} />
            <input placeholder = "Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handle}>Login</button>
            <div>Don’t have an account?
                <Link to="/signup">Go to Sign Up</Link>
            </div>
        </div>


    )
};
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Logup() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handle = () => {
        axios.post("http://localhost:8000/api/auth/signup", {
            email,
            password
        }).then(res => {
            console.log(res.data);
            navigate("/");
        });

    };
    return (
        <div>
            <div>wwww</div>
            <input placeholder = "email"  onChange={(e) => setemail(e.target.value)} />
            <input placeholder = "Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handle}>Logup</button>
            <div>
                Already have an account?
                <Link to="/login">Go to Login</Link>
            </div>
        </div>
    )
}
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/App.css'
import logo from '../assets/logo.png'

function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const API_URL = import.meta.env.VITE_API_URL || '';

    const registerUser = async () => {

        try {

            const res = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await res.json()

            if (data.message) {

                alert('Registration successful')

                navigate('/')

            } else {

                alert(data.error)

            }

        } catch (error) {

            console.error(error)
            alert('Server error')

        }

    }

    return (

        <div className="auth-page">

            <div className="glass-card">

                {/* BRAND HEADER */}
                <div className="auth-brand">
                    <img src={logo} className="auth-logo" />
                    <h1>ConceptClarity</h1>
                    <p className="auth-subtitle">AI-powered learning assistant</p>
                </div>

                <h3>Register</h3>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={registerUser}>
                    Register
                </button>

                <p className="switch-text">
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>

            </div>

        </div>

    )
}

export default Register
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/App.css'
import logo from '../assets/logo.png'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const API_URL = import.meta.env.VITE_API_URL || '';

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            setTimeout(() => {
                navigate('/dashboard')
            }, 100)
        }

    }, [navigate])

    const loginUser = async () => {

        try {

            const res = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await res.json()

            if (data.token) {

                localStorage.setItem('token', data.token)

                navigate('/dashboard')

            } else {

                alert(data.error || "Login failed")

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

                <h3>Login</h3>

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

                <button onClick={loginUser}>
                    Login
                </button>

                <p className="switch-text">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </div>

        </div>

    )
}

export default Login
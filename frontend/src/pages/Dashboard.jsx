import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import '../styles/App.css'
import ReactMarkdown from 'react-markdown'
import logo from '../assets/logo.png'

function Dashboard() {

    const navigate = useNavigate()

    // ---------------- STATE ----------------
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [level, setLevel] = useState('Beginner')
    const [type, setType] = useState('Definition')
    const [currentSession, setCurrentSession] = useState([])
    const [showScrollBtn, setShowScrollBtn] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL || '';
    

    const chatEndRef = useRef(null)

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target

        const isNotAtBottom = scrollTop + clientHeight < scrollHeight - 100
        setShowScrollBtn(isNotAtBottom)
    }
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const newChat = () => {
        setMessages([]);
    };
    // ---------------- AUTH ----------------
    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/')
    }, [navigate])

    // ---------------- AUTO SCROLL ----------------
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    // ---------------- LOAD HISTORY ----------------
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('${API_URL}/api/history', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await res.json()

                if (Array.isArray(data)) {
                    setHistory(data.reverse())
                } else {
                    setHistory([])
                }
            } catch {
                setHistory([])
            }
        }

        fetchHistory()
    }, [])

    // ---------------- SEND MESSAGE ----------------
    const sendMessage = async () => {

        if (!input.trim()) return

        const text = input
        setInput('')

        setMessages(prev => [...prev, { role: 'user', text }])
        setLoading(true)

        try {
            const res = await fetch('${API_URL}/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    concept: text,
                    level,
                    type
                })
            })

            const data = await res.json()

            setMessages(prev => [
                ...prev,
                { role: 'ai', text: data.response }
            ])

            const updatedHistory = await fetch('${API_URL}/api/history', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const historyData = await updatedHistory.json()
            setHistory(historyData.reverse())

        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'ai', text: "Server error" }
            ])

            // 🔥 refresh history immediately
            const res2 = await fetch('${API_URL}/api/history', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const updated = await res2.json()
            setHistory(updated.reverse())

        }

        setLoading(false)
    }

    

    // ---------------- LOAD HISTORY ITEM ----------------
    const loadHistory = (item) => {
        setMessages([
            { role: 'user', text: item.concept },
            { role: 'ai', text: item.response }
        ])
    }

    // ---------------- LOGOUT ----------------
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="app">

            {/* SIDEBAR */}
            <div className="sidebar">

                <div className="brand-small">
                    <img src={logo} className="logo-small" />
                    <h3>ConceptClarity</h3>
                </div>

                <button className="new-chat-btn" onClick={newChat}>
                    + New Chat
                </button>

                <p className="sidebar-title">History</p>

                <div className="history-list">
                    {history.length === 0 && (
                        <p className="no-history">No history yet</p>
                    )}

                    {history.map((h, i) => (
                        <div
                            key={i}
                            className="history-item"
                            onClick={() => loadHistory(h)}
                        >
                            {h.prompt}
                        </div>
                    ))}
                </div>

            </div>

            {/* MAIN PANEL */}
            <div className="main">

                {/* TOP BAR */}
                <div className="top-bar">

                    <div className="brand">
                        <img src={logo} className="logo" />
                        <div>
                            <h1>ConceptClarity</h1>
                            <p className="subtitle">AI-powered learning assistant</p>
                        </div>
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>

                </div>

                {/* CONTROLS */}
                <div className="dropdowns">
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option>Definition</option>
                        <option>Detailed Explanation</option>
                        <option>Step-by-Step</option>
                    </select>
                </div>

                {/* CHAT */}
                <div className="chat-wrapper">

                    {showScrollBtn && (
                        <button className="scroll-bottom-btn" onClick={scrollToBottom}>
                            ↓
                        </button>
                    )}

                    <div className="chat-box">



                            {messages.map((m, i) => (
                                <div key={i} className={m.role === 'user' ? 'user-msg' : 'ai-msg'}>
                                    <div className="message-content">
                                        <ReactMarkdown>{m.text}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}

                            {loading && <div className="ai-msg">Thinking...</div>}

                            <div ref={chatEndRef} />
                        


                    </div>

                    {/* INPUT */}
                    <div className="input-bar">

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask a concept..."
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard
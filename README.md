# 🎓 ConceptClarity

<p align="center">
  <h3 align="center">AI-Powered Learning Platform</h3>
  <p align="center">
    Transform complex concepts into personalized explanations using the power of Generative AI.
  </p>
</p>

---

## 📖 Overview

ConceptClarity is a full-stack AI-powered educational platform designed to make learning easier by generating personalized explanations for any concept entered by the user.

The platform leverages Large Language Models (LLMs) through the **Groq API** to provide structured, context-aware responses tailored to different learning levels and explanation styles.

Built with a modern React frontend and a robust Flask backend, ConceptClarity offers secure authentication, persistent chat history, and a scalable architecture that delivers an engaging AI-assisted learning experience.

---

## ✨ Features

- 🤖 AI-powered concept explanations using Large Language Models (LLMs)
- 📚 Multiple explanation levels
  - Beginner
  - Intermediate
  - Advanced
- 📝 Multiple explanation styles
  - Definition
  - Detailed Explanation
  - Step-by-Step Learning
- 🔐 Secure JWT Authentication
- 💬 Persistent Chat History
- ⚡ RESTful API Architecture
- 🗄️ SQLite Database with SQLAlchemy ORM
- 🐳 Dockerized Deployment
- 🌐 Nginx Reverse Proxy
- 📱 Responsive React Frontend

---

# 🏗️ System Architecture

```text
                   User
                     │
                     ▼
            React + Vite Frontend
                     │
           HTTP REST API Requests
                     │
                     ▼
              Flask Backend API
                     │
          JWT Authentication Layer
                     │
       Prompt Engineering & AI Logic
                     │
                     ▼
        Groq Large Language Model
                     │
                     ▼
        AI Generated Explanation
                     │
                     ▼
     SQLite Database (Chat History)
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Python
- Flask
- Flask-CORS
- SQLAlchemy
- Flask-Bcrypt
- JWT Authentication

### Artificial Intelligence

- Groq API
- Large Language Models (LLMs)
- Prompt Engineering
- Generative AI

### Database

- SQLite
- SQLAlchemy ORM

### DevOps

- Docker
- Docker Compose
- Nginx

### Tools

- Git
- GitHub
- VS Code

---

# 🚀 How It Works

1. User registers or logs into the platform.
2. User enters any concept or topic they want to learn.
3. User selects the explanation level.
4. User chooses the explanation type.
5. The Flask backend generates an optimized prompt.
6. The prompt is sent to the Groq LLM.
7. The AI generates a structured explanation.
8. The response is displayed in the React frontend.
9. Conversations are securely stored for future reference.

---

# 📂 Project Structure

```text
ConceptClarity/
│
├── backend/
│   ├── app.py
│   ├── models/
│   ├── database.py
│   ├── routes/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Saifuddin04/ConceptClarity.git

cd ConceptClarity
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Run with Docker

```bash
docker compose up --build
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///conceptclarity.db
```

---

# 📷 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Dashboard
- AI Chat Interface
- Concept Explanation
- Chat History

---

# 🎯 Key Learning Outcomes

Through this project, I strengthened my practical knowledge of:

- Python Backend Development
- Flask REST API Development
- React Frontend Development
- JWT Authentication
- SQLAlchemy ORM
- AI API Integration
- Prompt Engineering
- Docker Containerization
- Full-Stack Development
- Database Design
- Software Architecture

---

# 🔮 Future Enhancements

- 🎤 Voice-assisted learning
- 📄 PDF document understanding
- 🖼️ Image-based concept explanation
- 🌍 Multi-language support
- 📝 AI-generated quizzes
- 📊 Personalized learning analytics
- 👨‍🏫 Teacher & Admin dashboards
- 📚 Retrieval-Augmented Generation (RAG)

---

# 🤝 Contributing

Contributions, suggestions, and feature requests are welcome.

Feel free to fork the repository, create a feature branch, and submit a pull request.

---

# 📄 License

This project was developed for educational purposes and portfolio demonstration.

---

# 👨‍💻 Developer

**Saifuddin Shariff**

Bachelor of Engineering – Computer Science and Design

📧 Email: saifuddinshariff176@gmail.com

💼 LinkedIn: https://www.linkedin.com/in/saifuddin-shariff-ba18b626a/

🐙 GitHub: https://github.com/Saifuddin04

---

⭐ If you found this project helpful, consider giving it a star!

from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os
from database import db
from models.user_model import User
from models.chat_model import ChatHistory
from flask_bcrypt import Bcrypt
import jwt
import datetime
from sqlalchemy import inspect
from functools import wraps

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///conceptclarity.db")
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "dev_secret_change_me")

db.init_app(app)
bcrypt = Bcrypt(app)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ---------------- JWT MIDDLEWARE ----------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'error': 'Token missing'}), 401

        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        try:
            data = jwt.decode(
                token,
                app.config['SECRET_KEY'],
                algorithms=['HS256']
            )

            current_user = User.query.get(data['user_id'])

            if not current_user:
                return jsonify({'error': 'User not found'}), 401

        except Exception as e:
            print("JWT ERROR:", str(e))
            return jsonify({'error': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# ---------------- HOME ----------------
@app.route('/')
def home():
    return {"message": "ConceptClarity Backend Running"}


# ---------------- GENERATE ----------------
@app.route('/api/generate', methods=['POST'])
@token_required
def generate_explanation(current_user):

    data = request.json
    concept = data.get('concept')
    level = data.get('level')
    explanation_type = data.get('type')

    prompt = f"""
You are ConceptClarity AI Tutor.

Concept: {concept}
Level: {level}
Type: {explanation_type}

Rules:
- Follow level strictly
- Use Markdown formatting
- Be structured and readable
"""

    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
        )

        response = chat_completion.choices[0].message.content

        # SAVE CHAT
        new_chat = ChatHistory(
            user_id=current_user.id,
            prompt=concept,
            response=response,
            level=level,
            type=explanation_type
        )

        db.session.add(new_chat)
        db.session.commit()

        return jsonify({"response": response})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# ---------------- REGISTER ----------------
@app.route('/api/register', methods=['POST'])
def register():

    data = request.json

    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(
        data.get('password')
    ).decode('utf-8')

    user = User(
        username=data.get('username'),
        email=data.get('email'),
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})


# ---------------- LOGIN ----------------
@app.route('/api/login', methods=['POST'])
def login():

    data = request.json

    user = User.query.filter_by(email=data.get('email')).first()

    if not user or not bcrypt.check_password_hash(user.password, data.get('password')):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "user_id": user.id,
            # 👇 THIS IS THE LINE THAT CHANGED 👇
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    return jsonify({
        "token": token,
        "message": "Login successful"
    })

# ---------------- HISTORY ----------------
@app.route('/api/history', methods=['GET'])
@token_required
def history(current_user):

    chats = ChatHistory.query.filter_by(user_id=current_user.id).order_by(ChatHistory.id.desc()).all()

    return jsonify([
        {
            "prompt": c.prompt,
            "response": c.response,
            "level": c.level,
            "type": c.type,
            "timestamp": c.timestamp
        }
        for c in chats
    ])


# ---------------- INIT DB ----------------
with app.app_context():
    db.create_all()
    print("TABLES CREATED:", inspect(db.engine).get_table_names())


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
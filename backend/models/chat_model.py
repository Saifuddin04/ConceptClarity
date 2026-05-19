from database import db
import datetime

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    prompt = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)

    level = db.Column(db.String(50))
    type = db.Column(db.String(50))

    timestamp = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow
    )
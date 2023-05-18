from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CompletionLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    completed_bars = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "completed_bars": self.completed_bars
        }
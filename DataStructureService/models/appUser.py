from flask_sqlalchemy import SQLAlchemy
from . import users_crawls, admins_crawls
from database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    owned_crawls = db.relationship("Crawl", secondary="admins_crawls", back_populates="admins")
    crawls = db.relationship("Crawl", secondary="users_crawls", back_populates="users")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
        }
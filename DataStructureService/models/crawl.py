from flask_sqlalchemy import SQLAlchemy
from . import crawls_bars, Bar
from database import db


class Crawl(db.Model):
    __tablename__ = 'crawl'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    location = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    bars = db.relationship(Bar, secondary="crawls_bars", back_populates="crawls")
    admins = db.relationship("User", secondary="admins_crawls", back_populates="owned_crawls")
    users = db.relationship("User", secondary="users_crawls", back_populates="crawls")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }
    
    def to_dict_with_bars(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "bars": [bar.to_dict() for bar in self.bars],
        }

    def to_dict_with_users(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "users": [user.to_dict() for user in self.users],
        }

    def to_dict_with_admins(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "admins": [admin.to_dict() for admin in self.admins],
        }

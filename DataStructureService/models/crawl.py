from flask_sqlalchemy import SQLAlchemy
from . import crawls_bars, Bar
from database import db


class Crawl(db.Model):
    __tablename__ = 'crawl'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    bars = db.relationship(Bar, secondary="crawls_bars", back_populates="crawls")
    admins = db.relationship("User", secondary="admins_crawls", back_populates="owned_crawls")
    users = db.relationship("User", secondary="users_crawls", back_populates="crawls")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "location": {
                "latitude": self.latitude,
                "longitude": self.longitude,
            },
        }
    
    def to_dict_with_bars(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "bars": [bar.to_dict() for bar in self.bars],
            "location": {
                "latitude": self.latitude,
                "longitude": self.longitude,
            },
        }

    def to_dict_with_users(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "users": [user.to_dict() for user in self.users],
            "location": {
                "latitude": self.latitude,
                "longitude": self.longitude,
            },
        }

    def to_dict_with_admins(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "admins": [admin.to_dict() for admin in self.admins],
            "location": {
                "latitude": self.latitude,
                "longitude": self.longitude,
            },
        }

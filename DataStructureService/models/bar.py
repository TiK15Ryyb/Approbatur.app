from flask_sqlalchemy import SQLAlchemy
from database import db


class Bar(db.Model):
    __tablename__ = 'bar'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    location = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Float, nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    crawls = db.relationship("Crawl", secondary="crawls_bars", back_populates="bars")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "rating": self.rating,
            "image_url": self.image_url,
        }

    def to_dict_with_crawl(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "rating": self.rating,
            "image_url": self.image_url,
            "crawl": self.crawl.to_dict(),
        }

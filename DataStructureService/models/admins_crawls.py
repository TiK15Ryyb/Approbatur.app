from flask_sqlalchemy import SQLAlchemy
from database import db

admins_crawls = db.Table('admins_crawls',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('crawl_id', db.Integer, db.ForeignKey('crawl.id'), primary_key=True)
)

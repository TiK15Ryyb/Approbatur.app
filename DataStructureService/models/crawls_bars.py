from flask_sqlalchemy import SQLAlchemy
from database import db

crawls_bars = db.Table('crawls_bars',
    db.Column('crawl_id', db.Integer, db.ForeignKey('crawl.id'), primary_key=True),
    db.Column('bar_id', db.Integer, db.ForeignKey('bar.id'), primary_key=True)
)

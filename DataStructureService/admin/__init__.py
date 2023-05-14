from flask_admin import Admin
from flask import Blueprint
from flask_admin.contrib.sqla import ModelView
import os

from models import Bar, Crawl, User

admin = Blueprint('barcrawls_admin', __name__)

def setup_admin(app, db):
    if os.getenv('SUBDOMAIN') is not None:
        admin = Admin(app, name='BarCrawls Admin', template_mode='bootstrap3', subdomain=os.getenv('SUBDOMAIN'))
    else:
        admin = Admin(app, name='BarCrawls Admin', template_mode='bootstrap3')
    # Set URL for admin views

    admin.add_view(ModelView(Bar, db.session))
    admin.add_view(ModelView(Crawl, db.session))
    admin.add_view(ModelView(User, db.session))

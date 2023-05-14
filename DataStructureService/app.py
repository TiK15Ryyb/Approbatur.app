import os
from flask import Flask
from flask_admin import Admin
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from geopy.geocoders import Nominatim
from config import Config
from database import db
from datasources import populate_palma_nova_bars

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI') # "postgresql://my-postgres:mysecretpassword@db:5432/approbator"
    app.config['SERVER_NAME'] = os.getenv('SERVER_NAME') # 'approbatur.app:5000'  # Flask needs to know the server name for subdomains

    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    with app.app_context():
        from admin import admin as admin_blueprint  # move imports here
        from main import main as main_blueprint
        from main import routes
        from admin import setup_admin

        app.register_blueprint(main_blueprint)
        app.register_blueprint(admin_blueprint)
        geolocator = Nominatim(user_agent="myGeocoder")

        # Set URL for admin views


        setup_admin(app, db)

        from models import Bar, Crawl, User, users_crawls, admins_crawls, crawls_bars

        db.create_all()

        populate_palma_nova_bars(db)

    return app

app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
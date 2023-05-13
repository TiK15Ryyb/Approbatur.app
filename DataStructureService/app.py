from flask import Flask
from flask_admin import Admin
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from geopy.geocoders import Nominatim
from config import Config
from database import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    with app.app_context():
        from admin import admin as admin_blueprint  # move imports here
        from main import main as main_blueprint
        from main import routes
        app.register_blueprint(main_blueprint)
        app.register_blueprint(admin_blueprint)
        geolocator = Nominatim(user_agent="myGeocoder")

        from models import Bar, Crawl, User, users_crawls, admins_crawls, crawls_bars

        db.create_all()
    
    return app

app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
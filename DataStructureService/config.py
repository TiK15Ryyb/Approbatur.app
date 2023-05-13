class Config(object):
    SQLALCHEMY_DATABASE_URI = "postgresql://my-postgres:mysecretpassword@db:5432/approbator"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'


from flask import request, jsonify, current_app as app
from flask_cors import cross_origin
from app import db
from models import Bar, Crawl, User

@app.route("/")
@cross_origin()
def hello():
    return "Hello, Approbator!"

@app.route("/initialize")
def initialize():
    # Init DB
    db.create_all()
    # Create a user
    user = User(
        name="John Doe",
        username="jdoe",
    )
    db.session.add(user)
    db.session.commit()
    # Create a bar
    bar = Bar(
        name="The Bar",
        description="A bar",
        latitude=0.0,
        longitude=0.0,
        rating=5,
        image_url="https://www.google.com",
    )
    db.session.add(bar)
    db.session.commit()
    # Create a crawl
    crawl = Crawl(
        name="The Crawl",
        description="A crawl",
        latitude=0.0,
        longitude=0.0,
        image_url="https://www.google.com",
    )
    db.session.add(crawl)
    db.session.commit()
    # Add bar to crawl
    crawl.bars.append(bar)
    db.session.commit()
    # Add user to crawl
    crawl.users.append(user)
    db.session.commit()
    # Add user as admin of crawl
    crawl.admins.append(user)
    db.session.commit()
    return "Initialized!"

@app.route("/api/bars", methods=["GET"])
def get_bars():
    bars = Bar.query.all()
    return jsonify([bar.to_dict() for bar in bars])

@app.route("/api/bars/<int:bar_id>", methods=["GET"])
def get_bar(bar_id):
    bar = Bar.query.get(bar_id)
    return jsonify(bar.to_dict())

@app.route("/api/bars", methods=["POST"])
def create_bar():
    data = request.json
    bar = Bar(
        name=data["name"],
        description=data["description"],
        latitude=data["latitude"],longitude=data["longitude"],
        rating=data["rating"],
        image_url=data["image_url"],
    )
    db.session.add(bar)
    db.session.commit()
    return jsonify(bar.to_dict()), 201

@app.route("/api/bars/<int:bar_id>", methods=["PUT"])
def update_bar(bar_id):
    data = request.json
    bar = Bar.query.get(bar_id)
    if not bar:
        return jsonify({"error": "Bar not found"}), 404
    bar.name = data["name"]
    bar.description = data["description"]
    bar.location = data["location"]
    bar.rating = data["rating"]
    bar.image_url = data["image_url"]
    db.session.commit()
    return jsonify(bar.to_dict())

@app.route("/api/bars/<int:bar_id>", methods=["DELETE"])
def delete_bar(bar_id):
    bar = Bar.query.get(bar_id)
    if not bar:
        return jsonify({"error": "Bar not found"}), 404
    db.session.delete(bar)
    db.session.commit()
    return jsonify(bar.to_dict())

@app.route("/api/crawls", methods=["GET"])
def get_crawls():
    params = request.args
    limit = params.get("limit") or 10
    crawls = Crawl.query.limit(int(limit)).all()
    expand = params.get("expand").split(",") if params.get("expand") else []
    return jsonify([{
        **crawl.to_dict(),
        "users": [user.to_dict() for user in crawl.users] if "users" in expand else None,
        "bars": [bar.to_dict() for bar in crawl.bars] if "bars" in expand else None,
        "admins": [admin.to_dict() for admin in crawl.admins] if "admins" in expand else None,
        } for crawl in crawls])

@app.route("/api/crawls/<int:crawl_id>", methods=["GET"])
@app.route("/")
def get_crawl(crawl_id):
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    params = request.args
    expand = params.get("expand").split(",") if params.get("expand") else []
    return jsonify({
        **crawl.to_dict(),
        "users": [user.to_dict() for user in crawl.users] if "users" in expand else None,
        "bars": [bar.to_dict() for bar in crawl.bars] if "bars" in expand else None,
        "admins": [admin.to_dict() for admin in crawl.admins] if "admins" in expand else None,
    })

@app.route("/api/crawls", methods=["POST"])
def create_crawl():
    data = request.json
    crawl = Crawl(
        name=data["name"],
        description=data["description"],
        latitude=data["latitude"],longitude=data["longitude"],
        image_url=data["image_url"],
    )
    db.session.add(crawl)
    db.session.commit()
    return jsonify(crawl.to_dict()), 201

@app.route("/api/crawls/<int:crawl_id>", methods=["PUT"])
def update_crawl(crawl_id):
    data = request.json
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    crawl.name = data["name"]
    crawl.description = data["description"]
    crawl.location = data["location"]
    crawl.image_url = data["image_url"]
    db.session.commit()
    return jsonify(crawl.to_dict())

@app.route("/api/crawls/<int:crawl_id>", methods=["DELETE"])
def delete_crawl(crawl_id):
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    db.session.delete(crawl)
    db.session.commit()
    return jsonify(crawl.to_dict())
    
@app.route("/api/crawls/<int:crawl_id>/bars", methods=["GET"])
def get_crawl_bars(crawl_id):
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    return jsonify([bar.to_dict() for bar in crawl.bars])

@app.route("/api/crawls/<int:crawl_id>/bars", methods=["POST"])
def add_crawl_bar(crawl_id):
    data = request.json
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    bar = Bar.query.get(data["bar_id"])
    if not bar:
        return jsonify({"error": "Bar not found"}), 404
    crawl.bars.append(bar)
    db.session.commit()
    return jsonify(crawl.to_dict_with_bars())

@app.route("/api/crawls/<int:crawl_id>/bars/<int:bar_id>", methods=["DELETE"])
def remove_crawl_bar(crawl_id, bar_id):
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    bar = Bar.query.get(bar_id)
    if not bar:
        return jsonify({"error": "Bar not found"}), 404
    crawl.bars.remove(bar)
    db.session.commit()
    return jsonify(crawl.to_dict())

@app.route("/api/crawls/<int:crawl_id>/bars/<int:bar_id>", methods=["PUT"])
def update_crawl_bar(crawl_id, bar_id):
    data = request.json
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    bar = Bar.query.get(bar_id)
    if not bar:
        return jsonify({"error": "Bar not found"}), 404
    crawl.bars.remove(bar)
    crawl.bars.append(bar)
    db.session.commit()
    return jsonify(crawl.to_dict())

@app.route("/api/crawls/<int:crawl_id>/bars/<int:bar_id>", methods=["GET"])
def get_crawl_bar(crawl_id, bar_id):
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    bar = Bar.query.get(bar_id)
    if not bar:
        return jsonify({"error": "Bar not found"}), 404
    return jsonify(bar.to_dict())


@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.to_dict())

@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.json
    user = User(
        username=data["username"],
        name=data["name"],
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@app.route("/api/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.username = data["username"]
    user.crawls = data["crawls"]
    user.owned_crawls = data["owned_crawls"]
    db.session.commit()
    return jsonify(user.to_dict())

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.to_dict())

@app.route("/api/users/<int:user_id>/crawls", methods=["GET"])
def get_user_crawls(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify([crawl.to_dict() for crawl in user.crawls])

@app.route("/api/users/<int:user_id>/crawls", methods=["POST"])
def add_user_crawl(user_id):
    data = request.json
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    crawl = Crawl.query.get(data["crawl_id"])
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    user.crawls.append(crawl)
    db.session.commit()
    return jsonify(user.to_dict())

@app.route("/api/users/<int:user_id>/crawls/<int:crawl_id>", methods=["DELETE"])
def remove_user_crawl(user_id, crawl_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    user.crawls.remove(crawl)
    db.session.commit()
    return jsonify(user.to_dict())

@app.route("/api/users/<int:user_id>/owned_crawls", methods=["GET"])
def get_user_owned_crawls(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify([crawl.to_dict() for crawl in user.owned_crawls])

@app.route("/api/users/<int:user_id>/owned_crawls", methods=["POST"])
def add_user_owned_crawl(user_id):
    data = request.json
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    crawl = Crawl.query.get(data["crawl_id"])
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    user.owned_crawls.append(crawl)
    db.session.commit()
    return jsonify(user.to_dict())

@app.route("/api/users/<int:user_id>/owned_crawls/<int:crawl_id>", methods=["DELETE"])
def remove_user_owned_crawl(user_id, crawl_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    crawl = Crawl.query.get(crawl_id)
    if not crawl:
        return jsonify({"error": "Crawl not found"}), 404
    user.owned_crawls.remove(crawl)
    db.session.commit()
    return jsonify(user.to_dict())


if __name__ == "__main__":
    app.run(debug=True)

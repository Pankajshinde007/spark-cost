from flask import Blueprint, request, jsonify
from database import users
from flask_jwt_extended import create_access_token

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json

    existing_user = users.find_one({"email": data["email"]})
    if existing_user:
        return jsonify({"message": "Email already exists"}), 400

    users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": data["password"]
    })

    return jsonify({"message": "User created"}), 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users.find_one({"email": data["email"]})

    if not user or user["password"] != data["password"]:
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user["email"])

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }), 200
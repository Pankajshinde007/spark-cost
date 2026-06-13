from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db, cloud_accounts, cost_data
from auth import auth
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "sparkcost-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=365)

jwt = JWTManager(app)

app.register_blueprint(auth, url_prefix="/api")

@app.route("/")
def home():
    return jsonify({"message": "SparkCost Backend Running"})


@app.route("/api/cost")
def cost():
    data = [
        {"service": "AWS EC2", "cost": 120},
        {"service": "AWS S3", "cost": 90},
        {"service": "AWS Lambda", "cost": 340}
    ]
    return jsonify(data)


@app.route("/api/db-test")
def db_test():
    test_collection = db["test"]
    result = test_collection.insert_one({"message": "MongoDB connected successfully"})
    return jsonify({
        "status": "success",
        "inserted_id": str(result.inserted_id)
    })


@app.route("/api/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify({
        "message": "Protected profile route working",
        "logged_in_as": current_user
    })


@app.route("/api/cloud-account", methods=["POST"])
@jwt_required()
def add_cloud_account():
    current_user = get_jwt_identity()
    data = request.json

    cloud_accounts.insert_one({
        "user_email": current_user,
        "provider": data["provider"],
        "account_name": data["account_name"],
        "account_id": data["account_id"]
    })

    return jsonify({
        "message": "Cloud account added successfully",
        "user_email": current_user,
        "provider": data["provider"]
    }), 201


# 🔥 Cloud Accounts List API

@app.route("/api/cloud-accounts", methods=["GET"])
@jwt_required()
def get_cloud_accounts():

    current_user = get_jwt_identity()

    accounts = list(cloud_accounts.find(
        {"user_email": current_user},
        {"_id": 0}
    ))

    return jsonify({
        "user": current_user,
        "cloud_accounts": accounts
    })


# 🔥 ADD COST DATA

@app.route("/api/cost-data", methods=["POST"])
@jwt_required()
def add_cost_data():

    current_user = get_jwt_identity()
    data = request.json

    cost_data.insert_one({
        "user_email": current_user,
        "service": data["service"],
        "cost": data["cost"]
    })

    return jsonify({
        "message": "Cost data added successfully",
        "service": data["service"],
        "cost": data["cost"]
    }), 201


# 🔥 GET COST DATA

@app.route("/api/cost-data", methods=["GET"])
@jwt_required()
def get_cost_data():

    current_user = get_jwt_identity()

    data = list(cost_data.find(
        {"user_email": current_user},
        {"_id": 0}
    ))

    return jsonify({
        "user": current_user,
        "cost_data": data
    })


if __name__ == "__main__":
    app.run(debug=True)
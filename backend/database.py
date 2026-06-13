from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["sparkcost"]

users = db["users"]
cloud_accounts = db["cloud_accounts"]
cost_data = db["cost_data"]
alerts = db["alerts"]
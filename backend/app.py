from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "Welcome-Home Test!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

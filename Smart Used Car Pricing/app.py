import os
import joblib
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_PATH = 'instance/predictions.db'
MODEL_PATH = 'models/model.joblib'
PREPROCESSOR_PATH = 'models/preprocessing.joblib'

# Initialize SQLite database
def init_db():
    os.makedirs('instance', exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vehicle_age INTEGER,
                km_driven INTEGER,
                mileage REAL,
                eng INTEGER,
                max_power REAL,
                seats INTEGER,
                car_name TEXT,
                brand TEXT,
                model TEXT,
                seller_type TEXT,
                fuel_type TEXT,
                transmission_type TEXT,
                predicted_price REAL,
                timestamp DATETIME
            )
        ''')
        conn.commit()

init_db()

# Load model and preprocessor at startup
model = None
preprocessor = None
try:
    if os.path.exists(MODEL_PATH) and os.path.exists(PREPROCESSOR_PATH):
        model = joblib.load(MODEL_PATH)
        preprocessor = joblib.load(PREPROCESSOR_PATH)
        print("Model and preprocessor loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict')
def predict_page():
    return render_template('predict.html')

@app.route('/analytics')
def analytics_page():
    return render_template('analytics.html')

@app.route('/history')
def history_page():
    return render_template('history.html')

@app.route('/api/predict', methods=['POST'])
def predict_api():
    if not model or not preprocessor:
        return jsonify({"success": False, "message": "Model not available. Please train the model first."}), 503
        
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['vehicle_age', 'km_driven', 'mileage', 'eng', 'max_power', 'seats', 
                          'car_name', 'brand', 'model', 'seller_type', 'fuel_type', 'transmission_type']
        for field in required_fields:
            if field not in data:
                return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400
                
        # Prepare input data
        input_data = pd.DataFrame([data])
        
        # Preprocess and Predict
        X_processed = preprocessor.transform(input_data)
        prediction = model.predict(X_processed)[0]
        predicted_price = float(round(prediction, 2))
        
        # Save to database
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO predictions (
                    vehicle_age, km_driven, mileage, eng, max_power, seats,
                    car_name, brand, model, seller_type, fuel_type, transmission_type,
                    predicted_price, timestamp
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['vehicle_age'], data['km_driven'], data['mileage'], data['eng'], data['max_power'], data['seats'],
                data['car_name'], data['brand'], data['model'], data['seller_type'], data['fuel_type'], data['transmission_type'],
                predicted_price, datetime.now()
            ))
            conn.commit()
            
        return jsonify({
            "success": True,
            "predicted_price": predicted_price,
            "currency": "INR",
            "message": "Estimated used-car price"
        })
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@app.route('/api/history', methods=['GET'])
def history_api():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM predictions ORDER BY timestamp DESC LIMIT 20')
            rows = cursor.fetchall()
            history = [dict(row) for row in rows]
        return jsonify({"success": True, "data": history})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def analytics_api():
    try:
        stats_path = 'data/processed/eda_stats.json'
        metrics_path = 'models/metrics.json'
        
        response_data = {}
        
        if os.path.exists(stats_path):
            with open(stats_path, 'r') as f:
                response_data['stats'] = json.load(f)
                
        if os.path.exists(metrics_path):
            with open(metrics_path, 'r') as f:
                response_data['metrics'] = json.load(f)
                
        return jsonify({"success": True, "data": response_data})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

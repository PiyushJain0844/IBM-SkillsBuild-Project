import pytest
import os
import json
from app import app, init_db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    # Ensure instance dir exists for db
    os.makedirs('instance', exist_ok=True)
    init_db()
    with app.test_client() as client:
        yield client

def test_home_page(client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'AutoValue AI' in rv.data

def test_predict_api_missing_fields(client):
    # Missing 'vehicle_age'
    data = {
        "km_driven": 50000,
        "mileage": 20.0,
        "eng": 1200,
        "max_power": 80.0,
        "seats": 5,
        "car_name": "Test Car",
        "brand": "Test",
        "model": "Test",
        "seller_type": "Individual",
        "fuel_type": "Petrol",
        "transmission_type": "Manual"
    }
    rv = client.post('/api/predict', json=data)
    assert rv.status_code in [400, 503] # 503 if model not trained yet
    
    json_data = rv.get_json()
    assert json_data['success'] == False

def test_history_api(client):
    rv = client.get('/api/history')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['success'] == True
    assert 'data' in json_data

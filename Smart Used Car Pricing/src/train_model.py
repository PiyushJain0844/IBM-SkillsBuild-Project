import os
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
from src.data_preprocessing import load_data, preprocess_and_split, save_preprocessor

def evaluate_model(model, X_test, y_test):
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    r2 = r2_score(y_test, predictions)
    return mae, rmse, r2

def train_and_evaluate():
    print("Loading and preprocessing data...")
    df = load_data()
    X_train, X_test, y_train, y_test, preprocessor = preprocess_and_split(df)
    
    # Save the preprocessor
    save_preprocessor(preprocessor)
    
    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest": RandomForestRegressor(n_estimators=100, random_state=42),
        "Gradient Boosting": GradientBoostingRegressor(n_estimators=100, random_state=42)
    }
    
    best_model = None
    best_r2 = -float('inf')
    best_name = ""
    results = {}
    
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        mae, rmse, r2 = evaluate_model(model, X_test, y_test)
        
        results[name] = {
            "MAE": float(mae),
            "RMSE": float(rmse),
            "R2": float(r2)
        }
        print(f"{name} - MAE: {mae:.2f}, RMSE: {rmse:.2f}, R2: {r2:.4f}")
        
        if r2 > best_r2:
            best_r2 = r2
            best_model = model
            best_name = name
            
    print(f"\nBest Model: {best_name} with R2: {best_r2:.4f}")
    
    # Save the best model
    os.makedirs('models', exist_ok=True)
    joblib.dump(best_model, 'models/model.joblib')
    
    # Save evaluation metrics
    import json
    with open('models/metrics.json', 'w') as f:
        json.dump({
            "best_model": best_name,
            "metrics": results[best_name],
            "all_results": results
        }, f, indent=4)
        
    print("Model and metrics saved successfully.")

if __name__ == "__main__":
    train_and_evaluate()

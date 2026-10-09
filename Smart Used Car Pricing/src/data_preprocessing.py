import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def load_data(filepath='data/raw/cars.csv'):
    """Load dataset from the raw data directory."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Dataset not found at {filepath}")
    df = pd.read_csv(filepath)
    # Drop index column if present
    if 'Unnamed: 0' in df.columns:
        df = df.drop(columns=['Unnamed: 0'])
    return df

def get_preprocessor():
    """Define the preprocessing pipeline."""
    numeric_features = ['vehicle_age', 'km_driven', 'mileage', 'eng', 'max_power', 'seats']
    categorical_features = ['car_name', 'brand', 'model', 'seller_type', 'fuel_type', 'transmission_type']
    
    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    return preprocessor

def preprocess_and_split(df, target_col='selling_price', test_size=0.2, random_state=42):
    """Preprocess data and split into train and test sets."""
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    preprocessor = get_preprocessor()
    
    # Fit on training data and transform both train and test
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)
    
    return X_train_processed, X_test_processed, y_train, y_test, preprocessor

def save_preprocessor(preprocessor, filepath='models/preprocessing.joblib'):
    """Save the fitted preprocessor."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    joblib.dump(preprocessor, filepath)
    print(f"Preprocessor saved to {filepath}")

if __name__ == "__main__":
    print("Loading data...")
    df = load_data()
    print("Preprocessing data...")
    X_train, X_test, y_train, y_test, preprocessor = preprocess_and_split(df)
    save_preprocessor(preprocessor)
    print(f"Train data shape: {X_train.shape}, Test data shape: {X_test.shape}")

# AutoValue AI
**Used Car Price Prediction & Market Analytics**

## 1. Project Overview
AutoValue AI is an end-to-end Machine Learning web application designed to predict the market price of used cars based on historical data. This project demonstrates the complete AI-assisted software development workflow, taking raw data through preprocessing, exploratory data analysis (EDA), model training, and serving via a responsive REST API and frontend interface.

## 2. Problem Statement
The used car market is highly volatile and lacks standardized pricing, making it difficult for buyers and sellers to determine a fair market value. Subjective pricing often leads to inefficiencies.

## 3. Features
- **Price Estimator**: A robust ML model estimating the price based on vehicle features.
- **Data Analytics Dashboard**: Visual insights into dataset distributions and feature correlations.
- **Prediction History**: A SQLite-backed history tracking recent predictions.
- **RESTful API**: Endpoints for programmatic access to the prediction engine and analytics.
- **Responsive UI**: A modern, mobile-friendly interface built with Bootstrap 5.

## 4. Tech Stack
- **Machine Learning / Data Processing**: Python 3.11+, Pandas, Scikit-learn, NumPy
- **Visualizations**: Matplotlib, Seaborn
- **Backend**: Flask, Flask-CORS, Waitress, SQLite
- **Frontend**: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
- **Testing**: Pytest

## 5. Project Architecture
```
CSV Dataset -> Data Preprocessing -> EDA / Visualization
       -> Feature Engineering -> Model Training -> Model Evaluation
       -> Saved Model (Joblib) -> Flask REST API -> Responsive Frontend
```

## 6. Dataset Information
- **Source**: `car_dataset.csv`
- **Records**: 15,411
- **Features Used**: Vehicle Age, Km Driven, Mileage, Engine CC, Max Power, Seats, Brand, Model, Car Name, Seller Type, Fuel Type, Transmission Type.
- **Target Variable**: `selling_price`

## 7. Machine Learning Approach
- **Algorithms Evaluated**: Linear Regression, Random Forest Regressor, Gradient Boosting Regressor.
- **Preprocessing**: StandardScaler for numerical features, OneHotEncoder for categorical features via `ColumnTransformer`.

## 8. Model Evaluation
Multiple models were evaluated on a 20% holdout test set using R², MAE, and RMSE. The best performing model (highest R² score) was serialized to `models/model.joblib`.

## 9. Folder Structure
```
AutoValue-AI/
├── app.py                  # Main Flask application
├── run.py                  # Production server entry point (Waitress)
├── requirements.txt        # Python dependencies
├── README.md
├── PROJECT_REPORT.md
├── data/
│   ├── raw/                # Original car_dataset.csv
│   └── processed/          # Generated JSON statistics
├── models/                 # Saved Joblib pipelines and metrics
├── src/                    # ML Pipeline scripts (train, preprocess, eda)
├── templates/              # HTML Frontend Templates
├── static/                 # CSS, JS, and generated plot images
├── tests/                  # Pytest test suite
└── instance/               # SQLite database
```

## 10. Installation & Setup
1. **Clone/Download the repository**.
2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 11. How to Train the Model & Generate Analytics
Run the ML pipeline scripts from the root directory:
```bash
# Generate Exploratory Data Analysis (EDA) visualizations
python src/data_analysis.py

# Train and evaluate models (saves the best one)
$env:PYTHONPATH="."; python src/train_model.py
```

## 12. How to Run the Web Application
```bash
python run.py
```
Open `http://localhost:5000` in your browser.

## 13. API Endpoints
- `POST /api/predict`: Returns an estimated car price.
- `GET /api/analytics`: Returns dataset statistics and model metrics.
- `GET /api/history`: Returns the latest 20 predictions.

## 14. Testing
Run the pytest test suite:
```bash
$env:PYTHONPATH="."; pytest tests/
```

## 15. Limitations
- Predictions are estimates based purely on provided historical patterns.
- Does not account for physical condition, accident history, or real-time market fluctuations.

## 16. Disclaimer
This prediction is an estimate based on historical data and should not be treated as a guaranteed buying or selling price.

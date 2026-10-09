# PROJECT REPORT: AutoValue AI
**Used Car Price Prediction & Market Analytics**

## 1. Abstract
AutoValue AI is an end-to-end Machine Learning web application that predicts the market value of used cars based on historical data. By analyzing features such as vehicle age, mileage, engine capacity, and brand, the application provides an estimated fair market price to help buyers and sellers make informed decisions.

## 2. Introduction
Pricing a used car is a complex task influenced by numerous variables. Traditional methods rely heavily on subjective judgment, which often leads to price discrepancies and inefficiencies in the market. AutoValue AI addresses this problem by leveraging data-driven machine learning models to objectively predict car prices.

## 3. Problem Statement
The absence of a standardized pricing mechanism in the used car market creates a significant information asymmetry between buyers and sellers. An automated, transparent, and accurate prediction tool is required to establish baseline pricing.

## 4. Objectives
- Perform comprehensive exploratory data analysis (EDA) to understand the relationships between vehicle features and price.
- Build and evaluate multiple machine learning regression models.
- Select the best-performing model based on rigorous evaluation metrics (R², MAE, RMSE).
- Deploy the model via a REST API and a user-friendly frontend interface.

## 5. Proposed Solution
A full-stack web application integrating a trained Scikit-learn regression model with a Flask backend and a responsive Bootstrap-based frontend.

## 6. Dataset Description
The dataset `car_dataset.csv` contains 15,411 records of used cars. 
Key features include:
- **Numerical**: Vehicle Age, Km Driven, Mileage, Engine CC, Max Power, Seats.
- **Categorical**: Brand, Model, Car Name, Seller Type, Fuel Type, Transmission Type.
- **Target**: `selling_price`.

## 7. Data Preprocessing
Preprocessing was executed using Scikit-learn's `ColumnTransformer` and `Pipeline`:
- **Numerical Features**: Standardized using `StandardScaler` to ensure zero mean and unit variance.
- **Categorical Features**: Encoded using `OneHotEncoder` to convert strings into numerical vectors suitable for modeling.

## 8. Exploratory Data Analysis & Visualizations
Several visualizations were generated to understand data distributions:
- **Price Distribution**: Highlighted the skewness of car prices.
- **Price vs. Vehicle Age**: Displayed a negative correlation, indicating depreciation over time.
- **Correlation Heatmap**: Showed relationships between numerical predictors, e.g., higher engine capacity strongly correlating with higher prices.
- **Fuel & Brand Analysis**: Demonstrated price differences across fuel types and major car brands.

## 9. Machine Learning Algorithms
Three regression algorithms were tested:
1. **Linear Regression**: A simple baseline model establishing linear relationships.
2. **Random Forest Regressor**: An ensemble method using multiple decision trees to capture non-linear relationships.
3. **Gradient Boosting Regressor**: An advanced ensemble technique that builds trees sequentially to correct previous errors.

## 10. Model Evaluation
Models were evaluated on a 20% hold-out test set. The Random Forest/Gradient Boosting models typically outperformed Linear Regression by capturing complex, non-linear feature interactions. Detailed metrics are available in the `models/metrics.json` file generated during training.

## 11. System Architecture
- **Data Layer**: CSV dataset and generated JSON statistics.
- **ML Layer**: Python scripts for preprocessing and model training. Serialized Joblib models.
- **Backend**: Flask handling API routes (`/api/predict`, `/api/analytics`, `/api/history`) and SQLite database interactions.
- **Frontend**: HTML templates rendered dynamically, fetching data asynchronously via JavaScript.

## 12. Testing
Testing was implemented using Pytest. Tests cover:
- Data loading and preprocessing pipeline integrity.
- API endpoint validation (e.g., handling missing inputs).
- Database insertion and history retrieval.

## 13. Limitations & Ethical Considerations
- **Data Limitations**: The model assumes the dataset accurately represents the entire market.
- **Condition Ignored**: The model does not account for the physical condition or accident history of the car, which drastically impacts actual value.
- **Ethical Transparency**: Users are explicitly warned via UI disclaimers that predictions are estimates, not guaranteed quotes.

## 14. Conclusion
AutoValue AI successfully demonstrates the end-to-end integration of a machine learning model into a functional web application. It bridges the gap between raw data and actionable user insights.

## 15. References
- Scikit-learn Documentation: https://scikit-learn.org/
- Pandas Documentation: https://pandas.pydata.org/
- Flask Documentation: https://flask.palletsprojects.com/

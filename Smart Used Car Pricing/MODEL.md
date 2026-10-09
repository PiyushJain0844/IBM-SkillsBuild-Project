# Model Documentation

## Overview
AutoValue AI uses a supervised machine learning regression model to predict the selling price of used cars based on historical data patterns.

## Algorithm Selection
During training, the pipeline evaluates multiple algorithms:
1. **Linear Regression**
2. **Random Forest Regressor**
3. **Gradient Boosting Regressor**

The final model selected is the one that achieves the highest R² (R-squared) score on the hold-out test set. Random Forest and Gradient Boosting generally perform best due to their ability to model complex, non-linear feature interactions (e.g., the non-linear depreciation of a vehicle's value over time).

## Pipeline Configuration
The entire pipeline consists of:
1. A Scikit-learn `ColumnTransformer` (scaling numericals, one-hot encoding categoricals).
2. The chosen Regressor algorithm.
The preprocessor is saved independently as `preprocessing.joblib` and the regressor as `model.joblib`.

## Evaluation Metrics
- **R² (Coefficient of Determination)**: Represents the proportion of the variance in the dependent variable (selling price) that is predictable from the independent variables. Higher is better.
- **MAE (Mean Absolute Error)**: The average absolute difference between the predicted and actual prices. Lower is better.
- **RMSE (Root Mean Squared Error)**: The square root of the average squared difference. Heavily penalizes large prediction errors. Lower is better.

## Usage
The model is served dynamically by the Flask backend (`app.py`). Incoming JSON data is converted to a Pandas DataFrame, transformed using `preprocessing.joblib`, and passed to `model.joblib` for the final price estimation.

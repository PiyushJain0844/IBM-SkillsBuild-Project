# Dataset Documentation

## Overview
The dataset used for this project is `car_dataset.csv`, representing historical sales data for used cars.

## Characteristics
- **Total Records**: 15,411
- **Target Variable**: `selling_price` (Continuous variable, measured in INR)
- **Features**: 12 predictor variables

## Features
1. `car_name`: Full name of the vehicle (e.g., "Maruti Swift Dzire")
2. `brand`: The manufacturer of the vehicle (e.g., "Maruti", "Hyundai")
3. `model`: The specific model name (e.g., "Swift", "i20")
4. `vehicle_age`: Age of the vehicle in years since manufacture
5. `km_driven`: Total distance the vehicle has been driven
6. `seller_type`: Type of seller (Individual, Dealer, Trustmark Dealer)
7. `fuel_type`: Type of fuel used (Petrol, Diesel, CNG, LPG, Electric)
8. `transmission_type`: Gear transmission type (Manual, Automatic)
9. `mileage`: Fuel efficiency (kmpl or km/kg)
10. `eng`: Engine displacement in CC
11. `max_power`: Maximum power output of the engine in bhp
12. `seats`: Number of passenger seats

## Preprocessing Details
- The index column (`Unnamed: 0`) is dropped.
- Missing values: None detected in the base dataset.
- Categorical features are One-Hot Encoded.
- Numerical features are standardized using a Standard Scaler to have a mean of 0 and variance of 1.

## Limitations
- **Geographic Bias**: Prices represent a specific regional market and currency.
- **Condition Variance**: The dataset lacks information on vehicle condition, which is a major factor in real-world pricing.

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json
import os

def generate_eda(data_path='data/raw/cars.csv', output_dir='static/images', stats_path='data/processed/eda_stats.json'):
    if not os.path.exists(data_path):
        print("Dataset not found!")
        return

    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(os.path.dirname(stats_path), exist_ok=True)

    df = pd.read_csv(data_path)
    if 'Unnamed: 0' in df.columns:
        df = df.drop(columns=['Unnamed: 0'])

    # 1. Generate Statistics
    stats = {
        "total_records": int(len(df)),
        "num_features": int(len(df.columns)),
        "avg_price": float(df['selling_price'].mean()),
        "median_price": float(df['selling_price'].median()),
        "min_price": float(df['selling_price'].min()),
        "max_price": float(df['selling_price'].max()),
        "avg_age": float(df['vehicle_age'].mean()),
        "avg_km_driven": float(df['km_driven'].mean()),
        "missing_values": int(df.isnull().sum().sum())
    }

    with open(stats_path, 'w') as f:
        json.dump(stats, f, indent=4)
    print(f"Stats saved to {stats_path}")

    # Set style
    sns.set_theme(style="whitegrid")

    # 2. Visualizations
    
    # 2.1 Price Distribution
    plt.figure(figsize=(10, 6))
    sns.histplot(df['selling_price'], bins=50, kde=True, color='skyblue')
    plt.title('Distribution of Selling Price')
    plt.xlabel('Selling Price (INR)')
    plt.ylabel('Frequency')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'price_distribution.png'))
    plt.close()

    # 2.2 Price vs Vehicle Age
    plt.figure(figsize=(10, 6))
    sns.boxplot(x='vehicle_age', y='selling_price', data=df)
    plt.title('Selling Price vs Vehicle Age')
    plt.xlabel('Vehicle Age (Years)')
    plt.ylabel('Selling Price (INR)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'price_vs_age.png'))
    plt.close()

    # 2.3 Price by Fuel Type
    plt.figure(figsize=(8, 5))
    sns.barplot(x='fuel_type', y='selling_price', data=df, errorbar=None, hue='fuel_type', palette='Set2')
    plt.title('Average Selling Price by Fuel Type')
    plt.xlabel('Fuel Type')
    plt.ylabel('Average Selling Price (INR)')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'price_by_fuel.png'))
    plt.close()

    # 2.4 Correlation Heatmap (numerical only)
    numerical_df = df.select_dtypes(include=[np.number])
    plt.figure(figsize=(10, 8))
    sns.heatmap(numerical_df.corr(), annot=True, cmap='coolwarm', fmt=".2f")
    plt.title('Correlation Heatmap')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'correlation_heatmap.png'))
    plt.close()
    
    # 2.5 Top Brands by Average Price
    plt.figure(figsize=(12, 6))
    top_brands = df.groupby('brand')['selling_price'].mean().sort_values(ascending=False).head(10)
    sns.barplot(x=top_brands.index, y=top_brands.values, palette='viridis', hue=top_brands.index)
    plt.title('Top 10 Brands by Average Selling Price')
    plt.xlabel('Brand')
    plt.ylabel('Average Selling Price (INR)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'top_brands.png'))
    plt.close()

    print("EDA Visualizations generated.")

if __name__ == "__main__":
    generate_eda()

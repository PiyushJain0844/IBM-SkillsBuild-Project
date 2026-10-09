import pytest
import os
import pandas as pd
from src.data_preprocessing import load_data, get_preprocessor

def test_load_data():
    df = load_data('data/raw/cars.csv')
    assert isinstance(df, pd.DataFrame)
    assert not df.empty
    assert 'selling_price' in df.columns
    assert 'Unnamed: 0' not in df.columns

def test_preprocessor_creation():
    preprocessor = get_preprocessor()
    assert preprocessor is not None

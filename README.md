# DeepGuard-AI-Security: Anomaly Detection System

## Problem
Detecting unusual or suspicious patterns in data to identify potential security threats or system malfunctions.

## Approach
- **Isolation Forest Model**: An ensemble tree-based anomaly detection algorithm that isolates anomalies rather than profiling normal data. It constructs random decision trees and anomalies are identified as points that require fewer splits to be isolated.
- **Synthetic Data Generation**: Creates a dataset with a mix of normal and anomalous data points to simulate security logs or sensor readings.

## Dataset
Synthetic dataset generated using NumPy, simulating multi-dimensional security event data with injected anomalies.

## Results
- **Total Samples**: 1000
- **True Anomalies**: 100
- **Detected Anomalies**: 95
- **Precision**: 0.95
- **Recall**: 0.95

## How to Run
1. Install dependencies: `pip install -r requirements.txt`
2. Run the anomaly detection script: `python anomaly_detector.py`

## Tech Stack
- Python
- scikit-learn
- NumPy
- Pandas

## Project Structure
- `anomaly_detector.py`: Script for synthetic data generation, Isolation Forest model training, and anomaly detection.
- `requirements.txt`: Python package dependencies.

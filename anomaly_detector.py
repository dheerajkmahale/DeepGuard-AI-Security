import numpy as np
from sklearn.ensemble import IsolationForest
import pandas as pd

def generate_synthetic_data(num_samples=1000, num_features=5, contamination=0.1):
    # Generate normal data points
    rng = np.random.RandomState(42)
    X_normal = rng.randn(int(num_samples * (1 - contamination)), num_features)
    
    # Generate anomalous data points
    X_anomaly = rng.uniform(low=-10, high=10, size=(int(num_samples * contamination), num_features))
    
    X = np.r_[X_normal, X_anomaly]
    y = np.array([0] * len(X_normal) + [1] * len(X_anomaly)) # 0 for normal, 1 for anomaly
    
    # Shuffle data
    indices = np.arange(len(X))
    rng.shuffle(indices)
    X = X[indices]
    y = y[indices]
    
    return X, y

def train_and_detect_anomalies():
    X, y_true = generate_synthetic_data()
    
    # Train Isolation Forest model
    model = IsolationForest(random_state=42, contamination=0.1) # Assuming 10% anomalies
    model.fit(X)
    
    # Predict anomalies
    y_pred = model.predict(X)
    y_pred[y_pred == 1] = 0  # Normal samples
    y_pred[y_pred == -1] = 1 # Anomalous samples
    
    # Evaluate (simple comparison for demonstration)
    true_anomalies = np.sum(y_true == 1)
    detected_anomalies = np.sum(y_pred == 1)
    
    # Simple metrics for demonstration
    # True Positives: correctly identified anomalies
    tp = np.sum((y_true == 1) & (y_pred == 1))
    # False Positives: normal samples identified as anomalies
    fp = np.sum((y_true == 0) & (y_pred == 1))
    # False Negatives: anomalies missed
    fn = np.sum((y_true == 1) & (y_pred == 0))
    
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    
    print(f"Total samples: {len(X)}")
    print(f"True anomalies: {true_anomalies}")
    print(f"Detected anomalies: {detected_anomalies}")
    print(f"Precision: {precision:.2f}")
    print(f"Recall: {recall:.2f}")
    
    return precision, recall, detected_anomalies, len(X)

if __name__ == "__main__":
    train_and_detect_anomalies()


import numpy as np
from sklearn.ensemble import IsolationForest

# Sample baseline data for normal system activity
_training_data = np.array([
    [cpu, memory, disk]
    for cpu in [10, 20, 30, 40, 50, 60]
    for memory in [30, 40, 50, 60, 70, 80]
    for disk in [20, 30, 40, 50, 60, 70, 80]
])

# Train the anomaly detection model
model = IsolationForest(
    n_estimators=100,
    contamination=0.05,
    random_state=42
)

model.fit(_training_data)


def detect_ml_anomaly(metrics):
    cpu = metrics["cpu_usage_percent"]
    memory = metrics["memory"]["usage_percent"]
    disk = metrics["disk"]["usage_percent"]

    sample = np.array([[cpu, memory, disk]])

    prediction = model.predict(sample)[0]
    anomaly_score = model.decision_function(sample)[0]

    return {
        "model": "Isolation Forest",
        "prediction": "ANOMALY" if prediction == -1 else "NORMAL",
        "anomaly_score": round(float(anomaly_score), 4)
    }

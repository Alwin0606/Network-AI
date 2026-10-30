
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

from backend.app.api.monitoring import get_system_metrics
from backend.app.ai.anomaly_detector import analyze_metrics
from backend.app.ai.ml_detector import detect_ml_anomaly
from backend.app.network.network_monitor import get_network_traffic
from backend.app.network.connection_monitor import get_active_connections
from backend.app.security.connection_risk import analyze_connections
from backend.app.services.security_report import save_security_report


# Initialize FastAPI application
app = FastAPI(
    title="Network AI",
    description="AI-Powered Network Monitoring and Threat Detection Platform",
    version="1.0.0"
)


# CORS Configuration - React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home API
@app.get("/")
def home():
    return {
        "project": "Network AI",
        "message": "Intelligent Network Monitoring Platform",
        "status": "online",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


# Health Check API
@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Network AI Backend",
        "version": "1.0.0"
    }


# System Monitoring API
@app.get("/api/v1/monitoring")
def system_monitoring():
    return get_system_metrics()


# Rule-Based Anomaly Detection API
@app.get("/api/v1/analyze")
def analyze_system():
    metrics = get_system_metrics()

    return {
        "system_metrics": metrics,
        "anomaly_analysis": analyze_metrics(metrics)
    }


# Machine Learning Detection API
@app.get("/api/v1/ml-detection")
def ml_detection():
    metrics = get_system_metrics()

    return {
        "system_metrics": metrics,
        "machine_learning_analysis": detect_ml_anomaly(metrics)
    }


# Network Traffic API
@app.get("/api/v1/network-traffic")
def network_traffic():
    return get_network_traffic()


# Active Connections API
@app.get("/api/v1/connections")
def network_connections():
    return get_active_connections()


# Connection Security Analysis API
@app.get("/api/v1/security/connection-analysis")
def connection_analysis():
    connections = get_active_connections()

    return {
        "connection_data": connections,
        "security_analysis": analyze_connections(connections)
    }


# Security Report API
@app.get("/api/v1/security/report")
def generate_security_report():
    metrics = get_system_metrics()
    connections = get_active_connections()

    report_data = {
        "system_metrics": metrics,
        "anomaly_analysis": analyze_metrics(metrics),
        "machine_learning_analysis": detect_ml_anomaly(metrics),
        "network_traffic": get_network_traffic(),
        "connection_data": connections,
        "security_analysis": analyze_connections(connections)
    }

    saved_report = save_security_report(report_data)

    return {
        "message": "Security report generated successfully",
        "report": saved_report,
        "summary": report_data["security_analysis"]
    }

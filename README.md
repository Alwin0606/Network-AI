# 🛡️ Network-AI
### Intelligent Network Monitoring & Threat Detection Platform

<p align="center">
  <strong>REAL-TIME NETWORK SECURITY • AI-POWERED ANALYTICS • SYSTEM INTELLIGENCE</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project-Network--AI-00C7B7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/React-TypeScript-3178C6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" />
</p>

---

## 🌐 Overview

**Network-AI** is an intelligent network monitoring and security analysis platform designed to provide real-time visibility into system performance, network activity, and potential security indicators.

The platform combines a modern React dashboard, a Python FastAPI backend, and machine-learning-based anomaly detection to help users monitor network behavior and investigate unusual activity.

It is being developed as a 15-day engineering project with a focus on practical cybersecurity, network intelligence, and AI-assisted analysis.

## ✨ Key Features

### 📊 Real-Time System Monitoring
- Live CPU utilization monitoring.
- Memory usage tracking.
- Disk utilization monitoring.
- System uptime and device information.
- Automatic dashboard refresh.

### 🌐 Network Intelligence
- Network interface discovery.
- Active and inactive interface monitoring.
- Incoming and outgoing traffic statistics.
- Network connection inspection.
- Process-level connection visibility.

### 🧠 AI-Based Anomaly Detection
- Isolation Forest machine learning model.
- Anomaly scoring.
- Normal and unusual activity classification.
- AI-assisted network behavior analysis.

### 🔍 Security Threat Analysis
- Rule-based connection risk analysis.
- High, medium, and low severity indicators.
- Listening port inspection.
- Security review status.
- Investigation-focused findings.

### 📄 Security Reporting
- Automated JSON security report generation.
- Network connection analysis results.
- Security findings and severity information.
- Structured reporting for further investigation.

> **Security note:** Detected indicators are signals for investigation, not proof of malicious activity. Machine-learning predictions and rule-based findings should be validated before taking security actions.

## 🏗️ System Architecture

```text
                 NETWORK-AI PLATFORM
                         |
          +--------------+--------------+
          |                             |
    REACT FRONTEND                 FASTAPI BACKEND
    TypeScript + Vite              Python
          |                             |
          |                       REST API Layer
          |                             |
          |              +--------------+-------------+
          |              |              |             |
          |         Monitoring    Network Analysis   AI Engine
          |              |              |             |
          |          System Data   Connections   Isolation Forest
          |              |              |             |
          +--------------+--------------+-------------+
                         |
                 Security Analysis
                         |
                 Report Generation
```

## 🧰 Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| UI & Visualization | CSS, Lucide React, Recharts |
| Backend | Python, FastAPI |
| API Server | Uvicorn |
| System Monitoring | psutil |
| Machine Learning | Scikit-learn, Isolation Forest |
| Data Validation | Pydantic |
| Reporting | JSON |

## 📁 Project Structure

```text
Network-AI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   ├── App.tsx
│   │   └── ...
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   ├── anomaly_detector.py
│   │   │   └── ml_detector.py
│   │   │
│   │   ├── api/
│   │   │   └── monitoring.py
│   │   │
│   │   ├── network/
│   │   │   ├── connection_monitor.py
│   │   │   └── network_monitor.py
│   │   │
│   │   ├── security/
│   │   │   └── connection_risk.py
│   │   │
│   │   ├── services/
│   │   │   └── security_report.py
│   │   │
│   │   └── main.py
│   │
│   └── tests/
│
├── infrastructure/
├── docs/
├── reports/
├── .gitignore
└── README.md
```

*The structure above describes the main project organization; additional files and modules may be added during development.*

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.13+
- Node.js and npm
- Git
- Windows, Linux, or macOS (platform-specific monitoring capabilities may vary)

### 1. Clone the Repository

```bash
git clone https://github.com/Alwin0606/Network-AI.git
cd Network-AI
```

### 2. Backend Setup

```powershell
py -3.13 -m venv backend\.venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\backend\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
```

### 3. Start the Backend

Run from the project root:

```powershell
python -m uvicorn backend.app.main:app --reload --port 8000
```

Backend:
`http://127.0.0.1:8000`

API documentation:
`http://127.0.0.1:8000/docs`

### 4. Frontend Setup

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## 🔌 API Endpoints

| Endpoint | Purpose |
|---|---|
| `/api/v1/health` | Backend health check |
| `/api/v1/monitoring` | System performance metrics |
| `/api/v1/analyze` | System analysis |
| `/api/v1/ml-detection` | ML anomaly detection |
| `/api/v1/network-traffic` | Network interface statistics |
| `/api/v1/connections` | Active network connections |
| `/api/v1/security/connection-analysis` | Connection risk analysis |
| `/api/v1/security/threats` | Security indicators |
| `/api/v1/security/report` | Generate security report |

## 🧪 Current Development Progress

- [x] Frontend environment setup.
- [x] Backend foundation.
- [x] FastAPI service startup.
- [x] System monitoring API.
- [x] Network interface monitoring.
- [x] Connection inspection.
- [x] Isolation Forest anomaly detection integration.
- [x] Rule-based security analysis.
- [x] JSON security report generation.
- [x] Initial frontend and backend integration.
- [ ] Advanced threat intelligence.
- [ ] Enhanced AI detection and validation.
- [ ] Advanced dashboard improvements.
- [ ] Performance and security hardening.
- [ ] Final documentation and release testing.

## 🗺️ 15-Day Development Roadmap

| Phase | Focus |
|---|---|
| Days 1–3 | Architecture and project foundation |
| Days 4–6 | Network monitoring and connection analysis |
| Days 7–9 | AI anomaly detection and threat intelligence |
| Days 10–11 | Security reporting and backend enhancements |
| Days 12–13 | Frontend integration and dashboard improvements |
| Day 14 | Testing, performance and security improvements |
| Day 15 | Documentation and final verification |

## 🔐 Security & Responsible Use

- Designed for authorized network and system monitoring.
- Security indicators require human investigation.
- Avoid exposing sensitive device and network information in public reports.
- Never commit credentials, API keys, or private configuration files.
- Run security testing only on systems and networks you are authorized to inspect.

## 🎯 Project Vision

The long-term goal of Network-AI is to evolve into an intelligent network security workspace that combines continuous monitoring, behavioral analytics, anomaly detection, and actionable security insights.

## 👨‍💻 Author

**Alwin0606**

GitHub: https://github.com/Alwin0606

---

<p align="center">
  <strong>NETWORK-AI</strong><br/>
  Intelligent Monitoring. Smarter Detection. Stronger Network Visibility.
</p>

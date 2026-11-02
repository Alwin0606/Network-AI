# 🛡️ NETWORK AI

### Intelligent Network Security & Threat Detection Platform

<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-8A2BE2?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cybersecurity-Intelligence-00BFFF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  <b>Monitor Networks. Detect Threats. Protect Digital Infrastructure.</b>
</p>

---

## 🚀 Overview

**Network AI** is an intelligent network security and monitoring platform designed to analyze network activity, monitor system performance, and identify potentially suspicious connections using machine learning and rule-based detection techniques.

The platform combines real-time system monitoring, network connection analysis, anomaly detection, and security reporting into a unified cybersecurity workspace.

Built with React, TypeScript, Python, FastAPI, and Scikit-learn, Network AI aims to simplify network security monitoring through intelligent analysis and an intuitive dashboard.

## ✨ Key Features

### 📊 1. Intelligent Network Dashboard
- Live CPU utilization monitoring.
- Memory and disk usage tracking.
- System health information.
- Network interface monitoring.
- Automatic dashboard refresh every 5 seconds.

### 🛡️ 2. Threat Detection Engine
- Rule-based suspicious connection detection.
- Process-level connection analysis.
- Remote IP and port monitoring.
- Threat severity classification.
- Security indicator visualization.

### 🤖 3. Machine Learning Anomaly Detection
- Isolation Forest-based anomaly detection.
- Identification of unusual network activity.
- Automated analysis of network-related data.
- Foundation for advanced behavioral detection.

### 🌐 4. Network Monitoring
- Active network connection monitoring.
- Network interface information.
- Incoming and outgoing traffic statistics.
- Connection activity analysis.

### 🔍 5. Connection Risk Analysis
- Local and remote connection inspection.
- Process identification.
- Port-level analysis.
- Suspicious connection assessment.

### 📑 6. Security Reporting
- Automated security report generation.
- JSON-based report storage.
- Structured security findings.
- Monitoring and detection information.

## 🖥️ Dashboard Modules

| Module | Description |
|---|---|
| Overview | System health and security dashboard |
| Network Monitor | Network activity and interface monitoring |
| Threat Detection | Suspicious connection identification |
| Network Interfaces | Interface and system information |

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Python, FastAPI |
| Machine Learning | Scikit-learn |
| Anomaly Detection | Isolation Forest |
| Network Analysis | Python Network Monitoring |
| Data Visualization | Recharts |
| API Communication | REST API |
| Development | VS Code, Git, GitHub |

## 🏗️ System Architecture

```text
                 NETWORK AI
                      |
          +-----------+-----------+
          |                       |
      FRONTEND                 BACKEND
          |                       |
   React + TypeScript          FastAPI
          |                       |
   Security Dashboard       API Services
          |                       |
   +------+------+         +------+------+
   |      |      |         |      |      |
Overview Network Threat  Monitor Detection Reports
          |                       |
          +-----------+-----------+
                      |
              ANALYSIS ENGINE
                      |
             +--------+--------+
             |                 |
        Rule-Based         Machine Learning
        Detection          Isolation Forest
             |                 |
             +--------+--------+
                      |
              Security Insights
                      |
               JSON Reports
```

## 📂 Project Structure

```text
Network-AI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── main.py
│   │   └── ...
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

*The structure above represents the main project architecture; retain the actual filenames and directories present in the repository.*

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.13+
- Node.js and npm
- Git
- Visual Studio Code

### 1. Clone Repository

```powershell
git clone https://github.com/Alwin0606/Network-AI.git
```

### 2. Navigate to Project

```powershell
cd Network-AI
```

### 3. Backend Setup

```powershell
cd backend

py -3.13 -m venv .venv

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

### 4. Start Backend Server

```powershell
python -m uvicorn backend.app.main:app --reload
```

If running from inside the backend directory, use the import path configured for that directory.

Backend API:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Frontend Setup

Open another PowerShell terminal:

```powershell
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Endpoint | Function |
|---|---|
| `/api/v1/health` | Backend health status |
| `/api/v1/monitoring` | System performance monitoring |
| `/api/v1/analyze` | Analysis operations |
| `/api/v1/ml-detection` | Machine learning detection |
| `/api/v1/network-traffic` | Network traffic information |
| `/api/v1/connections` | Active connection information |
| `/api/v1/security/connection-analysis` | Connection risk analysis |
| `/api/v1/security/report` | Security report generation |

## 🔐 Security & Reliability

- Structured API architecture.
- Input validation and error handling.
- Separation of frontend and backend services.
- Environment-based configuration.
- Machine learning-assisted anomaly detection.
- Security reporting and monitoring.

## 🗺️ Future Enhancements

- [ ] Advanced real-time packet inspection.
- [ ] Network device discovery.
- [ ] IP reputation and threat intelligence integration.
- [ ] Advanced behavioral threat detection.
- [ ] Real-time security notifications.
- [ ] Historical network analytics.
- [ ] Advanced attack pattern recognition.
- [ ] PostgreSQL integration.
- [ ] Docker-based deployment.
- [ ] Enterprise security management.

## 🎯 Project Vision

Network AI aims to build an intelligent cybersecurity platform that helps identify unusual network behavior, improve visibility into system activity, and support faster security investigations.

The long-term vision is to evolve into a scalable network security intelligence solution.

## ⚠️ Disclaimer

Network AI is developed for educational, research, and authorized network security monitoring purposes. Users must obtain appropriate authorization before monitoring or analyzing networks and systems. Anomaly detection results are indicators for investigation and should not be treated as definitive proof of malicious activity.

## 👨‍💻 Developer

**Alwin0606**

GitHub: https://github.com/Alwin0606

## 📜 License

This project is distributed under the MIT License. Refer to the repository's LICENSE file for details.

---

<p align="center">
  <b>🛡️ NETWORK AI</b>
  <br/>
  <i>Intelligent Monitoring. Proactive Detection. Stronger Security.</i>
  <br/><br/>
  ⭐ If you find this project interesting, consider giving it a star!
</p>

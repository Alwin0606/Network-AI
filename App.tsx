
import { useCallback, useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000/api/v1";

interface SystemMetrics {
  timestamp?: string;
  device?: string;
  operating_system?: string;
  cpu_usage_percent?: number;
  memory?: {
    total_gb?: number;
    used_gb?: number;
    usage_percent?: number;
  };
  disk?: {
    total_gb?: number;
    used_gb?: number;
    usage_percent?: number;
  };
  uptime_seconds?: number;
}

interface Finding {
  type?: string;
  severity?: string;
  message?: string;
  process?: string;
  local_port?: number;
  remote_ip?: string;
  remote_port?: number;
}

interface ConnectionAnalysis {
  security_analysis?: {
    status?: string;
    total_findings?: number;
    findings?: Finding[];
  };
}

interface NetworkTraffic {
  total_interfaces?: number;
  interfaces?: Array<{
    interface: string;
    is_up: boolean;
    bytes_sent: number;
    bytes_received: number;
    packets_sent: number;
    packets_received: number;
  }>;
}

function formatBytes(bytes = 0): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

function formatUptime(seconds = 0): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <span>{title}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-subtitle">{subtitle}</div>
    </div>
  );
}

function App() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [connections, setConnections] =
    useState<ConnectionAnalysis | null>(null);
  const [traffic, setTraffic] = useState<NetworkTraffic | null>(null);

  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("--");
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [metricsResponse, connectionResponse, trafficResponse] =
        await Promise.all([
          fetch(`${API}/monitoring`),
          fetch(`${API}/security/connection-analysis`),
          fetch(`${API}/network-traffic`),
        ]);

      if (
        !metricsResponse.ok ||
        !connectionResponse.ok ||
        !trafficResponse.ok
      ) {
        throw new Error("One or more backend API requests failed.");
      }

      const [metricsData, connectionData, trafficData] =
        await Promise.all([
          metricsResponse.json(),
          connectionResponse.json(),
          trafficResponse.json(),
        ]);

      setMetrics(metricsData);
      setConnections(connectionData);
      setTraffic(trafficData);

      setConnected(true);
      setError("");
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setConnected(false);
      setError(
        err instanceof Error ? err.message : "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = window.setInterval(fetchData, 5000);

    return () => window.clearInterval(interval);
  }, [fetchData]);

  const findings =
    connections?.security_analysis?.findings ?? [];

  const cpu = metrics?.cpu_usage_percent ?? 0;
  const memory = metrics?.memory?.usage_percent ?? 0;
  const disk = metrics?.disk?.usage_percent ?? 0;

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>
          <div>
            <h2>NETWORK<span>AI</span></h2>
            <small>SECURITY INTELLIGENCE</small>
          </div>
        </div>

        <div className="sidebar-section">WORKSPACE</div>

        <nav className="sidebar-nav">
          <a href="#overview" className="nav-link active">▦ Overview</a>
          <a href="#network" className="nav-link">⌁ Network Monitor</a>
          <a href="#threats" className="nav-link">◈ Threat Detection</a>
          <a href="#connections" className="nav-link">⇄ Connections</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="protection-status">
            <span className="status-dot" />
            <div>
              <strong>AI Protection Active</strong>
              <small>Network intelligence monitoring</small>
            </div>
          </div>
          <small>NETWORK AI · VERSION 1.0.0</small>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / Overview</span>
            <h3>Security Overview</h3>
          </div>

          <div className="topbar-actions">
            <span className={connected ? "online-badge" : "offline-badge"}>
              <span className="status-dot" />
              {connected ? "SYSTEM ONLINE" : "DISCONNECTED"}
            </span>

            <button className="refresh-button" onClick={fetchData}>
              ↻ Refresh
            </button>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <span className="eyebrow">INTELLIGENT NETWORK SECURITY</span>
            <h1>Security Overview</h1>
            <p>
              Real-time network visibility and AI-powered threat intelligence.
            </p>
          </div>
          <div className="live-indicator">
            <span className="status-dot" />
            LIVE MONITORING
          </div>
        </section>

        {!connected && (
          <div className="error-banner">
            <strong>Backend connection unavailable</strong>
            <p>
              {error || "Start FastAPI on port 8000 and refresh the dashboard."}
            </p>
          </div>
        )}

        <section className="metrics-grid">
          <MetricCard
            title="CPU UTILIZATION"
            value={`${cpu.toFixed(1)}%`}
            subtitle="Processor usage"
            icon="⌁"
          />

          <MetricCard
            title="MEMORY USAGE"
            value={`${memory.toFixed(1)}%`}
            subtitle={`${metrics?.memory?.used_gb ?? 0} / ${metrics?.memory?.total_gb ?? 0} GB used`}
            icon="▤"
          />

          <MetricCard
            title="DISK UTILIZATION"
            value={`${disk.toFixed(1)}%`}
            subtitle={`${metrics?.disk?.used_gb ?? 0} / ${metrics?.disk?.total_gb ?? 0} GB used`}
            icon="▣"
          />

          <MetricCard
            title="SECURITY FINDINGS"
            value={String(findings.length)}
            subtitle="Review indicators"
            icon="◈"
          />
        </section>

        <section className="dashboard-grid">
          <div className="panel performance-panel">
            <div className="panel-header">
              <div>
                <h2>System Performance</h2>
                <p>Current CPU and memory utilization</p>
              </div>
              <span className="live-indicator">● LIVE</span>
            </div>

            <div className="performance-bars">
              <div className="performance-item">
                <div className="bar-label">
                  <span>CPU</span>
                  <strong>{cpu.toFixed(1)}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill cpu-fill"
                    style={{ width: `${Math.min(cpu, 100)}%` }}
                  />
                </div>
              </div>

              <div className="performance-item">
                <div className="bar-label">
                  <span>MEMORY</span>
                  <strong>{memory.toFixed(1)}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill memory-fill"
                    style={{ width: `${Math.min(memory, 100)}%` }}
                  />
                </div>
              </div>

              <div className="performance-item">
                <div className="bar-label">
                  <span>DISK</span>
                  <strong>{disk.toFixed(1)}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill disk-fill"
                    style={{ width: `${Math.min(disk, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <small className="muted">
              Last updated: {lastUpdated}
            </small>
          </div>

          <div className="panel security-panel" id="threats">
            <div className="panel-header">
              <div>
                <h2>Security Intelligence</h2>
                <p>Connection risk analysis</p>
              </div>
              <span className="live-indicator">
                {connected ? "ANALYZED" : "WAITING"}
              </span>
            </div>

            <div className="security-summary">
              <div>
                <span>Total findings</span>
                <strong>{findings.length}</strong>
              </div>
              <div>
                <span>High severity</span>
                <strong>
                  {findings.filter(
                    (item) => item.severity?.toUpperCase() === "HIGH"
                  ).length}
                </strong>
              </div>
              <div>
                <span>Medium severity</span>
                <strong>
                  {findings.filter(
                    (item) => item.severity?.toUpperCase() === "MEDIUM"
                  ).length}
                </strong>
              </div>
            </div>

            <p className="muted">
              Review indicators are not proof of malicious activity.
            </p>
          </div>
        </section>

        <section className="dashboard-grid lower-grid">
          <div className="panel" id="network">
            <div className="panel-header">
              <div>
                <h2>Network Interfaces</h2>
                <p>Traffic counters by interface</p>
              </div>
            </div>

            {traffic?.interfaces?.length ? (
              <div className="interface-list">
                {traffic.interfaces.map((item) => (
                  <div className="interface-item" key={item.interface}>
                    <div>
                      <strong>{item.interface}</strong>
                      <small>{item.is_up ? "Connected" : "Inactive"}</small>
                    </div>
                    <div>
                      <span>↑ {formatBytes(item.bytes_sent)}</span>
                      <span>↓ {formatBytes(item.bytes_received)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted">
                {loading ? "Loading network data..." : "No interface data available."}
              </p>
            )}
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>System Information</h2>
                <p>Monitored host details</p>
              </div>
            </div>

            <div className="system-info">
              <div>
                <span>Device</span>
                <strong>{metrics?.device ?? "Detecting..."}</strong>
              </div>
              <div>
                <span>Operating system</span>
                <strong>{metrics?.operating_system ?? "Detecting..."}</strong>
              </div>
              <div>
                <span>System uptime</span>
                <strong>
                  {metrics ? formatUptime(metrics.uptime_seconds) : "--"}
                </strong>
              </div>
              <div>
                <span>Monitoring interval</span>
                <strong>5 seconds</strong>
              </div>
              <div>
                <span>API connection</span>
                <strong>{connected ? "ONLINE" : "OFFLINE"}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="panel findings-panel" id="connections">
          <div className="panel-header">
            <div>
              <h2>Security Findings</h2>
              <p>Items that may require administrator review</p>
            </div>
            <span className="findings-count">{findings.length} FOUND</span>
          </div>

          {findings.length > 0 ? (
            <div className="findings-list">
              {findings.map((finding, index) => (
                <div className="finding-item" key={`${finding.type}-${index}`}>
                  <div>
                    <strong>{finding.type ?? "Security review"}</strong>
                    <p>{finding.message ?? "Review this connection."}</p>
                  </div>
                  <span className="severity-badge">
                    {finding.severity ?? "REVIEW"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">
              {connected
                ? "No rule-based findings currently reported."
                : "Waiting for backend security analysis..."}
            </p>
          )}
        </section>

        <footer className="footer">
          NETWORK AI · INTELLIGENT NETWORK MONITORING · ● OPERATIONAL
        </footer>
      </main>
    </div>
  );
}

export default App;

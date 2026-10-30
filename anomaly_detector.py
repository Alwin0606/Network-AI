
def analyze_metrics(metrics):
    alerts = []

    cpu = metrics["cpu_usage_percent"]
    memory = metrics["memory"]["usage_percent"]
    disk = metrics["disk"]["usage_percent"]

    if cpu > 85:
        alerts.append({
            "type": "HIGH_CPU_USAGE",
            "severity": "HIGH",
            "message": f"CPU usage is unusually high: {cpu}%"
        })

    if memory > 90:
        alerts.append({
            "type": "HIGH_MEMORY_USAGE",
            "severity": "HIGH",
            "message": f"Memory usage is unusually high: {memory}%"
        })

    if disk > 90:
        alerts.append({
            "type": "HIGH_DISK_USAGE",
            "severity": "MEDIUM",
            "message": f"Disk usage is unusually high: {disk}%"
        })

    return {
        "status": "ALERT" if alerts else "NORMAL",
        "total_alerts": len(alerts),
        "alerts": alerts
    }

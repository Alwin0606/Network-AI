
import ipaddress

# Common ports used by normal network services
COMMON_PORTS = {
    80, 443, 53, 123, 22, 25, 110, 143,
    465, 587, 993, 995, 5222
}

# Services that deserve review when listening on all interfaces
SENSITIVE_PORTS = {
    135, 139, 445, 1433, 3306, 3389, 5432, 5900
}


def is_public_ip(ip):
    try:
        address = ipaddress.ip_address(ip)
        return address.is_global
    except ValueError:
        return False


def analyze_connections(connection_data):
    findings = []

    for conn in connection_data.get("connections", []):

        remote_ip = conn.get("remote_ip")
        remote_port = conn.get("remote_port")
        local_ip = conn.get("local_ip")
        local_port = conn.get("local_port")
        status = conn.get("status")
        process = conn.get("process_name") or "Unknown"

        # Review sensitive services listening on all interfaces
        if status == "LISTEN":
            if local_ip in ("0.0.0.0", "::") and local_port in SENSITIVE_PORTS:
                findings.append({
                    "type": "SENSITIVE_SERVICE_EXPOSED",
                    "severity": "MEDIUM",
                    "process": process,
                    "local_port": local_port,
                    "message": (
                        f"{process} is listening on all interfaces "
                        f"on port {local_port}. Review firewall settings."
                    )
                })

        # Review established connections using unusual public ports
        if status == "ESTABLISHED" and remote_ip:
            if is_public_ip(remote_ip):
                if remote_port not in COMMON_PORTS:
                    findings.append({
                        "type": "UNUSUAL_REMOTE_PORT",
                        "severity": "MEDIUM",
                        "process": process,
                        "remote_ip": remote_ip,
                        "remote_port": remote_port,
                        "message": (
                            f"{process} has an established connection "
                            f"to a public IP using port {remote_port}."
                        )
                    })

    return {
        "status": "REVIEW_REQUIRED" if findings else "NORMAL",
        "total_findings": len(findings),
        "findings": findings,
        "note": (
            "These are rule-based review indicators, not proof of malicious activity."
        )
    }

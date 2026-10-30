
import psutil
from datetime import datetime, timezone


def get_active_connections():
    connections = []

    try:
        system_connections = psutil.net_connections(kind="inet")

        for conn in system_connections:
            if not conn.raddr and conn.status != "LISTEN":
                continue

            local_ip = conn.laddr.ip if conn.laddr else None
            local_port = conn.laddr.port if conn.laddr else None

            remote_ip = conn.raddr.ip if conn.raddr else None
            remote_port = conn.raddr.port if conn.raddr else None

            process_name = None

            if conn.pid:
                try:
                    process_name = psutil.Process(conn.pid).name()
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    process_name = "Unknown"

            connections.append({
                "process_id": conn.pid,
                "process_name": process_name,
                "local_ip": local_ip,
                "local_port": local_port,
                "remote_ip": remote_ip,
                "remote_port": remote_port,
                "status": conn.status
            })

        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "total_connections": len(connections),
            "connections": connections
        }

    except psutil.AccessDenied:
        return {
            "error": "Access denied. Run terminal as Administrator to inspect all connections."
        }

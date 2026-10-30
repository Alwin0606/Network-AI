
import psutil
from datetime import datetime, timezone


def get_network_traffic():
    interfaces = psutil.net_io_counters(pernic=True)
    interface_status = psutil.net_if_stats()

    results = []

    for name, stats in interfaces.items():
        status = interface_status.get(name)

        results.append({
            "interface": name,
            "is_up": status.isup if status else False,
            "bytes_sent": stats.bytes_sent,
            "bytes_received": stats.bytes_recv,
            "packets_sent": stats.packets_sent,
            "packets_received": stats.packets_recv,
            "errors_in": stats.errin,
            "errors_out": stats.errout
        })

    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_interfaces": len(results),
        "interfaces": results
    }

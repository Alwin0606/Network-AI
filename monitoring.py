
import psutil
import platform
from datetime import datetime, timezone


def get_system_metrics():
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("/" if platform.system() != "Windows" else "C:\\")

    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "device": platform.node(),
        "operating_system": platform.system(),
        "cpu_usage_percent": psutil.cpu_percent(interval=1),
        "memory": {
            "total_gb": round(memory.total / (1024 ** 3), 2),
            "used_gb": round(memory.used / (1024 ** 3), 2),
            "usage_percent": memory.percent
        },
        "disk": {
            "total_gb": round(disk.total / (1024 ** 3), 2),
            "used_gb": round(disk.used / (1024 ** 3), 2),
            "usage_percent": disk.percent
        },
        "uptime_seconds": round(
            datetime.now().timestamp() - psutil.boot_time()
        )
    }


import json
from pathlib import Path
from datetime import datetime, timezone


PROJECT_ROOT = Path(__file__).resolve().parents[3]
REPORTS_DIR = PROJECT_ROOT / "reports"


def save_security_report(report_data):
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now(timezone.utc)

    filename = (
        "security_report_"
        + timestamp.strftime("%Y%m%d_%H%M%S")
        + ".json"
    )

    report_path = REPORTS_DIR / filename

    report = {
        "report_id": filename,
        "generated_at": timestamp.isoformat(),
        "project": "Network AI",
        "report": report_data
    }

    with open(report_path, "w", encoding="utf-8") as file:
        json.dump(report, file, indent=4)

    return {
        "status": "success",
        "filename": filename,
        "report_path": str(report_path)
    }

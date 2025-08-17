# Home Test Project

This project includes **TiDB + TiKV + PD + TiCDC + Kafka + Zookeeper + Node.js Backend + Nginx Frontend**.

---

## Architecture

Frontend (Nginx) -> Backend (Node.js) -> TiDB <-> TiKV
|
v
Kafka <- TiCDC
^
|
Zookeeper

yaml
Copy
Edit

---

## Services

| Service           | Port           | Purpose |
|------------------|----------------|---------|
| Zookeeper         | 2181           | Manages Kafka cluster |
| Kafka             | 9092           | Messaging between Backend and TiCDC |
| PD                | 2379           | Placement Driver – manages TiKV/TiDB cluster |
| TiKV              | 20160          | Storage for TiDB |
| TiDB              | 4000 (SQL), 10080 (Status) | SQL Database |
| TiCDC             | 8300           | Change Data Capture, sends changes to Kafka |
| Backend (Node.js) | 5000           | Application API |
| Frontend (Nginx)  | 8080           | User Interface |

---

## Prerequisites

- Docker and Docker Compose installed
- Node.js (for backend development)
- MySQL client (optional, for testing TiDB)

---

## Installation & Running

1. **Navigate to project folder**:

```bash
cd home-test-project
Build and start all containers:

bash
Copy
Edit
docker-compose up --build -d
Check running containers:

bash
Copy
Edit
docker ps
Testing
Backend API:

bash
Copy
Edit
curl http://localhost:5000/status
# Should return: {"status":"ok"}
Frontend:

Open in browser: http://localhost:8080

TiDB (SQL) testing:

bash
Copy
Edit
docker exec -it home-test-tidb sh
# Inside the container:
tidb-server -V   # or connect using MySQL client
TiCDC logs:

bash
Copy
Edit
docker logs home-test-ticdc -f
Check that the changefeed is created without errors.

Restarting Containers
bash
Copy
Edit
docker-compose down
docker-compose up -d
Main Folders
backend/ – Node.js code, init.sql, ticdc-init.sh

frontend/ – Frontend code + Nginx Dockerfile

docker-compose.yml – Docker Compose configuration

Summary
After starting the containers, the project should work without issues with Frontend, Backend, and TiDB fully operational.
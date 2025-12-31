#!/usr/bin/env bash
set -euo pipefail

echo "Building and running docs site with Docker Compose..."
docker-compose up --build -d
echo "Site running at http://localhost:8080 (if Docker is available)"

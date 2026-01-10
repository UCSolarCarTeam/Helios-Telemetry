# Grafana + Telemetry Visualizer Setup

This document explains how to run the Grafana visualizer together with the Helios telemetry backend and a test MQTT publisher. Follow these steps to run everything locally.

## Overview

You will run three repositories locally (or in Docker):

- `Helios-Telemetry` — backend + Aedes MQTT server
- `Telemetry-Visualizer` — Grafana docker setup that hosts dashboards
- `Helios-Mqtt-Webserver-Test` — MQTT client container to publish test messages

## Prerequisites

- Node 18+
- Docker & `docker-compose`
- Ask your lead for required environment variable files for each repo.

## 1) Helios-Telemetry

1. Get the repo and set the environment variables provided by your lead in `packages/server/.env`.
2. Start the server (runs the Aedes MQTT server and backend):

```bash
yarn dev:server
```

Note: When running test MQTT publishers you may not want those fake packets written into DynamoDB. Locate the packet handler in the server code (the `handlePacketReceive` flow) and comment out the DB insert line when running locally:

```typescript
// this.dynamoDB.insertPacketData(message); // comment out for local testing
```

## 2) Telemetry-Visualizer

1. Clone or open the repo: `https://github.com/UCSolarCarTeam/Telemetry-Visualizer`
2. Start Grafana using docker-compose:

```bash
cd Telemetry-Visualizer/grafana
docker-compose up -d
```

After the container is up, open Grafana at `http://localhost:3000`.

Default login:

- Username: `admin`
- Password: `admin`

## 3) Helios-Mqtt-Webserver-Test (MQTT client)

This repo provides a test MQTT publisher to simulate telemetry.

1. Clone or open the repo: `https://github.com/UCSolarCarTeam/Helios-Mqtt-Webserver-Test`
2. Build and run the test publisher (this will publish test packets to the backend MQTT broker):

```bash
cd Helios-Mqtt-Webserver-Test
docker-compose up --build
```

Do not commit `.env` files containing secrets to the repository. Use a secure secrets manager or share them privately with your teammates.

## Accessing Grafana

Once the Grafana container is running, open:

```
http://localhost:3000
```

Login as `admin` / `admin` and verify the dashboards and data source configuration.

## WebSocket (Grafana) — quick setup

In Grafana (open `http://localhost:3000` and login): - Click **Explore** in the left-hand menu. - For **Data source**, choose **WebSocket API** (the WebSocket data source in the Telemetry-Visualizer setup). - In the **Field** input enter: `$.data`

You should now see the telemetry payload returned by the backend (the `data` object) in the Explore panel. The backend uses the `/grafana-ws` path for the WebSocket endpoint.

# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the Helios Telemetry system for the Calgary Solar Car team - a real-time telemetry dashboard for monitoring solar car performance during races and testing. The system receives MQTT telemetry data from the car and displays it through a modern web interface with features like real-time data visualization, lap timing, fault monitoring, and race analytics.

**Live Deployment**: https://telemetry-beta.calgarysolarcar.ca

## Architecture

### Monorepo Structure (Lerna + Yarn Workspaces)
- **`packages/client/`** - Next.js 15 frontend with React 19, TypeScript, TailwindCSS, Mantine UI
- **`packages/server/`** - Node.js/Express backend with Socket.IO, MQTT client, AWS DynamoDB integration
- **`packages/shared/`** - Shared TypeScript types and utilities between client/server
- **`packages/amplify/`** - AWS Amplify configuration and infrastructure
- **`packages/db/`** - Database schemas and migrations

### Key Technologies
- **Frontend**: Next.js 15, React 19, Socket.IO client, Mantine UI, TailwindCSS, Mapbox GL, Chart.js, Three.js
- **Backend**: Express.js, Socket.IO server, MQTT (using Aedes), AWS SDK (DynamoDB), SQLite for local dev
- **Real-time Communication**: Socket.IO for client-server, MQTT for car-to-server telemetry
- **Database**: AWS DynamoDB for production, SQLite for development
- **Deployment**: AWS Amplify, Docker support

### Data Flow
1. **Car → Server**: MQTT telemetry packets from solar car's onboard systems
2. **Server Processing**: Backend processes packets, stores in DynamoDB, calculates lap data
3. **Server → Client**: Socket.IO broadcasts real-time data to connected web clients
4. **Client Display**: React frontend renders telemetry dashboard with charts, maps, and metrics

### Core Components
- **PacketContext**: Manages real-time telemetry data from car sensors
- **LapDataContext**: Handles lap timing and race analytics
- **SocketContext**: WebSocket connection management for real-time updates
- **FaultsContext**: Car fault detection and alerting system
- **BackendController**: Main server orchestrator connecting MQTT, Socket.IO, and database

## Development Commands

### Setup
```bash
# Enable Yarn Berry and install dependencies
corepack enable
yarn set version berry
yarn install
```

### Development
```bash
# Start both client and server in development mode
yarn dev

# Start individual services
yarn dev:client    # Frontend only (Next.js with turbopack)
yarn dev:server    # Backend only (Node.js with nodemon)
```

### Building
```bash
# Build both client and server for production
yarn build

# Build individual services
yarn build:client
yarn build:server

# Start production builds
yarn start
yarn start:client
yarn start:server
```

### Code Quality
```bash
# Lint all packages
yarn lint

# Auto-fix linting issues
yarn lintf

# Run tests (when available)
yarn test
```

### Package Management
```bash
# Install dependencies for specific workspace
yarn workspaces focus client
yarn workspaces focus server

# Add package to specific workspace
yarn workspace client add package-name
yarn workspace server add package-name
```

## Environment Configuration

### Required Server Environment Variables (.env in packages/server):
```
LAP_POSITION_PASSWORD=     # Authentication for lap position updates
LAP_TABLE_NAME=           # DynamoDB lap data table name
PACKET_TABLE_NAME=        # DynamoDB telemetry packet table name  
DRIVER_TABLE_NAME=        # DynamoDB driver information table name
GPS_CALCULATED_LAP_DATA_TABLE=  # DynamoDB GPS-based lap calculations
MQTT_USERNAME=            # MQTT broker authentication
MQTT_PASSWORD=            # MQTT broker authentication
```

### Required Client Environment Variables (.env in packages/client):
```
NEXT_PUBLIC_MAPSAPIKEY=   # Google Maps/Mapbox API key for track visualization
```

## Key Context Systems

When working with the frontend, understand these React contexts that manage global state:

- **AppStateContext**: Overall application state (connection status, settings, UI state)
- **PacketContext**: Real-time telemetry data from car sensors (speed, battery, motor data)
- **LapDataContext**: Lap timing, race information, and track analytics
- **SocketContext**: WebSocket connection management and real-time event handling
- **FaultsContext**: Car fault detection, alerting, and fault history management

## Development Modes

The system supports multiple data sources:
- **Network Mode**: Connects to live MQTT telemetry from actual solar car
- **Demo Mode**: Uses faker.js to generate realistic telemetry for development/testing
- **Playback Mode**: Replay historical telemetry data for analysis

Switch modes using the settings toggle in the web interface.

## Code Style Guidelines

- ESLint configuration enforces TypeScript best practices
- Prettier handles code formatting with specific rules:
  - 2-space indentation
  - Double quotes for strings
  - Trailing commas
  - TailwindCSS plugin for class sorting
- Object keys and destructuring must be alphabetically sorted
- Imports organized with @trivago/prettier-plugin-sort-imports

## Testing Strategy

Individual packages may have their own test configurations. Check package.json in each workspace for available test commands. The project uses standard Jest/React Testing Library patterns where testing is implemented.

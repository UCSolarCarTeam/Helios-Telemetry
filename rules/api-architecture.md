# API Architecture Rules for Helios Telemetry Client

## Overview

This document defines the API architecture patterns and rules for the Helios Telemetry client application. All developers and AI coding assistants must follow these rules when working with API calls.

---

## 🚨 Critical Rules

### 1. Always Use Centralized API Route Constants

**✅ DO:**

```typescript
import { API_ROUTES } from '@/constants/apiRoutes';
import { api } from '@/lib/api';

const response = await api.get(API_ROUTES.ml.packetCorrelationMatrix);
```

**❌ DON'T:**

```typescript
// NEVER hardcode API URLs
const response = await fetch("/api/getPacketCorrelationMatrix");
const response = await axios.get("/api/getPacketCorrelationMatrix");
```

**Why:** Centralized constants provide type safety, prevent typos, and make refactoring easier.

---

### 2. Always Use Configured Axios Instances

**✅ DO:**

```typescript
import { api, backendApi } from '@/lib/api';
import { API_ROUTES, BACKEND_ROUTES } from '@/constants/apiRoutes';

// For Next.js API routes
const response = await api.get(API_ROUTES.ml.packetCorrelationMatrix);

// For direct backend calls
const response = await backendApi.get(BACKEND_ROUTES.laps.base);
```

**❌ DON'T:**

```typescript
// NEVER import axios directly in components/hooks
import axios from 'axios';
const response = await axios.get('/api/something');

// NEVER create new axios instances
const customAxios = axios.create({ timeout: 30000 });
```

**Why:** Centralized axios instances ensure consistent timeout, headers, and error handling across the application.

---

### 3. Never Use `prodURL` Directly in Client Code

**✅ DO:**

```typescript
import { backendApi } from '@/lib/api';
import { BACKEND_ROUTES } from '@/constants/apiRoutes';

const response = await backendApi.get(BACKEND_ROUTES.drivers.base);
const response = await backendApi.get(BACKEND_ROUTES.drivers.byRfid(12345));
```

**❌ DON'T:**

```typescript
// NEVER concatenate prodURL manually
import { prodURL } from '@shared/helios-types';
const response = await axios.get(`${prodURL}/drivers`);
const response = await fetch(`${prodURL}/driver/${rfid}`);
```

**Why:** The `backendApi` instance handles the base URL automatically and provides consistent configuration.

---

### 4. Add New Routes to Constants File

When creating new API endpoints, **always** add them to `packages/client/src/constants/apiRoutes.ts`.

**✅ DO:**

```typescript
// In packages/client/src/constants/apiRoutes.ts
export const API_ROUTES = {
  // ... existing routes ...

  /**
   * New feature endpoints
   */
  newFeature: {
    /** Get new feature data */
    getData: "/api/getNewFeatureData",
    /** Update new feature */
    update: "/api/updateNewFeature",
  },
} as const;

// In your component/hook
import { API_ROUTES } from '@/constants/apiRoutes';
import { api } from '@/lib/api';

const response = await api.get(API_ROUTES.newFeature.getData);
```

**❌ DON'T:**

```typescript
// NEVER use hardcoded URLs directly in components
const response = await fetch("/api/getNewFeatureData");
```

**Why:** Keeps all routes in one place for easy maintenance and refactoring.

---

## 📚 Type Safety Guidelines

### Use Exported Types for Route Values

**✅ DO:**

```typescript
import { API_ROUTES } from '@/constants/apiRoutes';

// Leverage TypeScript's typeof for type-safe route types
export type PlotTypes =
  | typeof API_ROUTES.ml.packetCorrelationMatrix
  | typeof API_ROUTES.ml.lapCorrelationMatrix;

function fetchData(endpoint: PlotTypes) {
  return api.get(endpoint);
}
```

**❌ DON'T:**

```typescript
// NEVER use string literals for route types
type PlotTypes = "/api/getPacketCorrelationMatrix" | "/api/getLapCorrelationMatrix";
```

**Why:** Using `typeof` on constants ensures types stay in sync with actual route values.

---

## 📝 Documentation Requirements

### Document All New Routes with JSDoc

**✅ DO:**

```typescript
export const API_ROUTES = {
  /**
   * Machine Learning endpoints
   */
  ml: {
    /** Get packet correlation matrix data */
    packetCorrelationMatrix: "/api/getPacketCorrelationMatrix",
    /** Get lap correlation matrix data */
    lapCorrelationMatrix: "/api/getLapCorrelationMatrix",
  },
} as const;
```

**❌ DON'T:**

```typescript
// NEVER add routes without documentation
export const API_ROUTES = {
  ml: {
    packetCorrelationMatrix: "/api/getPacketCorrelationMatrix",
    lapCorrelationMatrix: "/api/getLapCorrelationMatrix",
  },
} as const;
```

**Why:** Documentation helps developers understand the purpose of each endpoint.

---

## 🔧 Common Patterns

### Pattern 1: GET Request with Query Parameters

**✅ DO:**

```typescript
import { backendApi } from '@/lib/api';
import { BACKEND_ROUTES } from '@/constants/apiRoutes';

const response = await backendApi.get(BACKEND_ROUTES.playback.packetsBetween, {
  params: { startTime, endTime }
});
```

### Pattern 2: POST Request with Body Data

**✅ DO:**

```typescript
import { api } from '@/lib/api';
import { API_ROUTES } from '@/constants/apiRoutes';

const response = await api.post(API_ROUTES.auth.checkMQTTPassword, {
  password: 'secret'
});
```

### Pattern 3: Dynamic Route Parameters

**✅ DO:**

```typescript
import { backendApi } from '@/lib/api';
import { BACKEND_ROUTES } from '@/constants/apiRoutes';

const rfid = 12345;
const response = await backendApi.get(BACKEND_ROUTES.drivers.byRfid(rfid));
```

**❌ DON'T:**

```typescript
// NEVER use template literals for dynamic routes
const response = await axios.get(`${prodURL}/driver/${rfid}`);
```

### Pattern 4: Using in TanStack Query Hooks

**✅ DO:**

```typescript
import { api } from '@/lib/api';
import { API_ROUTES } from '@/constants/apiRoutes';
import { useQuery } from '@tanstack/react-query';

async function fetchData(endpoint: string) {
  const response = await api.get(endpoint);
  return response.data;
}

export function useMLData() {
  return useQuery({
    queryKey: ['ml', 'correlation-matrix'],
    queryFn: () => fetchData(API_ROUTES.ml.packetCorrelationMatrix),
  });
}
```

---

## 🚨 Common Mistakes to Avoid

### Mistake 1: Hardcoded URLs

**❌ BAD:**

```typescript
const response = await fetch("/api/getPacketCorrelationMatrix");
const response = await axios.get("/api/getLapCorrelationMatrix");
```

**✅ GOOD:**

```typescript
import { api } from '@/lib/api';
import { API_ROUTES } from '@/constants/apiRoutes';

const response = await api.get(API_ROUTES.ml.packetCorrelationMatrix);
const response = await api.get(API_ROUTES.ml.lapCorrelationMatrix);
```

### Mistake 2: Direct Axios Imports

**❌ BAD:**

```typescript
import axios from 'axios';

const response = await axios.get('/api/something');
```

**✅ GOOD:**

```typescript
import { api } from '@/lib/api';
import { API_ROUTES } from '@/constants/apiRoutes';

const response = await api.get(API_ROUTES.something);
```

### Mistake 3: Using prodURL Concatenation

**❌ BAD:**

```typescript
import { prodURL } from '@shared/helios-types';

const response = await axios.get(`${prodURL}/drivers`);
const response = await fetch(`${prodURL}/laps`);
```

**✅ GOOD:**

```typescript
import { backendApi } from '@/lib/api';
import { BACKEND_ROUTES } from '@/constants/apiRoutes';

const response = await backendApi.get(BACKEND_ROUTES.drivers.base);
const response = await backendApi.get(BACKEND_ROUTES.laps.base);
```

### Mistake 4: Creating Custom Axios Instances

**❌ BAD:**

```typescript
const customAxios = axios.create({
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

const response = await customAxios.get('/api/something');
```

**✅ GOOD:**

```typescript
import { api } from '@/lib/api';
import { API_ROUTES } from '@/constants/apiRoutes';

// The api instance already has 30s timeout and JSON headers configured
const response = await api.get(API_ROUTES.something);
```

---

## 🔄 Migration Guide

### Refactoring Existing Code

When you encounter code that doesn't follow these patterns, refactor it:

**BEFORE:**

```typescript
import axios from 'axios';
import { prodURL } from '@shared/helios-types';

const fetchLapData = async () => {
  const response = await axios.get(`${prodURL}/laps`);
  return response.data;
};
```

**AFTER:**

```typescript
import { backendApi } from '@/lib/api';
import { BACKEND_ROUTES } from '@/constants/apiRoutes';

const fetchLapData = async () => {
  const response = await backendApi.get(BACKEND_ROUTES.laps.base);
  return response.data;
};
```

---

## 📋 Checklist for New API Calls

Before adding a new API call, ensure:

- [ ] Route constant is added to `packages/client/src/constants/apiRoutes.ts`
- [ ] Route has JSDoc documentation
- [ ] Using `api` instance for Next.js API routes
- [ ] Using `backendApi` instance for direct backend calls
- [ ] Not importing axios directly
- [ ] Not using `prodURL` concatenation
- [ ] Type safety is maintained (using `typeof` for route types)

---

## 🎯 File Locations

- **Route Constants**: `packages/client/src/constants/apiRoutes.ts`
- **Axios Instances**: `packages/client/src/lib/api.ts`
- **Example Usage**: `packages/client/src/hooks/useMLCorrelationMatrix.ts`

---

## 💡 Benefits of This Architecture

1. **Type Safety**: Compile-time checking prevents typos and invalid routes
2. **Centralized Configuration**: Single source of truth for timeouts, headers, base URLs
3. **Easy Refactoring**: Change a route in one place, updates everywhere
4. **Consistent Error Handling**: All requests use the same interceptors
5. **Better Developer Experience**: Autocomplete for all routes
6. **Easier Testing**: Mock the axios instances instead of individual calls
7. **Performance**: Reuses axios instances instead of creating new ones

---

## 🔍 Future Enhancements

The architecture supports future improvements:

- **Request/Response Interceptors**: Add global error handling, logging, auth tokens
- **Retry Logic**: Use axios-retry for automatic retries on failure
- **Request Cancellation**: Use AbortController for cleanup
- **Custom Hooks**: Create domain-specific hooks (e.g., `useLaps()`, `useDrivers()`)
- **Response Caching**: Integrate with TanStack Query for intelligent caching
- **Request Deduplication**: Prevent duplicate simultaneous requests

---

## ⚠️ Enforcement

These rules are enforced through:

1. **TypeScript**: Type checking for route constants
2. **Code Review**: Manual review of API call patterns
3. **AI Assistants**: This document guides AI coding assistants

---

## 📞 Questions?

If you're unsure about how to implement an API call following these patterns, refer to:

- **Example Hook**: `packages/client/src/hooks/useMLCorrelationMatrix.ts`
- **Example Component**: `packages/client/src/components/containers/MLContainer.tsx`
- **Route Constants**: `packages/client/src/constants/apiRoutes.ts`
- **Axios Config**: `packages/client/src/lib/api.ts`

---

**Last Updated**: 2026-02-07
**Version**: 1.0.0

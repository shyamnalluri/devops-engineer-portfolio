---
title: Docker Multi-Stage Builds
date: 2024-11-10
summary: Shrink images and keep attack surface minimal with multi-stage builds.
tags: [docker, supply-chain, ci]
readingTime: 3 min
---

Multi-stage builds let you use heavy toolchains in one stage and copy only the artifacts into a slim runtime image.

```Dockerfile
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
USER 10001
CMD ["server.js"]
```

Tips:

- Pin base images by digest
- Use `npm ci` for reproducibility
- Switch to non-root user



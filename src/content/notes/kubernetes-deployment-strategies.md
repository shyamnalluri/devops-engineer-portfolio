---
title: Kubernetes Deployment Strategies
date: 2024-11-01
summary: A quick tour of rolling updates, blue/green, and canary releases in Kubernetes.
tags: [kubernetes, delivery, sre]
readingTime: 4 min
---

Choosing the right rollout strategy in Kubernetes balances safety and speed.

## Rolling updates

Default for Deployments. Incrementally replaces Pods with new ones.

- Pros: No downtime, simple
- Cons: Harder to instant-rollback traffic

## Blue/Green

Run two environments (blue=current, green=new). Flip traffic via Service or Ingress once healthy.

- Pros: Fast rollback
- Cons: Double capacity

## Canary

Route a small percentage to the new version first. Increase if healthy.

- Pros: Minimized blast radius
- Cons: Requires traffic shaping (Ingress, service mesh)

## Tips

- Use readiness/liveness probes
- Automate rollback with SLO-based alerts
- Record releases with annotations



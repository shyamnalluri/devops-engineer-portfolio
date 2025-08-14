---
title: Terraform Modules Best Practices
date: 2024-12-01
summary: Designing reusable, safe Terraform modules for teams.
tags: [terraform, iac, security]
readingTime: 5 min
---

Principles:

- Single-responsibility modules
- Explicit inputs/outputs with types and defaults
- Versioned providers and constraints
- Defensive `lifecycle` options for critical resources

Structure:

```
modules/
  vpc/
    main.tf
    variables.tf
    outputs.tf
environments/
  prod/
    main.tf
```

Quality:

- `terraform validate` in CI
- `tflint` and `checkov`
- Document examples in `README.md`



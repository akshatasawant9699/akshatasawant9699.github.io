---
title: "PLACEHOLDER: Why I'm building an eval-tested Salesforce ops agent"
date: 2026-11-20
description: "Placeholder post. Replace with the real write-up of why sf-ops-agent ships with a golden dataset and evals in CI."
tags: [AI agents, LLM evals, MCP]
placeholder: true
---

> **Placeholder content.** This post exists to show how local posts look. Replace or delete it.

Agents that call real systems need the same discipline as any other production code. For **sf-ops-agent** that means three things from day one:

1. **A golden dataset**: realistic questions with known-good answers, built on made-up data in a free Developer Edition org.
2. **An LLM-as-judge harness**: score each run for correctness, tool use and tone.
3. **Evals in CI**: a pull request that makes the agent worse should fail, just like a failing unit test.

## What the agent does

It's an MCP server exposing a small set of tools:

```python
@tool
def find_account(name: str) -> dict:
    """Look up an Account by name and return its key fields."""
```

More soon. Follow along on [GitHub](https://github.com/akshatasawant9699/sf-ops-agent).

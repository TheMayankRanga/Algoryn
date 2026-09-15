# Setup Guide

## Required tools

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Development server

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Troubleshooting

If this environment blocks installation with npm's project-scoped script policy, add a project-level .npmrc file containing:

```ini
allow-scripts=true
```

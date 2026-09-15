# Architecture Overview

## Frontend

This app uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion and Lucide icons for interaction polish

## Content model

The platform stores educational content in structured data files such as src/lib/content.ts. This keeps content separate from UI logic and makes future expansion easier.

## Route model

Major pages are organized by route:

- / for the landing page
- /learn for the curriculum
- /patterns for pattern recognition
- /visualizers for algorithm execution demos
- /roadmap for progression guides
- /leetcode for curated problem exploration

## Why this architecture matters

The design keeps the app easy to extend: new topics, patterns, and problems can be added to structured datasets instead of being hardcoded into one large component.

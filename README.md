# BizSim

Foundation for a university business-management simulation platform, built with Next.js, TypeScript, Tailwind CSS, and reusable UI primitives.

## Development

```bash
npm install
npm run dev
```

Student and lecturer foundations are available at `/student` and `/lecturer`. Product behavior, persistence, and authentication are intentionally deferred.

## Boundaries

```text
src/
├── app/                 Next.js routes and composition
├── components/          Shared UI and responsive layouts
├── features/
│   ├── student/         Student-specific features
│   └── lecturer/        Lecturer-specific features
├── domain/              Simulation concepts and rules
├── data/                Persistence/remote-data adapters
└── auth/                Authentication contracts/adapters
```

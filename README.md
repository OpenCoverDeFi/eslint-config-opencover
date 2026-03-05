# eslint-config-opencover

ESLint flat config for OpenCover's TypeScript coding style.

## Installation

```bash
pnpm add -D eslint-config-opencover eslint typescript
```

## Usage

### TypeScript project

```typescript
// eslint.config.ts
import opencover from 'eslint-config-opencover';

export default [...opencover];
```

### Next.js project

Install Next.js ESLint config alongside this package:

```bash
pnpm add -D eslint-config-next
```

```typescript
// eslint.config.ts
import opencover from 'eslint-config-opencover';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default [...nextVitals, ...nextTs, ...opencover];
```

OpenCover's config should come **last** so its rules take precedence.

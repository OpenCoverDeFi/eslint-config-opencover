import { defineConfig } from 'eslint/config';
import { opencoverConfig } from './dist/index.js';

export default defineConfig(...opencoverConfig);

import '@testing-library/jest-dom';
import { config } from 'dotenv';

config({ path: '.env.test' });

(global as any).import = {
  meta: {
    env: {
      VITE_API_URL: process.env.VITE_API_URL,
      VITE_API_TOKEN: process.env.VITE_API_TOKEN,
    },
  },
};

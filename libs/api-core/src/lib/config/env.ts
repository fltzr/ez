import { config } from 'dotenv';
import { cleanEnv, bool, port, str, url } from 'envalid';
import { resolve } from 'path';
import { cwd } from 'process';

const isProduction = process.env['NODE_ENV'] === 'production';

if (!isProduction) {
  config({ path: resolve(cwd(), 'apps/api-core/.env.local') });
}

export const env = cleanEnv(process.env, {
  /* General configuration */
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'production',
    devDefault: 'development',
  }),
  PORT: port({ devDefault: 3000 }),

  ORIGIN: url({ devDefault: 'http://localhost:4000' }),
  SESSION_SECRET: str({ default: '' }),
  CREDENTIALS: bool({ default: true }),

  LOG_FORMAT: str({
    choices: ['combined', 'dev', 'simple'],
    default: 'combined',
    devDefault: 'dev',
  }),
  LOG_DIR: str({ devDefault: 'logs' }),
  /* END general configuration */

  /* Database configuration */
  SUPABASE_URL: url(),
  SUPABASE_KEY: str(),
  /* END database configuration */
});

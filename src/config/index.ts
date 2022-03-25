import { envNumber, envString } from '../utils/env-unit';

const env = process.env.NODE_ENV==='prod'? 'prod':'dev';

export const typeormConfig:any = {
  dev: {
    type: 'mysql',
    host: envString('host_dev'),
    port: envNumber('port_dev'),
    username: envString('username_dev'),
    password: envString('password_dev'),
    database: envString('database_dev'),

    entities: ['src/entity/*.ts'],
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    synchronize: true,
    logging: false
  },
  prod: {
    type: 'mysql',
    host: envString('host_prod'),
    port: envNumber('port_prod'),
    username: envString('username_prod'),
    password: envString('password_prod'),
    database: envString('database_prod'),

    // entities: ['dist/**/*.entity{.ts,.js}'],
    entities: ['src/entity/*.ts'],
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
  }
};

export const typeorm = typeormConfig[env];

export const apiKey=envString('api_key');

export const secretKey=envString('secret_key');

export const log_dir=envString('log_dir');

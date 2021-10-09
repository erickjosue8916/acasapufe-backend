export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export interface EnvConfig {
  environment: Environment;
  port: number;
}

export const environment = (): EnvConfig => ({
  environment: process.env.NODE_ENV as Environment,
  port: parseInt(process.env.PORT, 10) || 3000,
});

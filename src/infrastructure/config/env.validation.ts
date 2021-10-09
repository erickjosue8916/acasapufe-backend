import { plainToClass } from 'class-transformer';
import {
  isDataURI,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  GCP_FIRESTORE_PROJECT_ID: string;

  @IsString()
  GCP_FIRESTORE_COLLECTION_CUSTOMERS: string;

  @IsString()
  GCP_FIRESTORE_COLLECTION_ISSUES: string;

  @IsString()
  GCP_FIRESTORE_COLLECTION_COUNTER_LOGS: string;

  @IsString()
  @IsOptional()
  GOOGLE_APPLICATION_CREDENTIALS: string;

  @IsString()
  JWT_SECRET_KEY: string;

  @IsNumber()
  JWT_TOKEN_DURATION_MS: number;
}

export const validateEnv = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export interface JwtConfig {
  secretKey: string;
  tokenExpirationMs: number;
}

export const jwt = (): JwtConfig => ({
  secretKey: process.env.JWT_SECRET_KEY,
  tokenExpirationMs: parseInt(process.env.JWT_TOKEN_DURATION_MS, 10) || 3600,
});

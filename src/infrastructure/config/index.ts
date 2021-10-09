import { jwt } from './jwt.config';
import { google } from './google/google.config';
import { environment } from './env.config';

export const configurations = () => [jwt, google, environment];

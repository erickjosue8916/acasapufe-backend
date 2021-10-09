import { FirestoreConfig, firestore } from './firestore.config';

export interface GoogleConfig {
  firestore: FirestoreConfig;
}

export const google = (): GoogleConfig => ({
  firestore: firestore(),
});

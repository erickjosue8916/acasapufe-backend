export interface FirestoreCollectionsConfig {
  customers: string;
  issues: string;
  counter_logs: string;
  requests: string;
  users: string;
  invoices: string;
}

export interface FirestoreConfig {
  projectId: string;
  collections: FirestoreCollectionsConfig;
}

export const firestore = (): FirestoreConfig => ({
  projectId: process.env.GCP_FIRESTORE_PROJECT_ID,
  collections: {
    customers: process.env.GCP_FIRESTORE_COLLECTION_CUSTOMERS,
    issues: process.env.GCP_FIRESTORE_COLLECTION_ISSUES,
    counter_logs: process.env.GCP_FIRESTORE_COLLECTION_COUNTER_LOGS,
    requests: process.env.GCP_FIRESTORE_COLLECTION_REQUESTS,
    users: process.env.GCP_FIRESTORE_COLLECTION_USERS,
    invoices: process.env.GCP_FIRESTORE_COLLECTION_INVOICES,
  },
});

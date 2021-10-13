import { GoogleClient } from './google-client';
import { Firestore } from '@google-cloud/firestore';

export class FirestoreClient extends GoogleClient<Firestore> {
  constructor(projectId: string) {
    super(projectId);
    this.client = new Firestore({
      projectId,
    });
  }

  public getCollection(
    collectionPath: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    const result = this.client.collection(collectionPath);
    return result;
  }

  public async createDocumentWithCustomId<T>(
    collectionPath: string,
    id: string,
    data: T,
  ) {
    const collection = this.getCollection(collectionPath);
    const result = await collection.doc(id).set(data);
    return result;
  }

  public async createDocument<T>(collectionPath: string, data: T) {
    const collection = this.getCollection(collectionPath);
    const result = await collection.add(data);
    return result;
  }

  public getDataFromDocument(
    document: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  ) {
    const data = {
      id: document.id,
      ...document.data(),
    };
    return data;
  }

  public async parseFirestoreItemsResponse(
    rowResponse: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  ) {
    const data = [];
    rowResponse.forEach((doc) => {
      data.push(this.getDataFromDocument(doc));
    });
    return data;
  }

  public async getDocumentById(collectionPath: string, id: string) {
    const collection = this.getCollection(collectionPath);
    const document = collection.doc(id);
    return document;
  }

  public async update(
    documentRef: FirebaseFirestore.DocumentReference,
    payload,
  ) {
    await this.client.runTransaction(async (transaction) => {
      transaction.update(documentRef, payload);
    });
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirestoreClient } from 'src/core/base-classes/firestore-client.base';
import { FirestoreCollectionsConfig } from 'src/infrastructure/config/google/firestore.config';

@Injectable()
export class MainDbService extends FirestoreClient {
  public collections: FirestoreCollectionsConfig;
  constructor(private readonly config: ConfigService) {
    super(config.get<string>('firestore.projectId'));
    this.collections = config.get<FirestoreCollectionsConfig>(
      'firestore.collections',
    );
  }
}

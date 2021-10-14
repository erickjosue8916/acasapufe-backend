import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class UserLoginPipe implements PipeTransform {
  private collectionName: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = this.dbService.collections.users;
    this.collectionRef = this.dbService.getCollection(this.collectionName);
  }
  async transform(
    credentials: LoginDTO,
    metadata: ArgumentMetadata,
  ): Promise<
    FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  > {
    const response = await this.collectionRef
      .where('username', '==', credentials.username)
      .get();
    const [user] = await this.dbService.parseFirestoreItemsResponse(response);
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    const isInvalidPassword = user.password !== credentials.password;
    if (isInvalidPassword) {
      throw new HttpException(`Invalid Password!!!`, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

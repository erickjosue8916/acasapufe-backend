/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  Injectable,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationRequestPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException({
        errors: this.getLegibleErrors(errors),
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getErrors(error: ValidationError): string[] {
    const errors = error.constraints;
    const errorsAsStringArray: string[] = [];
    for (const key in errors) {
      const errorDescription = errors[key];
      errorsAsStringArray.push(errorDescription);
    }
    return errorsAsStringArray;
  }

  private getLegibleErrors(errors: ValidationError[]): string[] {
    const errorsString = errors.reduce(
      (prev: string[], curr: ValidationError) => {
        const messages = this.getErrors(curr);
        return prev.concat(messages);
      },
      [],
    );
    return errorsString;
  }
}

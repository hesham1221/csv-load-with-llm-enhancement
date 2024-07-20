import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  jsonParser({
    data,
    silent,
    defaultValue,
  }: {
    data: string;
    silent?: boolean;
    defaultValue?: any;
  }) {
    try {
      return JSON.parse(data);
    } catch (error) {
        console.log(data)
      if (!silent) {
        console.error(error);
        throw error;
      }
      return defaultValue || null;
    }
  }
}

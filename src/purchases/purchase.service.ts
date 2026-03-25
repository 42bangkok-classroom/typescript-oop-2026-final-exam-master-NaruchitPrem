import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Purchase } from './purchase.interface';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  private readonly dataPath = path.join(
    process.cwd(),
    'data',
    'purchases.json',
  );

  findAll(): Purchase[] {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    const purchase = JSON.parse(rawData) as Purchase[];
    return purchase;
  }

  findOne(id: number, fields?: string[]) {
    try {
      const purchases = this.findAll();
      const purchase = purchases.find((u) => Number(u.id) === id);

      if (!purchase) {
        throw new NotFoundException('Purchase with id 999 not found');
      }

      if (fields) {
        const filteredPurchase: Partial<Purchase> = {};

        fields.forEach((field) => {
          const key = field as keyof Purchase;

          if (purchase[key] !== undefined) {
            filteredPurchase[key] = purchase[key] as never;
          }
        });

        return filteredPurchase;
      }

      return purchase;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Purchase with id 999 not found');
    }
  }

  create(createUserDto: CreatePurchaseDto) {
    try {
      const filePath = path.join(process.cwd(), 'data', 'purchases.json');

      const purchases = this.findAll();

      let maxId = 0;
      if (purchases.length > 0) {
        const ids = purchases.map((u) => parseInt(String(u.id), 10));
        maxId = Math.max(...ids);
      }
      const newId = String(maxId + 1);

      const newPurchase = {
        id: newId,
        ...createUserDto,
      };

      purchases.push(newPurchase as unknown as Purchase);

      fs.writeFileSync(filePath, JSON.stringify(purchases, null, 2), 'utf-8');

      return newPurchase;
    } catch {
      throw new InternalServerErrorException('Cannot create user');
    }
  }
}

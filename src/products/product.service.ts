import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from './product.interface';

@Injectable()
export class ProductService {
  private readonly dataPath = path.join(process.cwd(), 'data', 'products.json');

  test() {
    return [];
  }

  findAll(): Product[] {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    const product = JSON.parse(rawData) as Product[];
    return product;
  }
}

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Purchase } from './purchase.interface';

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
}

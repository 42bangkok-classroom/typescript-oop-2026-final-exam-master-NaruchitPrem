import { IsNotEmpty, IsString } from 'class-validator';
import { PurchaseItem } from '../purchase.interface';

export class CreatePurchaseDto {
  @IsNotEmpty({
    message:
      'Validation failed: customerName should not be empty, items must contain at least 1 item',
  })
  @IsString()
  customerName: string;

  @IsNotEmpty({
    message:
      'Validation failed: customerName should not be empty, items must contain at least 1 item',
  })
  items: PurchaseItem[];

  purchaseDate: string;
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.interface';
import type { ApiResponse } from 'src/interfaces/response.interface';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get('purchases')
  findAll(): ApiResponse<Purchase[]> {
    const result = this.purchaseService.findAll();
    return {
      success: true,
      data: result,
      message: 'Fetched purchases successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query('fields') fields?: string) {
    let fieldsArray: string[] | undefined;

    if (fields) {
      fieldsArray = fields.split(',').map((field) => field.trim());
    }

    return this.purchaseService.findOne(id, fieldsArray);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.interface';
import type { ApiResponse } from 'src/interfaces/response.interface';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  findAll(): ApiResponse<Product[]> {
    const result = this.productService.findAll();
    return {
      success: true,
      data: result,
      message: 'Fetched products successfully',
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  findAll() {
    const result = this.productService.findAll();
    return {
      success: true,
      data: result,
      message: 'Fetched products successfully',
    };
  }
}

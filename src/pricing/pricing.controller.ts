import { Controller, Get, Param } from '@nestjs/common';
import { PricingService, Series } from './pricing.service';

@Controller('pricing')
export class PricingController {

  constructor(private readonly pricingService: PricingService) {}

  // gets latest price
  @Get(':id')
  async getSinglePrice(@Param() params) {
    const prices = await this.pricingService.getStockPrices(params.id, Series.Single);
    return `The latest price of ${params.id} is ${prices[0]}.`;
  }

  // gets prices since SOD
  @Get('/day/:id')
  async getDayPrices(@Param() params) {
    const prices = await this.pricingService.getStockPrices(params.id, Series.IntraDay);
    return prices
  }

  // gets prices since BOM
  @Get('/month/:id')
  async getMonthPrices(@Param() params) {
    const prices = await this.pricingService.getStockPrices(params.id, Series.Month);
    return prices
  }


  // gets 1 year of prices
  @Get('/year/:id')
  getYearPrices(@Param() params) {
    console.log(params.id);
    return params.id
  }

  // gets 5 years of prices
  @Get('/fiveyear/:id')
  getFiveYearPrices(@Param() params) {
    console.log(params.id);
    return params.id
  }

}

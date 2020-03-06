import { Module, HttpModule } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';

@Module({
  imports: [HttpModule],
  providers: [PricingService],
  controllers: [PricingController]
})
export class PricingModule {}

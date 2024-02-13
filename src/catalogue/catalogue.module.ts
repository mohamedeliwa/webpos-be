import { Module } from '@nestjs/common';
import { CatalogueController } from './controllers/catalogue.controller';
import { CatalogueService } from './services/catalogue.service';

@Module({
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}

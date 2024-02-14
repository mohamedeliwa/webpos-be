import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatalogueService } from '../services/catalogue.service';
import { Item } from '../dtos/ItemResponse.dto';
import { CheckItemAvailabilityParams } from '../dtos/checkItemAvailabilityParams.dto';
import getGiftLovCustomDateFormat from 'src/utils/getGiftLovCustomDateFormat';
import { Signature } from 'src/types/signature';

@ApiTags('Catalogue')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('catalogue')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Get('items')
  async getItems(
    @Headers() headers: { authorization: string },
  ): Promise<Item[]> {
    if (!headers?.authorization)
      throw new BadRequestException('token must be supplied');

    const date = getGiftLovCustomDateFormat();
    const signature: Signature = {
      content: 'items' + 'GET' + date + headers.authorization,
      token: headers.authorization,
      date,
    };

    return this.catalogueService.getItems(signature);
  }

  @Get('checkItemAvailability/:cardIdentifier/:value')
  async checkItemAvailability(
    @Headers() headers: { authorization: string },
    @Param() params: CheckItemAvailabilityParams,
  ): Promise<{ available: boolean }> {
    console.log('executed');

    if (!headers?.authorization)
      throw new BadRequestException('token must be supplied');

    const date = getGiftLovCustomDateFormat();
    const signature: Signature = {
      content:
        `checkItemAvailability/${params.cardIdentifier}/${params.value}` +
        'GET' +
        date +
        headers.authorization,
      token: headers.authorization,
      date,
    };

    return this.catalogueService.checkItemAvailability(signature, params);
  }
}

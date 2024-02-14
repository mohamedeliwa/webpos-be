import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Item } from '../dtos/ItemResponse.dto';
import { CheckItemAvailabilityParams } from '../dtos/checkItemAvailabilityParams.dto';
import axios from 'axios';
import { sha512 } from 'js-sha512';
import { Signature } from 'src/types/signature';

@Injectable()
export class CatalogueService {
  constructor(private configService: ConfigService) {}

  base_url = this.configService.get<string>('BASE_URL');
  secret_key = this.configService.get<string>('SECRET_KEY');

  async getItems(signature: Signature): Promise<Item[]> {
    const signature_hash = sha512.hmac(this.secret_key, signature.content);
    try {
      const response = await axios.get<Item[]>(`${this.base_url}/items`, {
        headers: {
          'X-Giftlov-Date': signature.date,
          Authorization: signature.token,
          Signature: signature_hash,
        },
      });
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        error?.response?.data?.message || error.message,
      );
    }
  }

  async checkItemAvailability(
    signature: Signature,
    { cardIdentifier, value }: CheckItemAvailabilityParams,
  ): Promise<{ available: boolean }> {
    const signature_hash = sha512.hmac(this.secret_key, signature.content);
    try {
      const response = await axios.get<{ available: boolean }>(
        `${this.base_url}/checkItemAvailability/${cardIdentifier}/${value}`,
        {
          headers: {
            'X-Giftlov-Date': signature.date,
            Authorization: signature.token,
            Signature: signature_hash,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        error?.response?.data?.message || error.message,
      );
    }
  }
}

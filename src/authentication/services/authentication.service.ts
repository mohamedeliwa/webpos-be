import { BadRequestException, Injectable } from '@nestjs/common';
import { CredentialsDto } from '../dtos/Credentials.dto';
import { TokenResponseDto } from '../dtos/TokenResponse.dto';
import { sha512 } from 'js-sha512';
import { ConfigService } from '@nestjs/config';
import getGiftLovCustomDateFormat from 'src/utils/getGiftLovCustomDateFormat';
import axios from 'axios';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

  base_url = this.configService.get<string>('BASE_URL');
  secret_key = this.configService.get<string>('SECRET_KEY');

  async generateToken(credentials: CredentialsDto): Promise<TokenResponseDto> {
    try {
      const response = await axios.post<TokenResponseDto>(
        `${this.base_url}/generateToken`,
        credentials,
        {
          headers: {
            'X-GIFTLOV-DATE': getGiftLovCustomDateFormat(),
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

  async checkToken(token: string): Promise<TokenResponseDto> {
    const date = getGiftLovCustomDateFormat();
    const signature = 'checkToken' + 'POST' + date + token;
    const hash = sha512.hmac(this.secret_key, signature);

    try {
      const response = await axios.post<TokenResponseDto>(
        `${this.base_url}/checkToken`,
        {},
        {
          headers: {
            Authorization: token,
            Signature: hash,
            'X-Giftlov-Date': date,
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

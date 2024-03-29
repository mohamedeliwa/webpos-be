import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../services/authentication.service';
import { CredentialsDto } from '../dtos/Credentials.dto';
import { TokenResponseDto } from '../dtos/TokenResponse.dto';

@ApiTags('Authentication')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidUnknownValues: true,
  }),
)
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<TokenResponseDto> {
    return await this.authenticationService.generateToken(credentials);
  }

  @Post('checkAuth')
  async checkAuth(
    @Headers() headers: { authorization: string },
  ): Promise<TokenResponseDto> {
    if (!headers?.authorization)
      throw new BadRequestException('token must be supplied');
    return await this.authenticationService.checkToken(headers.authorization);
  }
}

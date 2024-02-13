import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({
    type: String,
    required: true,
    minLength: 15,
    maxLength: 50,
    description: 'username of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 12,
    maxLength: 50,
    description: 'password of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(50)
  password: string;
}

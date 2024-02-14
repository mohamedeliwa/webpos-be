import { IsNotEmpty, IsString } from 'class-validator';

export class CheckItemAvailabilityParams {
  @IsNotEmpty()
  @IsString()
  cardIdentifier: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

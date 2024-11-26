import { IsString, IsInt, IsUrl, Min, Max, MinLength } from 'class-validator';

export class CreateTravelDto {
  @IsString()
  @MinLength(1)
  destination: string;

  @IsString()
  @MinLength(30)
  description: string;

  @IsUrl()
  imgUrl: string;

  @IsInt()
  price: number;

  @IsInt()
  @Min(0)
  @Max(50)
  discount: number = 0;
}
import { IsNumber, IsString } from 'class-validator';

export class RunDto {
  @IsNumber()
  input_num: number;

  @IsString()
  input_text: string;
}

import { IsOptional, IsString } from "class-validator";

export class FileUpdateDTO {
  @IsString()
  @IsOptional()
  name!: string;
  
  @IsString()
  @IsOptional()
  savedName!: string;
  
  @IsString()
  @IsOptional()
  url!: string;
}
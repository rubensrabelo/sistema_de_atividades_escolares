import { IsOptional, IsString, IsUrl } from "class-validator";

export class FileUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;
  
  @IsString()
  @IsOptional()
  savedName?: string;
  
  @IsUrl()
  @IsOptional()
  url?: string;
}
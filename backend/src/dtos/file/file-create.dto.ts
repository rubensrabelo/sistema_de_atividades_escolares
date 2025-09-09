import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class FileCreateDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @IsString()
  @IsNotEmpty()
  savedName!: string;
  
  @IsUrl()
  @IsNotEmpty()
  url!: string;
}
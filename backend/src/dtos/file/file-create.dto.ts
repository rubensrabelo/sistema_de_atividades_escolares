import { IsNotEmpty, IsString } from "class-validator";

export class FileCreateDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @IsString()
  @IsNotEmpty()
  savedName!: string;
  
  @IsString()
  @IsNotEmpty()
  url!: string;
}
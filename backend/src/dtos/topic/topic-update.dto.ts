import { IsOptional, IsString } from "class-validator";
import { TopicType } from "../../models/enums/topic-type.enum";

export class TopicUpdateDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  type?: TopicType;

  @IsString()
  @IsOptional()
  description?: string;
}
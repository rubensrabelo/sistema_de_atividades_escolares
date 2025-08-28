import { Types } from "mongoose";
import { TopicType } from "../../models/enums/topic-type.enum";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TopicCreateDTO {
    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsString()
    @IsNotEmpty()
    type!: TopicType;

    @IsString()
    @IsOptional()
    description?: string;
}
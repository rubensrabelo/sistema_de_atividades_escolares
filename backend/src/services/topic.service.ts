import { TopicCreateDTO } from "../dtos/topic/topic-create.dto";
import { TopicResponseDTO } from "../dtos/topic/topic-response.dto";
import { ITopicDocument } from "../models/interfaces/topic.interface";
import { Topic } from "../models/topic.model";

export class TopicService {
    async create(data: TopicCreateDTO, courseId: string): Promise<TopicResponseDTO> {
        const topic: ITopicDocument = new Topic({
            ...data,
            courseId
        });
        const topicSaved: ITopicDocument = await topic.save();

        return new TopicResponseDTO(
            topicSaved.id.toString(),
            topicSaved.title,
            topicSaved.type,
            topicSaved.courseId.toString(),
            topicSaved.createdAt!,
            topicSaved.updatedAt!,
            topicSaved.description
        );
    }

    
    async update() { }
    
    async delete() { }

    async getById() { }

    async getAllByCourse() { }
}
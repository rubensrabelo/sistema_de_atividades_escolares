import { TopicCreateDTO } from "../dtos/topic/topic-create.dto";
import { TopicResponseDTO } from "../dtos/topic/topic-response.dto";
import { TopicUpdateDTO } from "../dtos/topic/topic-update.dto";
import { ITopicDocument } from "../models/interfaces/topic.interface";
import { Topic } from "../models/topic.model";
import { TopicNotFoundError } from "./exceptions/topic-not-found.error";

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


    async update(id: string, data: TopicUpdateDTO): Promise<TopicResponseDTO | null> {
        const topicUpdated: ITopicDocument | null = await Topic.findByIdAndUpdate(id, { $set: data }, { new: true });

        if (!topicUpdated)
            throw new TopicNotFoundError();

        return new TopicResponseDTO(
            topicUpdated.id.toString(),
            topicUpdated.title,
            topicUpdated.type,
            topicUpdated.courseId.toString(),
            topicUpdated.createdAt!,
            topicUpdated.updatedAt!,
            topicUpdated.description
        );
    }

    async delete(id: string): Promise<void> {
        const topicDeleted: ITopicDocument | null = await Topic.findByIdAndDelete(id);

        if (!topicDeleted)
            throw new TopicNotFoundError();
    }

    async getById(id: string): Promise<TopicResponseDTO | null> {
        const topic: ITopicDocument | null = await Topic.findById(id);

        if (!topic)
            throw new TopicNotFoundError();

        return new TopicResponseDTO(
            topic.id.toString(),
            topic.title,
            topic.type,
            topic.courseId.toString(),
            topic.createdAt!,
            topic.updatedAt!,
            topic.description
        );
    }

    async getAllByCourse(courseId: string): Promise<TopicResponseDTO[]> {
        const topics: ITopicDocument[] = await Topic.find({ courseId });

        return topics.map(
            topic =>
                new TopicResponseDTO(
                    topic.id.toString(),
                    topic.title,
                    topic.type,
                    topic.courseId.toString(),
                    topic.createdAt!,
                    topic.updatedAt!,
                    topic.description
                )
        );
    }
}
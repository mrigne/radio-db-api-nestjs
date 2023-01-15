import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Container } from '../../../entities/container/container.entity';
import { User } from '../../../entities/user/user.entity';
import { ContainerCreateDto } from '../dto/container.create.dto';
import { ContainerUpdateDto } from '../dto/container.update.dto';

@Injectable()
export class ContainerService {
    constructor(@InjectRepository(Container) private containerRepository: Repository<Container>) {
    }

    public async getContainers(user: User): Promise<Container[]> {
        const userContainers = await this.containerRepository.findBy({
            userId: user.userId
        });
        return userContainers || [];
    }

    public async getContainerById(user: User, containerId: string): Promise<Container> {
        return this.containerRepository.findOneBy({
            id: containerId,
            userId: user.userId
        });
    }

    public async createContainer(user: User, container: ContainerCreateDto): Promise<Container> {
        const newContainer = this.containerRepository.create({
            ...container,
            userId: user.userId
        });
        return this.containerRepository.save(newContainer);
    }

    public async updateContainer(user: User, containerId: string, container: ContainerUpdateDto): Promise<Container> {
        await this.checkThatContainerExistOrThrowNotFoundError(user, containerId);
        const updatedContainer = this.containerRepository.create({
            ...container,
            id: containerId,
            userId: user.userId
        });
        return this.containerRepository.save(updatedContainer);
    }

    public async deleteContainer(user: User, containerId: string): Promise<void> {
        await this.checkThatContainerExistOrThrowNotFoundError(user, containerId);
        const existingContainer = await this.containerRepository.findOneBy({
            id: containerId,
            userId: user.userId
        });

        await this.containerRepository.remove(existingContainer);
    }

    public async checkThatContainerExistOrThrowNotFoundError(user: User, containerId: string): Promise<void> {
        const isContainerExists = await this.containerRepository.exist({
            where: {
                id: containerId,
                userId: user.userId
            }
        });
        if (!isContainerExists) {
            throw new NotFoundException(`Container with Id=${containerId} does not exist`);
        }
    }
}

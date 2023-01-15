import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Container } from '../../../entities/container/container.entity';
import { ContainerCreateDto } from '../dto/container.create.dto';
import { ContainerUpdateDto } from '../dto/container.update.dto';
import { ContainerService } from '../services/container.service';

@ApiBearerAuth()
@ApiTags('containers')
@Controller('containers')
export class ContainerController {
    constructor(private containerService: ContainerService) {
    }

    @Get()
    async getAllContainers(@Req() req): Promise<Container[]> {
        return this.containerService.getContainers(req.user);
    }

    @Post()
    async createContainer(@Req() req, @Body() createContainer: ContainerCreateDto): Promise<Container> {
        return this.containerService.createContainer(req.user, createContainer);
    }

    @Patch(':id')
    async updateContainer(@Req() req, @Param('id') id: string, @Body() updateContainer: ContainerUpdateDto): Promise<Container> {
        return this.containerService.updateContainer(req.user, id, updateContainer);
    }

    @Delete(':id')
    async deleteContainer(@Req() req, @Param('id') id: string): Promise<void> {
        return this.containerService.deleteContainer(req.user, id);
    }

    @Get(':id')
    async getOneContainerById(@Req() req, @Param('id') id: string): Promise<Container> {
        await this.containerService.checkThatContainerExistOrThrowNotFoundError(req.user, id);
        return this.containerService.getContainerById(req.user, id);
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Item } from '../../../entities/item/item.entity';
import { ItemCreateDto } from '../dto/item.create.dto';
import { ItemUpdateDto } from '../dto/item.update.dto';
import { ItemService } from '../services/item.service';

@ApiBearerAuth()
@ApiTags('items')
@Controller('items')
export class ItemController {
    constructor(private itemService: ItemService) {
    }

    @Get()
    async getAllItems(@Req() req): Promise<Item[]> {
        return this.itemService.getItems(req.user);
    }

    @Post()
    async createItem(@Req() req, @Body() createItem: ItemCreateDto): Promise<Item> {
        return this.itemService.createItem(req.user, createItem);
    }

    @Patch(':id')
    async updateItem(@Req() req, @Param('id') id: string, @Body() updateItem: ItemUpdateDto): Promise<Item> {
        return this.itemService.updateItem(req.user, id, updateItem);
    }

    @Delete(':id')
    async deleteItem(@Req() req, @Param('id') id: string): Promise<void> {
        return this.itemService.deleteItem(req.user, id);
    }

    @Get(':id')
    async getOneItemById(@Req() req, @Param('id') id: string): Promise<Item> {
        await this.itemService.checkThatItemExistOrThrowNotFoundError(req.user, id);
        return this.itemService.getItemById(req.user, id);
    }
}

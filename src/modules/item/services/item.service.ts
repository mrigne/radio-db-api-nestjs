import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../../entities/item/item.entity';
import { User } from '../../../entities/user/user.entity';
import { ItemCreateDto } from '../dto/item.create.dto';
import { ItemUpdateDto } from '../dto/item.update.dto';

@Injectable()
export class ItemService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {
    }

    public async getItems(user: User): Promise<Item[]> {
        const userItems = await this.itemRepository.findBy({
            userId: user.userId
        });
        return userItems || [];
    }

    public async getItemById(user: User, itemId: string): Promise<Item> {
        return this.itemRepository.findOneBy({
            id: itemId,
            userId: user.userId
        });
    }

    public async createItem(user: User, item: ItemCreateDto): Promise<Item> {
        const newItem = this.itemRepository.create({
            ...item,
            userId: user.userId
        });
        return this.itemRepository.save(newItem);
    }

    public async updateItem(user: User, itemId: string, item: ItemUpdateDto): Promise<Item> {
        await this.checkThatItemExistOrThrowNotFoundError(user, itemId);
        const updatedItem = this.itemRepository.create({
            ...item,
            id: itemId,
            userId: user.userId
        });
        return this.itemRepository.save(updatedItem);
    }

    public async deleteItem(user: User, itemId: string): Promise<void> {
        await this.checkThatItemExistOrThrowNotFoundError(user, itemId);
        const existingItem = await this.itemRepository.findOneBy({
            id: itemId,
            userId: user.userId
        });

        await this.itemRepository.remove(existingItem);
    }

    public async checkThatItemExistOrThrowNotFoundError(user: User, itemId: string): Promise<void> {
        const isItemExists = await this.itemRepository.exist({
            where: {
                id: itemId,
                userId: user.userId
            }
        });
        if (!isItemExists) {
            throw new NotFoundException(`Item with Id=${itemId} does not exist`);
        }
    }
}

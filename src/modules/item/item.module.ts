import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../entities/item/item.entity';
import { AuthModule } from '../auth/auth.module';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), AuthModule],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService]
})
export class ItemModule {
}

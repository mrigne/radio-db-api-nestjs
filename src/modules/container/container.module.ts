import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from '../../entities/container/container.entity';
import { AuthModule } from '../auth/auth.module';
import { ContainerController } from './controllers/container.controller';
import { ContainerService } from './services/container.service';

@Module({
    imports: [TypeOrmModule.forFeature([Container]), AuthModule],
    controllers: [ContainerController],
    providers: [ContainerService],
    exports: [ContainerService]
})
export class ContainerModule {
}

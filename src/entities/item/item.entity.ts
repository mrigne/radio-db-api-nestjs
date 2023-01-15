import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'Items'
})
export class Item {
    @PrimaryGeneratedColumn('uuid', {
        name: 'Id'
    })
    id: string;

    @Column('uuid', {
        name: 'ContainerId'
    })
    containerId: string;

    @Column({
        name: 'Name',
        type: 'varchar',
        length: 'MAX'
    })
    name: string;

    @Column({
        name: 'Count',
        type: 'int'
    })
    count: number;

    @Column('uuid', {
        name: 'UserId'
    })
    userId: string;
}

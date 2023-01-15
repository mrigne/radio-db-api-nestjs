import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'Containers'
})
export class Container {
    @PrimaryGeneratedColumn('uuid', {
        name: 'Id'
    })
    id: string;

    @Column('uuid', {
        name: 'UserId'
    })
    userId: string;

    @Column({
        name: 'Name',
        type: 'varchar',
        length: 'MAX'
    })
    name: string;

    @Column({
        name: 'Barcode',
        type: 'varchar',
        length: 'MAX'
    })
    barcode: string;
}

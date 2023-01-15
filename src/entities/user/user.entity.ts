import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'Users'
})
export class User {
    @PrimaryGeneratedColumn('uuid', {
        name: 'UserId'
    })
    userId: string;

    @Column({
        name: 'UserName',
        type: 'varchar',
        length: 'MAX'
    })
    userName: string;

    @Column({
        name: 'HashedPassword',
        type: 'varchar',
        length: 'MAX'
    })
    hashedPassword: string;
}

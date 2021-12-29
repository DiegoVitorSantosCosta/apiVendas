import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user_token')
class UserToken {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserToken;
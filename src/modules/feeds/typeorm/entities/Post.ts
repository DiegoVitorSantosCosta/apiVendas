import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
// import { Photo } from './Photo';

@Entity('feeds')
class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nomeUsuario: string;

    @Column()
    idUsuario: number;

    @Column()
    descricao: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    foto: string

    // @OneToMany(type => Photo, post => Post)
    // poto: Photo[];

}

export default Post;
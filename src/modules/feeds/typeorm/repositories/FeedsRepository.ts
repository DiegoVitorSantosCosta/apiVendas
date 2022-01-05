import { EntityRepository, Repository } from "typeorm";
import Post from '../entities/Post';


@EntityRepository(Post)
class PostRepository extends Repository<Post> {

    public async findById(idUsuario: string) {
        const feed = await this.find({
            where: {
                idUsuario
            }
        })

        return feed;
    }

    public async findByFeed(id: string) {
        const feed = await this.find({
            where: {
                id
            }
        })

        return feed;
    }

}

export default PostRepository;
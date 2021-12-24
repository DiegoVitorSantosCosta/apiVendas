import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePosts1640219364029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

                name: 'feeds',
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'nomeUsuario',
                        type: 'varchar',
                    },

                    {
                        name: 'idUsuario',
                        type: 'int',
                    },
                    {
                        name: 'descricao',
                        type: 'varchar'
                    },

                    {
                        name: 'foto',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },

                ],
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('feeds');
    }

}

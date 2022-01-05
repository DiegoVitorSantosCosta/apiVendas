import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFeeds1641381492355 implements MigrationInterface {

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
                        type: 'integer',
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
                        isNullable: true,
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
                foreignKeys: [
                    {
                        name: "identificador",                           // nome da chave estrangeira
                        referencedTableName: "users",               // nome da tabela referenciada
                        referencedColumnNames: ["id"],          // nome da coluna da tabela referenciada
                        columnNames: ['idUsuario'],                 // nome da coluna na tabela de origem
                        onDelete: 'CASCADE',                               // CASCADE ou RESTRICT
                        onUpdate: 'CASCADE',                             // CASCADE: se o usuário for deletado, todos os posts dele também serão

                    }
                ]

            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('feeds');
    }

}

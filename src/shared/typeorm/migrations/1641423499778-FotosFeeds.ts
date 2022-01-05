import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class FotosFeeds1641423499778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'feeds',                                   //  nome da tabela que será alterada
            new TableColumn({
                name: 'id_fotos',             //  nome da coluna que será adicionada
                type: 'integer',                        //  tipo da coluna
                isNullable: true           //  se pode ser nulo
            }),
        );

        await queryRunner.createForeignKey(
            'feeds',                                           // nome da tabela que será alterada
            new TableForeignKey({                //  cria uma chave estrangeira
                name: 'fotosFeeds',             //  nome da chave estrangeira
                columnNames: ['id_fotos'],     //  nome da coluna que será a chave estrangeira
                referencedTableName: 'fotos',   //  nome da tabela que será referenciada
                referencedColumnNames: ['id'],        //  nome da coluna que será referenciada
                onDelete: 'SET NULL',                           //  se a chave estrangeira for deletada, o registro não será deletado
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('feeds', 'fotosFeeds');
        await queryRunner.dropColumn('feeds', 'id_fotos');
    }

}

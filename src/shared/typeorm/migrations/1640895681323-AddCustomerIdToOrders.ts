import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCustomerIdToOrders1640895681323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',                                   //  nome da tabela que será alterada
            new TableColumn({
                name: 'customer_id',             //  nome da coluna que será adicionada
                type: 'integer',                        //  tipo da coluna
                isNullable: true,           //  se pode ser nulo
            }),
        );

        await queryRunner.createForeignKey(
            'orders',                                           // nome da tabela que será alterada
            new TableForeignKey({                //  cria uma chave estrangeira
                name: 'OrdersCustomer',             //  nome da chave estrangeira
                columnNames: ['customer_id'],     //  nome da coluna que será a chave estrangeira
                referencedTableName: 'customers',   //  nome da tabela que será referenciada
                referencedColumnNames: ['id'],        //  nome da coluna que será referenciada
                onDelete: 'SET NULL',                           //  se a chave estrangeira for deletada, o registro não será deletado
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
        await queryRunner.dropColumn('orders', 'customer_id');
    }

}

import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../repositoryes/CustomersRepository';
import Customer from '../typeorm/entities/Custumer';

class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = customersRepository.find();

        return customers;
    }
}

export default ListCustomerService;
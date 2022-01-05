import AppError from '@shared/erros/AppErros';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../repositoryes/CustomersRepository';
import Customer from '../typeorm/entities/Custumer';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;
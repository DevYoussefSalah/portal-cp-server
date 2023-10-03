import { getRepository } from "typeorm";
import { Company } from "../entities/Company";
import { addInitialData } from "./InitialDataRepository";
import { createInventory } from "./InventoryRepository";
import { InventoryType } from "../enums/enums";


// DONE
// need to create company inventory.
export const createCompany = async (
    name: string,
) => {
    // first make sure that initial data exists.
    // then create the company and add the initial data to it 
    const data = await addInitialData();
    const { departmentsList, workflow } = data;
    if (!departmentsList || !workflow) return console.log('Error, Initial data does not exists');
    // create the company
    const companyRepository = getRepository(Company);
    const company = new Company();
    company.name = name;
    company.departments = departmentsList;
    company.workFlow = workflow;
    await companyRepository.save(company);

    // Create the inventory for the company
    const createInventoryData = { type: InventoryType.MASTER, items_count: 0, items_value: 0}
    await createInventory(createInventoryData, company);
    return company;
};

export const getById = async (id: string) => {
    const companyRepository = getRepository(Company);
    const company = await companyRepository
        .createQueryBuilder("company")
        .where("company.id = :id", { id: id })
        .getOne();
    return company;
};

export const getCompanyWithWorkflow = async (id: string) => {
    const companyRepository = getRepository(Company);
    const company = await companyRepository
        .createQueryBuilder("company")
        .leftJoinAndSelect("company.workFlow", "workFlow")
        .where("company.id = :id", { id: id })
        .getOne();
    return company;
}

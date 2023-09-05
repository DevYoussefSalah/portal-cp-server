import { getRepository } from "typeorm";
import { Company } from "../entities/Company";
import { CreateProjectInfo } from "src/types/CreateProject";
import { Project } from "../entities/Project";

// DONE
export const createProject = async (
    createData: CreateProjectInfo,
    company: Company
) => {
    const {
        name, description, latitude, longitude,
        bid_value, duration, delivery_date,
        contract_number, contract_date, po_budget,
        pc_budget, subcontractor_budget, staff_budget,
        total_budget, project_manager, sites_count,
        buildings_count, floors_count, project_status,
    } = createData;
    // create Project
    const projectRepository = getRepository(Project);
    const project = new Project();
    project.name = name;
    project.description = description;
    project.latitude = latitude;
    project.longitude = longitude;
    project.bid_value = bid_value;
    project.duration = duration;
    project.delivery_date = delivery_date;
    project.contract_number = contract_number;
    project.contract_date = contract_date;
    project.po_budget = po_budget;
    project.pc_budget = pc_budget;
    project.subcontractor_budget = subcontractor_budget;
    project.staff_budget = staff_budget;
    project.total_budget = total_budget;
    project.project_manager = project_manager;
    project.sites_count = sites_count;
    project.buildings_count = buildings_count;
    project.floors_count = floors_count;
    project.project_status = project_status;
    project.company = company;
    await projectRepository.save(project);
    return project;
};

// DONE
export const getById = async (id: string) => {
    const projectRepository = getRepository(Project);
    const project = await projectRepository
        .createQueryBuilder("project")
        .where("project.id = :id", { id: id })
        .getOne();
    return project;
};

// DONE
export const getAllByCompanyId = async (companyId: string) => {
    const projectRepository = getRepository(Project);
    const project = await projectRepository
        .createQueryBuilder("project")
        .where("project.companyId = :companyId", { companyId: companyId })
        .getMany();
    return project;
};



// export const getInventoryItemsById = async (id: string) => {
//     const projectRepository = getRepository(Inventory);
//     const inventory = await projectRepository
//         .createQueryBuilder("inventory")
//         .where("project.id = :id", { id: id })
//         .leftJoinAndSelect(
//             "project.items",
//             "items"
//         )
//         .getOne();
//     return inventory;
// };


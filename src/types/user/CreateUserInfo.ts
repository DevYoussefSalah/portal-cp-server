import { Role } from "../../entities/Role";

export type CreateUserInfo = {
	email: string;
	password: string;
	role: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	address: string;
	working_hours: string;
	contract_date: Date;
	contract_ex: Date;
	renewal_of_residence: Date;
	project: string;
	id_number: string;
	id_ex_date: string;
	salary_per_month: string;
	salary_per_hour: string;
	sign: string;
	picture: string;
	file: string;
	company: any;
};

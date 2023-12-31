import { Request, Response } from 'express';
import { createCompany, getById } from '../repositories/CompanyRepository';

export const addCompany = async (req: Request, res: Response) => {
	const { name } = req.body;
	try {
		const company = await createCompany(name);
		if (!company) return res.status(409).json({ msg: "User with same email already exists" });
		else return res.status(200).json(company);
	} catch (error) {
		// Handle the error
		console.error("Error Adding company:", error);
		return res.status(500).json({ msg: "Internal server error" });
	}
};

export const getCompanyById = async (req: Request, res: Response) => {
	const { companyId } = req.userData!;
	try {
		const company = await getById(companyId);
		if (!company) res.status(404).json({ msg: "Company not found" })
		return res.status(200).json(company);
	} catch (error) {
		// Handle the error
		console.error("Error retrieving company:", error);
		return res.status(500).json({ msg: "Internal server error" });
	}
};

export const updateCompany = async (req: Request, res: Response) => {
	const { companyId } = req.userData!;
	try {
		const company = await getById(companyId);
		if (!company) return res.status(404).json({ msg: "Company not found" });
		const { name, address, logo, size, is_verified, stepper_state, stepper_step } = req.body;
		company.name = name ? name : company.name;
		company.address = address ? address : company.address;
		company.logo = logo ? logo : company.logo;
		company.size = size ? size : company.size;
		company.is_verified = is_verified ? is_verified : company.is_verified;
		company.stepper_state = stepper_state ? stepper_state : company.stepper_state;
		company.stepper_step = stepper_step ? stepper_step : company.stepper_step;
		await company.save();
		return res.status(200).json(company);
	} catch (error) {
		// Handle the error
		console.error("Error updating company:", error);
		return res.status(500).json({ msg: "Internal server error" });
	}
};

export const deleteCompany = async (req: Request, res: Response) => {
	const { companyId } = req.userData!;
	try {
		const company = await getById(companyId);
		if (!company) {
			return res.status(404).json({ msg: "Company not found" });
		}
		await company.remove();
		return res.status(404).json({ msg: "Company deleted" });
	} catch (error) {
		// Handle the error
		console.error("Error Deleting company:", error);
		return res.status(500).json({ msg: "Internal server error" });
	}
}



import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne,
	ManyToMany,
	JoinTable,
	OneToMany
} from "typeorm";
import { Company } from "./Company";
import { Project } from "./Project";
import { Department } from "./Department";
import { Attendance } from "./Attendance";

@Entity({ name: "user" })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid") id: string;

	@Column({
		default: null
	})
	first_name: string;

	@Column({
		default: null
	})
	last_name: string;

	@Column({
		default: null
	})
	business_title: string;

	@Column({
		default: null
	})
	email: string;

	@Column({
		default: null
	})
	password: string;

	@Column({
		default: null
	})
	string_password: string;

	@Column({
		default: null
	})
	address: string;

	@Column({
		default: null
	})
	phone_number: string;

	@Column({
		default: null
	})
	working_hours: string;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP"
	})
	contract_date: Date;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP"
	})
	contract_ex: Date;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP"
	})
	renewal_of_residence: Date;

	@Column({
		nullable: true
	})
	project: string;

	@Column({
		nullable: true
	})
	id_number: string;

	@Column({
		nullable: true
	})
	id_ex_date: string;

	@Column({
		nullable: true
	})
	salary_per_month: string;

	@Column({
		default: null
	})
	salary_per_hour: string;

	@Column({
		default: "user"
	})
	role: string;

	@Column({
		default: null
	})
	sign: string;

	@Column({
		default: null
	})
	picture: string;

	@Column({
		default: null
	})
	file: string;

	@Column({
		type: 'json',
		nullable: true
	})
	permissions: string[];

	@Column({
		default: false
	})
	is_verified: boolean;

	@Column({
		type: 'time',
		nullable: true,
		default: null
	})
	shift_start: string; // 06:00:00

	@Column({
		type: 'time',
		nullable: true,
		default: null
	})
	shift_end: string; // 14:00:00

	@Column({
		default: null
	})
	gender: string;

	// Relations
	// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
	@ManyToOne(() => Company, company => company.users, { onDelete: "CASCADE" })
	company: Company;

	@ManyToMany(() => Department, department => department.users)
	departments: Department[];

	@OneToMany(() => Attendance, attendance => attendance.user)
	attendances: Attendance[];

	@ManyToMany(() => Project, project => project.users)
	@JoinTable({ name: "user_project" })
	projects: Project[];
	// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP"
	})
	createdAt: Date;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP"
	})
	updatedAt: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Project } from './Project';
import { Company } from './Company';

@Entity({ name: 'material_request' })
export class MaterialRequest extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        default: 'material_request'
    })
    type: string;

    @Column({ nullable: true })
    code: string;

    @Column({
        type: 'date',
        default: () => 'CURRENT_DATE'
    })
    date: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    subject: string;

    @Column({ nullable: true })
    status: string; // accepted, rejected, pending

    @Column({
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: false,
    })
    items: Array<{ description: string, name: string, quantity: number }>;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @ManyToOne(() => Project, project => project.MaterialRequests)
    project: Project;

    @ManyToOne(() => Company, company => company.MaterialRequests)
    company: Company;
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
}
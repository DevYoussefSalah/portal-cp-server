import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { CustomerType } from '../enums/enums';
import { Company } from './Company';
import { Project } from './Project';

// this is our customers
@Entity({ name: 'customer' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.Company
  })
  customer_type: string;

  @Column({
    default: null
  })
  company_name: string;

  @Column({
    default: null
  })
  vat_on: number;

  @Column({
    default: null
  })
  representative: string;

  @Column({
    default: null
  })
  phone_number: string;

  @Column({
    default: null
  })
  email: string;

  @Column({
    default: null
  })
  country: string;

  @Column({
    default: null
  })
  city: string;

  @Column({
    default: null
  })
  area: string;

  @Column({
    default: null
  })
  street: string;

  @Column({
    default: null,
    nullable: true
  })
  building_number: string;

  @Column({
    default: null,
    nullable: true
  })
  postal_code: number;

  // Relations
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
  @ManyToOne(() => Company, company => company.customers, { onDelete: 'CASCADE' })
  company: Company;

  @OneToMany(() => Project, project => project.customer, { cascade: true, onDelete: 'CASCADE' })
  projects: Project[];
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
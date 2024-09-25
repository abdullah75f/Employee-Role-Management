import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// classes that represent objects stored in a database

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type:"uuid",nullable: true })
  parentId: string;
}
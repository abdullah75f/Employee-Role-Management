import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany,JoinColumn } from 'typeorm';

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

  @ManyToOne(()=>Role, (role) => role.children,{nullable:true})
  @JoinColumn({name: "parentId"})
  parent: Role;

  @OneToMany(() => Role, role => role.parent)
  children: Role[];


}

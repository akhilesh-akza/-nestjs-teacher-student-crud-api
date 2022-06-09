import { Dept } from 'src/common/departments';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  department: Dept;

  @Column({ type: 'numeric' })
  YOE: number;

  @Column({ nullable: true, type: 'integer' })
  age: number;
}

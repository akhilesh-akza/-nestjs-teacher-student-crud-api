import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  department: string;

  @Column({ type: 'integer' })
  semester: number;

  @Column({ type: 'text' })
  division: string;

  @Column({ type: 'integer', nullable: true })
  age: number;
}

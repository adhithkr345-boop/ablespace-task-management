import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type TaskStatus = 'todo' | 'doing' | 'completed';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: 'text',
    default: 'todo',
  })
  status!: TaskStatus;

  @Column({ default: false })
  completed!: boolean;

  @Column({
    type: 'text',
    default: 'Medium',
  })
  priority!: 'Low' | 'Medium' | 'High';

  @Column({ nullable: true })
  dueDate!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
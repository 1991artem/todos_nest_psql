import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TASK_STATUS, TASK_PRIORITY } from '../../helps/enums';

@Entity({
  name: 'tasks',
})
export class Task extends BaseEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'About us', description: 'Task description' })
  @Column({
    nullable: true,
  })
  description: string;

  @ApiProperty({ example: 'Task name', description: 'Task name' })
  @Column({
    unique: true,
  })
  name: string;

  @ApiProperty({ example: TASK_STATUS.TO_DO, description: 'Task status' })
  @Column({
    enum: TASK_STATUS,
    default: TASK_STATUS.TO_DO,
  })
  status: TASK_STATUS;

  @ApiProperty({ example: 'today', description: 'Task deadline' })
  @Column()
  deadline: Date;

  @ApiProperty({ example: TASK_PRIORITY.HIGH, description: 'Task priority' })
  @Column({
    enum: TASK_PRIORITY,
    default: TASK_PRIORITY.HIGH,
  })
  priority: TASK_PRIORITY;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/schema/userSchema';

interface TaskCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'About us', description: 'Task description' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;

  @ApiProperty({ example: 'Task name', description: 'Task name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'to do', description: 'Task status' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'to do' })
  status: string;

  @ApiProperty({ example: 'today', description: 'Task deadline' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'to do' })
  deadline: Date;

  @ApiProperty({ example: 'high', description: 'Task priority' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'high' })
  priority: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}

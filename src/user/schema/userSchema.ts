import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/task/schema/taskSchema';
import { Group, UserGroup } from 'src/group/schema/groupSchema';

interface UserCreationAttrs {
  email: string;
  name: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: 'User123!', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'User', description: 'Name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'USER', description: 'Role' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER' })
  role: string;

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[];

  @HasMany(() => Task)
  tasks: Task[];
}

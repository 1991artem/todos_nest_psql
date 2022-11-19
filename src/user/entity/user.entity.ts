import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/task/entity/task.entity';
import { Group } from 'src/group/entity/group.entity';
import { USER_ROLE } from 'src/helps/enums';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
  Entity,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'User123!', description: 'Password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'User', description: 'Name' })
  @Column()
  name: string;

  @ApiProperty({ example: USER_ROLE.USER, description: 'User role' })
  @Column({
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
  role: USER_ROLE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Group, {
    cascade: false,
  })
  @JoinTable({
    name: 'user_group',
    // joinColumn: {
    //   name: 'userId',
    //   foreignKeyConstraintName: 'fk_user_group',
    // },
    // inverseJoinColumn: {
    //   name: 'groupId',
    //   foreignKeyConstraintName: 'fk_user_user',
    // },
  })
  groups: Group[];
}

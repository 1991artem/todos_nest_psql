import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'groups',
})
export class Group extends BaseEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Group about ...', description: 'Group description' })
  @Column({
    nullable: true,
  })
  description: string;

  @ApiProperty({ example: 'Group name', description: 'Group name' })
  @Column({
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_group',
    // joinColumn: {
    //   name: 'groupId',
    //   foreignKeyConstraintName: 'fk_group_user',
    // },
    // inverseJoinColumn: {
    //   name: 'userId',
    //   foreignKeyConstraintName: 'fk_group_group',
    // },
  })
  users: User[];
}

import { User } from 'src/user/entity/user.entity';

export interface IGroup {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  users: User[];
}

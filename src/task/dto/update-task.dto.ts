import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  readonly name: string;
  readonly description: string;
  readonly priority: string;
  readonly deadline: Date;
  readonly status: string;
}

import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsIn(['todo', 'doing', 'completed'])
  status?: 'todo' | 'doing' | 'completed';

  @IsIn(['Low', 'Medium', 'High'])
  priority!: 'Low' | 'Medium' | 'High';

  @IsOptional()
  @IsString()
  dueDate?: string;
}
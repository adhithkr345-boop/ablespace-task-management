import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsIn(['todo', 'doing', 'completed'])
  status?: 'todo' | 'doing' | 'completed';

  @IsOptional()
  @IsIn(['Low', 'Medium', 'High'])
  priority?: 'Low' | 'Medium' | 'High';

  @IsOptional()
  @IsString()
  dueDate?: string;
}
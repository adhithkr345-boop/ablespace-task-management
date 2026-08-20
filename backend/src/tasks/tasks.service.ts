import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

 async create(createTaskDto: CreateTaskDto): Promise<Task> {
  const status = createTaskDto.status ?? 'todo';

  const task = this.taskRepository.create({
    title: createTaskDto.title,
    status,
    completed: status === 'completed',
    priority: createTaskDto.priority ?? 'Medium',
    dueDate: createTaskDto.dueDate ?? '',
  });

  return this.taskRepository.save(task);
}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found`,
      );
    }

    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);

    if (updateTaskDto.status !== undefined) {
      task.completed =
        updateTaskDto.status === 'completed';
    }

    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;

      if (updateTaskDto.completed) {
        task.status = 'completed';
      } else if (task.status === 'completed') {
        task.status = 'todo';
      }
    }

    return this.taskRepository.save(task);
  }

  async remove(
    id: number,
  ): Promise<{ message: string }> {
    const task = await this.findOne(id);

    await this.taskRepository.remove(task);

    return {
      message: `Task with ID ${id} deleted successfully`,
    };
  }
}
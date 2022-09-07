import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Task> {
    const t = await this.taskRepository.findOne({ where: { id } });
    if (!t) {
      throw new HttpException('Task not found', 404);
    }
    return t;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const t = await this.findOne(id);

    if (updateTaskDto.title) {
      t.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      t.description = updateTaskDto.description;
    }
    if (updateTaskDto.reminder) {
      t.reminder = updateTaskDto.reminder;
    }
    return this.taskRepository.save(t);
  }

  async remove(id: number) {
    const t = await this.findOne(id);
    return this.taskRepository.remove(t);
  }
}

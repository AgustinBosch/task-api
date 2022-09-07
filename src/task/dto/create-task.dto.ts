import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'title can not be empty' })
  title: string;

  @IsNotEmpty({ message: 'description can not be empty' })
  description: string;

  @IsNotEmpty({ message: 'reminder can not be empty' })
  reminder: boolean;
}

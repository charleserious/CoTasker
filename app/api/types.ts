// this file contains shared types
import { Task, Todo } from '@/shared/schemas';

export type PostTask = Omit<
  Task,
  'id' | 'todo_id' | 'created_date' | 'updated_date'
> &
  Pick<Todo, 'uuid'>;

export type UpdateTask = Partial<Omit<PostTask, 'uuid'>> & Pick<Task, 'id'>;

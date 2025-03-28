export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'DONE';
};
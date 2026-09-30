export interface Course {
  id: string;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  duration: string;
  lessons: number;
}
export interface Course {
  id?: string;
  code: string;
  name: string;
  professorId: string;
  professorName: string;
  semester: string;
  year: number;
  isActive: boolean;
  }
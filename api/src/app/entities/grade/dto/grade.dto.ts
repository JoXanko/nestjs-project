import { Class } from '../../class/class.entity';
import { User } from '../../user/user.entity';

export class GradeDto {
  date: string;
  comment: string;
  //new: boolean;
  grade: number;
  //flagged: boolean;
  studentId: number;
  classId: number;
}

import { Grade } from '../../grade/grade.entity';
import { Level } from '../../level/level.entity';
import { Location } from '../../location/location.entity';
import { User } from '../../user/user.entity';

export class ClassDto {
  name: string;
  new: boolean;
  bio: string;
  photo: string;
  location: Location;
  level: Level;
  user: User;
  grades: Grade[];
}

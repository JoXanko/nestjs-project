import { Category } from '../../caregory/category.entity';
import { Class } from '../../class/class.entity';

export class LevelDto {
  name: string;
  classes: Class[];
  categories: Category[];
}

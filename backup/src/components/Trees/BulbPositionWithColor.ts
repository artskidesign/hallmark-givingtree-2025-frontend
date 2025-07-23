import BulbPosition from './BulbPosition';
import { BulbColor } from '../../types';

interface BulbPositionWithColor extends BulbPosition {
    color: BulbColor;
}

export default BulbPositionWithColor;
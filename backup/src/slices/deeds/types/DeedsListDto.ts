import Deed from './Deed';
import FeedDto from '../../completeddeeds/types/FeedDto';

export default interface DeedsListDto {
    deeds: Array<Deed>;
    communityCount: number;
    feed: Array<FeedDto>;
    allDeedsCompletedCopy: string;
}
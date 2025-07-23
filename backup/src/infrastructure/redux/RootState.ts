import DeedState from '../../slices/deeds/DeedState';
import CompletedDeedState from '../../slices/completeddeeds/CompletedDeedState';
import UserState from '../../slices/users/UserState';

export default interface RootState {
  completedDeed: CompletedDeedState;
  deed: DeedState;
  isWebView: { webView: boolean };
  user: UserState;
}

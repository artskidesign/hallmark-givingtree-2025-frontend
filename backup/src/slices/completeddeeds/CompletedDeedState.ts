import CompletedDeed from './types/CompletedDeed';

interface CompletedDeedState {
    completedDeeds: Array<CompletedDeed>;
    apiCalled: boolean;
  }
  
  export default CompletedDeedState;
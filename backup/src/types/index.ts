import CompletedDeed from '../slices/completeddeeds/types/CompletedDeed';

export interface BaseStateToProps {
  isWebView: {
    webView: boolean;
  };
}

export interface BaseStateToPropsOutput {
  isWebView: boolean;
}

export interface TrackingPageViewProps {
  sendToOmniture: (pageTitle: string) => void;
  trackPageView: (pageTitle: string, pagePath: string) => void;
}

export interface TrackingEventProps {
  trackEvent: (category: string, action: string, label: string) => void;
}

export interface TrackingProps extends TrackingEventProps, TrackingPageViewProps {}

export interface UserDto {
  name: string;
  emailAddress: string;
  id: string;
  completedDeeds: Array<CompletedDeed>;
  feed: boolean;
}

export enum BulbColor {
  Blue = 'Blue',
  Red = 'Red',
  Yellow = 'Yellow',
  Green = 'Green',
  Purple = 'Purple',

}

export enum ShareType {
  Generic,
  MyTree,
}

export enum PopUpType {
  Click, 
  Feed,
}
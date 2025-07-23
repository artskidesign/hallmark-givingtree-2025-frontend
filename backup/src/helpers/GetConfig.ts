export interface config {
  apiShareUrl: string;
  apiUrl: string;
  appUrl: string;
  crossDomainGoogleAnalyticsWebPropertyId: string;
  enableComScore: boolean;
  enableFreewheel: boolean;
  enableGoogleAnalytics: boolean;
  enableOmniture: boolean;
  facebookAppId: string;
  googleAnalyticsWebPropertyId: string;
  navBarColor: string;
  navBarFranchise: string;
  navBarLink: string;
  networkId: number;
  profileId: string;
  serverUrl: string;
  siteSectionId: string;
  treeImage: string;
  tweetGeneric: string;
  tweetMyTree: string;
  pinterestGeneric: string;
  pinterestMyTree: string;
}

declare global {
  interface Window {
    config: config;
    gtag: any;
    COMSCORE: any;
    s: any;
  }
}

const GetConfig = () => {
    return window.config;
}

export default GetConfig;

import GetConfig, { config } from '../../helpers/GetConfig';

const sendToComScore: (config: config) => void = ({ enableComScore }) => {
  if (enableComScore && window.COMSCORE) {
    window.COMSCORE.beacon({ c1: '2', c2: '8272010' });
    fetch('/pageview_candidate.txt');
  }
};

export const trackEvent: (category: string, action: string, label: string) => void = (category, action, label) => {
  const { enableGoogleAnalytics, googleAnalyticsWebPropertyId } = GetConfig();
  // console.log('tracking ', category, action, label);
  if (window.gtag && enableGoogleAnalytics) {
    const properties = {
      event_category: category,
      event_label: label,
      send_to: googleAnalyticsWebPropertyId,
    };
    window.gtag('event', action, properties);
  }
};

export const trackPageView: (pageTitle: string, pagePath: string) => void = (pageTitle, pagePath) => {
  const config = GetConfig();
  const gaEnabled = config.enableGoogleAnalytics;
  // console.log('tracking ', pagePath, pageTitle);
  sendToComScore(config);
  if (window.gtag && gaEnabled) {
    const properties = {
      page_title: pageTitle,
      page_path: pagePath,
    };
    window.gtag('config', config.googleAnalyticsWebPropertyId, properties);

    const crossDomainProperties = {
      page_title: pageTitle,
      page_path: `/christmas/the-giving-tree${pagePath}`,
    };
    window.gtag('config', config.crossDomainGoogleAnalyticsWebPropertyId, crossDomainProperties);
  }
};

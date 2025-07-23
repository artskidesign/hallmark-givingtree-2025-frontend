import React from 'react';
import Button from '@material-ui/core/Button';
import { FacebookIcon } from '../../images/icons';
import { ShareType } from './ShareType';
import GetConfig from '../../helpers/GetConfig';
import { trackEvent } from '../../infrastructure/tracking/GoogleAnalytics';
import { useSelector } from 'react-redux';
import RootState from '../../infrastructure/redux/RootState';

interface FacebookButtonProps {
  shareType: ShareType;
  deedCount?: number;
  eventCategory: string;
}

const FacebookButton: React.FC<FacebookButtonProps> = ({ shareType, deedCount, eventCategory }) => {
  const isWebView = useSelector((state: RootState) => state.isWebView.webView)

  const { appUrl, apiShareUrl, facebookAppId } = GetConfig();  

  const getShareUrl = (shareType: ShareType) => {
    switch (shareType) {
      case ShareType.CommunityTree:
        return appUrl;
      case ShareType.MyTree:
        return `${apiShareUrl}${deedCount}`;
    }
  };

  const share = () => {
    const shareUrl = getShareUrl(shareType);
    const redirectUrl = `http://www.facebook.com/dialog/share?app_id=${facebookAppId}&display=popup&href=${shareUrl}`;
    trackEvent(eventCategory, 'ShareClick', 'Facebook');
    if (isWebView) {
      window.location.href = `${redirectUrl}&redirect_uri=${appUrl}?hmc=1`;
    } else {
      window.open(
        `${redirectUrl}&redirect_uri=${appUrl}closewindow`,
        'FacebookShare',
        'location=0,status=0,width=800,height=650'
      );
    }
  };

  return (
    <Button
    classes={{
        root: 'FacebookBtn ShareBtn',
        label: 'BtnLabel',
      }}
      onClick={share}
    >
      <FacebookIcon />
    </Button>
  );
};

export default FacebookButton;

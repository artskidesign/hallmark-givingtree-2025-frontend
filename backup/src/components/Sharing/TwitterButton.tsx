import React from 'react';
import Button from '@material-ui/core/Button';
import { TwitterIcon } from '../../images/icons';
import { ShareType } from './ShareType';
import GetConfig from '../../helpers/GetConfig';
import { trackEvent } from '../../infrastructure/tracking/GoogleAnalytics';
import { useSelector } from 'react-redux';
import RootState from '../../infrastructure/redux/RootState';

interface TwitterButtonProps {
  shareType: ShareType;
  deedCount?: number;
  eventCategory: string;
}

const TwitterButton: React.FC<TwitterButtonProps> = ({ shareType, deedCount, eventCategory }) => {
  const isWebView = useSelector((state: RootState) => state.isWebView.webView)
  const { appUrl, apiShareUrl, tweetGeneric, tweetMyTree } = GetConfig();

  const getShareUrl = (shareType: ShareType) => {
    switch (shareType) {
      case ShareType.CommunityTree:
        return appUrl;
      case ShareType.MyTree:
        return `${apiShareUrl}${deedCount}`;
    }
  };

  const getShareTweet = (shareType: ShareType) => {
    switch (shareType) {
      case ShareType.CommunityTree:
        return tweetGeneric;
      case ShareType.MyTree:
        let myTreeTweet = tweetMyTree.replace('[deedCount]', deedCount!.toString());
        if (deedCount === 1) {
          myTreeTweet = myTreeTweet.replace('deeds', 'deed');
        }
        return myTreeTweet;
    }
  };

  const share = () => {
    const shareUrl = getShareUrl(shareType);
    const shareText = getShareTweet(shareType);
    const urlParam = shareUrl ? `&url=${shareUrl}` : '';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}${urlParam}`;
    trackEvent(eventCategory, 'ShareClick', 'Twitter');
    if (isWebView) {
      window.location.href = twitterUrl;
    } else {
      window.open(twitterUrl, 'Tweet', 'location=0,status=0,width=800,height=650');
    }
  };

  return (
    <Button
      classes={{
        root: 'TwitterBtn ShareBtn',
        label: 'BtnLabel',
      }}
      onClick={share}
    >
      <TwitterIcon />
    </Button>
  );
};

export default TwitterButton;

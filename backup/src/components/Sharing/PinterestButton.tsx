import React from 'react';
import Button from '@material-ui/core/Button';
import { PinterestIcon } from '../../images/icons';
import { ShareType } from './ShareType';
import GetConfig from '../../helpers/GetConfig';
import { trackEvent } from '../../infrastructure/tracking/GoogleAnalytics';
import { useSelector } from 'react-redux';
import RootState from '../../infrastructure/redux/RootState';

interface PinterestButtonProps {
  shareType: ShareType;
  deedCount?: number;
  eventCategory: string;
}

const PinterestButton: React.FC<PinterestButtonProps> = ({ shareType, deedCount, eventCategory }) => {
  const isWebView = useSelector((state: RootState) => state.isWebView.webView)
  const { appUrl, treeImage, pinterestMyTree, pinterestGeneric } = GetConfig();

  const getShareDescription = (shareType: ShareType) => {
    switch (shareType) {
      case ShareType.CommunityTree:
        return pinterestGeneric;
      case ShareType.MyTree:
        let myTreeTweet = pinterestMyTree.replace('[deedCount]', deedCount!.toString());
        if (deedCount === 1) {
          myTreeTweet = myTreeTweet.replace('deeds', 'deed');
        }
        return myTreeTweet;        
    }
  };

  const getShareImage = (shareType: ShareType) => {
    switch (shareType) {
      case ShareType.CommunityTree:
        return `${appUrl}og_giving_tree.jpg`;
      case ShareType.MyTree:
        return treeImage.replace('{0}', deedCount!.toString());
    }
  };

  const share = () => {
    const shareUrl = appUrl;
    const imageUrl = getShareImage(shareType);
    const description = getShareDescription(shareType);
    const pinterestUrl = `http://www.pinterest.com/pin/create/button?url=${shareUrl}&media=${imageUrl}&description=${encodeURIComponent(
      description
    )}`;
    trackEvent(eventCategory, 'ShareClick', 'Pinterest');
    if (isWebView) {
      window.location.href = pinterestUrl;
    } else {
      window.open(pinterestUrl, 'PinIt', 'location=0,status=0,width=800,height=650');
    }
  };

  return (
    <Button
      classes={{
        root: 'PinterestBtn ShareBtn',
        label: 'BtnLabel',
      }}
      onClick={share}
    >
      <PinterestIcon />
    </Button>
  );
};

export default PinterestButton;

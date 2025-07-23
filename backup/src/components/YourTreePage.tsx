import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { CaretRight } from '../images/icons';
import { Carpet, Chimney, Snowflakes, Window, Heart } from '../images/scenes';
import { InformationIcon } from '../images/icons';
import { Link } from 'react-router-dom';
import Tree from '../images/trees/user-tree.png';
import Presents from '../images/trees/user-tree-presents.png';
import TreeLeaves from '../images/trees/user-tree-top-leaves.png';
import BulbImage from '../images/trees/user-tree-bulb.png';
import TreeStar from '../images/trees/user-tree-star.png';
import Bulb from './Trees/Bulb';
import useImages from '../infrastructure/hooks/useImages';
import { useSelector } from 'react-redux';
import YourTreeBulbPositions from './Trees/YourTreeBulbPositions';
import FacebookButton from './Sharing/FacebookButton';
import TwitterButton from './Sharing/TwitterButton';
import PinterestButton from './Sharing/PinterestButton';
import { ShareType } from './Sharing/ShareType';
import {
  eventCategoryNavigation,
  personalTreeHeight,
  personalTreeWidth,
  personalSceneHeight,
  personalSceneWidth,
  pageNamePersonalTreePage,
  eventCategoryPersonalTreePage,
  localStorageShowStarAnimationKey,
  totalAmountOfDeeds,
} from '../constants';
import { trackPageView, trackEvent } from '../infrastructure/tracking/GoogleAnalytics';
import { sendToOmniture } from '../infrastructure/tracking/Omniture';
import RootState from '../infrastructure/redux/RootState';
import Loader from './Loader';
import Snow from './Trees/Snow';

const selectDeedIdStore = (state: RootState) => state.deed.idStore;
const selectCompletedDeedIds = (state: RootState) => state.completedDeed.completedDeeds.map((x) => x.deedId);
const selectDeedCount = (state: RootState) => state.deed.deeds.length;
const selectCompletedCopy = (state: RootState) => state.deed.allDeedsCompletedCopy;
const selectDeedsLoaded = (state: RootState) => state.deed.loaded;
const selectCompletedDeedsLoaded = (state: RootState) => state.completedDeed.apiCalled;

const onClick = (label: string) => trackEvent(eventCategoryPersonalTreePage, 'Click', label);

const YourTreePage = () => {
  const [clickedBulbId, setClickedBulbId] = useState<string>('');
  const deeds = useSelector(selectDeedIdStore);
  const deedCount = useSelector(selectDeedCount);
  const completedDeeds = useSelector(selectCompletedDeedIds);
  const completedCopy = useSelector(selectCompletedCopy);
  const deedsLoaded = useSelector(selectDeedsLoaded);
  const completedDeedsLoaded = useSelector(selectCompletedDeedsLoaded);
  const [revealTree, setRevealTree] = useState<boolean>(false);
  const [starClassName, setStarClassName] = useState<string>('');

  const imagesLoaded = useImages([Tree, TreeLeaves, Presents, BulbImage, TreeStar]);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  const shareType = completedDeeds.length > 0 ? ShareType.MyTree : ShareType.CommunityTree;

  useEffect(() => {
    sendToOmniture(pageNamePersonalTreePage);
    trackPageView(pageNamePersonalTreePage, '/your-tree');
  }, []);

  const onDocumentClick = (e: any) => {
    if (e.target && e.target.className !== 'treebulb') {
      setClickedBulbId('');
    }
  };

  const onBulbClick = (bulbId: string) => {
    if (bulbId === clickedBulbId) {
      trackEvent(eventCategoryPersonalTreePage, 'UnclickBulb', bulbId);
      setClickedBulbId('');
    } else {
      trackEvent(eventCategoryPersonalTreePage, 'ClickBulb', bulbId);
      setClickedBulbId(bulbId);
    }
  };

  const trackClick = (label: string) => {
    trackEvent(eventCategoryNavigation, 'Click', label);
  };

  useEffect(() => {
    if (deedsLoaded && completedDeedsLoaded && imagesLoaded) {
      if (!allLoaded) {
        setTimeout(() => setRevealTree(true), 300);
      }
      setAllLoaded(true);
    }
  }, [deedsLoaded, completedDeedsLoaded, imagesLoaded]);

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  useEffect(() => {
    const animateStar = () => {
      try {
        const shouldStarAnimate = localStorage.getItem(localStorageShowStarAnimationKey);
        if (shouldStarAnimate === 'true') {
          setStarClassName('animate-user-tree-star');
          setTimeout(() => window.localStorage.setItem(localStorageShowStarAnimationKey, 'false'), 4000);
        }
      } catch {}
    };

    animateStar();
  }, []);

  return (
    <>
      <div className="page tree-scene your-tree">
        <Container>
          {!allLoaded && <Loader images />}
          {allLoaded && (
            <div className="deed-count">
              <h1>
                You’ve performed{'  '}
                <br />
                <span className="highlighted">
                  {completedDeeds.length}/{deedCount}
                </span>{' '}
                deeds
              </h1>
              {completedDeeds.length === 0 && <h4>Perform deeds to light up your tree!</h4>}
              {completedDeeds.length < deedCount ? (
                <Link to="/deeds" onClick={() => onClick('DeedsButton')}>
                  <Button
                    classes={{
                      root: 'PrimaryBtn LgBtn',
                      label: 'BtnLabel',
                    }}
                  >
                    Do a good deed <CaretRight />
                  </Button>
                </Link>
              ) : (
                <h4>{completedCopy}</h4>
              )}
            </div>
          )}
          <div className="tree-container">
            <div className={`tree ${revealTree ? 'loading-image-visible' : 'loading-image-hidden'}`}>
              <>
                <img src={Tree} alt="" />
                {completedDeeds.map((x, i) => {
                  const deed = deeds[x];
                  const position = YourTreeBulbPositions[i];
                  return (
                    <Bulb
                      {...position}
                      {...deed}
                      completed={true}
                      onBulbClick={onBulbClick}
                      clickedBulbId={clickedBulbId}
                      key={`Bulb${x}`}
                    />
                  );
                })}
                <img
                  src={TreeLeaves}
                  className="top-leaves"
                  alt=""
                  style={{
                    left: `${(20.2 / personalTreeWidth) * 100}%`,
                    top: `${(37.87 / personalTreeHeight) * 100}%`,
                    width: `${(698.61 / personalTreeWidth) * 100}%`,
                  }}
                />
                <img
                  src={Presents}
                  className="presents"
                  alt=""
                  style={{
                    width: `${(454 / personalTreeWidth) * 100}%`,
                    top: `${(690 / personalTreeHeight) * 100}%`,
                  }}
                />
                <img
                  src={TreeStar}
                  className={`user-tree-star ${starClassName} ${
                    completedDeeds.length === totalAmountOfDeeds ? 'visible-user-tree-star' : ''
                  }`}
                  alt=""
                  style={{
                    width: `${(100 / personalTreeWidth) * 100}%`,
                    top: `${(-27 / personalTreeHeight) * 100}%`,
                    left: `${(321 / personalTreeWidth) * 100}%`,
                  }}
                />
              </>
            </div>
            {allLoaded && completedDeeds.length < deedCount && (
              <Link to="/deeds" onClick={() => onClick('DeedsButton')}>
                <Button
                  classes={{
                    root: 'PrimaryBtn LgBtn',
                    label: 'BtnLabel',
                  }}
                >
                  Do a good deed <CaretRight />
                </Button>
              </Link>
            )}
          </div>
          <div className="bottom-links">
            <div className="how-it-works-link">
              <Link to="/how-it-works" onClick={() => trackClick('HowItWorks')}>
                <Button
                  classes={{
                    root: 'IconBtn',
                    label: 'BtnLabel',
                  }}
                >
                  <InformationIcon />
                </Button>
              </Link>
            </div>
            <div className="share-tree">
              <p>
                Share<span className="copy-desktop">{'  '}your tree</span>
              </p>
              <div className="d-flex">
                <FacebookButton
                  eventCategory={eventCategoryPersonalTreePage}
                  shareType={shareType}
                  deedCount={completedDeeds.length}
                />
                <TwitterButton
                  eventCategory={eventCategoryPersonalTreePage}
                  shareType={shareType}
                  deedCount={completedDeeds.length}
                />
                <PinterestButton
                  eventCategory={eventCategoryPersonalTreePage}
                  shareType={shareType}
                  deedCount={completedDeeds.length}
                />
              </div>
            </div>
          </div>
        </Container>
        <div className="tree-background">
          <Carpet className="carpet" />
          <Snowflakes className="snowflakes" />
          <div
            className={`chimney ${revealTree ? 'loading-image-visible' : 'loading-image-hidden'}`}
            style={{
              bottom: `${(220 / personalSceneHeight) * 100}%`,
              width: `${(420 / personalSceneWidth) * 100}%`,
            }}
          >
            <div
              className="chimney-inside"
              style={{
                height: `${(200 / 582.1) * 100}%`,
                width: `${(250 / 584.34) * 100}%`,
                top: `${(325 / 582.1) * 100}%`,
                left: `${(150 / 584.34) * 100}%`,
              }}
            >
              <div className="fire" />
            </div>
            <img src={Chimney} alt="" />
            <div
              className="flip-heart"
              style={{
                width: `${(39.87 / 584.34) * 100}%`,
                height: `${(47.31 / 582.1) * 100}%`,
                top: `${(248.01 / 582.1) * 100}%`,
                left: `${(131.78 / 584.34) * 100}%`,
              }}
            >
              <div className="flip-heart-inner">
                <div className="flip-heart-front">
                  <Heart />
                </div>
                <div className="flip-heart-back">
                  <Heart dark />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`window ${revealTree ? 'loading-image-visible' : 'loading-image-hidden'}`}
            style={{
              bottom: `${(213 / personalSceneHeight) * 100}%`,
              width: `${(250 / personalSceneWidth) * 100}%`,
            }}
          >
            <div
              className="window-outside"
              style={{
                height: `${(374.59 / 677.7) * 100}%`,
                width: `${(257 / 334) * 100}%`,
              }}
            >
              <Snow />
            </div>
            <img src={Window} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default YourTreePage;

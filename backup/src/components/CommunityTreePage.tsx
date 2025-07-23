import React, { useEffect, useState, useRef } from 'react';
import { ShowAt } from 'react-with-breakpoints';
import IntroModal from './Modals/IntroModal';
import IntroPage from './IntroPage';
import { Container } from 'react-bootstrap';
import { CaretRight } from '../images/icons';
import { InformationIcon } from '../images/icons';
import { Buildings, PeopleLeft, PeopleRight, ClockHand } from '../images/scenes';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tree from '../images/trees/community-tree.png';
import TreeLeaves from '../images/trees/community-tree-top-leaves.png';
import useImages from '../infrastructure/hooks/useImages';
import useTotalUpdate from '../infrastructure/hooks/useTotalUpdate';
import useLocalStorageSaveTotal from '../infrastructure/hooks/useLocalStorageSaveTotal';
import CommunityTreeBulbPositions from './Trees/CommunityTreeBulbPositions';
import CommunityBulb from './Trees/CommunityBulb';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { popFeed } from '../slices/deeds/actions';
import { viewedModal } from '../slices/users/actions';
import { numberWithCommas, getRandomItemFromArray } from '../helpers';
import FacebookButton from './Sharing/FacebookButton';
import TwitterButton from './Sharing/TwitterButton';
import PinterestButton from './Sharing/PinterestButton';
import FeedDto from '../slices/completeddeeds/types/FeedDto';
import Bulbs from '../images/trees';
import {
  eventCategoryNavigation,
  communityTreeHeight,
  communityTreeWidth,
  communitySceneHeight,
  communitySceneWidth,
  pageNameCommunityTreePage,
  pageNameIntroPage,
  eventCategoryCommunityTreePage,
  communityTreeFeedIntervalSeconds,
  communityTreeTotalUpdateIntervalSeconds,
  localStorageModalViewedKey,
} from '../constants';
import RootState from '../infrastructure/redux/RootState';
import { trackPageView, trackEvent } from '../infrastructure/tracking/GoogleAnalytics';
import { sendToOmniture } from '../infrastructure/tracking/Omniture';
import { ShareType } from './Sharing/ShareType';
import Loader from './Loader';
import Snow from './Trees/Snow';

const selectDeeds = (state: RootState) => state.deed.deeds;
const selectFeed = (state: RootState) => state.deed.feed;
const selectTotal = (state: RootState) => state.deed.communityCount;
const selectFeedIndex = (state: RootState) => state.deed.feedIndex;
const selectCompletedDeedCount = (state: RootState) => state.completedDeed.completedDeeds.length;
const selectDeedsLoaded = (state: RootState) => state.deed.loaded;
const selectModalViewed = (state: RootState) => state.user.hasSeenModal;

const CommunityTreePage = () => {
  const [feedItem, setFeedItem] = useState<FeedDto>({ deedId: '', name: '', sortOrder: 0 });
  const [clickedName, setClickedName] = useState<string>('');
  const [clickedBulbId, setClickedBulbId] = useState<string>('');
  const [clickedBulb, setClickedBulb] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);
  const [revealTree, setRevealTree] = useState<boolean>(false);

  const hasIntroModalBeenViewed = useSelector(selectModalViewed);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deeds = useSelector(selectDeeds);
  const feed = useSelector(selectFeed);
  const communityCount = useSelector(selectTotal);
  const feedIndex = useSelector(selectFeedIndex);
  const completedDeedCount = useSelector(selectCompletedDeedCount);
  const deedsLoaded = useSelector(selectDeedsLoaded);

  const dispatch = useDispatch();
  const imagesLoaded = useImages([Tree, TreeLeaves, ...Object.values(Bulbs)]);
  // useTotalUpdate(communityTreeTotalUpdateIntervalSeconds);
  // useLocalStorageSaveTotal();
  const onNewFeedItem = () => {
    setFeedItem(feed[feedIndex]);
    timeoutRef.current = setTimeout(() => {
      setClickedBulbId('');
      setClickedBulb(false);
      timeoutRef.current = null;
      const newIndex = feedIndex + 1;
      dispatch(popFeed(newIndex < feed.length ? newIndex : 0));
    }, communityTreeFeedIntervalSeconds * 1000);
  };

  const getClickedBulbName = (bulbId: string) => {
    const sortFunc = (a: FeedDto, b: FeedDto) =>
      (a.sortOrder <= feedIndex ? feedIndex - a.sortOrder : feed.length - (feedIndex - a.sortOrder)) -
      (b.sortOrder <= feedIndex ? feedIndex - b.sortOrder : feed.length - (feedIndex - b.sortOrder));
    const filteredOrderedList = feed.filter((x) => x.deedId === bulbId).sort(sortFunc);
    setClickedName(filteredOrderedList.length ? filteredOrderedList[0].name : getRandomName());
  };

  const getRandomName = () => {
    if (feed.length) {
      return getRandomItemFromArray(feed).name;
    }
    return 'Grace';
  };

  const handleBulbClick = (bulbId: string) => {
    const unclickingBulb = bulbId === clickedBulbId;
    trackEvent(eventCategoryCommunityTreePage, unclickingBulb ? 'UnclickBulb' : 'ClickBulb', bulbId);
    if (!unclickingBulb) {
      getClickedBulbName(bulbId);
    }
    setClickedBulb(!unclickingBulb);
    setClickedBulbId(unclickingBulb ? '' : bulbId);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    if (feed.length && feedIndex < feed.length && feedIndex >= 0) {
      onNewFeedItem();
    }
  };

  useEffect(() => {
    if (hasIntroModalBeenViewed) {
      sendToOmniture(pageNameCommunityTreePage);
      trackPageView(pageNameCommunityTreePage, '/');
    } else {
      sendToOmniture(pageNameIntroPage);
      trackPageView(pageNameIntroPage, '/intro');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (imagesLoaded && deedsLoaded) {
      if (!allLoaded) {
        setTimeout(() => setRevealTree(true), 300);
      }
      setAllLoaded(true);
    }
  }, [imagesLoaded, deedsLoaded]);

  useEffect(() => {
    if (feed.length && feedIndex < feed.length && !timeoutRef.current && feedIndex >= 0) {
      onNewFeedItem();
    }
    // eslint-disable-next-line
  }, [feedIndex]);

  const hideModal = (category: string, action: string, label: string, isRedirecting: boolean) => {
    trackEvent(category, action, label);
    if (!isRedirecting) {
      sendToOmniture(pageNameCommunityTreePage);
      trackPageView(pageNameCommunityTreePage, '/');
    }
    dispatch(viewedModal());
    try {
      window.localStorage.setItem(localStorageModalViewedKey, 'true');
    } catch {
      // localStorage not available
    }
  };

  const trackClick = (label: string) => {
    trackEvent(eventCategoryNavigation, 'Click', label);
  };

  return (
    <>
      <div className="page tree-scene community-tree">
        {/* <ShowAt breakpoint="mediumAndAbove">
          <IntroModal show={!hasIntroModalBeenViewed} hideModal={hideModal} />
        </ShowAt>
        <ShowAt breakpoint="small">
          <IntroPage
            onButtonClick={hideModal}
            className={`${!hasIntroModalBeenViewed ? 'show-intro-page' : 'hide-intro-page'}`}
          />
        </ShowAt> */}
        <Container className={`${hasIntroModalBeenViewed ? 'show-tree-scene' : 'hide-tree-scene'}`}>
          {!allLoaded && <Loader red images />}
          {allLoaded && (
            <div className="deed-count">
              <h1>
                Total Deeds: <br />
                <span className="highlighted">{numberWithCommas(communityCount)}</span>
              </h1>
              {/* {completedDeedCount < deeds.length && (
                <Link to="/deeds" onClick={() => trackEvent(eventCategoryCommunityTreePage, 'Click', 'DeedsButton')}>
                  <Button
                    classes={{
                      root: 'PrimaryBtn LgBtn',
                      label: 'BtnLabel',
                    }}
                  >
                    Do a good deed <CaretRight />
                  </Button>
                </Link>
              )} */}
            </div>
          )}

          <div className="tree-container">
            <div className={`tree ${revealTree ? 'loading-image-visible' : 'loading-image-hidden'}`}>
              <>
                <img src={Tree} alt="" />
                {deeds.map((x, i) => {
                  const position = CommunityTreeBulbPositions[i];
                  return (
                    <CommunityBulb
                      {...position}
                      {...x}
                      key={`CommunityBulb${x.id}`}
                      name={feedItem.name}
                      tooltipBulbId={feedItem.deedId}
                      onBulbClick={handleBulbClick}
                      clickedBulbId={clickedBulbId}
                      clickedBulb={clickedBulb}
                      clickedName={clickedName}
                    />
                  );
                })}
                <img
                  src={TreeLeaves}
                  className="top-leaves"
                  alt=""
                  style={{
                    left: `${(22.22 / communityTreeWidth) * 100}%`,
                    top: `${(121.26 / communityTreeHeight) * 100}%`,
                    width: `${(768.32 / communityTreeWidth) * 100}%`,
                  }}
                />
              </>
            </div>
            {/* {allLoaded && completedDeedCount < deeds.length && (
              <Link to="/deeds" onClick={() => trackEvent(eventCategoryCommunityTreePage, 'Click', 'DeedsButton')}>
                <Button
                  classes={{
                    root: 'PrimaryBtn LgBtn',
                    label: 'BtnLabel',
                  }}
                >
                  Do a good deed <CaretRight />
                </Button>
              </Link>
            )} */}
          </div>
          {/* <div className={`bottom-links ${hasIntroModalBeenViewed ? 'show-tree-scene' : 'hide-tree-scene'}`}>
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
              <p>Share</p>
              <div className="d-flex">
                <FacebookButton eventCategory={eventCategoryCommunityTreePage} shareType={ShareType.CommunityTree} />
                <TwitterButton eventCategory={eventCategoryCommunityTreePage} shareType={ShareType.CommunityTree} />
                <PinterestButton eventCategory={eventCategoryCommunityTreePage} shareType={ShareType.CommunityTree} />
              </div>
            </div>
          </div> */}
        </Container>
        <div className={`tree-background ${hasIntroModalBeenViewed ? 'show-tree-scene' : 'hide-tree-scene'}`}>
          <Snow community />
          <div className="buildings">
            <div className="left-buildings" />
            <div className="main-buildings-container">
              <div
                className="buildings-clock"
                style={{
                  top: `${(163.6 / 752) * 100}%`,
                  left: `${(1334.26 / 1920) * 100}%`,
                  width: `${(70.91 / 1920) * 100}%`,
                  height: `${(69.61 / 752) * 100}%`,
                }}
              >
                <ClockHand className="hours" />
                <ClockHand className="minutes" />
              </div>
              <Buildings className="main-buildings" />
            </div>
            <div className="right-buildings" />
            <div className="snow-ground" />
          </div>
          <PeopleLeft
            className="people-left"
            style={{
              bottom: `${(7 / communitySceneHeight) * 100}%`,
              width: `${(589 / communitySceneWidth) * 100}%`,
            }}
          />
          <PeopleRight
            className="people-right"
            style={{
              bottom: `${(3 / communitySceneHeight) * 100}%`,
              width: `${(531 / communitySceneWidth) * 100}%`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CommunityTreePage;

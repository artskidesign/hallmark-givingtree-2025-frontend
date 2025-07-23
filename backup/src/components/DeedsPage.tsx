import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Container } from 'react-bootstrap';
import DeedRow from '../slices/deeds/components/DeedRow';
import { useSelector } from 'react-redux';
import Title from './Layout/Title';
import { ArrowLeft } from '../images/icons';
import { trackPageView, trackEvent } from '../infrastructure/tracking/GoogleAnalytics';
import { sendToOmniture } from '../infrastructure/tracking/Omniture';
import { pageNameDeedsListPage, eventCategoryDeedsPage } from '../constants';
import RootState from '../infrastructure/redux/RootState';

const selectDeeds = (state: RootState) => state.deed.deeds;
const selectCompletedDeedIds = (state: RootState) => state.completedDeed.completedDeeds.map((x) => x.deedId);
const selectDeedsLoaded = (state: RootState) => state.completedDeed.apiCalled;
const selectUser = (state: RootState) => ({ userId: state.user.id, name: state.user.name, feed: state.user.feed });

const DeedsPage = () => {
  const deeds = useSelector(selectDeeds);
  const completedDeedIds = useSelector(selectCompletedDeedIds);
  const apiCalled = useSelector(selectDeedsLoaded);
  const { userId, name, feed } = useSelector(selectUser);

  useEffect(() => {
    sendToOmniture(pageNameDeedsListPage);
    trackPageView(pageNameDeedsListPage, '/deeds');
  }, []);

  return (
    <div className="page deeds-list-view">
      <Container>
        <div className="deeds-list-view-title">
          <Link to="/your-tree" onClick={() => trackEvent(eventCategoryDeedsPage, 'Click', 'BackToTree')}>
            <Button
              classes={{
                root: 'NoOutlineBtn MdBtn',
                label: 'BtnLabel',
              }}
            >
              <ArrowLeft />
              Back to tree
            </Button>
          </Link>
          <Title>
            {apiCalled && (
              <>
                You've Performed{' '}
                <span className="highlighted">
                  {completedDeedIds.length}/{deeds.length}
                </span>{' '}
                Deeds
              </>
            )}
          </Title>
        </div>
        <div className="deeds-list-view-container">
          {apiCalled &&
            deeds.map((deed) => (
              <DeedRow
                {...deed}
                key={deed.title}
                completed={completedDeedIds.includes(deed.id)}
                userId={userId}
                name={name}
                feed={feed}
                trackEvent={(action: string, label: string) => trackEvent(eventCategoryDeedsPage, action, label)}
                completedDeedsTotal={completedDeedIds.length}
              />
            ))}
        </div>
        <Link to="/your-tree">
          <Button
            classes={{
              root: 'NoOutlineBtn MdBtn',
              label: 'BtnLabel',
            }}
          >
            <ArrowLeft />
            Back to tree
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default DeedsPage;

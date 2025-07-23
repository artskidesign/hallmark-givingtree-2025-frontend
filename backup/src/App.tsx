import './App.css';

import { ConnectedRouter } from 'connected-react-router';
import React, { Dispatch, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { setDeeds } from './slices/deeds/actions';
import HallmarkFooter from './components/Hallmark/HallmarkFooter';
import HallmarkHeader from './components/Hallmark/HallmarkHeader';
import Header from './components/Header';
import TreeNavigation from './components/TreeNavigation';
import PageBackground from './components/Layout/PageBackground';
import AnimatedBanner from './components/Ads/AnimatedBanner';
import { shouldDisplayL } from './infrastructure/freewheel/breakpoints';
import CompletedDeed from './slices/completeddeeds/types/CompletedDeed';
import { history } from './infrastructure/redux/configureStore';
import { isIE } from 'react-device-detect';
import { BaseStateToProps, BaseStateToPropsOutput, UserDto } from './types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Routes from './infrastructure/routes/routes';
import callApi from './infrastructure/api/CallApi';
import { localStorageKey, localStorageSavedTotalKey, localStorageModalViewedKey } from './constants';
import { login, viewedModal } from './slices/users/actions';
import { updateTotal } from './slices/deeds/actions';
import { setCompletedDeeds } from './slices/completeddeeds/actions';
import { addIsWebview } from './infrastructure/isWebView/actions';
import Loader from './components/Loader';
import DeedsListDto from './slices/deeds/types/DeedsListDto';
import CompletedDeedsListDto from './slices/completeddeeds/types/CompletedDeedsListDto';
import './styles/style.scss';
import { deeds } from './slices/deeds/dummy-deeds';

interface AppProps extends BaseStateToPropsOutput {
  setDeeds: Dispatch<DeedsListDto>;
  setCompletedDeeds: Dispatch<Array<CompletedDeed>>;
}

const App: React.FC<AppProps> = ({ isWebView, setDeeds, setCompletedDeeds }) => {
  const [isCheckingLocalStorage, setIsCheckingLocalStorage] = useState<boolean>(true);
  // eslint-disable-next-line
  const [showErrorView, setShowErrorView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.href.toLowerCase().includes('hmc=1')) {
      dispatch(addIsWebview(true));
    }
    // try {
    //   const userData = localStorage.getItem(localStorageKey);
    //   if (userData) {
    //     const userDto = JSON.parse(userData) as UserDto;
    //     dispatch(login(userDto, false));
    //     callApi<CompletedDeedsListDto>(`api/app/completedDeed/completedDeeds/${userDto.id}`, 'GET')
    //       .then((response) => {
    //         setCompletedDeeds(response.data.completedDeeds);
    //       })
    //       .catch(() => setShowErrorView(true));
    //   }
    // } catch {
    //   // TODO: handle error
    // } finally {
    //   setIsCheckingLocalStorage(false);
    // }

    // try {
    //   const initialCount = localStorage.getItem(localStorageSavedTotalKey);
    //   if (initialCount) {
    //     dispatch(updateTotal(parseInt(initialCount)));
    //   }
    // } catch {}

    // try {
    //   const modalViewed = localStorage.getItem(localStorageModalViewedKey);
    //   if (modalViewed) {
    //     dispatch(viewedModal());
    //   }
    // } catch {}

    setDeeds(deeds);
    // callApi<DeedsListDto>(`api/app/deed/deeds`, 'GET')
    //   .then((response) => {
    //     console.log(response.data);
    //     setDeeds(response.data);
    //   })
    //   .catch(() => setShowErrorView(true));

    const ieClass = isIE ? 'isIE' : 'notIE';
    document.body.classList.add(ieClass);

    // eslint-disable-next-line
  }, []);

  // if (isCheckingLocalStorage) {
  //   return <Loader />;
  // }
  return (
    <ConnectedRouter history={history}>
      <PageBackground>
        <div id="content-wrap">
          <HallmarkHeader isWebView={isWebView} />
          {showErrorView ? (
            <React.Fragment>
              <Header />
              <div className="page-content error">
                <Container>
                  <h5 className="mb-4">Something went wrong! Please try again.</h5>
                  <Button
                    classes={{
                      root: 'PrimaryBtn SmBtn',
                      label: 'BtnLabel',
                    }}
                    onClick={() => window.location.reload(false)}
                  >
                    Reload
                  </Button>
                </Container>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Header />
              <TreeNavigation />
              <Routes />
            </React.Fragment>
          )}
          <div id="background-container" />
        </div>
        <AnimatedBanner />
        <div id="footer">
          <HallmarkFooter shouldDisplay={!shouldDisplayL} isWebView={isWebView} />
        </div>
      </PageBackground>
    </ConnectedRouter>
  );
};

const mapStateToProps: (state: BaseStateToProps) => BaseStateToPropsOutput = ({ isWebView }) => ({
  isWebView: isWebView.webView,
});

const mapDispatchToProps = (dispatch: any) => ({
  setDeeds: bindActionCreators(setDeeds, dispatch),
  setCompletedDeeds: bindActionCreators(setCompletedDeeds, dispatch),
});

const enhance = compose(
  // withApi,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(App);

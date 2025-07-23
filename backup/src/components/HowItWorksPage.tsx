import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Title from './Layout/Title';
import { trackPageView } from '../infrastructure/tracking/GoogleAnalytics';
import { sendToOmniture } from '../infrastructure/tracking/Omniture';
import { pageNameHowItWorksPage } from '../constants';

const HowItWorks = () => {

  useEffect(() => {
    sendToOmniture(pageNameHowItWorksPage);
    trackPageView(pageNameHowItWorksPage, '/how-it-works');
  }, []);

  return (
    <div className="page how-it-works">
      <Container>
        <Title>How it works</Title>
        <p>
          <strong>How does The Giving Tree Work?</strong>
          <br />
          Please register to be a part of the experience and then select which Good Deeds you would like to perform.
          When you commit to doing a good deed, you receive a light for your personal tree. As your personal tree begins
          to light up, you help power the community tree!
          <br />
          <br />
          <strong>How long can you participate in The Giving Tree?</strong>
          <br />
          The Giving Tree will be lit until Monday December 28, 2020.
          <br />
          <br />
          <strong>Will there be new deeds?</strong>
          <br />
          Yes! Check back every week for new deeds to be added.
        </p>
      </Container>
    </div>
  );
};

export default HowItWorks;

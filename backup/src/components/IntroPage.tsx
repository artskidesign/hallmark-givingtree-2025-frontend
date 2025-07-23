import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { CaretRight, Step2, InformationIcon, LongArrowRight } from '../images/icons';
import Title from './Layout/Title';
import { eventCategoryIntroModal } from '../constants';

interface FirstPlayPageProps {
  className?: string;
  onButtonClick: (category: string, action: string, label: string, isRedirecting: boolean) => void;
}

const FirstPlayPage: React.FC<FirstPlayPageProps> = ({ className, onButtonClick }) => {
  const buttonClick = (action: string, label: string) => onButtonClick(eventCategoryIntroModal, action, label, true);
  const [animateCheckbox, setAnimateCheckbox] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCheckbox(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page intro-page ${className}`}>
      <Container>
        <div className="steps">
          <div className="step">
            <div className="modal-checkbox-container">
              <div className={`modal-checkbox ${animateCheckbox ? 'modal-checkbox-animated' : ''}`}>
                <div className="modal-checkmark">
                  <div />
                  <div />
                </div>
              </div>
            </div>
            <p>Perform Good Deeds</p>
          </div>
          <LongArrowRight className="arrow" />
          <div className="step">
            <img src={Step2} alt="" />
            <p>Light your tree and the community tree</p>
          </div>
        </div>
        <Button
          classes={{
            root: 'PrimaryBtn LgBtn',
            label: 'BtnLabel',
          }}
          onClick={() => buttonClick('Click', 'GetStarted')}
        >
          Get Started <CaretRight />
        </Button>
        <Link to="/how-it-works" className="info-link" onClick={() => buttonClick('Click', 'HowItWorks')}>
          <Button
            classes={{
              root: 'NoOutlineBtn MdBtn',
              label: 'BtnLabel',
            }}
          >
            <InformationIcon />
            How it works
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default FirstPlayPage;

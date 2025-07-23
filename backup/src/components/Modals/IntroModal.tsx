import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import { LongArrowRight, CaretRight, HorizontalLogo, Step2, CloseIcon, InformationIcon } from '../../images/icons';
import SponsorLogo from './../SponsorLogo';
import { eventCategoryIntroModal } from '../../constants';
import HallmarkChannelLogo from '../../images/HallmarkChannelLogo';

interface FirstPlayModalProps {
  show: boolean;
  hideModal: (category: string, action: string, label: string, isRedirecting: boolean) => void;
}

const FirstPlayModal: React.FC<FirstPlayModalProps> = ({ show, hideModal }) => {
  const onHideModal = (action: string, label: string, isRedirecting: boolean) =>
    hideModal(eventCategoryIntroModal, action, label, isRedirecting);
  const [animateCheckbox, setAnimateCheckbox] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCheckbox(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={() => onHideModal('Hide', 'Modal', false)}
    >
      <Modal.Body className="landing-modal">
        <div className="landing-modal-header">
          <HallmarkChannelLogo className="hallmark-modal-logo" red />
          <HorizontalLogo />
          <SponsorLogo />
        </div>
        <div className="outline">
          <div onClick={() => onHideModal('Hide', 'Modal', false)} className="close-button">
            <CloseIcon />
          </div>
        </div>
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
          onClick={() => onHideModal('Click', 'GetStarted', true)}
        >
          Get Started <CaretRight />
        </Button>
        <Link to="/how-it-works" className="info-link">
          <Button
            classes={{
              root: 'NoOutlineBtn MdBtn',
              label: 'BtnLabel',
            }}
            onClick={() => onHideModal('Click', 'HowItWorks', true)}
          >
            <InformationIcon />
            How it works
          </Button>
        </Link>
      </Modal.Body>
    </Modal>
  );
};

export default FirstPlayModal;

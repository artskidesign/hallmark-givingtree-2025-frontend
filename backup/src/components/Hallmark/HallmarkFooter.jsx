import React from 'react';
import IconFacebook from '../../images/social/footer_social_facebook';
import IconInstagram from '../../images/social/footer_social_instagram';
import IconPinterest from '../../images/social/footer_social_pinterest';
import IconTwitter from '../../images/social/footer_social_twitter';
import IconYoutube from '../../images/social/footer_social_youtube';
import HallmarkChannelLogo from '../../images/HallmarkChannelLogo.svg';
import FooterAd from '../Ads/FooterAd';

const renderIcons = {
  facebook: IconFacebook,
  twitter: IconTwitter,
  instagram: IconInstagram,
  pinterest: IconPinterest,
  youtube: IconYoutube,
};

function SocialIcon({ link, name, isWebView }) {
  const Icon = renderIcons[name];

  return (
    <a
      className="SocialLink media-socialLinks-item-link"
      rel="noreferrer"
      href={link}
      target={isWebView ? '' : '_blank'}
      data-social-service={name}
    >
      <Icon />
      <span className="sr-only">{name}</span>
    </a>
  );
}

const HallmarkFooter = ({ shouldDisplay, isWebView }) => {
  return (
    <>
      <footer className="Page-footer">
        <div className="Page-footer-Ad">
          <FooterAd shouldDisplay={shouldDisplay} classNames="banner-footer" />
        </div>

        <div className="Page-footer-container">
          <div className="Page-footer-containerTop">
            <div className="Page-footer-logo">
              <a aria-label="home page" href="https://www.hallmarkchannel.com/">
                <img className="PageLogo-image" src={HallmarkChannelLogo} alt="Hallmark Channel Logo" />
              </a>
            </div>

            <div className="Page-footer-social">
              <div className="SocialBar">
                <div className="SocialBar-heading">Follow Us</div>

                <ul className="SocialBar-items">
                  <li className="SocialBar-items-item">
                    <SocialIcon link="https://twitter.com/hallmarkchannel" name="twitter" isWebView={isWebView} />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon
                      link="https://www.instagram.com/hallmarkchannel/"
                      name="instagram"
                      isWebView={isWebView}
                    />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon
                      link="https://www.youtube.com/hallmarkchannelusa"
                      name="youtube"
                      isWebView={isWebView}
                    />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon
                      link="https://www.pinterest.com/hallmarkchannel"
                      name="pinterest"
                      isWebView={isWebView}
                    />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon link="https://www.facebook.com/hallmarkchannel" name="facebook" isWebView={isWebView} />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="Page-footer-containerBottom">
            <div className="Page-footer-navigation">
              <nav className="FooterNavigation" aria-label="footer-navigation">
                <ul className="FooterNavigation-items">
                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkmoviesandmysteries.com/"
                        >
                          Hallmark Movies &amp; Mysteries
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a className="FooterNavigationItem-text-link" href="https://www.hallmarkdrama.com/">
                          Hallmark Drama
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hmnow.com"
                          target={isWebView ? '' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          Hallmark Movies Now
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a className="FooterNavigationItem-text-link" href="https://www.hallmarkchannel.com/about-us">
                          About Us
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a className="FooterNavigationItem-text-link" href="https://www.hallmarkchannel.com/contact-us">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a className="FooterNavigationItem-text-link" href="https://www.hallmarkchannel.com/faq">
                          FAQ
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="http://corporate.crownmedia.com/#/careers"
                          target={isWebView ? '' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          Careers
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/advertising"
                        >
                          Advertising
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.crownmediainternational.com/"
                          target={isWebView ? '' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          International
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="http://corporate.crownmedia.com/"
                          target={isWebView ? '' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          Corporate
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="http://www.hallmarkchannelpress.com/?SiteID=142&amp;NodeID=144"
                          target={isWebView ? '' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          Press
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/channel-locator"
                        >
                          Channel Locator
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a className="FooterNavigationItem-text-link" href="https://www.hallmarkchannel.com/newsletter">
                          Newsletter
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/privacy-policy"
                        >
                          Privacy Policy
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/crown-media-family-networks-terms-of-use"
                        >
                          Terms of Use
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/ca-privacy-policy"
                        >
                          CA Privacy Notice
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/do-not-sell-my-info"
                        >
                          CA Do Not Sell My Info
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="http://www.hallmark.com/"
                          target={isWebView ? '' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          Hallmark Cards
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="FooterNavigation-items-item navigation-footer-item">
                    <div className="FooterNavigationItem">
                      <div className="FooterNavigationItem-text">
                        <a
                          className="FooterNavigationItem-text-link"
                          href="https://www.hallmarkchannel.com/accessibility-notice"
                        >
                          Accessibility
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="Page-footer-disclaimer">
              <div className="cms-textAlign-center">
                Copyright © 2020 Crown Media Family Networks, all rights reserved
              </div>
            </div>

            <div className="Page-footer-social">
              <div className="SocialBar">
                <div className="SocialBar-heading">Follow Us</div>

                <ul className="SocialBar-items">
                  <li className="SocialBar-items-item">
                    <SocialIcon link="https://twitter.com/hallmarkchannel" name="twitter" isWebView={isWebView} />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon
                      link="https://www.instagram.com/hallmarkchannel/"
                      name="instagram"
                      isWebView={isWebView}
                    />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon
                      link="https://www.youtube.com/hallmarkchannelusa"
                      name="youtube"
                      isWebView={isWebView}
                    />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon
                      link="https://www.pinterest.com/hallmarkchannel"
                      name="pinterest"
                      isWebView={isWebView}
                    />
                  </li>

                  <li className="SocialBar-items-item">
                    <SocialIcon link="https://www.facebook.com/hallmarkchannel" name="facebook" isWebView={isWebView} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HallmarkFooter;

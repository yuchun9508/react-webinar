import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import IntroductionContent from '../components/Home/IntroductionContent';
import RegisterForm from '../components/Home/RegisterForm';
import RegistrationContent from '../components/Home/RegistrationContent';
import WebinarItem from '../components/Home/WebinarItem';
import WebinarsContent from '../components/Home/WebinarsContent';

const Home = () => {
  const location = useLocation();
  const { hash } = location;

  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const [selectedWebinar, setSelectedWebinar] = useState({});
  const registrationContentRef = useRef();

  useEffect(() => {
    if (hash === '#register') {
      const offsetTop = registrationContentRef.current.offsetTop;
      window.scrollTo({
        top: offsetTop,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [hash]);

  const selectHandler = (webinarData) => {
    setSelectedWebinar(webinarData);
  };

  return (
    <Fragment>
      <WebinarsContent
        render={(webinar) => (
          <WebinarItem item={webinar} onSelect={selectHandler} />
        )}
      ></WebinarsContent>
      <IntroductionContent />
      {isAuth && (
        <RegistrationContent ref={registrationContentRef}>
          <RegisterForm defaultWebinar={selectedWebinar} />
        </RegistrationContent>
      )}
    </Fragment>
  );
};

export default Home;

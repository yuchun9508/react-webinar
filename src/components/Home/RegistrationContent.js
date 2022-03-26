import React from 'react';

import classes from './RegistrationContent.module.css';

const RegistrationContent = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={classes.registration}>
      <div className="container">{props.children}</div>
    </section>
  );
});

export default RegistrationContent;

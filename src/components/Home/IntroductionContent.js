import classes from './IntroductionContent.module.css';

const IntroductionContent = () => {
  return (
    <section className={classes.introduction}>
      <div className={`container ${classes.content}`}>
        <div className={classes.content__text}>
          <h1>Meet Your Host - Alistair Schultz</h1>
          <div>
            <p>
              With more than 15 years of experience covering both the FX and CFD
              markets, Alistair has extensive knowledge covering algorithmic
              trading, market analysis & an impressive educational background.
            </p>
            <br />
            <p>
              As the author of ‘Essentials for Trading Students – An Overview of
              the Basics for Aspiring Traders’, which was released in 2017,
              Alistair will take any aspiring trader from the basics right
              through to advanced analytics used in institutional funds.
            </p>
            <br />
            <p>
              At the core of Alistair’s teachings is the ability to help each
              trader uncover their ‘Trading DNA', helping them flourish with the
              skills and timeframes that work best for them.
            </p>
          </div>
        </div>
        <div className={classes.content__video}>
          <div className={classes.iframeContainer}>
            <iframe
              title="Meet Your Host - Alistair Schultz"
              src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=https://example.com"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionContent;

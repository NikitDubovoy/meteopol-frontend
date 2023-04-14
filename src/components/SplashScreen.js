import React, { useState, useEffect } from "react";

const SplashScreen = (props) => {
  const { isDownloadDownloadAll } = props;
  const [splashScreenClassName, setSplashScreenClassName] = useState(
    "splash-screen splash-screen_visible"
  );

  useEffect(() => {
    if (isDownloadDownloadAll) {
      setSplashScreenClassName("splash-screen");
    }
  }, [isDownloadDownloadAll]);

  return (
    <div className={splashScreenClassName}>
      <div className="splash-screen__logo animation__opacity"></div>
      <div className="splash-screen__title-block">
        <h1 className="splash-screen__title animation__appearance">METEOPOL</h1>
      </div>
    </div>
  );
};

export default SplashScreen;

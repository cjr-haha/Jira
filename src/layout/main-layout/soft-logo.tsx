import React, { memo, useCallback, useMemo } from "react";
import softwareLogo from "assets/software-logo.svg";

const SoftWareLogo = memo(() => {
  const backToHome = useCallback(() => {
    console.log("BACK");
  }, []);

  const style = useMemo(
    () => ({
      width: "180px",
      height: "30px",
      background: `url(${softwareLogo})`,
      backgroundSize: "cover",
    }),
    [softwareLogo]
  );
  return <div className={"logo"} style={style}></div>;
});

export default SoftWareLogo;

import React from "react";
import classnames from "classnames";

const Preloader = ({ preloaderStyle }) => {
  const styles = classnames("preloader", preloaderStyle);
  return (
    <div className={styles}>
      <div
        className="mt-5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Preloader;

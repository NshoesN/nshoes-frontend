import React from "react";
import { Rings } from "react-loader-spinner";

export default function LoadingIndicator() {
  return (
    <div style={styles.loaderContainer}>
      <Rings
        color="#0070c9" // 애플 블루 색상
        height={80}
        width={80}
        timeout={5000} //5 secs
      />
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

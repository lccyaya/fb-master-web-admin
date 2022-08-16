import styles from './index.module.less';
import { isMobile } from '@/utils';
import cls from 'classnames';
import React, { useState } from 'react';
const Image = ({
  src,
  width,
  height,
  className = '',
  animate,
  showErrorImg = true,
  isMobile
}) => {
  const [show, setShow] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const defaultImg =
    'https://cryptotwits-image.s3.ap-southeast-1.amazonaws.com/cryptotwits-static/b559b21993a82d4383de73055433cede.png';
  const errorUrl = isMobile
    ? 'https://image.coinlive.com/cryptotwits-static/a99da8c83553e35a8846f1d456266c64/default.png'
    : 'https://image.coinlive.com/cryptotwits-static/72fddd281430af57b20839a9f7459445/default_img.png';
  return (
    show ? <img
      className={cls(styles.image, className, animate ? styles.animate : null)}
      style={loaded ? { backgroundColor: 'transparent', width, height } : {}}
      src={src || defaultImg}
      // width={width}
      // height={height}
      onLoad={(currentTarget) => {
        setLoaded(true);
      }}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        setShow(false);
        // if (showErrorImg) {
        //   currentTarget.src = errorUrl;
        // } else {
        //   currentTarget.src = defaultImg;
        // }
      }}
    /> : null
  );
};
export default Image;

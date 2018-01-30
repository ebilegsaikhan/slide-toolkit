import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "antd";
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  return (
    <div className={`${styles.globalFooter} ${className}`}>
      {copyright && <div className={styles.copyright}>
        {copyright} 
      </div>}
    </div>
  );
};

GlobalFooter.defaultProps = {
  className: undefined,
  links: undefined,
  copyright: {},
};

GlobalFooter.propTypes = {
  className: PropTypes.string,
  links: PropTypes.string,
  copyright: PropTypes.object,
};

export default GlobalFooter;

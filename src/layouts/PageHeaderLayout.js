import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PageHeader } from '../';
import styles from './PageHeaderLayout.less';

const PageHeaderLayout = ({
  children, wrapperClassName, top, ...restProps
}) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    <PageHeader {...restProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);

PageHeaderLayout.defaultProps = {
  children: undefined,
  wrapperClassName: undefined,
  top: undefined,
};

PageHeaderLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  wrapperClassName: PropTypes.string,
  top: PropTypes.string,
};

export default PageHeaderLayout;


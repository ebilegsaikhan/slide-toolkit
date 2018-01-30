import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import {
  // Breadcrumb,
  Tabs,
} from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const { TabPane } = Tabs;

// function getBreadcrumbNameWithParams(breadcrumbNameMap, url) {
//   let name = '';
//   Object.keys(breadcrumbNameMap).forEach((item) => {
//     const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
//     const itemRegExp = new RegExp(itemRegExpStr);
//     if (itemRegExp.test(url)) {
//       name = breadcrumbNameMap[item];
//     }
//   });
//   return name;
// }

export default class PageHeader extends PureComponent {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  static defaultProps = {
    onTabChange: () => {},
    linkElement: () => {},
    title: undefined,
    logo: undefined,
    action: undefined,
    content: undefined,
    extraContent: undefined,
    className: undefined,
    // breadcrumbList: [],
    tabList: [],
    match: {},
    location: {},
  };
  static propTypes = {
    onTabChange: PropTypes.func,
    linkElement: PropTypes.func,
    title: PropTypes.string,
    logo: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
    extraContent: PropTypes.string,
    action: PropTypes.string,
    // breadcrumbList: PropTypes.array,
    tabList: PropTypes.array,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  getBreadcrumbProps = () => ({
    // routes: this.props.routes || this.context.routes,
    params: this.props.match.params,
    location: this.props.location,
    // breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
  });
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    return (last || !route.component)
      ? <span>{route.breadcrumbName}</span>
      : createElement(linkElement, {
        href: paths.join('/') || '/',
        to: paths.join('/') || '/',
      }, route.breadcrumbName);
  }
  render() {
    // const {
    //   routes, params, location, breadcrumbNameMap,
    // } = this.getBreadcrumbProps();
    const {
      title, logo, action, content, extraContent,
      // breadcrumbList,
      tabList, className,
      // linkElement = 'a',
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    // let breadcrumb;
    // if (routes && params) {
    //   breadcrumb = (
    //     <Breadcrumb
    //       className={styles.breadcrumb}
    //       routes={routes.filter(route => route.breadcrumbName)}
    //       params={params}
    //       itemRender={this.itemRender}
    //     />
    //   );
    // } else if (location && location.pathname) {
    //   const pathSnippets = location.pathname.split('/').filter(i => i);
    //   const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    //     const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    //     return (
    //       <Breadcrumb.Item key={url}>
    //         {createElement(
    //           index === pathSnippets.length - 1 ? 'span' : linkElement,
    //           { [linkElement === 'a' ? 'href' : 'to']: url },
    //           breadcrumbNameMap[url] ||
    //           breadcrumbNameMap[url.replace('/', '')] ||
    //           getBreadcrumbNameWithParams(breadcrumbNameMap, url) ||
    //           url,
    //         )}
    //       </Breadcrumb.Item>
    //     );
    //   });
    //   const breadcrumbItems = [(
    //     <Breadcrumb.Item key="home">
    //       {createElement(linkElement, {
    //         [linkElement === 'a' ? 'href' : 'to']: '/',
    //       }, '首页')}
    //     </Breadcrumb.Item>
    //   )].concat(extraBreadcrumbItems);
    //   breadcrumb = (
    //     <Breadcrumb className={styles.breadcrumb}>
    //       {breadcrumbItems}
    //     </Breadcrumb>
    //   );
    // } else if (breadcrumbList && breadcrumbList.length) {
    //   breadcrumb = (
    //     <Breadcrumb className={styles.breadcrumb}>
    //       {
    //         breadcrumbList.map(item => (
    //           <Breadcrumb.Item key={item.title}>
    //             {item.href ? (
    //               createElement(linkElement, {
    //                 [linkElement === 'a' ? 'href' : 'to']: item.href,
    //               }, item.title)
    //             ) : item.title}
    //           </Breadcrumb.Item>))
    //       }
    //     </Breadcrumb>
    //   );
    // } else {
    //   breadcrumb = null;
    // }

    const tabDefaultValue = tabList && (tabList.filter(item => item.default)[0] || tabList[0]);

    return (
      <div className={clsString}>
        {
          /*
            <div className={`${styles.breadcrumb} ant-breadcrumb`}>
              <span>
                <span className="ant-breadcrumb-link">
                  <a href="#/">Удирдах самбар</a>
                </span>
                <span className="ant-breadcrumb-separator">/</span>
              </span>
              <span>
                <span className="ant-breadcrumb-link">
                  <a href="#/list">Оюутан</a>
                </span>
                <span className="ant-breadcrumb-separator">/</span>
              </span>
              <span>
                <span className="ant-breadcrumb-link">
                  <span to="/list/table-list">Бүртгэл</span>
                </span>
                <span className="ant-breadcrumb-separator">/</span>
              </span>
            </div>
          */
        }
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
        {
          tabList &&
          tabList.length ?
            <Tabs
              className={styles.tabs}
              defaultActiveKey={(tabDefaultValue && tabDefaultValue.key)}
              onChange={this.onChange}
            >
              {
                tabList.map(item => <TabPane tab={item.tab} key={item.key} />)
              }
            </Tabs> : null
        }
      </div>
    );
  }
}

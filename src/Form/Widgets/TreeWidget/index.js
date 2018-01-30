
import React, { Component } from 'react';
import { Tree } from 'antd';
import PropTypes from 'prop-types';

const { TreeNode } = Tree;

class TreeWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
    };
  }

  onCheck = (checkedKeys, e) => {
    this.props.onChange(checkedKeys);

    let toExpand = [];
    e.checkedNodes.forEach((entry) => {
      if (entry.props.children && entry.props.children.length) { toExpand.push(entry.key); }
    });

    let tempData = [...this.state.expanded, ...toExpand];
    let unique = [...new Set(tempData)];
    this.onExpand(unique, { node: e.node, expanded: true });
  };

  onExpand = (expandedKeys, e) => {
    if (e.expanded) {
      this.setState({ expanded: expandedKeys });
    } else {
      const recursive = (object, array) => {
        array.push(object.key);

        if (!object.children || !object.children.length) {
          return array;
        }

        object.children.forEach((entry) => {
          array = array.concat(recursive(entry, []));
        });
        return array;
      };

      let childrens = [];
      childrens = recursive(e.node.props.dataRef, []);

      let toExpand = [];

      expandedKeys.forEach((entry) => {
        if (childrens.indexOf(entry) === -1) {
          toExpand.push(entry);
        }
      });

      console.log('chi', toExpand, childrens);

      this.setState({ expanded: toExpand });
    }
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item} selectable={false}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode dataRef={item} selectable={false} {...item} />;
  });

  render() {
    return (
      <Tree
        checkable
        multiple
        expandedKeys={this.state.expanded}
        checkedKeys={this.props.value}
        onCheck={this.onCheck}
        onExpand={this.onExpand}
      >
        {this.renderTreeNodes(this.props.schema.options)}
      </Tree>
    );
  }
}

TreeWidget.defaultProps = {
  value: [],
};

TreeWidget.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
};

export default TreeWidget;


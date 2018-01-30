import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';
import styles from "./index.less";

class CascaderWidget extends Component {
  highlightKeyword(str, keyword, prefixCls) {
    let regex = new RegExp(keyword, 'gi');
    let indices = [];
    let startIndex = 0;

    while ((str.toLowerCase().indexOf(keyword.toLowerCase(), startIndex)) > -1) {
      indices.push(str.toLowerCase().indexOf(keyword.toLowerCase(), startIndex));
      startIndex = str.toLowerCase().indexOf(keyword.toLowerCase(), startIndex) + keyword.length;
    }

    return str.split(regex)
      .map((node, index) => (index === 0 ? node : [
        <span className={`${prefixCls}-menu-item-keyword`} key="seperator">{str.substr(indices[index - 1], keyword.length)}</span>,
        node,
      ]));
  }

  handleOnChange = (value) => {
    let string = '';
    value.forEach((entry, index) => {
      if (index === 0) {
        string = entry;
      } else {
        string = `${string} / ${entry}`;
      }
    });
    this.props.onChange(string.toString());
  }

  handleSetValue = () => {
    if (!this.props.value) {
      return this.props.value;
    }

    if (typeof this.props.value === 'number') {
      return [this.props.value];
    }

    if (this.props.value.indexOf(' / ') < 0) {
      return [Number.parseInt(this.props.value, 10)];
    }

    let array = this.props.value.split(' / ');
    return array.map(entry => Number.parseInt(entry, 10));
    // this.props.value ? this.props.value.split(' / ') : this.props.value;
  }

  render() {
    return (
      <Cascader
        disabled={this.props.disabled}
        options={this.props.schema.options}
        required={this.props.required}
        popupClassName={styles.cascaderPopUp}
        showSearch={
          {
            render: (inputVal, path, prefixCls) => (
                path.map(({ label }, index) => {
                  const node = label.toLowerCase().indexOf(inputVal.toLowerCase()) > -1 ?
                  this.highlightKeyword(label, inputVal, prefixCls) : label;
                  return index === 0 ? node : [' / ', node];
                })
              ),
            filter: (inputVal, path) => path.some(option => (option.label.toLowerCase().indexOf(inputVal.toLowerCase()) > -1)),
          }
        }
        value={this.handleSetValue()}
        onChange={this.handleOnChange}
        placeholder={this.props.placeholder ? this.props.placeholder : `${this.props.schema.label} сонгох`}
      />
    );
  }
}

CascaderWidget.defaultProps = {
  value: undefined,
  placeholder: '',
  options: {},
  disabled: false,
  required: false,
};

CascaderWidget.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CascaderWidget;

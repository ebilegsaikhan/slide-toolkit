import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import moment from 'moment';

const TimePickerWidget = props => (<TimePicker
  style={{ width: '100%' }}
  value={props.value ? moment(props.value) : undefined}
  allowClear
  required={props.required}
  onChange={value => props.onChange(value ? value.format() : null)}
  disabled={props.disabled}
/>);

TimePickerWidget.defaultProps = {
  value: '',
  disabled: false,
};

TimePickerWidget.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimePickerWidget;

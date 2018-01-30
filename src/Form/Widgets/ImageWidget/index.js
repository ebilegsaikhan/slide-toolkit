import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import styles from './style.css';

const beforeUpload = (file) => {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Зурагны хэмжээ 10MB ээс бага байх ёстой');
  }
  return isLt10M;
};


const ImageWidget = (props) => {
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      console.log('sss', info);
      props.onChange(info.file.response.url);
    }
  };

  return (
    <Upload
      className={`avatar-uploader ${styles.avatarUploader}`}
      accept="image/*"
      name="image"
      showUploadList={false}
      action="/api/core/images"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {
        props.value ?
          <div style={{ backgroundImage: `url(${props.value})` }} className={`avatar ${styles.avatar}`} /> :
          <Icon type="plus" className={`avatar-uploader-trigger ${styles.avatarUploaderTrigger}`} />
      }
    </Upload>
  );
};

ImageWidget.defaultProps = {
  value: '',
};

ImageWidget.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ImageWidget;

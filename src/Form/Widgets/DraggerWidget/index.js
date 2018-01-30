import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import styles from './style.css';

const MultiUpload = Upload.Dragger;

const beforeUpload = (file) => {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Зурагны хэмжээ 10MB ээс бага байх ёстой');
  }
  return isLt10M;
};


const DraggerWidget = (props) => {
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      console.log('Uploads Info : ', info);
      props.onChange(info.file.response.data);
    }
  };

  return (
    <MultiUpload
      className={`avatar-uploader ${styles.avatarUploader}`}
      accept="image/*"
      name="image"
      showUploadList={false}
      action="/rest/store_product/upload_image"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {
        props.value ?
          <div style={{ backgroundImage: `url(${props.value})` }} className={`avatar ${styles.avatar}`} />
          :
          <div>
            <Icon type="plus" className={`avatar-uploader-trigger ${styles.avatarUploaderTrigger}`} />
            <p className="ant-upload-hint">Зураг нэмэх</p>
          </div>

        }
    </MultiUpload>
  );
};

DraggerWidget.defaultProps = {
  value: '',
};

DraggerWidget.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DraggerWidget;

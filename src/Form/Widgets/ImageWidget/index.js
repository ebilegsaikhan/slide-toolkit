import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Button } from 'antd';
// import styles from './style.css';

// const beforeUpload = (file) => {
//   const isLt10M = file.size / 1024 / 1024 < 10;
//   if (!isLt10M) {
//     message.error('Зурагны хэмжээ 10MB ээс бага байх ёстой');
//   }
//   return isLt10M;
// };


class ImageWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  handleChange = (info) => {
    console.log('ImageWidget: ', info);
    if (info.file.status === 'done') {
      console.log('sss', info);
      this.props.onChange(info.file.response.data);
    }
  };

  render() {
    const options = {
      action: '//jsonplaceholder.typicode.com/posts/',
      multiple: true,
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log('beforeUpload: ', file);
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    // /rest/store_product/upload_image
    return (
      <div>
        <Upload {...options}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      </div>
    );
  }
}

ImageWidget.defaultProps = {
  // value: '',
};

ImageWidget.propTypes = {
  // value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ImageWidget;

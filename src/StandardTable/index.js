import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
  state = {
    selectedId: null,
  };

  hundleRowClass = record => (record._id === this.state.selectedId ? styles.selected : '');

  handleRowClick = (record) => {
    this.setState({ selectedId: record._id });
    this.props.onSelect(record._id);
  }

  render() {
    const {
      data,
    } = this.props;

    return (
      <div className={styles.standardTable}>
        <Table
          rowClassName={this.hundleRowClass}
          onRow={record => ({
            onClick: () => this.handleRowClick(record),
          })}
          bordered
          rowKey={record => record._id}
          dataSource={data}
          pagination={{
            ...this.props.pagination, showQuickJumper: true,
          }}
          onChange={this.handleTableChange}
          {...this.props}
        />
      </div>
    );
  }
}

StandardTable.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  scroll: PropTypes.object,
};

StandardTable.defaultProps = {
  onSelect: undefined,
  onChange: undefined,
  pagination: {},
  scroll: {},
};

export default StandardTable;

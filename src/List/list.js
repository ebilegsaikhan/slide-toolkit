import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Popconfirm } from 'antd';
import { StandardTable, ModalForm, Form } from '../';

import styles from './style.less';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selectedId: null,
      body: {
        limit: 20,
        page: 1,
        filtered: {},
        sorted: [],
      },
    };
  }

  componentDidMount() {
    this.refresh();
  }

  handleTableChange = ({ current, pageSize }, filters, sorter) => {
    this.setState({
      body: {
        ...this.state.body,
        page: current,
        limit: pageSize,
        sorted: [{
          id: sorter.field,
          desc: sorter.order !== 'ascend',
        }],
      },
    }, () => this.refresh());
  }

  showModal = (modal) => {
    this.setState({
      visible: modal,
    });
  }

  handleCancel = (callback) => {
    const cb = typeof callback === 'function' ? callback : null;
    this.setState({
      visible: true,
    }, cb);
  }

  handleOnSelect = (selectedId) => {
    this.setState({
      selectedId,
    });
  }

  afterSubmit = () => {
    this.handleCancel(() => {
      this.refresh();
    });
  }

  refresh = () => {
    this.props.getAllData({ body: this.state.body, url: this.props.url });
  }

  filterHandler = (data) => {
    this.setState({
      body: {
        ...this.state.body,
        page: 1,
        filtered: data.formData,
      },
    }, () => this.refresh());
  }

  deleteData = () => {
    if (this.state.selectedId) {
      let requestObject = { _id: this.state.selectedId };
      if (this.props.url) {
        requestObject = { ...requestObject, url: this.props.url };
      }
      this.props.deleteData(requestObject).then(() => {
        this.refresh();
      });
    }
  }

  render() {
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          {this.props.filter &&
            <Form
              modelName={this.props.model}
              form={this.props.filterForm}
              fetchForm={this.props.fetchFilter}
              formIsLoading={this.props.filterIsLoading}
              clearButton
              submitButtonName={'Хайх'}
              submitAction={this.filterHandler}
            />
          }
          <div className={styles.tableListOperator}>
            { this.props.actions.indexOf('create') !== -1 &&
              <Button
                onClick={() => this.showModal(`${this.props.model}Create`)}
                icon="plus"
                type="primary"
              >
                {`${this.props.name} бүртгэх`}
              </Button>
            }
            { this.props.actions.indexOf('update') !== -1 &&
              <Button
                onClick={() => this.showModal(`${this.props.model}Update`)}
                icon="edit"
                type="primary"
                disabled={!this.state.selectedId}
              >
                {`${this.props.name} засах`}
              </Button>
            }
            { this.props.actions.indexOf('delete') !== -1 &&
              <Popconfirm
                title="Та устгахдаа итгэлтэй байна уу?"
                onConfirm={e => this.deleteData(e)}
                okText="Тийм"
                cancelText="Үгүй"
              >
                <Button
                  icon="delete"
                  type="danger"
                  disabled={!this.state.selectedId}
                >
                  {`${this.props.name} устгах`}
                </Button>
              </Popconfirm>

            }
            {this.props.addonsArray.map(entry => (
              <Button
                onClick={() => this.showModal(`${entry.model}AddOnUpdate`)}
                icon="edit"
                type="primary"
                key={entry.model}
                disabled={!this.state.selectedId}
              >
                {`${entry.name} засах`}
              </Button>
            ))}
            {this.customAddons && this.customAddons.map(entry => entry())}
          </div>
          <StandardTable
            bordered
            onSelect={this.handleOnSelect}
            onChange={this.handleTableChange}
            columns={this.props.headers}
            data={this.props.data}
            loading={this.props.isLoading}
            pagination={{
              total: this.props.total,
              current: this.state.body.page,
              pageSize: this.state.body.limit,
              showSizeChanger: true,
            }}
            scroll={{ x: this.props.scroll }}
          />
        </div>
        <ModalForm
          visible={this.state.visible === `${this.props.model}Create`}
          modelName={`${this.props.model}/post`}
          submitAction={this.props.createData}
          onCancel={this.handleCancel}
          afterSubmit={this.afterSubmit}
          fetchForm={this.props.fetchForm}
          form={this.props.createForm}
          formIsLoading={this.props.formIsLoading}
          title={`${this.props.name} бүртгэх`}
          url={this.props.url}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
        />
        <ModalForm
          visible={this.state.visible === `${this.props.model}Update`}
          modelName={`${this.props.model}/put`}
          submitAction={this.props.updateData}
          onCancel={this.handleCancel}
          afterSubmit={this.afterSubmit}
          fetchForm={this.props.fetchForm}
          form={this.props.updateForm}
          formIsLoading={this.props.formIsLoading}
          fetchData={this.props.getData}
          dataParams={{ _id: this.state.selectedId }}
          dataIsLoading={this.props.dataIsLoading}
          data={this.props.currentData}
          title={`${this.props.name} засах`}
          url={this.props.url}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
        />
        {this.props.addonsArray.map((entry, index) => (
          <ModalForm
            key={entry.model}
            visible={this.state.visible === `${entry.model}AddOnUpdate`}
            onCancel={this.handleCancel}
            form={entry.form}
            formIsLoading={this.props.formIsLoading}
            fetchForm={this.props.fetchForm}
            data={entry.data}
            afterSubmit={this.afterSubmit}
            dataParams={{ _id: this.state.selectedId }}
            dataIsLoading={entry.isLoading}
            fetchData={this.props[`addons${index}get`]}
            modelName={`${entry.model}/put`}
            submitAction={this.props[`addons${index}update`]}
            title={`${entry.name} засах`}
            url={this.props.url}
            error={entry.error}
            errorMessage={entry.errorMessage}
          />
        ))}
      </Card>
    );
  }
}

List.propTypes = {
  getAllData: PropTypes.func.isRequired,
  headers: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  // end of list props

  model: PropTypes.string.isRequired,
  filter: PropTypes.bool,
  scroll: PropTypes.number,
  addonsArray: PropTypes.array,
  name: PropTypes.string,
  url: PropTypes.string,
  actions: PropTypes.array,
  // customAddons: PropTypes.array,
  // end of component props

  fetchForm: PropTypes.func.isRequired,
  formIsLoading: PropTypes.bool,
  // end of form props

  fetchFilter: PropTypes.func.isRequired,
  filterIsLoading: PropTypes.bool,
  filterForm: PropTypes.object,
  // end of filter props

  createData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  createForm: PropTypes.object,
  updateForm: PropTypes.object,
  getData: PropTypes.func.isRequired,
  dataIsLoading: PropTypes.bool,
  currentData: PropTypes.object,
  // end of create update props

  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

List.defaultProps = {
  headers: [],
  data: [],
  isLoading: false,
  total: 0,
  // end of list props

  filter: false,
  scroll: undefined,
  addonsArray: [],
  name: '',
  url: undefined,
  actions: [],
  // customAddons: [],
  // end of component props

  formIsLoading: false,
  // end of form props

  filterIsLoading: false,
  filterForm: {},
  // end of filter props

  createForm: {},
  updateForm: {},
  dataIsLoading: false,
  currentData: {},

  error: false,
  errorMessage: '',
};

export default List;

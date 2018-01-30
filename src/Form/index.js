/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import { Button, message, Form as andForm } from "antd";
import style from "./style.less";

import {
  InputWidget,
  TextareaWidget,
  CheckboxWidget,
  CheckboxesWidget,
  DraggerWidget,
  SelectWidget,
  CascaderWidget,
  RadioGroupWidget,
  PhoneWidget,
  DatePickerWidget,
  TreeWidget,
  CodeWidget,
  EmailWidget,
  NumberWidget,
  RangeWidget,
  ImageWidget,
  TimePicker,
} from './Widgets';

import {
  ErrorList,
  FieldTemplate,
  ObjectFieldTemplate,
} from './FieldTemplates';

const FormItem = andForm.Item;

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      isSubmitted: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onChangeHandler = (formObject) => {
    this.setState({
      formData: formObject.formData,
    });
  }

  onSubmitHandler = async () => {
    let submitObject = {};
    submitObject = { ...{ body: this.state.formData } };

    console.log({ formdata: this.state.formData });

    if (this.props.url) {
      submitObject = { ...submitObject, ...{ url: this.props.url } };
    }

    await this.props.submitAction(submitObject);
    if (this.props.error) {
      this.setState({
        isSubmitted: true,
      });
      console.log(this.props.error, this.props.errorMessage);
      message.error('Алдаа гарлаа', this.props.errorMessage);
    } else {
      message.success('Амжилттай хүлээн авлаа.');
      // setTimeout(() => {
      //   window.location.href = "/products";
      // }, 4000);
    }
  }

  onErrorHandler = (a, b, c, d) => {
    console.log({
      a, b, c, d,
    });
    this.setState({
      isSubmitted: true,
    });
  }


  fetchData = async () => {
    if (this.props.fetchData) {
      let sendObject = this.props.dataParams || {};

      await this.props.fetchData(sendObject);
      this.setState({ formData: {} }, () => {
        this.setState({ formData: this.props.data });
      });
    }
    return true;
  }

  transformErrors = errors => errors.map((error) => {
    if (error.name === "required") {
      error.message = "Заавал бѳглѳх ёстой";
    }
    if (error.name === "pattern") {
      error.message = "Утасны дугаар 11 оронгоос бага байх ёстой";
    }
    return error;
  })

  clear = () => {
    this.setState({
      formData: {},
    });
  }


  widgets = {
    input: InputWidget,
    textarea: TextareaWidget,
    cascader: CascaderWidget,
    select: SelectWidget,
    "radio-group": RadioGroupWidget,
    phone: PhoneWidget,
    time: TimePicker,
    date: DatePickerWidget,
    year: InputWidget,
    checkbox: CheckboxWidget,
    checkboxes: CheckboxesWidget,
    tree: TreeWidget,
    code: CodeWidget,
    email: EmailWidget,
    imageDragger: DraggerWidget,
    image: ImageWidget,
    number: NumberWidget,
    range: RangeWidget,
  }

  FieldTemplate = FieldTemplate
  ErrorList = ErrorList
  ObjectFieldTemplate = ObjectFieldTemplate

  render() {
    const onChange = this.props.onChange ? this.props.onChange : this.onChangeHandler;
    const onError = this.props.onError ? this.props.onError : this.onErrorHandler;
    const onSubmit = this.props.onSubmit ? this.props.onSubmit : this.onSubmitHandler;
    const liveValidate = this.props.liveValidate ? this.props.liveValidate : this.state.isSubmitted;

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Form
        schema={(this.props.form && Object.keys(this.props.form).length) ? this.props.form.schema : {}}
        uiSchema={(this.props.form && Object.keys(this.props.form).length) ? this.props.form.uiSchema : {}}
        formData={this.state.formData}
        formContext={this.state.formData}
        noHtml5Validate
        fields={this.fields}
        FieldTemplate={this.FieldTemplate}
        ObjectFieldTemplate={this.ObjectFieldTemplate}
        ErrorList={this.ErrorList}
        widgets={this.widgets}
        transformErrors={this.transformErrors}
        liveValidate={liveValidate}
        className={`${style.otForm} ant-row`}
        onChange={(formObject) => { onChange(formObject); }}
        onSubmit={(formObject) => { onSubmit(formObject); }}
        onError={(formObject) => { onError(formObject); }}
      >
        <FormItem className="ant-col-md-24" {...submitFormLayout} style={{ marginTop: '15px' }}>
          {this.props.dataParams.body.id ? <Button type="danger" style={{ marginRight: 8 }} onClick={() => this.props.delete(this.props.dataParams || {})} >Устгах</Button> : null}
          <Button style={{ marginRight: 8 }} type="button" onClick={() => this.clear()}>{this.props.cancelButtonName || 'Цэвэрлэх'}</Button>
          <Button style={{ marginRight: 8 }} htmlType="submit" loading={this.props.dataIsLoading} type="primary">{this.props.submitButtonName || 'Оруулах'}</Button>
        </FormItem>
      </Form>
    );
  }
}

FormComponent.defaultProps = {
  error: undefined,
  delete: undefined,
  errorMessage: undefined,
  fetchData: undefined,
  form: undefined,
  dataIsLoading: undefined,
  dataParams: {},
  data: undefined,
  onChange: undefined,
  onError: undefined,
  onSubmit: undefined,
  submitAction: undefined,
  liveValidate: undefined,
  cancelButtonName: '',
  submitButtonName: '',
  url: '',
};

FormComponent.propTypes = {
  error: PropTypes.bool,
  delete: PropTypes.func,
  errorMessage: PropTypes.string,
  form: PropTypes.object,
  fetchData: PropTypes.func,
  dataIsLoading: PropTypes.bool,
  submitAction: PropTypes.func,
  dataParams: PropTypes.object,
  data: PropTypes.object,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onSubmit: PropTypes.func,
  liveValidate: PropTypes.bool,
  cancelButtonName: PropTypes.string,
  submitButtonName: PropTypes.string,
  url: PropTypes.string,
};

export default FormComponent;

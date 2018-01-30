import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListComponent from './list';

String.prototype.unCapitalize = function unCapitalize() {
  return this.charAt(0).toLowerCase() + this.slice(1);
};

const mapStateToProps = (state, ownProps) => {
  const {
    [ownProps.model.unCapitalize()]: {
      all: {
        data, isLoading, pages, headers, total,
      },
      current: {
        data: currentData, isLoading: currentIsLoading, error, errorMessage,
      },
    },
    form: {
      forms: {
        [`${ownProps.model}/post`]: createForm,
        [`${ownProps.model}/put`]: updateForm,
      },
      isLoading: formIsLoading,
    },
    filter: {
      filters: {
        [ownProps.model]: filterForm,
      },
      isLoading: filterIsLoading,
    },
  } = state;

  let returnObject = {
    data,
    isLoading,
    pages,
    headers,
    total,
    currentData,
    currentIsLoading,
    // default props
    createForm,
    updateForm,
    formIsLoading,
    // form props
    filterForm,
    filterIsLoading,
    error,
    errorMessage,
  };

  if (ownProps.addons && ownProps.addons.length) {
    let addonsArray = [];
    ownProps.addons.forEach((entry, index) => {
      addonsArray[index] = {};
      addonsArray[index].data = state[entry.model.unCapitalize()].current.data;
      addonsArray[index].isLoading = state[entry.model.unCapitalize()].current.isLoading;
      addonsArray[index].error = state[entry.model.unCapitalize()].current.error;
      addonsArray[index].errorMessage = state[entry.model.unCapitalize()].current.errorMessage;
      addonsArray[index].form = state.form.forms[`${entry.model}/put`];
      addonsArray[index].name = entry.name;
      addonsArray[index].model = entry.model;
    });
    returnObject.addonsArray = addonsArray;
  }

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    fetchForm: this.props.Models.Form.get,
    fetchFilter: this.props.Models.Filter.get,
    getAllData: this.props.Models[ownProps.model].all,
    getData: this.props.Models[ownProps.model].get,
    createData: this.props.Models[ownProps.model].create,
    updateData: this.props.Models[ownProps.model].update,
    deleteData: this.props.Models[ownProps.model].delete,
  };

  if (ownProps.addons && ownProps.addons.length) {
    ownProps.addons.forEach((entry, index) => {
      actionCreators[`addons${index}get`] = this.props.Models[entry.model].get;
      actionCreators[`addons${index}update`] = this.props.Models[entry.model].update;
    });
  }

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

const List = props => (props.list ?
  props.list(props) :
  <ListComponent {...props} />);


List.propTypes = {
  list: PropTypes.func,
  actions: PropTypes.array.isRequired,
  models: PropTypes.object.isRequired,
  // getAllData: PropTypes.func.isRequired,
  // headers: PropTypes.array,
  // data: PropTypes.array,
  // isLoading: PropTypes.bool,
  // total: PropTypes.number,
  // // end of list props

  // model: PropTypes.string.isRequired,
  // filter: PropTypes.bool,
  // scroll: PropTypes.number,
  // addonsArray: PropTypes.array,
  // name: PropTypes.string,
  // url: PropTypes.string,
  // customAddons: PropTypes.array,
  // list: PropTypes.func,
  // // end of component props

  // fetchForm: PropTypes.func.isRequired,
  // formIsLoading: PropTypes.bool,
  // // end of form props

  // fetchFilter: PropTypes.func.isRequired,
  // filterIsLoading: PropTypes.bool,
  // filterForm: PropTypes.object,
  // // end of filter props

  // createData: PropTypes.func.isRequired,
  // updateData: PropTypes.func.isRequired,
  // createForm: PropTypes.object,
  // updateForm: PropTypes.object,
  // getData: PropTypes.func.isRequired,
  // dataIsLoading: PropTypes.bool,
  // currentData: PropTypes.object,
  // // end of create update props
};

List.defaultProps = {
//   headers: [],
//   data: [],
//   isLoading: false,
//   total: 0,
//   // end of list props

//   filter: false,
//   scroll: 1800,
//   addonsArray: [],
//   name: '',
//   url: undefined,
//   customAddons: [],
  list: undefined,
//   // end of component props

//   formIsLoading: false,
//   // end of form props

//   filterIsLoading: false,
//   filterForm: {},
//   // end of filter props

//   createForm: {},
//   updateForm: {},
//   dataIsLoading: false,
//   currentData: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

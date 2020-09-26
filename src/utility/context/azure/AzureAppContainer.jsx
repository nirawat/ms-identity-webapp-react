import React, { Component } from "react";
import { history } from "../../../history";
import { connect } from "react-redux";
import AuthProvider from "../../../authServices/azure/authProvider";
import themeConfig from "../../../configs/themeConfig";
import {
  updateAccount,
  updateError,
  updateToken,
  updateProfile,
  updateUI,
} from "../../../redux/actions/auth/azure/updateActions";

import { getProfile } from "../../../redux/actions/auth/azure/serviceActions";

class AzureAppContainer extends Component {
  render() {
    themeConfig.azureAuth = this.props;

    if (!this.props.isAuthenticated) {
      history.push("/pages/login");
    } else {
      history.push("/");
    }
    
    return <></>;
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account) => {
    dispatch(updateAccount(account));
  },
  updateError: (error) => {
    dispatch(updateError(error));
  },
  updateToken: (token) => {
    dispatch(updateToken(token));
  },
  getProfile: (id) => {
    dispatch(getProfile(id));
  },
  updateProfile: (payload) => {
    dispatch(updateProfile(payload));
  },
  updateUI: (payload) => {
    dispatch(updateUI(payload));
  },
});

// AppContainer is a container component wrapped by HOC AuthProvider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(AzureAppContainer));

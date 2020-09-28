import React, { Component } from "react";
import { history } from "../../../history";
import { connect } from "react-redux";
import AuthProvider from "../../../authServices/azure/authProvider";
import themeConfig from "../../../configs/themeConfig";
import {
  updateAccount,
  updateError,
  updateToken,
  updateUI,
} from "../../../redux/actions/auth/azure/updateActions";
import { getProfile } from "../../../redux/actions/auth/azure/serviceActions";
import AzureAppProfile from "./AzureAppProfile";

class AzureAppContainer extends Component {
  render() {
    themeConfig.azureAuth = this.props;

    if (!this.props.isAuthenticated) {
      history.push("/pages/login");
    } else {
      history.push("/");
    }
    
    return (
      <>
        {/* {console.log(this.props)} */}
        {this.props.isAuthenticated ? (
          <AzureAppProfile
            acquireToken={this.props.acquireToken}
            updateToken={this.props.updateToken}
            getProfile={this.props.getProfile}
            auth={this.props.auth}
            ui={this.props.ui}
          />
        ) : (
          <></>
        )}
      </>
    );
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
  updateUI: (payload) => {
    dispatch(updateUI(payload));
  },
  getProfile: (id) => {
    dispatch(getProfile(id));
  },
});

// AppContainer is a container component wrapped by HOC AuthProvider
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(AzureAppContainer));

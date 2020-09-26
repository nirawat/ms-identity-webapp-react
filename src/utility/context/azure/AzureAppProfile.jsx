import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateProfile,
  updateUI,
} from "../../../redux/actions/auth/azure/updateActions";
import themeConfig from "../../../configs/themeConfig";
import { getProfile } from "../../../redux/actions/auth/azure/serviceActions";

class AzureAppProfile extends Component {
  componentDidMount = () => {
    ///{console.log(this.props)}
    const azureAuth = themeConfig.azureAuth;
    // acquire the token and update the store
    azureAuth.acquireToken().then((response) => {
      if (response) {
        // set access token
        azureAuth.updateToken(response);

        if (azureAuth.auth.idToken) {
          // Our mock database assign user Ids based on MS Graph API account id, which corresponds to the "oid" claim in the id_token
          // visit https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens for more information

          //let tokenOID = this.props.auth.idToken.oid.replace(/-/gi, ''); // removing dashes
          let tokenOID = azureAuth.auth.idToken.oid;

          // check if user already exists
          try {
            azureAuth.getProfile(tokenOID);
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  };

  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (payload) => {
    dispatch(updateProfile(payload));
  },
  updateUI: (payload) => {
    dispatch(updateUI(payload));
  },
  getProfile: (id) => {
    dispatch(getProfile(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AzureAppProfile);

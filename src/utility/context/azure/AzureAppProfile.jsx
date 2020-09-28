import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUI } from "../../../redux/actions/auth/azure/updateActions";
//import themeConfig from "../../../configs/themeConfig";

class AzureAppProfile extends Component {
  componentDidMount = () => {
    //acquire the token and update the store
    this.props.acquireToken().then((response) => {
      if (response) {
        // set access token
        this.props.updateToken(response);

        if (this.props.auth.idToken) {
          // Our mock database assign user Ids based on MS Graph API account id, which corresponds to the "oid" claim in the id_token
          // visit https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens for more information

          //let tokenOID = this.props.auth.idToken.oid.replace(/-/gi, ''); // removing dashes
          let tokenOID = this.props.auth.idToken.oid;

          // check if user already exists
          try {
            this.props.getProfile(tokenOID);
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  };

  render() {
    //themeConfig.azureAuth = this.props;
    return <></>;
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  updateUI: (payload) => {
    dispatch(updateUI(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AzureAppProfile);

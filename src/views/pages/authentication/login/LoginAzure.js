import React from "react";
import { CardBody, Button } from "reactstrap";
import themeConfig from "../../../../configs/themeConfig";

const LoginAzure = (props) => {
  const azureAuth = themeConfig.azureAuth;
  return (
    <React.Fragment>
      <CardBody className="pt-1 pb-3">
        <Button.Ripple
          color="primary"
          className="mt-1"
          onClick={(e) => {
            e.preventDefault();
            azureAuth.signIn(false).then(() => {
              if (azureAuth.account) {
                // console.log(this.props);
                azureAuth.updateAccount(azureAuth.account);
              } else {
                if (azureAuth.error) {
                  azureAuth.updateError(azureAuth.error);
                } else {
                  azureAuth.updateError({
                    errorMessage: "Sign-in failed. Please try again.",
                  });
                }
              }
            });
          }}
        >
          Login With Azure
        </Button.Ripple>
      </CardBody>
    </React.Fragment>
  );
};
export default LoginAzure;

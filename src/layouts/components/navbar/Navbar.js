import React from "react";
import { Navbar } from "reactstrap";
import { connect } from "react-redux";
import classnames from "classnames";
import { logoutWithJWT } from "../../../redux/actions/auth/loginActions";
import NavbarBookmarks from "./NavbarBookmarks";
import NavbarUser from "./NavbarUser";
import userNone from "../../../assets/img/portrait/small/avatar-s-none.jpg";
//import userImg from "../../../assets/img/portrait/small/avatar-s-none.jpg";

const UserName = (props) => {
  let username = "";
  if (props.userdata !== undefined) {
    username = props.userdata.name;
  } else if (props.user.login.values !== undefined) {
    username = props.user.login.values.name;
    if (
      props.user.login.values.loggedInWith !== undefined &&
      props.user.login.values.loggedInWith === "jwt"
    ) {
      username = props.user.login.values.loggedInUser.name;
    }
  } else {
    username = props.userProfile.givenName === null ? "Guest" : `${props.userProfile.givenName} ${props.userProfile.surname.substring(0,1)}.`;
  }
  return username;
};
const ThemeNavbar = (props) => {
  const { user } = ''//useAuth0()
  const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"];
  const navbarTypes = ["floating", "static", "sticky", "hidden"];
  // {console.log(props)}
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light":
              props.navbarColor === "default" ||
              !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) ||
              (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            scrolling: props.horizontal && props.scrolling,
          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
                <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                />
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0">Gulf</h2>
                </div>
              ) : null}
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={<UserName userdata={user} {...props} />}
                userImg={
                  props.user.login.values !== undefined &&
                  props.user.login.values.loggedInWith !== "jwt" &&
                  props.user.login.values.photoUrl
                    ? props.user.login.values.photoUrl
                    : user !== undefined && user.picture
                    ? user.picture
                    : userNone
                }
                loggedInWith={
                  props.user !== undefined &&
                  props.user.login.values !== undefined
                    ? props.user.login.values.loggedInWith
                    : null
                }
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  //{console.log(state.profile)}
  return {
    user: state.auth,
    userProfile: state.profile,
    imgProfile: ''
  };
};

export default connect(mapStateToProps, {
  logoutWithJWT,
})(ThemeNavbar);

import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logoutUser } from "../../redux/actions/authActions";

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          {" "}
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

const mapStateToProps = state => ({
  state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

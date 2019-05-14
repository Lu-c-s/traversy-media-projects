import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loginUser } from '../../redux/actions/authActions'
import { clearErrors } from '../../redux/actions/errorActions'

class LoginModal extends React.Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null
  };

   componentDidUpdate(prevProps) {
       const { error, isAuthenticated } = this.props;
       if(error !== prevProps.error){
           if(error.id === 'LOGIN_FAIL'){
               this.setState({ msg: error.msg.msg })
           } else {
               this.setState({ msg: null })
           }
       }

       if(this.state.modal && isAuthenticated ){
           this.toggle()
       }
   }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.props.clearErrors()

    this.setState(state => {
      return {
        modal: !state.modal
      };
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email , password } = this.state

    const user = {
        email,
        password
    }


    this.props.login(user)

    this.toggle()
  };



  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          {" "}
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login </ModalHeader>
          <ModalBody>
          { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="mb-3"
                  placeholder="email"
                  onChange={this.onChange}
                />

                <Label for="item">password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  placeholder="password"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(loginUser(user)),
  clearErrors: () => dispatch(clearErrors())
});

const mapStateToProps = state => ({
  isAuthentiated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);

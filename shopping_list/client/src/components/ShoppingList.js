import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../redux/actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  }
  componentDidMount() {
    this.props.getItems();
  }

  onClickDelete = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remote-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onClickDelete.bind(this, _id)}
                    >
                      {" "}
                      &times;{" "}
                    </Button>
                  ) : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  deleteItem: id => dispatch(deleteItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);

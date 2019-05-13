import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { connect } from "react-redux";
import { getItems , deleteItem } from "../redux/actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  onClickDelete = id => {
      this.props.deleteItem(id)
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remote-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onClickDelete.bind(this, id)}
                  >
                    {" "}
                    &times;{" "}
                  </Button>
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

ShoppingList.propTypes = {
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

const mapDispatchToProps = dispatch => ({
  getItems :() => dispatch(getItems()),
  deleteItem: (id) => dispatch(deleteItem(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);

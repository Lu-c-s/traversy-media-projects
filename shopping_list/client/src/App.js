import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap'
import { loadUser } from './redux/actions/authActions'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(loadUser())
  }

  render(){
    return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />      
      </Container>
    </div>
  );
  }
  
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(null,mapDispatchToProps)(App);
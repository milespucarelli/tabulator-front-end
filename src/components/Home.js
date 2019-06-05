import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Home extends Component {

  render() {
    return (
      <div id='background'>
        <Container text>
        <Header as='h1' content='TABULATOR' inverted />
        </Container>
      </div>
    );
  }

}

export default Home;

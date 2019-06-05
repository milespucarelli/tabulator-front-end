import React, { Component } from 'react';
import { Container, Item, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Home extends Component {

  render() {
    return (
      <div id='background'>
        <Container text>
          <Item>
            <Item.Content>
              <Item.Header as='h1' content='TABULATOR' inverted />
            </Item.Content>
          </Item>
        </Container>
      </div>
    );
  }

}

export default Home;

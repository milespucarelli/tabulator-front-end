import React, { Component } from 'react';
import { Container, Item } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Home extends Component {

  render() {
    return (
      <div id='background'>
        <Container text>
          <Item>
            <Item.Content>
              <Item.Header as='h1' inverted>TABULATOR</Item.Header>
              <Item.Meta>A tabulature editor for the web</Item.Meta>
            </Item.Content>
          </Item>
        </Container>
      </div>
    );
  }

}

export default Home;

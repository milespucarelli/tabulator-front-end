import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Vex from 'vexflow';
import MIDISounds from 'midi-sounds-react'
import { Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Responsive,
  Segment
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = () => (
  <Container text>
    <Header
      id='homepage-title'
      as='h1'
      content='TABULATOR'
      inverted
    />
    <Header
      id='homepage-tagline'
      as='h2'
      content='A tabulature editor for the web'
      inverted
    />
  </Container>
)

class DesktopContainer extends Component {
  render() {
    const { children } = this.props

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Segment
            id='background'
            inverted
            textAlign='center'
            style={{ minHeight: 500, padding: '1em 0em' }}
            vertical
          >
          <div className='overlay'>
            <Menu inverted size='large' style={{background: 'transparent'}}>
              <Container>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </div>
          </Segment>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}


class Home extends Component {
  state = {
    clicked: false
  }
  clearCanvas = () => {
    this.context.svg.remove()
  }

  makeStaffNotes = (staffNotes) => {
    return staffNotes.map(note => {
      let vfNote = new Vex.Flow.StaveNote(note)
      note.keys.forEach((key, index) => {
        if (key.includes('#')) {
          vfNote.addAccidental(index, new Vex.Flow.Accidental("#"))
        }
      })
      return vfNote
    })
  }

  makeTabNotes = (tabNotes) => {
    return tabNotes.map(note => new Vex.Flow.TabNote(note))
  }

  drawStaffAndTab = () => {
    this.renderer = new Vex.Flow.Renderer(this.refs.miniCanvas, Vex.Flow.Renderer.Backends.SVG);
    this.renderer.resize(600, 250);
    this.context = this.renderer.getContext()
    let tabNoteArr = [
      { positions:[{str: 5, fret: '0'}, {str: 4, fret: '2'}, {str: 3, fret: '2'}], duration: 'q' },
      { positions:[{str: 5, fret: '0'}, {str: 4, fret: '2'}, {str: 3, fret: '2'}], duration: 'q' },
      { positions:[{str: 5, fret: '0'}, {str: 4, fret: '4'}], duration: 'q' },
      { positions:[{str: 5, fret: '0'}], duration: 'q' },
      { positions:[{str: 5, fret: '0'}, {str: 4, fret: '5'}], duration: 'q' },
      { positions:[{str: 5, fret: '0'}], duration: 'q' },
      { positions:[{str: 5, fret: '0'}, {str: 4, fret: '4'}], duration: 'q' },
      { positions:[{str: 5, fret: '3'}], duration: 'q' }
    ]
    let staffNoteArr = [
      {clef: "treble", keys: ['a/3', 'e/4', 'a/4'], duration: "q" },
      {clef: "treble", keys: ['a/3', 'e/4', 'a/4'], duration: "q" },
      {clef: "treble", keys: ['a/3', 'f#/4'], duration: "q" },
      {clef: "treble", keys: ['a/3'], duration: "q" },
      {clef: "treble", keys: ['a/3', 'g/4'], duration: "q" },
      {clef: "treble", keys: ['a/3'], duration: "q" },
      {clef: "treble", keys: ['a/3', 'f#/4'], duration: "q" },
      {clef: "treble", keys: ['c/4'], duration: "q" }
    ]
    this.staffNotes = this.makeStaffNotes(staffNoteArr)
    this.tabNotes = this.makeTabNotes(tabNoteArr)
    let staff1 = new Vex.Flow.Stave(0, 0, 250)
        .addClef("treble")
        .addTimeSignature("4/4")
        .setContext(this.context)
        .draw()
    let tab1 = new Vex.Flow.TabStave(0, 80, 250)
        .addClef("tab")
        .setContext(this.context)
        .draw()
    const startX = staff1.getNoteStartX()
    tab1.setNoteStartX(startX + 2)
    let tab1Notes = this.tabNotes.slice(0, 4)
    let staff1Notes = this.staffNotes.slice(0, 4)

    let staff2 = new Vex.Flow.Stave(250, 0, 250)
      .setContext(this.context)
      .draw()
    let tab2 = new Vex.Flow.TabStave(250, 80, 250)
      .setContext(this.context)
      .draw()
    let tab2Notes = this.tabNotes.slice(4, 8)
    let staff2Notes = this.staffNotes.slice(4, 8)
    Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab1, staff1, tab1Notes, staff1Notes, true)
    Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab2, staff2, tab2Notes, staff2Notes, true)
    this.context.svg.removeChild(this.context.svg.lastChild)
  }

  playHandler = () => {
    if (this.state.clicked) {
      this.midiSounds.stopPlayLoop()
		  this.midiSounds.beatIndex = 0
    } else {
      const strings = { '1': 64, '2': 59, '3': 55, '4': 50, '5': 45, '6': 40 }
      let beats = this.tabNotes.map(tabNote => {
        let positions = tabNote.positions.map(position => {
          let {str, fret} = position
          return strings[`${str}`] + parseInt(fret)
        })
        return [[], [[335, positions, 1/4]]]
      })
      this.midiSounds.setInstrumentVolume(335, 0.10);
      this.midiSounds.startPlayLoop(beats, 270, 1/4, this.midiSounds.beatIndex)
    }

    this.setState({clicked: !this.state.clicked})
  }

  convertDuration = (duration) => {
    switch (duration) {
      case 'q':
        return '4'
      default:
        return ''
    }
  }

  componentDidMount() {
    this.drawStaffAndTab()
    this.midiSounds.cacheInstrument(335);
  }
  // <Container text>
  //   <Item>
  //     <Item.Content verticalAlign={'center'}>
  //       <Item.Header as='h1' className='inverted'>TABULATOR</Item.Header>
  //       <Item.Meta className='inverted'>A tabulature editor for the web</Item.Meta>
  //     </Item.Content>
  //   </Item>
  // </Container>
  render() {
    return (
      <ResponsiveContainer>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Tab it, save it, and send it, all online.
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Now you can tab out your new musical ideas using a free streamlined web-based editor,
                  without the hassle of downloading or uploading local tab files or paying for premium features.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Instantly Play Back your Composition and Hear it Come to Life
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Tabulator leverages the power of <a href='https://github.com/0xfe/vexflow'> VexFlow </a>
                  and <a href='https://github.com/surikov/midi-sounds-react'> React MIDI Sounds </a>
                  to score, tab, and perform your musical idea as you write it.
                </p>
              </Grid.Column>
              <Grid.Column width={6}>
                <div
                  id="mini-canvas"
                  ref="miniCanvas"
                  className="canvas">
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button
                  onClick={this.playHandler}
                  style={{backgroundColor: '#6ac62e'}}
                  size='huge'
                  inverted>
                    {this.state.clicked ? 'Cut it' : 'Play It Back'}
                </Button>
                <div id='midi-logo'>
                  <MIDISounds
                    ref={(ref) => (this.midiSounds = ref)}
                    appElementName="root"
                    instruments={[335]}/>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  "What a Company"
                </Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  "I shouldn't have gone with their competitor."
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src='/images/avatar/large/nan.jpg' />
                  <b>Nan</b> Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Breaking The Grid, Grabs Your Attention
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Instead of focusing on content creation and hard work, we have learned how to master the
              art of doing nothing by providing massive amounts of whitespace and generic content that
              can seem massive, monolithic and worth your attention.
            </p>
            <Button as='a' size='large'>
              Read More
            </Button>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Case Studies</a>
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Did We Tell You About Our Bananas?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
              it's really true. It took years of gene splicing and combinatory DNA research, but our
              bananas can really dance.
            </p>
            <Button as='a' size='large'>
              I'm Still Quite Interested
            </Button>
          </Container>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Footer Header
                  </Header>
                  <p>
                    Extra space for a call to action inside the footer that could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    )
  }
}

export default Home;

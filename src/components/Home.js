import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
import tabText from '../assets/images/tab_text.jpg'
import vextab from '../assets/images/vextab_sample.png'
import miles from '../assets/images/headshot2_square.jpg'

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
  loginClickHandler = () => {
    this.props.history.push('/login')
  }

  signupClickHandler = () => {
    this.props.history.push('/signup')
  }

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
                  <Link to='/login'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                  </Link>
                  <Link to='/signup'>
                    <Button as='a'inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Link>
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
        <Segment style={{ padding: '5em 0em' }} vertical>
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
                  Tabulator leverages the power of <a
                    className='homepage-link'
                    href='https://github.com/0xfe/vexflow'>VexFlow
                  </a> and <a
                    className='homepage-link'
                    href='https://github.com/surikov/midi-sounds-react'>React MIDI Sounds
                  </a> to score, tab, and perform your musical idea as you write it.
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
                  className='homepage-button'
                  onClick={this.playHandler}
                  size='huge'>
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
              <Grid.Column style={{ paddingBottom: '3em', paddingTop: '3em' }}>
                <Header as='h3' style={{ fontSize: '3.5em' }}>
                  Turn this...
                </Header>
                <Image src={tabText} style={{paddingTop: '1.5em'}}/>
                <Image src={tabText} style={{paddingTop: '1.5em'}}/>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '3em', paddingTop: '3em' }}>
                <Header as='h3' style={{ fontSize: '3.5em' }}>
                  Into this!
                </Header>
                <Image src={vextab} fluid style={{paddingLeft: '1.5em'}}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '5em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Built with Open Source to <i>Be</i> Open Source
            </Header>
            <p style={{ fontSize: '1.2em' }}>
              This application employs technology developed by several
              open-source projects and their communities, including <a
                className='homepage-link'
                href='https://reactjs.org/'>React</a>, <a
                className='homepage-link'
                href='https://redux.js.org/'>Redux</a>, <a
                className='homepage-link'
                href='https://rubyonrails.org/'>Ruby On Rails</a>, <a
                className='homepage-link'
                href='https://github.com/0xfe/vexflow'>VexFlow</a>, and <a
                className='homepage-link'
                href='https://github.com/surikov/midi-sounds-react'> React MIDI Sounds</a>.
              Following their lead, the code for this project is published
              openly on GitHub with the ability to submit issues you find on the site or
              pull requests for your contributions to improve Tablutor.
            </p>
            <Button
              as='a'
              className='homepage-button'
              href='https://github.com/milespucarelli/tabulator-front-end'
              size='large'
              inverted>
              Front End Repo
            </Button>
            <Button
              as='a'
              className='homepage-button'
              href='https://github.com/milespucarelli/Tabulator-Back-End'
              size='large'
              inverted>
              Back End Repo
            </Button>
            <Divider
              style={{ margin: '3em 0em'}}
            ></Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Built To Make Music Collaboration Easier
            </Header>
            <p style={{ fontSize: '1.2em' }}>
              Sharing your musical ideas with bandmates or fellow musicians can
              be difficult when you're not in the same place. Now you can
              quickly and inuitively tab it out and store it online for free. No
              uploading or downloading from a shared drive necessary. Just send a
              link and your collaborator will have that riff down in no time.
            </p>
          </Container>
        </Segment>
        <Segment id='homepage-footer' inverted vertical style={{ padding: '2em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Header as='h3' inverted>
                    Tabulator Creator: Miles Pucarelli
                  </Header>
                  <Grid divided inverted stackable>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <Image avatar src={miles} size='tiny'/>
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <p>
                          Miles is a job-seeking full stack web developer and
                          recent Flatiron School graduate with a passion for the
                          integration of music in technology. Tabulator had been
                          brewing in his head for years prior to beginning
                          its development as his final project for Flatiron.
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h3' content='Links' />
                  <List link inverted size='small'>
                    <List.Item
                      as='a'
                      href='http://bit.ly/resume-miles-pucarelli'>
                      Resume
                    </List.Item>
                    <List.Item
                      as='a'
                      href='https://www.linkedin.com/in/miles-pucarelli/'>
                      LinkedIn
                    </List.Item>
                    <List.Item
                      as='a'
                      href='https://github.com/milespucarelli'>
                      GitHub
                    </List.Item>
                    <List.Item
                      as='a'
                      href='https://medium.com/@miles.pucarelli'>
                      Medium
                    </List.Item>
                    <List.Item
                      as='a'
                      href='https://www.hackerrank.com/miles_of_code'>
                      HackerRank
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h3' content='Future Features' />
                  <List link inverted size='small'>
                    <List.Item as='a'>More Beat Subdivisions</List.Item>
                    <List.Item as='a'>Guitar Dynamics</List.Item>
                    <List.Item as='a'>Multiple Tracks</List.Item>
                    <List.Item as='a'>Automatic Save</List.Item>
                    <List.Item as='a'>Co-Editing & Restricting Access</List.Item>
                  </List>
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

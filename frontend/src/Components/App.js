import React, { Component } from 'react';
import github from '../github.png';
import Welcome from './Welcome';
import DeputiesList from './DeputiesList';
import DeputiesStats from './DeputiesStats';
import Footer from './Footer';

import { LinearProgress } from 'material-ui/Progress';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import LinkIcon from 'material-ui-icons/Link';
import Tooltip from 'material-ui/Tooltip';

const wrapperStyle = {
  margin: '0 auto',
  paddingTop: '4rem',
  textAlign: 'center',
}

const buttonStyle = {
  borderRadius: 3,
  border: 0,
  fontSize: '1.25rem',
  color: 'white',
  lineHeight: 0,
  height: '3rem',
  padding: '2rem 3rem',
}

const buttonPadding = {
  padding: '1rem',
}

const appBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const pictureStyle = {
  minHeight: '20px',
  minWidth: '20px',
  backgroundImage: `url(${github})`,
  backgroundPosition: 'center', 
  backgroundSize: 'cover', 
  filter: 'brightness(0) invert(1)',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      parties: [],
      partyName: null,
      open: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerToggle = () => {
    if (this.state.open) {
      this.setState({ open: false });
    } else { 
      this.setState({ open: true });
    }
  }

  getSelectedParty(name) {
    if (name === 'Inni') name = '';
    this.setState({ partyName: name });
  }

  getParties(result) {
    let partiesSet = new Set(result.map((deputy) => {
      return deputy.data['sejm_kluby.nazwa'];
    }));

    let partiesArr = Array.from(partiesSet);
    partiesArr[partiesArr.length - 1] = 'Inni';

    return partiesArr;
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/poslowie")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
            parties: this.getParties(result),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      ); 
  }

  render() {
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;
    let parties = this.state.parties;
    let deputiesListComponent = null;
    let deputiesStatsComponent = null;
    let button = null;

    if (this.state.partyName !== null) {
      deputiesListComponent = <DeputiesList data={this.state.data} partyName={this.state.partyName} />;
      deputiesStatsComponent = <DeputiesStats data={this.state.data} partyName={this.state.partyName} />;   
    }

    if (this.state.open !== false) {
      button = <Button style={buttonStyle} variant="raised" color="secondary" onClick={this.handleDrawerClose}>Close</Button>
    } else {
      button = <Button style={buttonStyle} variant="raised" color="primary" onClick={this.handleDrawerOpen}>Start</Button>;
    }

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <LinearProgress />
    } else {
      return (
        <div>
          <AppBar position="fixed">
            <Toolbar style={appBarStyle}>
              <div style={appBarStyle}>
                <Tooltip id="tooltip-icon" title="Show parties">
                  <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon onClick={this.handleDrawerToggle} />
                  </IconButton>
                </Tooltip>  
                <div className="media">
                  <Typography variant="title" color="inherit" >
                    Collate Deputies
                  </Typography>
                </div>  
              </div>  
              <div style={appBarStyle}>
                <Tooltip id="tooltip-icon" title="mojepanstwo.pl">
                  <IconButton href="https://mojepanstwo.pl/api/sejmometr" target="blank" color="inherit" aria-label="Link">
                    <LinkIcon />
                  </IconButton>
                </Tooltip>  
                <Tooltip id="tooltip-icon" title="GitHub">
                  <IconButton href="https://github.com/wojciechKomorowski/collate-deputies" target="blank" color="inherit" aria-label="Link">
                    <div style={pictureStyle}></div>
                  </IconButton>
                </Tooltip>  
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="persistent" anchor="top" open={this.state.open}>
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={this.handleDrawerClose} color='inherit'>
                  <ChevronRightIcon />  
                </IconButton>
                <Typography variant="title" color="inherit" align="center">
                  Clubs
                </Typography>
              </Toolbar>    
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', }}>
              {
                parties.map((name, index) => {
                  return (
                    <Button style={buttonPadding} size="large" key={index} value={name} onClick={this.getSelectedParty.bind(this, name)}>
                      {name}
                    </Button>
                  )
                })
              }  
            </div>  
          </Drawer>
          
          <Welcome />
          <div style={wrapperStyle}>
            {button}
          </div>
          {deputiesListComponent} 
          {deputiesStatsComponent}
          <Footer />
        </div>
      );
    }
  }
}

export default App;

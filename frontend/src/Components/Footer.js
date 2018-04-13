import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

const wrapperStyle = {
  margin: '0 auto',
  marginTop: '4rem',
  textAlign: 'center',
  padding: '3rem',
  backgroundColor: '#E8EAF6',
}

class Footer extends Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <Typography color="inherit">
          Created with <span role="img" aria-label="heart">❤️</span> by <a href="https://github.com/wojciechKomorowski" target="blank">wojciechKomorowski</a> 
        </Typography>   
        <Typography style={{ paddingTop: '1rem' }} color="inherit">
          Data collected <span role="img" aria-label="data">📊</span> from <a href="https://mojepanstwo.pl/api/sejmometr" target="blank">mojepanstwo.pl</a>
        </Typography> 
      </div> 
    );
  }
}

export default Footer;
import React, { Component } from 'react';
import politician from '../politician.jpg';
import Typography from 'material-ui/Typography';

const wrapperStyle = {
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#E8EAF6',
  background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.6) 60%, rgba(246,41,14,0.95) 60%, rgba(246,41,14,1) 100%)',
  marginTop: '5rem',
};

const pictureStyle = {
  minHeight: '300px',
  minWidth: '300px',
  backgroundImage: `url(${politician})`,
  backgroundPosition: 'center', 
  backgroundSize: 'cover', 
  display: 'inline-block',
  borderRadius: '50%',
  boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.3)',
};

class Welcome extends Component {
  render() {
    return (
        <div style={wrapperStyle}>
          <div style={pictureStyle}></div>
          <Typography variant="display1" style={{ padding: '2rem 1rem 0 1rem', color: 'white' }}>
            Lets collate some politicians.
          </Typography>
          <Typography variant="subheading" style={{ padding: '1rem', color: 'white' }}>
            Click start, choose a party and scroll down.
          </Typography>
        </div>  
    );
  }
}

export default Welcome;
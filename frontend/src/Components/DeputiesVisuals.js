import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Button from 'material-ui/Button';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import TypoTooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const wrapperStyle = {
  margin: '0 auto',
  padding: '4rem 0',
  maxWidth: '900px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
}

const chartStyle = {
  padding: '0 1rem',
  overflowX: 'scroll', 
  overflowY: 'hidden', 
}

const controlsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '4rem',
}

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0',
}

class DeputiesVisuals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deputiesOnChart: 5,
    };

    this.addDeputies = this.addDeputies.bind(this);
    this.subDeputies = this.subDeputies.bind(this);
    this.showAllDeputies = this.showAllDeputies.bind(this);
  }

  showAllDeputies() {
    this.setState({
      deputiesOnChart: this.props.data.length - 1,
    });
  }

  addDeputies() {
    if (this.state.deputiesOnChart < this.props.data.length - 1) {
      this.setState({
        deputiesOnChart: Number(this.state.deputiesOnChart) + 1,
      });
    }
  }

  subDeputies() {
    if (this.state.deputiesOnChart > 1) {
      this.setState({
        deputiesOnChart: Number(this.state.deputiesOnChart) - 1,
      });
    }
  }

  formatData(data) {
    let returnArr = data.filter((obj, index) => {
      if (index <= this.state.deputiesOnChart) {
        for (const key in obj) {
          if (key === 'data') {
            obj[this.props.activeSortingKey] = obj.data;
            delete obj.data;
          }
        }
        return obj;
      }
    });

    return returnArr;
  }

  componentWillReceiveProps() {
    this.setState({
      deputiesOnChart: 5,
    });
  }

  render() {
    let stats = this.formatData(this.props.data);

    return (
      <div style={wrapperStyle}>
        <div style={buttonStyle}>
          <Button style={{ width: '200px' }}variant="raised" onClick={this.showAllDeputies}>Show All Deputies</Button>
        </div>  
        <div style={controlsStyle}>
          <Button onClick={this.subDeputies}><ChevronLeftIcon /></Button>
          <TypoTooltip id="tooltip-icon" title="Deputies on chart">
            <Paper style={{ width: '100px' }}>
              <Typography>
              {this.state.deputiesOnChart}
              </Typography>
            </Paper>  
          </TypoTooltip>
          <Button onClick={this.addDeputies}><ChevronRightIcon /></Button>
        </div>  
        <div style={chartStyle}>
          <BarChart width={884} height={400} data={stats}
              margin={{ top: 32, bottom: 64}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '4rem' }} />
            <Bar dataKey={this.props.activeSortingKey} barSize={20} fill="#8884d8" />
          </BarChart> 
        </div>
      </div>
    );
  } 
}

export default DeputiesVisuals;
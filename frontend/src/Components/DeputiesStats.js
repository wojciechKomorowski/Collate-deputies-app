import React, { Component } from 'react';
import SORTING_KEYS from './consts';
import DeputiesVisuals from './DeputiesVisuals';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const backgroundStyle = {
  backgroundColor: '#E8EAF6',
  padding: '8rem 0', 
}

const wrapperStyle = {
  margin: '0 auto',
  maxWidth: '900px',
  maxHeight: '500px',
  textAlign: 'center',
}

const tableStyle = {
  display: 'flex', 
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '900px',
  maxHeight: '300px',
  overflowY: 'scroll',
  overflowX: 'hidden',
}

class DeputiesStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSortingKey: SORTING_KEYS[0],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      activeSortingKey: event.target.value,
    });
  }

  getStats() {
    let statsSet = new Set(this.props.data.map((singleStat) => {
      if (singleStat.data['sejm_kluby.nazwa'] === this.props.partyName) {
        let deputyObj = {
          id: singleStat.id,
          name: singleStat.data['poslowie.nazwa_odwrocona'],
          data: singleStat.data[this.state.activeSortingKey],
        };
        
        return deputyObj;
      }
    }));

    let statsArr = Array.from(statsSet);

    let sortedStatsArr = statsArr.sort((a, b) => {
      return a.data - b.data;
    }); 
    
    return sortedStatsArr.reverse();
  }

  render() {
    let stats = this.getStats();
    let partyName = this.props.partyName;
    if (partyName === '') partyName = 'Inni';

    return (
      <div>
        <div style={backgroundStyle}>
          <Paper style={wrapperStyle}>
            <Typography variant="title" style={{  padding: '1rem' }}>
              Collation key:
            </Typography>
            <Select
              value={this.state.activeSortingKey}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {
              SORTING_KEYS.map((key, index) => {
                return (
                  <MenuItem key={index} value={key}>{key}</MenuItem>
                )
              })
            }
            </Select>
          </Paper>   
          <ExpansionPanel style={wrapperStyle}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subheading">
                Deputies
              </Typography>  
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={tableStyle}>
              <Typography variant="title" style={{  paddingBottom: '2rem' }}>
                {partyName}: {this.state.activeSortingKey}
              </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SingleStat</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      stats.map((deputy, index) => {
                        if (stats[index] !== undefined) {
                          return (
                            <TableRow key={deputy.id} hover={true}>
                              <TableCell >{deputy.data}</TableCell>
                              <TableCell >{deputy.name}</TableCell>
                            </TableRow>
                          )
                        }
                      })
                    }
                  </TableBody>
                </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>  
        <DeputiesVisuals data={stats} activeSortingKey={this.state.activeSortingKey} />
      </div>
    );
  }
}

export default DeputiesStats;
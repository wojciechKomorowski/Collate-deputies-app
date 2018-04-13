import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const backgroundStyle = {
  padding: '8rem 0', 
  textAlign: 'center',
}

const wrapperStyle = {
  margin: '0 auto',
  maxWidth: '900px',
  maxHeight: '300px',
}

const tableStyle = {
  margin: '0 auto',
  maxWidth: '900px',
  maxHeight: '200px',
  overflowY: 'scroll',
  overflowX: 'hidden',
}

class DeputiesList extends Component {
  getDeputiesList() {
    let deputiesSet = new Set(this.props.data.map((deputy) => {
      if (deputy.data['sejm_kluby.nazwa'] === this.props.partyName) {
        let deputyObj = {
          id: deputy.id,
          name: deputy.data['poslowie.nazwa_odwrocona'],
          proffesion: deputy.data['poslowie.zawod'],
        };
        return deputyObj;
      } 
    }));
  
    // Alphabetical sort with diakritic symbols
    let sortedDeputiesArr = Array.from(deputiesSet).sort((a, b) => {
      if (a.name.localeCompare(b.name) < b.name.localeCompare(a.name)) {
        return -1;
      }
      if (a.name.localeCompare(b.name) > b.name.localeCompare(a.name)) {
        return 1;
      }
    }); 
  
    return sortedDeputiesArr;
  }  

  render() {
    let partyName = this.props.partyName;
    let deputies = this.getDeputiesList();

    if (partyName === null) {
      partyName = 'Party name'
    } else if (partyName === '') partyName = 'Inni';
    
    return (
      <div style={backgroundStyle}>
        <ExpansionPanel style={wrapperStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            
              {partyName}
             
          </ExpansionPanelSummary>  
          <ExpansionPanelDetails style={tableStyle}> 
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Num</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Proffesion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    deputies.map((deputy, index) => {
                      if (deputies[index] !== undefined) {
                        return (
                          <TableRow key={deputies[index].id} hover={true}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{deputies[index].name}</TableCell>
                            <TableCell>{deputies[index].proffesion}</TableCell>
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
    );
  }
}

export default DeputiesList;
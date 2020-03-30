import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    Typography,
    
    

} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
}))

const MainBackground= {
  background: '#DAE2F8', /* fallback for old browsers */
  background: '-webkit-linear-gradient(to right, #D6A4A4, #DAE2F8)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #D6A4A4, #DAE2F8)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

const ItemBackground = {
  background: '#dfe4ea',  /* fallback for old browsers */
  // background: '-webkit-linear-gradient(to right, #33001b, #ff0084)', /* Chrome 10-25, Safari 5.1-6 */
  // background: 'linear-gradient(to right, #33001b, #ff0084)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding:10, 
  margin:10, 
  height:150
}

class App extends React.Component {
  
  constructor(props) {
    super(props);
    // var j = JSON.parse('https://api.rootnet.in/covid19-in/stats/latest')
    this.state = {
      data: null,
      items: [],
      state: null,
      confirmedcase: null,
    };
  }
  componentDidMount() {
    //https://api.rootnet.in/covid19-in/stats/latest
    fetch('https://api.covid19india.org/data.json')
    .then(response => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        items: data.statewise,
        // loc: data.data.regional.loc,
        // confirmedcase: data.data.regional.confirmedCasesIndian
      });
      console.log(this.state.items[2].state)   
    })

  }
  render(){
    // console.log(this.j)
    return(
      <div className={useStyles.root} style={MainBackground}>
        <div>
          <h1>India Covid19 Live Data by Rahul Nag</h1>
        </div>
        <Grid
                container
                spacing={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
          {
            this.state.items.map((data, index) => {
              if(index === 0)
                {
                  return null;
                }
                else{
              return(
                <Grid item zeroMinWidth xs={6} sm={2} key={index} >
                  <Card style={ItemBackground}>
                    <div style={{display:'flex',flexDirection:'column', justifyContent:'flex-start',height:'100%', width:'100%',}}>
                    <div style={{flex:1,}}>
                      <Typography Wrap variant="headline" component="h3">{data.state}</Typography>
                      {/* <CardHeader title={data.state}/> */}
                    </div>
                    <div style={{flex:2,}}>
                      <Typography component="p">Active - {data.active}</Typography>
                      <Typography component="p">Death - {data.deaths}</Typography>
                      <Typography component="p">Recovered - {data.recovered}</Typography>
                      <Typography component="p">Confirmed - {data.confirmed}</Typography>
                    </div>
                    </div>
                  </Card>
                </Grid>
                
            )
            }})
          }
        </Grid>
      </div>
    )
  }
}

export default App;
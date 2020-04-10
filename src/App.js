import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
// import CovidSVG from './CovidSVG.svg'
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
  // background: '#c31432',  /* fallback for old browsers */
  // background: '-webkit-linear-gradient(to top, #240b36, #c31432)',  /* Chrome 10-25, Safari 5.1-6 */
  // background: 'linear-gradient(to top, #240b36, #c31432)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: '#ADA996',  /* fallback for old browsers */
  background: '-webkit-linear-gradient(to top, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to top, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // backgroundImage: `url(${CovidSVG})`
  }

const ItemBackground = {
  background: '#f1f2f6',  /* fallback for old browsers * #dfe4ea  #f1f2f6/ 
  // background: '-webkit-linear-gradient(to right, #33001b, #ff0084)', /* Chrome 10-25, Safari 5.1-6 */
  // background: 'linear-gradient(to right, #33001b, #ff0084)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding:10, 
  margin:10, 
  height:150
}

const footer = {
  background: '#000000',  /* fallback for old browsers */
  background: '-webkit-linear-gradient(to left, #434343, #000000)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to left, #434343, #000000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display:'flex',
  justifyContent:'center',
  color: '#d2dae2',
  alignItems:'center',
  padding:10,
}

class App extends React.Component {

  constructor(props) {
    super(props);
    // var j = JSON.parse('https://api.rootnet.in/covid19-in/stats/latest')
    
    
    this.state = {
      Dailydata: [],
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
        Dailydata: data.cases_time_series,
        // loc: data.data.regional.loc,
        // confirmedcase: data.data.regional.confirmedCasesIndian
      });
      // console.log(this.state.items[2].state)   
    })
  }

  
  render(){
    // console.log(this.j)
    return(
      
      <div className={useStyles.root} style={MainBackground}>
      
      <h2 style={{display:'flex',justifyContent:'center',paddingTop:10,}} >Covid19 INDIA Live Data</h2>
      <div style={{display:'flex', flexDirection:'row',}}>
          {/* FOR TOTAL DATA AS OF NOW */}
          {
            this.state.items.map((data, index) =>
            {
              if(index===0)
              {
                return(
                <div style={{flex:1,}}>
                <Card style={{padding:10,margin:10,height:150,backgroundColor:'#ffdd59',}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center', height:'100%', width:'100%',}}>
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
                  </div>)
              }
              
            })
          }        

          {/* FOR CURRENT DATE DATA       */}
          {
            this.state.Dailydata.map((daily, index) => {
              if(index===this.state.Dailydata.length-1){
                return(
                  <div style={{flex:1}}>
              <Card style={{padding:10,margin:10,height:150,backgroundColor:'#ffdd59',variant:"outlined"}}>
                <div style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'flex-start',height:'100%', width:'100%',}}>
                  <div style={{flex:1,}}>
                    <Typography Wrap variant="headline" component="h3">For  {daily.date}</Typography>
                    {/* <CardHeader title={data.state}/> */}
                  </div>
                  <div style={{flex:2,}}>
                    <Typography component="p">Confirmed - {daily.dailyconfirmed}</Typography>
                    <Typography component="p">Recovered - {daily.dailyrecovered}</Typography>
                  </div>
                </div>
                </Card>
                </div>)}
            })
          }
        </div>
        <Grid
                container
                spacing={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
          {/* THIS IS STATE WISE DATA   */}
          {
            this.state.items.map((data, index) => {
              if(index === 0){
                return null
            }
            else{
              console.log(data)
              return(
                // 6,4
                <Grid item zeroMinWidth xs={6} sm={4} key={index} >
                  <Card style={ItemBackground}>

                  <div style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center',height:'100%', width:'100%',}}>
                    <div style={{flex:1,}}>
                      <Typography Wrap variant="headline" component="h5">{data.state}</Typography>
                      {/* <CardHeader title={data.state}/> */}
                    </div>
                    <div style={{flex:2,}}>
                      {/* <Typography component="p">Today - {data.delta.active}</Typography> */}
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
        <br/><br/><br/><br/>
        <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center', padding:10}}>

          <div style={{flex:1,border: '1px solid #636e72',borderRadius:15, padding:5,backgroundColor:'#000000', color:'#FF0000'}}>
            <p>There’s currently no vaccine to prevent coronavirus disease (COVID-19).</p>
          </div>
          <br/>
          <div style={{flex:1,border: '1px solid #636e72',borderRadius:15,padding:5}}>
          <p><u>You can protect yourself and help prevent spreading the virus to others if you:</u><br/><br/>
            Do<br/>
            1) Wash your hands regularly for 20 seconds, with soap and water or alcohol-based hand rub<br/>
            2) Cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze<br/>
            3) Avoid close contact (1 meter or 3 feet) with people who are unwell<br/>
            4) Stay home and self-isolate from others in the household if you feel unwell<br/><br/>
            Don't<br/>
            5) Touch your eyes, nose, or mouth if your hands are not clean<br/>
            </p>
            </div>
            <br/>
            <div style={{flex:1,border: '1px solid #636e72',borderRadius:15,padding:5,}}
            ><p><b>EMERGENCY CONTACT NUMBER : +91-11-23978046 </b></p></div>
        </div>
        <br/>
        <p style={footer} >Developed and maintained by Rahul Nag, for more information contact me at mr.rahulnag67@gmail.com</p>
      </div>
    )
  }
}

export default App;
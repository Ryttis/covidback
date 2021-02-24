import express, { response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const url = `https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/`

const covidData = axios.get(url)


app.get('/api/countries', async (req, res) => {
  const aaa = await covidData.then(response => { return response.data })
    .catch(err => console.error("Err: ", err))
  let arr = []
  aaa.forEach(element => {
    if (!arr.includes(element.country)) {
      arr.push(element.country)
    }
  });
  res.status(200).json(arr)
});

app.get('/api/weeks/:name', async (req, res) => {
  const countryName = req.params.name
  const result = await covidData.then(response => { return response.data })
    .catch(err => console.error("Err: ", err))
  let arrDeaths = []
  result.forEach( (item,index) => {
    if (item.country === countryName && item.indicator === 'deaths') {
      arrDeaths.push(item.year_week+'')
    }
  });
  res.status(200).json(arrDeaths)
});

app.get('/api/deaths/:name', async (req, res) => {
  const countryName = req.params.name
  const result = await covidData.then(response => { return response.data })
    .catch(err => console.error("Err: ", err))
  let arrDeaths = []
  result.forEach( (item,index) => {
    if (item.country === countryName && item.indicator === 'deaths') {
      arrDeaths.push(item.weekly_count+'')
    }
  });
  res.status(200).json(arrDeaths)
});

app.get('/api/cases/:name', async (req, res) => {
  const countryName = req.params.name
  const result = await covidData.then(response => { return response.data })
    .catch(err => console.error("Err: ", err))
  let arrCases = []
  result.forEach(item => {
    if (item.country === countryName && item.indicator === 'cases') {
      arrCases.push(item.weekly_count+'')
    }
  });
  res.status(200).json(arrCases)
});

// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
// })

app.listen(8000, () => console.log('Listening on port 8000'));


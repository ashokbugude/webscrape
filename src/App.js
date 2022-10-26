import './App.css';
import { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function App() {

  const [data,setData] = useState([])
  const [specialty, setSpeciality] = useState(null)
  const rawData = useRef({
    specialty : null,
    radius : "global",
    lat : null,
    lon : null,
    country: null,
    state: null,
    fidelity: 6,
    size: 10,
    page : 1,
    sort : "relevance",
    gender: null,
    doctorYearsExperience: null,
    type : "specialtySearch"
  }) 

  const fetchData = () => {

    var config = {
      method: 'post',
      url: 'https://www.medifind.com/api/search/doctors/specialtySearch',
      headers: { 
        'authority': 'www.medifind.com', 
        'accept': 'application/json, text/plain, */*', 
        'accept-language': 'en-US,en;q=0.9', 
        'content-type': 'application/json', 
        'cookie': '_gcl_au=1.1.264195019.1664922737; sa-user-id=s%253A0-5539256a-b041-45a2-77cf-7c4727b5e9dd.L92sGm9lwap%252FmkyL%252BvU5mPPhFA8UiODldWNNL5bqWWo; sa-user-id-v2=s%253A0-ce61f1af-c885-4a50-68cc-836df8244412%2524ip%2524174.109.29.10.uKUsKErmP%252BO1gYuh60kJWtMNgqMV7j3EkWa%252FuIhAAZo; _hjSessionUser_2231347=eyJpZCI6ImRkNjIzYTI3LTA4NWEtNTE4ZC05M2E5LWFhYTQ5OTM5M2QyYiIsImNyZWF0ZWQiOjE2NjQ5MjI3MzgxODYsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.1138266570.1666728701; _hjIncludedInSessionSample=0; _hjSession_2231347=eyJpZCI6IjExZDAwMzBhLWFlNjAtNDJkOS05ZDUwLWZkYzQxYTQzZTk2NyIsImNyZWF0ZWQiOjE2NjY3Mjg3MDM1MjcsImluU2FtcGxlIjpmYWxzZX0=; _ga=GA1.2.1057038301.1664922736; _gat_UA-153010625-2=1; _ga_1LGMJEF13J=GS1.1.1666728703.12.1.1666728800.32.0.0', 
        'dnt': '1', 
        'origin': 'https://www.medifind.com', 
        'referer': 'https://www.medifind.com/specialty/cardiology', 
        'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"macOS"', 
        'sec-fetch-dest': 'empty', 
        'sec-fetch-mode': 'cors', 
        'sec-fetch-site': 'same-origin', 
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
      },
      data : JSON.stringify(rawData.current)
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setData(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
/*
    axios.get(`https://www.medifind.com/api/search/doctors/specialtySearch`,)
          .then(response => {
            setData(response.data);
          })
          */
  }

  const callApi = () => {

    let currentData = rawData.current
    currentData.specialty = [specialty]
    rawData.current = currentData
    fetchData()

  }

  return (
    <div className="App">
      <div style={{"padding": "20px"}}>
      <FormControl>
        <InputLabel htmlFor="my-input">Speciality</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => {
          setSpeciality(e.target.value)
        }} />
        <br/>
        <Button variant="contained" onClick={callApi}>Submit</Button>
      </FormControl>
      <br/>
      <br/>
      {data && data.length > 0 && <FormControl>
        {data.map((item) => {
          return (
            <Fragment> 
            <div style={{marginBottom:"20px"}}>
              <div>{item.displayName}</div>
              <div>{item.phone}</div>
            </div>       
            </Fragment>
          )
        })

        }
      </FormControl>
      }
      </div>
    </div>
  );
}

export default App;

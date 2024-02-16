const axios = require('axios');
const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  method: 'GET',
  url: 'https://youtube138.p.rapidapi.com/playlist/videos/',
  params: {
   
    hl: 'en',
    gl: 'US'
  },
  headers: {
    'X-RapidAPI-Key': 'e591beb367mshe9056123d52a7e0p1d0487jsn59fcea191205',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

export const fetchedData=async(url)=>{
    const {data}=await axios.get(`${BASE_URL}/${url}`,options)
    return data;
}
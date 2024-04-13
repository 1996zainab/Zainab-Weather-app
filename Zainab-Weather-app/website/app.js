// creating date 
let d = new Date();
let newDate = d.toDateString();

// URL & API & server 
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Persenal API key for openWeatherMap API
const apiKey = '&appid=e765b7a6858111977817b1fb988060be&units=imperial';
const server = "http://127.0.0.1:5000";

// the error
const error = document.getElementById("error");

const generateData = () => { 
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feeling").value;

  getData(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDate,
        city,
        temp: Math.round(temp), 
        feelings,
      };

      postData(server + "/add", info);
      updata();
      document.getElementById('entry').style.opacity = 1;
    }
  });
};

// event listener
document.getElementById("generate").addEventListener("click", generateData);

//Function  GET
const getData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function  POST 
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    console.log(`saveing`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

// updating 
const updata = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + ' C&deg';
    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("content").innerHTML ='I sense '+  savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
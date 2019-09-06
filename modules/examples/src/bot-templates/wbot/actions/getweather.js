const axios = require('axios')

  /**
       * Gets current weather
       * @title Get Weather
       * @category Weather
       * @author Simon-Pierre Gingras
       */
  const myAction = async () => {
    const appId = 'c9da9a8cc97c1c74d9e8fa8f5683aa2e'
    const query = event.payload.text
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${appId}`
    )
    const city = response.data.name
    const country = response.data.sys.country
    const temperature = response.data.main.temp
    const description = response.data.weather[0].description

    temp.weather = { city, country, temperature, description }
  }

  return myAction()
import React, {useState} from 'react'
// Import axios, BASE_URL, dan API_KEY
import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'

const App = () => {

  // Definisikan state "weatherData" dan "setWeatherData"
  const [weatherData, setWeatherData] = useState(null)

  // Definisikan state status
  const [status, setStatus] = useState('')

  const searchWeather = (location) => {
    // Mengatur status ke "loading"
    setStatus('loading')
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data
        // Tambahkan code di bawah
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15 // Konversi Kelvin ke Celcius
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        // Mengatur status ke "success"
        setStatus('success')
      })
      .catch((error) => {
        // Mengatur status ke "error"
        setStatus('error')
      })
  }

  // Definisikan function renderComponent
  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
      default:
        return
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 64 }}>
      <View style={styles.container}>
        <WeatherSearch searchWeather={searchWeather} />
        {/* Tampilkan data cuaca ketika ada weatherData */}
        {/* {weatherData && <WeatherInfo weatherData={weatherData} />} */}

        {/* Menggunakan function renderComponent di sini */}
      <View style={styles.margintTop20}>{renderComponent()}</View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default App
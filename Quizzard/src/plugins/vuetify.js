/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const customTheme = {
  dark: true,
  colors: {
    primary: '#2C2929',
    secondary: '#393939',
    third: '#2C2929',
    button: '#07B5FF',
    buttonSecond: '#41455D',
    backgroundMain: '#4D4D4D',
    background: '#3E3E3E', // If not using lighten/darken, use base to return hex
  }
}


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})

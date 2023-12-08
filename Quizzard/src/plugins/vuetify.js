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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      dark: {
        primary: '#2C2929',
        secondary: '#3E3E3E',
        third: '#393939',
        background: '#38393E', // If not using lighten/darken, use base to return hex
      }
    },
    dark: true
  },
})

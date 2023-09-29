import { defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/floatingLabels'

const config = defaultConfig({
  theme: 'genesis',
  plugins: [
    createFloatingLabelsPlugin({
      useAsDefault: true, // defaults to false
    }),
  ],
})

export default config
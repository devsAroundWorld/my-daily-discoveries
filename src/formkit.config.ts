import { defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import '@formkit/addons/css/floatingLabels'

const config = defaultConfig({
  theme: 'genesis',
  config: {
    classes: {
      outer: 'formkit-mdd-outer',
      wrapper: 'formkit-mdd-wrapper',
      inner: 'formkit-mdd-inner',
      input: 'formkit-mdd-input',
      label: 'formkit-mdd-label'
    }
  }
})

export default config
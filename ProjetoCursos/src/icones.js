import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

try {
  library.add(fas, far, fab)
} catch (e) {
  console.warn('Font Awesome library already initialized', e)
}
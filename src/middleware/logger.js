/**
 * Created by mhdevita on 12/15/16.
 */
import * as loglevel from 'loglevel'

if (__DEV__) {
  loglevel.setLevel('trace')
} else {
  loglevel.setLevel('error')
}

export default loglevel

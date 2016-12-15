/**
 * Created by mhdevita on 12/14/16.
 */
import axios from 'axios';
import _ from 'lodash';

const _buildUrl = (endpoint, params) => {
  let url = 'http://localhost:1337/v1';
  url += '/' + endpoint.toLowerCase()
  return url;
}

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiaWF0IjoxNDgxNzI5NzY3LCJleHAiOjE0ODE4MTYxNjd9.NhPAZtVlUERz-_SrgLG1l7-l8A4DNmKo0UFOI88ol0u79gmBGk4WGDWfA8-YxY4riV7fSCjGL6m23mTJ5Qb3_A';
const Api = {
  get: (endpoint, params) => {
    return new Promise(function (resolve, reject) {
      let p = _.merge({}, params)
      let headers = _.merge({}, p.headers)
      if (p.auth) {
        delete p.auth
        headers.authorization = 'Bearer ' + token
      }

      if (p.populate) {
        p.populate = p.populate.join(',')
      }

      const url = _buildUrl(endpoint, p)
      console.trace('Api::get::initial', url, p, headers)

      return axios({
        url,
        method: 'GET',
        p,
        headers
      })
        .then((response) => {
          console.trace('Api::get::response', url)
          return resolve(response)
        })
        .catch((error) => {
          console.error('Api::get::error', error.message, error.response)
          return reject({ ...error.response })
        })
    })
  },
  post: (endpoint, params, payload) => {
    return new Promise(function (resolve, reject) {
      let p = _.merge({}, params)
      let headers = _.merge({}, p.headers)
      if (p.auth) {
        delete p.auth
        headers.authorization = 'Bearer ' + token
      }

      if (p.populate) {
        p.populate = p.populate.join(',')
      }

      const url = _buildUrl(endpoint, p)
      console.trace('Api::post::initial', url, p, headers, payload)

      return axios({
        url,
        method: 'POST',
        p,
        headers,
        data: payload
      })
        .then((response) => {
          console.trace('Api::post::response', url)
          return resolve(response)
        })
        .catch((error) => {
          console.error('Api::post::error', error.message, error.response)
          return reject({ ...error.response })
        })
    })
  },
  // put,
  // delete
}

export default Api;

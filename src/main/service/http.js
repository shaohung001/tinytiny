import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.retry = 3
axios.defaults.retryDelay = 800
axios.defaults.withCredentials = true

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:7700/'
  console.log('axios.defaults.baseURL::: ', axios.defaults.baseURL)
}

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          if (error.response.data === 'Login Reqeust') {
            // Store.commit('user/' + USER_SIGNOUT)
            // Store.commit('user/' + USER_CHECK, true)
            // if (router.history.current.path !== '/') {
            //   // return router.push({ name: 'login' })
            //   // need Login
            // } else {
            //   return Promise.reject(error)
            // }
          }
      }
    }
    return Promise.reject(error)
  }
)

export default axios

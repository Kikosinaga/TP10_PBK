import { reactive } from 'vue'
import axios from 'axios'

function loadAuth() {
  const saved = localStorage.getItem('auth')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return { isLoggedIn: false, role: null, user: null }
    }
  }
  return { isLoggedIn: false, role: null, user: null }
}

const state = reactive(loadAuth())

export const auth = reactive({
  get isLoggedIn() { return state.isLoggedIn },
  set isLoggedIn(val) { state.isLoggedIn = val; saveAuth() },
  get role() { return state.role },
  set role(val) { state.role = val; saveAuth() },
  get user() { return state.user },
  set user(val) { state.user = val; saveAuth() },
  async login(username, password) {
    try {
      const res = await axios.get('http://localhost:3000/users?username=' + username + '&password=' + password)
      if (res.data.length > 0) {
        this.isLoggedIn = true
        this.role = res.data[0].role
        this.user = res.data[0]
        return true
      } else {
        this.isLoggedIn = false
        this.role = null
        this.user = null
        return false
      }
    } catch (e) {
      return false
    }
  },
  logout() {
    this.isLoggedIn = false
    this.role = null
    this.user = null
    saveAuth()
  }
})

function saveAuth() {
  localStorage.setItem('auth', JSON.stringify({
    isLoggedIn: state.isLoggedIn,
    role: state.role,
    user: state.user
  }))
}
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const service = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "/api/review",
  timeout: 50000
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.hasToken) {
      config.headers['Authorization'] = `Bearer ${store.getAccessToken}`
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status === 400) {
      const router = useRouter()
      const store = useUserStore()

      store.logout()
      router.push({ name: 'Login', params: { message: "token 過期，請重新登入" } })
    }
    return Promise.reject(error)
  }
)

export default service

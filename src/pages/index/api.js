import http from '@/utils/request'
export async function getCityData() {
  return http('http://192.168.199.175:8081/rest/cities')
}
export async function fetchSearchResult(param) {
  return http(`http://192.168.199.175:8081/rest/search?key=${encodeURIComponent(param)}`)
}

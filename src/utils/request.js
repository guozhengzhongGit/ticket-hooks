export default async function http(url, method='GET',options={}) {
  return fetch(url).then(res => res.json()).then(data => data).catch(err => {
    throw err
  })
}

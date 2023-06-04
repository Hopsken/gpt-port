import useSWR from 'swr'

export default function Home() {
  useSWR('/api/models', url => fetch(url).then(res => res.json()))
  return <button className='btn'>Test</button>
}

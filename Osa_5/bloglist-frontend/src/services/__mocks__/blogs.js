const blogs = [
  {
    title: 'uusiblogi',
    author: 'minä',
    url: 'www.com',
    likes: 22,
    user: {
      username: 'testijäbä',
      name: 'juu',
      id: '5d1b3f2f3a32d102be8c7770'
    },
    id: '5d1b5e47fa459c0038ac040e'
  },
  {
    title: 'testi',
    author: 'testi',
    url: 'testi',
    likes: 6,
    user: {
      username: 'testijäbä',
      name: 'juu',
      id: '5d1b3f2f3a32d102be8c7770'
    },
    id: '5d1b6107fa459c0038ac0410'
  },
  {
    title: 'haloo',
    author: 'haloo',
    url: 'haloo',
    likes: 0,
    user: {
      username: 'eero',
      name: 'eero',
      id: '5d1ca3fd2dbb4600ce6a9cd7'
    },
    id: '5d1ca6b82dbb4600ce6a9cd9'
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
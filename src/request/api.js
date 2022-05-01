import server from './index'
export const login = (param, config) => server.post('/login', param, config)

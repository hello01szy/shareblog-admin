import server from './index'
export const login = (param, config) => server.post('/login', param, config)
export const sendMsg = (param, config) => server.get('/sendMsg', param, config)
export const logout = (param, config) => server.get('/logout', param, config)

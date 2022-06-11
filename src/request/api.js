import server from './index'
export const login = (param, config) => server.post('/login', param, config)
export const getInfo = (param, config) => server.get('/getUserInfo', param, config)
export const logout = (param, config) => server.get('/logout', param, config)
export const uploadPic = (param, config) => server.post('/uploadArticleHeadCover', param, config)

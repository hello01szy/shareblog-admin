import server from './index'
export const login = (param, config) => server.post('/login', param, config)
export const getInfo = (param, config) => server.get('/getUserInfo', param, config)
export const logout = (param, config) => server.get('/logout', param, config)
export const uploadPic = (param, config) => server.post('/uploadArticleHeadCover', param, config)
export const createBlog = (param, config) => server.post('/createArticle', param, config)
export const addTag = (param, config) => server.post('/addTag', param, config)
export const getAllTags = (param, config) => server.get('/getAllTags', param, config)

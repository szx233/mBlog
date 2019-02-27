import Vuex from 'vuex'

export const state = () => ({
  adminToken: '',
  localToken: '',
  user: {},
  total: 0,
  articles: [],
  drafts: [],
  articleDetail: {},
  tags: [],
  stickArticles: [],
  tagArticles: [],
  searchArticles: [],
  limit: 10,
  app: {}
})

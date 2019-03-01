import mutations from './mutations'
import actions from './actions'

export const state= ()=>({
      adminToken: '',
      localToken: '',
      user: {},
      total: 0,
      articles: [],
      drafts: [],
      articleDetail: {},
      tags: [],
      stickArticles:[],
      tagArticles: [],
      searchArticles: [],
      limit: 10,
      app: {},
    })
 export  {mutations}
 export  {actions}
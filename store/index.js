export const state = () => ({
  feeds: []
})

export const mutations = {
  clearFeed (state, feed) {
    state.feeds = []
  },
  addFeed (state, feed) {
    state.feeds.push(feed)
  }
}

export const actions = {
  async getFeeds (context) {
    context.commit('clearFeed')

    const res = await fetch('/api/feeds')
    const feeds = await res.json()
    for (const feed of feeds) {
      context.commit('addFeed', feed)
    }
  },
  async addFeed (context, x) {
    await fetch('/api/feed', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: x.title,
        url: x.url,
        action: x.action,
        webhook: (x.action === 'email')
          ? null
          : x.webhook
      })
    })

    await context.dispatch('getFeeds')
  },
  async updateFeed (context, x) {
    await fetch('/api/feed', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: x.id,
        title: x.title,
        url: x.url,
        action: x.action,
        webhook: (x.action === 'email')
          ? null
          : x.webhook
      })
    })

    await context.dispatch('getFeeds')
  },
  async deleteFeed (context, id) {
    await fetch('/api/feed', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id
      })
    })

    await context.dispatch('getFeeds')
  }
}

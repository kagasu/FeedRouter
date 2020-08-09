<template>
  <div>
    <b-button variant="primary" @click="showModal(null, $event.target)">Add</b-button>
    <b-modal id="modalFeed" hide-header @ok="onSubmit">
      <b-form-group label="Title" label-for="feedTitle">
        <b-form-input id="feedTitle" v-model="feed.title" type="text" required />
      </b-form-group>
      <b-form-group label="Feed URL" label-for="feedUrl">
        <b-form-input id="feedUrl" v-model="feed.url" type="text" required />
      </b-form-group>
      <b-form-group label="Action" label-for="feedAction">
        <b-form-select id="feedAction" v-model="feed.action" :options="[ { value: 'email', text: 'Email' }, { value: 'webhook', text: 'Webhook' }]" required />
      </b-form-group>
      <b-form-group label="Webhook" label-for="feedWebhook">
        <b-form-textarea id="feedWebhook" v-model="feed.webhook" :disabled="feed.action === 'email'" rows="3" max-rows="10" />
      </b-form-group>
    </b-modal>

    <b-table striped hover :items="feeds" :fields="fields">
      <template v-slot:cell(actions)="x">
        <b-button size="sm" @click="showModal(x.item, $event.target)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="deleteFeedConfirm(x.item.id)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      feed: {
        id: 0,
        title: null,
        url: null,
        action: 'email',
        webhook: null
      },
      fields: [
        { key: 'id', sortable: true },
        { key: 'title', sortable: true },
        { key: 'action', sortable: true },
        { key: 'actions' }
      ]
    }
  },
  computed: {
    ...mapState(['feeds'])
  },
  async mounted () {
    await this.getFeeds()
  },
  methods: {
    ...mapActions(['getFeeds', 'addFeed', 'updateFeed', 'deleteFeed']),
    resetFormValues (x) {
      if (x) {
        this.feed.id = x.id
        this.feed.title = x.title
        this.feed.url = x.url
        this.feed.action = x.action
        this.feed.webhook = x.webhook
      } else {
        this.feed.id = 0
        this.feed.title = null
        this.feed.url = null
        this.feed.action = 'email'
        this.feed.webhook = '{\n  "url": "http://127.0.0.1/webhook",\n  "method": "post",\n  "headers": {\n    "Content-Type": "application/json"\n  },\n  "content": "{\\"content\\":\\"{{FeedTitle}}\\\\n{{EntryUrl}}\\"}"\n}'
      }
    },
    showModal (x, button) {
      this.resetFormValues(x)
      this.$root.$emit('bv::show::modal', 'modalFeed', button)
    },
    async onSubmit () {
      if (this.feed.id === 0) {
        await this.addFeed(this.feed)
      } else {
        await this.updateFeed(this.feed)
      }
    },
    async deleteFeedConfirm (id) {
      const result = confirm('Delete?')
      if (result) {
        await this.deleteFeed(id)
      }
    }
  }
}
</script>

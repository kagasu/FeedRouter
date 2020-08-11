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
      <b-form-group label="NG Word" label-for="feedNGWord">
        <b-form-input id="feedNGWord" v-model="feed.ngWord" type="text" />
      </b-form-group>
      <b-form-group label="Action" label-for="feedAction">
        <b-form-select id="feedAction" v-model="feed.action" :options="[{ value: 'email', text: 'Email' }, { value: 'webhook', text: 'Webhook' }]" required />
      </b-form-group>
      <div v-if="feed.action === 'email'">
        <b-form-group label="Email Subject" label-for="feedEmailSubject">
          <b-form-input id="feedEmailSubject" v-model="feed.emailSubject" />
        </b-form-group>
        <b-form-group label="Email Body" label-for="feedEmailBody">
          <b-form-textarea id="feedEmailBody" v-model="feed.emailBody" rows="3" max-rows="10" />
        </b-form-group>
      </div>
      <div v-else>
        <b-form-group label="Webhook" label-for="feedWebhook">
          <b-form-textarea id="feedWebhook" v-model="feed.webhook" rows="3" max-rows="10" />
        </b-form-group>
      </div>
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
        ngWord: null,
        action: null,
        emailSubject: null,
        emailBody: null,
        webhook: null
      },
      fields: [
        { key: 'id', sortable: true, sortDirection: 'desc' },
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
        this.feed.ngWord = x.ngWord
        this.feed.action = x.action
        this.feed.emailSubject = x.emailSubject
        this.feed.emailBody = x.emailBody
        this.feed.webhook = x.webhook
      } else {
        this.feed.id = 0
        this.feed.title = null
        this.feed.url = null
        this.feed.ngWord = null
        this.feed.action = 'email'
        this.feed.emailSubject = '{{FeedTitle}} {{EntryTitle}}'
        this.feed.emailBody = '{{EntryUrl}}'
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

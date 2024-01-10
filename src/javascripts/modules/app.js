import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
import I18n from '../lib/i18n'
import { resizeContainer, escapeSpecialChars as escape } from '../lib/helpers'

import TicketForm from './ticket-form'
import { ClientContextProvider } from '../lib/client-context'

const MAX_HEIGHT = 1000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}

class App {
  constructor(client, _appData) {
    this._client = client

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  async init() {
    const currentUser = (await this._client.get('currentUser')).currentUser

    const ticket = (await this._client.get('ticket')).ticket

    I18n.loadTranslations(currentUser.locale)

    const appContainer = document.querySelector('.main')

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
        <ClientContextProvider client={this._client}>
          <TicketForm data={ticket} />
        </ClientContextProvider>
      </ThemeProvider>,
      appContainer
    )
    return resizeContainer(this._client, MAX_HEIGHT)
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError(error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App

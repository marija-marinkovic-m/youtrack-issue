import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
import I18n from '../lib/i18n'
import { resizeContainer } from '../lib/helpers'
import { AppDataContextProvider } from '../lib/app-data-context'
import IssueForm from './issue-form'
import RelatedIssues from './related-issues'
import ProjectInfo from './project-info'

const MAX_HEIGHT = 1000

class App {
  constructor (client, _appData) {
    this._client = client

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  async init () {
    const currentUser = (await this._client.get('currentUser')).currentUser
    const settings = (await this._client.metadata()).settings
    const ticket = (await this._client.get('ticket')).ticket

    I18n.loadTranslations(currentUser.locale)

    const appContainer = document.querySelector('.main')

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
        <AppDataContextProvider
          settings={settings}
          ticket={ticket}
          client={this._client}
        >
          <RelatedIssues />
          <IssueForm />
          <ProjectInfo />
        </AppDataContextProvider>
      </ThemeProvider>,
      appContainer
    )
    return resizeContainer(this._client, MAX_HEIGHT)
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError (error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App

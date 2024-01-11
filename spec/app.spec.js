/* eslint-env jest, browser */
import App from '../src/javascripts/modules/app'
import i18n from '../src/javascripts/lib/i18n'
import { CLIENT, ORGANIZATIONS } from './mocks/mock'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { configure } from '@testing-library/react'

const mockEN = {
  'app.name': 'App',
  'app.title': 'App',
  'default.organizations': 'organizations'
}

describe('Example App', () => {
  beforeAll(() => {
    configure({ testIdAttribute: 'data-test-id' })

    i18n.loadTranslations('en')

    jest.mock('../src/translations/en', () => {
      return mockEN
    })
  })

  describe('Rendering', () => {
    let appContainer = null

    beforeEach(() => {
      appContainer = document.createElement('section')
      appContainer.classList.add('main')
      document.body.appendChild(appContainer)
    })

    afterEach(() => {
      unmountComponentAtNode(appContainer)
      appContainer.remove()
      appContainer = null
    })

    it('render successfully', (done) => {
      act(() => {
        CLIENT.request = jest.fn().mockReturnValueOnce(Promise.resolve(ORGANIZATIONS))
        CLIENT.invoke = jest.fn().mockReturnValue(Promise.resolve({}))

        const app = new App(CLIENT, {})
        app.initializePromise.then(() => {

          expect(appContainer.querySelector('.main')).toBeTruthy()
          expect(appContainer.querySelector('.main').innerHTML).toContain('App')
          

          done()
        })
      })
    })
  })
})

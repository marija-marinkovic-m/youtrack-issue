# YouTrack Issues App

### Dependencies
- [Node.js](https://nodejs.org/en/) >= 18.12.1
- [Ruby](https://www.ruby-lang.org/) = 2.6.x

### Setup
[Zendesk CLI](https://github.com/zendesk/zcli).

### Running locally

To serve the app to your Zendesk instance with `?zcli_apps=true`, open a new terminal and run

```
yarn run watch
```
and then open a new terminal under in root (`youtrack-issue`) directory and run
```
zcli apps:server dist
```

## DEv Resource
- [Babel compiler](https://babeljs.io/)
- [Zendesk Garden](https://garden.zendesk.com/) React UI components
- [Webpack 5](https://webpack.github.io/) module bundler
- [PostCSS](https://postcss.org//) stylesheets
- [StandardJS](https://standardjs.com/) JS linting
- [Jest](https://jestjs.io/) Javascript testing framework

### I18n
The I18n (internationalization) module in `/src/javascripts/lib/i18n.js` provides a `t` method to look up translations based on a key. For more information, see [Using the I18n module](https://github.com/zendesk/app_scaffolds/blob/master/packages/react/doc/i18n.md).

## Deploying

To check that your app will pass the server-side validation check, run

```
zcli apps:validate dist
```

If validation is successful, you can upload the app into your Zendesk account by running

```
zcli apps:create dist
```

To update your app after it has been created in your account, run

```
zcli apps:update dist
```

Or, to create a zip archive for manual upload, run

```
zcli apps:package dist
```

taking note of the created filename.

For more information on the Zendesk CLI please see the [documentation](https://developer.zendesk.com/documentation/apps/app-developer-guide/zcli/).

## External Dependencies
External dependencies are defined in [webpack.config.js](https://github.com/zendesk/app_scaffolds/blob/master/packages/react/webpack.config.js). This ensures these dependencies are included in your app's `index.html`.

## Useful Links
- https://developer.zendesk.com/
- https://github.com/zendesk/zendesk_apps_tools
- https://webpack.github.io
- https://developer.zendesk.com/documentation/apps/build-an-app/using-react-in-a-support-app/


## I18n

```javascript
i18n.t('hello'); // returns "Hello!"
i18n.t('goodbye', { name: 'Yak' }); // returns "Bye Yak!"
i18n.t('formal.farewell'); // returns "Farewell, friend."
```

## Copyright and license
http://www.apache.org/licenses/LICENSE-2.0

![strapi-code-editor.png](images/strapi-code-editor.png)

# Strapi plugin strapi-code-editor-custom-field

Code editor plugin for strapi CMS. It uses the monaco editor (vscode).

## Compatibility

This plugin is compatible with **Strapi v5 from 1.0.0 version**.

If you are using Strapi v4, please use the 0.6.0 version.

## Installation

You need install also monaco editor.

```
yarn add monaco-editor strapi-code-editor-custom-field
```

```
npm install monaco-editor strapi-code-editor-custom-field
```

Strapi 5 is now using vite for building the admin panel, so you need to install the vite plugin. 

```
yarn add vite-plugin-monaco-editor -D
```

```
npm install --save-dev vite-plugin-monaco-editor
```

You must add plugin to `config/plugins.js` file.

```
{
  ...
  'strapi-code-editor-custom-field': {
    enabled: true,
  },
  ...
}
```

You need to update the `config/middlewares.ts` file. Replace `strapi::security` with

```
{
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src-elem': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
        upgradeInsecureRequests: null,
      },
    },
  },
},
```

This will add the `cdn.jsdelivr.net` to the `script-src-elem` directive for enabling content security policy.

The the last step is to create/update the vite config file.

`/src/admin/vite.config.ts`

```
import { mergeConfig } from 'vite'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

export default (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    plugins: [monacoEditorPlugin({})],
  })
}
```

Now rebuild the admin panel.

```
npm run build

OR

yarn build
```

### The "old" way with webpack (Strapi 4)

Add the `monaco-editor-webpack-plugin` to the `src/admin/webpack.config.js` file.

```
yarn add monaco-editor-webpack-plugin
```

```
npm install monaco-editor-webpack-plugin
```


```
'use strict'

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = (config) => {
  config.plugins.push(new MonacoWebpackPlugin())

  return config
}

```

## Usage

When you add the plugin you will see two new custom fields. One for javascript (and other languages) and one for json.

![Two custom fields](images/img.png)

The editor then will show up in content-type add/edit page. It can be opened in fullscreen mode.

### JSON editor

![JSON editor](images/img2.png)

### Javascript editor

![Javascript editor](images/img3.png)

You can select the language in content-type builder options (if you select it, you can not change it in the editor instance).

![Select language options](images/img4.png)


## Under the hood

Editor is using two different types for strapi field. When you select JSON editor it will be `json` type.
When you select different language, it will be `text` type.

For `text` type you can select the language. If you select it, the select will not show up in the editor.

In case you don't select the language, you can pick it dynamically, but the language is prefixed before the value.

Language selector:

```javascript
const languageRegExp = new RegExp('__(.+)__;')
const languageFromValue = value.match(languageRegExp)[1]
```

Remove language from value:

```javascript
const languageRegExp = new RegExp('__(.+)__;')
const valueWithoutLanguage = value.replace(languageRegExp, '')
```

## Issues

If you find any issues, please report
them [here](https://github.com/TomaszPilch/strapi-code-editor-custom-field/issues).

## Development

If you want to contribute to this plugin, you can follow this steps:

1. Clone this repository
2. Install dependencies

```
yarn install
```

3. Link the plugin with yalc

```
yarn watch:link
```

4. Link the plugin to your strapi project (in the strapi project)

```
yalc add --link strapi-code-editor-custom-field && yarn install
```

5. Start the strapi project

## Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome! ❤️

More info about [contributing](https://github.com/TomaszPilch/strapi-code-editor-custom-field/blob/main/CONTRIBUTING.md).

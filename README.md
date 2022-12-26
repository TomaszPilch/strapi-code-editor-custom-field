# Strapi plugin strapi-code-editor-custom-field

Code editor plugin for strapi CMS. It uses the monaco editor (vscode).

## Installation

```
yarn add strapi-code-editor-custom-field
```

```
npm install strapi-code-editor-custom-field
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

## Usage

When you add the plugin you will see two new custom fields. One for javascript (and other languages) and one for json.

![Two custom fields](images/img.png)

The editor then will show up in content-type add/edit page.

JSON editor

![JSON editor](images/img2.png)

Javascript editor

![Javascript editor](images/img3.png)

Editor can be opened in fullscreen mode.

## Under the hood

Editor is using two different types for strapi field. When you select JSON editor it will be `json` type. 
When you select different language it will be `text` type.

In case of other language than json, the language is prefixed before value.

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

import React from 'react'
import { Code } from '@strapi/icons'

import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'

const name = pluginPkg.strapi.name

export default {
  register(app) {
    app.customFields.register({
      name: 'code-editor-json',
      pluginId,
      type: 'json',
      intlLabel: {
        id: 'code-editor-json.label',
        defaultMessage: 'Code editor JSON',
      },
      intlDescription: {
        id: 'code-editor-json.description',
        defaultMessage: 'Field for JSON editing',
      },
      icon: Code,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ './components/CodeEditor/CodeEditor'),
      },
    })
    app.customFields.register({
      name: 'code-editor-text',
      pluginId,
      type: 'text',
      intlLabel: {
        id: 'code-editor-text.label',
        defaultMessage: 'Code editor JavaScript and other languages',
      },
      intlDescription: {
        id: 'code-editor-text.description',
        defaultMessage: 'Field for JavaScript and other languages',
      },
      icon: Code,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ './components/CodeEditor/CodeEditor'),
      },
    })

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    }

    app.registerPlugin(plugin)
  },

  bootstrap() {},
  async registerTrads() {
    return Promise.resolve([])
  },
}

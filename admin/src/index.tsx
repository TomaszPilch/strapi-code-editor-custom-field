// @ts-ignore
import { Code } from '@strapi/icons'

import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'

const name = pluginPkg.strapi.name

export default {
  register(app: any) {
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
      options: {
        base: [
          {
            sectionTitle: {
              id: 'code-editor-text.sectionBase.title',
              defaultMessage: 'Basic options',
            },
            items: [
              {
                intlLabel: {
                  id: 'code-editor-text.sectionBase.language',
                  defaultMessage: 'Language',
                },
                name: 'options.language',
                type: 'select',
                value: '',
                options: [
                  {
                    key: 'css',
                    value: 'css',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.css', defaultMessage: 'css' },
                    },
                  },
                  {
                    key: 'dockerfile',
                    value: 'dockerfile',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.dockerfile',
                        defaultMessage: 'dockerfile',
                      },
                    },
                  },
                  {
                    key: 'graphql',
                    value: 'graphql',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.graphql',
                        defaultMessage: 'graphql',
                      },
                    },
                  },
                  {
                    key: 'html',
                    value: 'html',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.html', defaultMessage: 'html' },
                    },
                  },
                  {
                    key: 'javascript',
                    value: 'javascript',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.javascript',
                        defaultMessage: 'javascript',
                      },
                    },
                  },
                  {
                    key: 'json',
                    value: 'json',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.json', defaultMessage: 'json' },
                    },
                  },
                  {
                    key: 'kotlin',
                    value: 'kotlin',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.kotlin', defaultMessage: 'kotlin' },
                    },
                  },
                  {
                    key: 'markdown',
                    value: 'markdown',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.markdown',
                        defaultMessage: 'markdown',
                      },
                    },
                  },
                  {
                    key: 'mysql',
                    value: 'mysql',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.mysql', defaultMessage: 'mysql' },
                    },
                  },
                  {
                    key: 'php',
                    value: 'php',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.php', defaultMessage: 'php' },
                    },
                  },
                  {
                    key: 'plaintext',
                    value: 'plaintext',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.plaintext',
                        defaultMessage: 'plaintext',
                      },
                    },
                  },
                  {
                    key: 'powerquery',
                    value: 'powerquery',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.powerquery',
                        defaultMessage: 'powerquery',
                      },
                    },
                  },
                  {
                    key: 'powershell',
                    value: 'powershell',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.powershell',
                        defaultMessage: 'powershell',
                      },
                    },
                  },
                  {
                    key: 'scss',
                    value: 'scss',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.scss', defaultMessage: 'scss' },
                    },
                  },
                  {
                    key: 'shell',
                    value: 'shell',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.shell', defaultMessage: 'shell' },
                    },
                  },
                  {
                    key: 'sql',
                    value: 'sql',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.sql', defaultMessage: 'sql' },
                    },
                  },
                  {
                    key: 'typescript',
                    value: 'typescript',
                    metadatas: {
                      intlLabel: {
                        id: 'code-editor-text.sectionBase.languageValue.typescript',
                        defaultMessage: 'typescript',
                      },
                    },
                  },
                  {
                    key: 'xml',
                    value: 'xml',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.xml', defaultMessage: 'xml' },
                    },
                  },
                  {
                    key: 'yaml',
                    value: 'yaml',
                    metadatas: {
                      intlLabel: { id: 'code-editor-text.sectionBase.languageValue.yaml', defaultMessage: 'yaml' },
                    },
                  },
                ],
              },
            ],
          },
        ],
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

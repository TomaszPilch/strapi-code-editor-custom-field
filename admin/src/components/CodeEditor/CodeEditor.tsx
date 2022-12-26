import React, { Suspense, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { debounceTime, Subject } from 'rxjs'
import styled from 'styled-components'

// @ts-ignore
import { Field, FieldHint, FieldError, FieldLabel } from '@strapi/design-system/Field'
// @ts-ignore
import { Stack, Flex, Loader, Select, Option, IconButton, Icon, Box } from '@strapi/design-system'
// @ts-ignore
import { Expand } from '@strapi/icons'
import { MessageFormatElement } from '@formatjs/icu-messageformat-parser'

const CodeEditorLib = React.lazy(() => import('@monaco-editor/react')) as React.ComponentType<any>

const languages = [
  'css',
  'dockerfile',
  'graphql',
  'html',
  'javascript',
  'json',
  'kotlin',
  'markdown',
  'mysql',
  'php',
  'plaintext',
  'powerquery',
  'powershell',
  'scss',
  'shell',
  'sql',
  'typescript',
  'xml',
  'yaml',
]

const FullScreenDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  padding: 45px;
  background: ${({ theme }) => theme.colors.neutral100};
`

const NormalDiv = styled.div`
  min-height: 35vh;
`

interface MessageDescriptor {
  id?: string
  description?: string | object
  defaultMessage?: string | MessageFormatElement[]
}

type CodeEditorPropsT = {
  attribute: {
    customField: string
  }
  description: MessageDescriptor
  error?: string
  intlLabel: MessageDescriptor
  labelAction?: React.ReactNode
  name: string
  onChange: (ev: { target: { name: string; value: string } }) => void
  required: boolean
  value: null | string
}

const CodeEditor = ({
  attribute,
  description,
  // disabled, - todo readonly
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value,
}: CodeEditorPropsT) => {
  const { formatMessage } = useIntl()
  const languageRegExp = new RegExp('__(.+)__;')
  const isJson = attribute.customField.endsWith('code-editor-json')
  const defaultLanguage = isJson ? 'json' : 'javascript'
  let languageFromValue: null | Array<string> | string = value ? value.match(languageRegExp) : null
  if (languageFromValue && languageFromValue.length > 1) {
    languageFromValue = languageFromValue[1] as string
  } else {
    languageFromValue = null
  }
  const [language, setLanguage] = useState(languageFromValue || defaultLanguage)
  const [editorValue, setEditorValue] = useState(value ? value.replace(languageRegExp, '') : value)
  const [subject] = useState(new Subject<string>())
  const [fullScreen, setFullScreen] = useState(false)

  // @ts-ignore
  const theme = localStorage.getItem('STRAPI_THEME')

  const handleOnChange = (value: string) => {
    onChange({ target: { name, value } })
  }

  useEffect(() => {
    const subscription = subject.pipe(debounceTime(1000)).subscribe(handleOnChange)
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleChange = (value: string) => {
    setEditorValue(value)
    subject.next(isJson ? value : `__${language}__;${value}`)
  }

  const StyledDiv = fullScreen ? FullScreenDiv : NormalDiv
  return (
    <Field name={name} id={name} error={error} hint={description && formatMessage(description)} required={required}>
      <StyledDiv>
        <Stack spacing={3}>
          <Flex>
            <Flex width="30%" justifyContent="flex-start">
              <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
            </Flex>
            <Flex width="70%" justifyContent="flex-end">
              <Stack spacing={2} horizontal>
                <IconButton
                  onClick={() => setFullScreen((prev) => !prev)}
                  label="expand"
                  icon={<Icon width={'10rem'} height={`10rem`} as={Expand} />}
                />
                {!isJson && (
                  <Select id={`${name}-language-select`} label="" value={language} onChange={setLanguage}>
                    {languages.map((lang) => (
                      <Option key={lang} value={lang}>
                        {lang}
                      </Option>
                    ))}
                  </Select>
                )}
              </Stack>
            </Flex>
          </Flex>
          <Suspense fallback={<Loader>Loading</Loader>}>
            <CodeEditorLib
              height={fullScreen ? '80vh' : '30vh'}
              language={language}
              loading={<Loader>Loading</Loader>}
              onChange={handleChange}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              value={editorValue}
            />
          </Suspense>
          <FieldHint />
          <FieldError />
        </Stack>
      </StyledDiv>
    </Field>
  )
}

export default CodeEditor

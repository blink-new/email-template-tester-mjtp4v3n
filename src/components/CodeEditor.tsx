import { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { cn } from '../lib/utils'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    // Configure HTML validation and formatting
    monaco.languages.html.htmlDefaults.setOptions({
      format: {
        tabSize: 2,
        insertSpaces: true,
        wrapLineLength: 120,
        unformatted: 'default"',
        contentUnformatted: 'pre,code,textarea',
        indentInnerHtml: false,
        preserveNewLines: true,
        maxPreserveNewLines: undefined,
        indentHandlebars: false,
        endWithNewline: false,
        extraLiners: 'head, body, /html',
        wrapAttributes: 'auto'
      }
    })

    // Add custom CSS snippets for email templates
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: () => {
        return {
          suggestions: [
            {
              label: 'email-container',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">',
                '  $0',
                '</div>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Email container with max-width and centering'
            },
            {
              label: 'email-button',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<a href="$1" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px;">',
                '  $2',
                '</a>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Email-safe button with inline styles'
            },
            {
              label: 'email-header',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<div style="text-align: center; padding: 20px; background-color: #2563eb; color: white;">',
                '  <h1 style="margin: 0; font-size: 24px;">$1</h1>',
                '</div>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Email header section'
            }
          ]
        }
      }
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <div className="bg-muted px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">HTML Template</span>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <Editor
        height="100%"
        defaultLanguage="html"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: false,
          padding: { top: 16, bottom: 16 },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          wordBasedSuggestions: 'off',
          parameterHints: {
            enabled: true
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true
          }
        }}
      />
    </div>
  )
}
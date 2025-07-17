import { useEffect, useRef, useState } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { cn } from '../lib/utils'

interface EmailPreviewProps {
  htmlContent: string
  client: string
  viewMode: 'desktop' | 'mobile'
}

interface ValidationIssue {
  type: 'error' | 'warning' | 'info'
  message: string
}

const clientStyles = {
  gmail: {
    backgroundColor: '#f6f8fc',
    fontFamily: 'arial,sans-serif',
    fontSize: '14px'
  },
  outlook: {
    backgroundColor: '#ffffff',
    fontFamily: 'Calibri,sans-serif',
    fontSize: '14px'
  },
  yahoo: {
    backgroundColor: '#f7f7f7',
    fontFamily: 'Helvetica Neue,Arial,sans-serif',
    fontSize: '14px'
  },
  apple: {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
    fontSize: '14px'
  }
}

export default function EmailPreview({ htmlContent, client, viewMode }: EmailPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const validateEmailTemplate = (html: string): ValidationIssue[] => {
    const issues: ValidationIssue[] = []
    
    // Check for missing DOCTYPE
    if (!html.includes('<!DOCTYPE html>')) {
      issues.push({
        type: 'warning',
        message: 'Missing DOCTYPE declaration - may cause rendering issues in some clients'
      })
    }

    // Check for viewport meta tag
    if (!html.includes('viewport')) {
      issues.push({
        type: 'warning',
        message: 'Missing viewport meta tag - mobile rendering may be affected'
      })
    }

    // Check for inline styles vs CSS
    const hasStyleTag = html.includes('<style>')
    const hasInlineStyles = html.includes('style=')
    
    if (hasStyleTag && !hasInlineStyles) {
      issues.push({
        type: 'error',
        message: 'CSS in <style> tags may not work in all email clients - use inline styles'
      })
    }

    // Check for responsive design
    if (!html.includes('@media')) {
      issues.push({
        type: 'info',
        message: 'No media queries detected - consider adding responsive styles'
      })
    }

    // Check for table-based layout (recommended for emails)
    if (!html.includes('<table>') && html.includes('<div')) {
      issues.push({
        type: 'warning',
        message: 'DIV-based layout detected - table-based layouts are more reliable in email clients'
      })
    }

    // Check for web fonts
    if (html.includes('fonts.googleapis.com') || html.includes('@import')) {
      issues.push({
        type: 'warning',
        message: 'Web fonts may not load in all email clients - provide fallbacks'
      })
    }

    return issues
  }

  useEffect(() => {
    if (!iframeRef.current) return

    setIsLoading(true)
    
    const iframe = iframeRef.current
    const clientStyle = clientStyles[client as keyof typeof clientStyles]
    
    // Validate the template
    const issues = validateEmailTemplate(htmlContent)
    setValidationIssues(issues)

    // Create the full HTML document with client-specific styles
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 20px;
              background-color: ${clientStyle.backgroundColor};
              font-family: ${clientStyle.fontFamily};
              font-size: ${clientStyle.fontSize};
              line-height: 1.4;
            }
            
            /* Client-specific resets */
            ${client === 'outlook' ? `
              table { border-collapse: collapse; }
              .outlook-fix { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            ` : ''}
            
            ${client === 'gmail' ? `
              u + .body .gmail-fix { display: none !important; }
              .gmail-fix { display: block !important; }
            ` : ''}
            
            /* Mobile responsive adjustments */
            @media only screen and (max-width: 600px) {
              .mobile-hide { display: none !important; }
              .mobile-center { text-align: center !important; }
              .mobile-full { width: 100% !important; }
            }
          </style>
        </head>
        <body class="body">
          ${htmlContent}
        </body>
      </html>
    `

    // Write content to iframe
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (doc) {
      doc.open()
      doc.write(fullHtml)
      doc.close()
      
      // Add load event listener
      iframe.onload = () => {
        setIsLoading(false)
      }
    }
  }, [htmlContent, client])

  const getIssueIcon = (type: ValidationIssue['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getIssueColor = (type: ValidationIssue['type']) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'info':
        return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Validation Issues */}
      {validationIssues.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
            Template Validation ({validationIssues.length} issues)
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {validationIssues.map((issue, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start space-x-2 p-2 rounded border text-sm',
                  getIssueColor(issue.type)
                )}
              >
                {getIssueIcon(issue.type)}
                <span className="flex-1">{issue.message}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Preview Frame */}
      <Card className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize">
              {client}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {viewMode}
            </Badge>
          </div>
          {validationIssues.length === 0 && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">No issues detected</span>
            </div>
          )}
        </div>

        <div className="relative h-full border rounded-lg overflow-hidden bg-white">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          <iframe
            ref={iframeRef}
            className={cn(
              'w-full h-full border-0 transition-all duration-300',
              viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
            )}
            style={{
              width: viewMode === 'mobile' ? '375px' : '100%',
              margin: viewMode === 'mobile' ? '0 auto' : '0'
            }}
            title="Email Preview"
            sandbox="allow-same-origin"
          />
        </div>
      </Card>
    </div>
  )
}
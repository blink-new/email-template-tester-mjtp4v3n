import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { 
  Mail, 
  Monitor, 
  Smartphone, 
  Download, 
  Send, 
  Eye, 
  Code, 
  Palette,
  Settings,
  FileText,
  Zap
} from 'lucide-react'
import CodeEditor from './components/CodeEditor'
import EmailPreview from './components/EmailPreview'
import TemplateLibrary from './components/TemplateLibrary'
import { toast } from 'react-hot-toast'

const emailClients = [
  { id: 'gmail', name: 'Gmail', icon: Mail, color: 'bg-red-500' },
  { id: 'outlook', name: 'Outlook', icon: Mail, color: 'bg-blue-500' },
  { id: 'yahoo', name: 'Yahoo', icon: Mail, color: 'bg-purple-500' },
  { id: 'apple', name: 'Apple Mail', icon: Mail, color: 'bg-gray-500' }
]

const defaultTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      background-color: #2563eb;
      color: white;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 30px 20px;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #f59e0b;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
      border-top: 1px solid #eee;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 10px !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Newsletter</h1>
    </div>
    <div class="content">
      <h2>Hello there!</h2>
      <p>Thank you for subscribing to our newsletter. We're excited to share the latest updates and insights with you.</p>
      <p>Here's what you can expect:</p>
      <ul>
        <li>Weekly industry insights</li>
        <li>Product updates and announcements</li>
        <li>Exclusive offers and promotions</li>
      </ul>
      <a href="#" class="button">Get Started</a>
      <p>If you have any questions, feel free to reach out to our support team.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>123 Business St, City, State 12345</p>
    </div>
  </div>
</body>
</html>`

function App() {
  const [htmlCode, setHtmlCode] = useState(defaultTemplate)
  const [selectedClient, setSelectedClient] = useState('gmail')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [activeTab, setActiveTab] = useState('editor')

  const handleExport = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email-template.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Template exported successfully!')
  }

  const handleSendTest = () => {
    toast.success('Test email sent! (Demo mode)')
  }

  const handleTemplateSelect = (template: string) => {
    setHtmlCode(template)
    setActiveTab('editor')
    toast.success('Template loaded!')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Email Template Tester</h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Zap className="h-3 w-3 mr-1" />
              Live Preview
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSendTest}>
              <Send className="h-4 w-4 mr-2" />
              Send Test
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Editor and Templates */}
        <div className="w-1/2 border-r bg-card">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="border-b px-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor" className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Editor</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Templates</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="editor" className="flex-1 p-0 m-0">
              <CodeEditor 
                value={htmlCode} 
                onChange={setHtmlCode}
                className="h-full"
              />
            </TabsContent>
            
            <TabsContent value="templates" className="flex-1 p-4 m-0">
              <TemplateLibrary onTemplateSelect={handleTemplateSelect} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 flex flex-col">
          {/* Preview Controls */}
          <div className="border-b bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Live Preview
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>
            </div>

            {/* Email Client Selector */}
            <div className="flex space-x-2">
              {emailClients.map((client) => (
                <Button
                  key={client.id}
                  variant={selectedClient === client.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedClient(client.id)}
                  className="flex items-center space-x-2"
                >
                  <div className={`h-2 w-2 rounded-full ${client.color}`} />
                  <span>{client.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-4">
            <EmailPreview 
              htmlContent={htmlCode}
              client={selectedClient}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { 
  Search, 
  Eye, 
  Download, 
  Star,
  Mail,
  ShoppingCart,
  Calendar,
  Users,
  Briefcase,
  Heart
} from 'lucide-react'

interface Template {
  id: string
  name: string
  category: string
  description: string
  preview: string
  html: string
  tags: string[]
  featured?: boolean
}

const templates: Template[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    category: 'Onboarding',
    description: 'Clean welcome email for new users',
    preview: '/api/placeholder/300/200',
    tags: ['welcome', 'onboarding', 'clean'],
    featured: true,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome!</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .content { padding: 40px 30px; line-height: 1.6; }
    .button { display: inline-block; padding: 15px 30px; background-color: #667eea; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
    .footer { text-align: center; padding: 30px; color: #666; font-size: 14px; border-top: 1px solid #eee; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Welcome to Our Platform!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">We're excited to have you on board</p>
    </div>
    <div class="content">
      <h2 style="color: #333;">Hello there! 👋</h2>
      <p>Thank you for joining our community. We're thrilled to have you as part of our growing family of users who are passionate about creating amazing experiences.</p>
      <p>Here's what you can do next:</p>
      <ul style="color: #555;">
        <li>Complete your profile setup</li>
        <li>Explore our feature-rich dashboard</li>
        <li>Connect with other community members</li>
        <li>Start your first project</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">Get Started Now</a>
      </div>
      <p>If you have any questions, our support team is here to help. Just reply to this email!</p>
      <p>Best regards,<br>The Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>123 Business Street, City, State 12345</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'newsletter',
    name: 'Newsletter Template',
    category: 'Marketing',
    description: 'Modern newsletter with featured content',
    preview: '/api/placeholder/300/200',
    tags: ['newsletter', 'marketing', 'content'],
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; }
    .article { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .article:last-child { border-bottom: none; }
    .article h3 { color: #2c3e50; margin: 0 0 10px 0; }
    .article p { color: #555; line-height: 1.6; margin: 0 0 15px 0; }
    .read-more { color: #3498db; text-decoration: none; font-weight: bold; }
    .footer { background-color: #34495e; color: white; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Weekly Insights</h1>
      <p style="margin: 5px 0 0 0; opacity: 0.8;">Issue #42 • March 2024</p>
    </div>
    <div class="content">
      <div class="article">
        <h3>The Future of Web Development</h3>
        <p>Discover the latest trends and technologies shaping the future of web development. From AI-powered tools to new frameworks, here's what you need to know.</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
      <div class="article">
        <h3>Design System Best Practices</h3>
        <p>Learn how to build and maintain scalable design systems that improve consistency and efficiency across your organization.</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
      <div class="article">
        <h3>Performance Optimization Tips</h3>
        <p>Simple yet effective techniques to make your websites faster and provide better user experiences.</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
    </div>
    <div class="footer">
      <p>Thanks for reading! Forward this to a friend who might enjoy it.</p>
      <p style="margin: 10px 0 0 0; opacity: 0.7;">
        <a href="#" style="color: #bdc3c7;">Unsubscribe</a> | 
        <a href="#" style="color: #bdc3c7;">Update Preferences</a>
      </p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ecommerce',
    name: 'Order Confirmation',
    category: 'E-commerce',
    description: 'Professional order confirmation email',
    preview: '/api/placeholder/300/200',
    tags: ['ecommerce', 'order', 'confirmation'],
    featured: true,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #27ae60; color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .order-details { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .item:last-child { border-bottom: none; }
    .total { font-weight: bold; font-size: 18px; color: #27ae60; }
    .button { display: inline-block; padding: 12px 24px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { background-color: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Order Confirmed! ✅</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase</p>
    </div>
    <div class="content">
      <p>Hi John,</p>
      <p>Great news! Your order has been confirmed and is being processed. Here are the details:</p>
      
      <div class="order-details">
        <h3 style="margin: 0 0 15px 0; color: #2c3e50;">Order #12345</h3>
        <div class="item">
          <span>Premium Headphones</span>
          <span>$199.99</span>
        </div>
        <div class="item">
          <span>Wireless Mouse</span>
          <span>$49.99</span>
        </div>
        <div class="item">
          <span>Shipping</span>
          <span>$9.99</span>
        </div>
        <div class="item total">
          <span>Total</span>
          <span>$259.97</span>
        </div>
      </div>
      
      <p><strong>Estimated Delivery:</strong> March 15-17, 2024</p>
      <p><strong>Shipping Address:</strong><br>
      123 Main Street<br>
      City, State 12345</p>
      
      <div style="text-align: center;">
        <a href="#" class="button">Track Your Order</a>
      </div>
      
      <p>We'll send you another email when your order ships. If you have any questions, feel free to contact our support team.</p>
    </div>
    <div class="footer">
      <p>Need help? Contact us at support@company.com</p>
      <p style="margin: 10px 0 0 0; opacity: 0.7;">&copy; 2024 Your Store. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'event',
    name: 'Event Invitation',
    category: 'Events',
    description: 'Elegant event invitation template',
    preview: '/api/placeholder/300/200',
    tags: ['event', 'invitation', 'elegant'],
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Invitation</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #f9f9f9; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; }
    .header { background: linear-gradient(135deg, #8e44ad 0%, #3498db 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .event-details { background-color: #f8f9fa; padding: 25px; border-left: 4px solid #8e44ad; margin: 25px 0; }
    .detail-row { margin: 10px 0; }
    .detail-label { font-weight: bold; color: #8e44ad; display: inline-block; width: 80px; }
    .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #8e44ad 0%, #3498db 100%); color: white; text-decoration: none; border-radius: 25px; margin: 25px 0; font-weight: bold; }
    .footer { text-align: center; padding: 30px; color: #666; font-size: 14px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 32px;">You're Invited!</h1>
      <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Join us for an exclusive event</p>
    </div>
    <div class="content">
      <h2 style="color: #8e44ad; text-align: center;">Annual Tech Conference 2024</h2>
      <p style="text-align: center; font-size: 18px; color: #555; font-style: italic;">"Shaping the Future of Technology"</p>
      
      <div class="event-details">
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span>Friday, March 22, 2024</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span>9:00 AM - 6:00 PM</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Venue:</span>
          <span>Grand Convention Center, Downtown</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Dress:</span>
          <span>Business Casual</span>
        </div>
      </div>
      
      <p>We're excited to invite you to our annual tech conference featuring keynote speakers, interactive workshops, and networking opportunities with industry leaders.</p>
      
      <p><strong>What to expect:</strong></p>
      <ul style="color: #555;">
        <li>Keynote presentations from tech innovators</li>
        <li>Hands-on workshops and demos</li>
        <li>Networking lunch and cocktail reception</li>
        <li>Exclusive product launches and announcements</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="#" class="button">RSVP Now</a>
      </div>
      
      <p style="text-align: center; margin-top: 30px;"><em>Please RSVP by March 15th. Limited seats available.</em></p>
    </div>
    <div class="footer">
      <p>Questions? Contact us at events@company.com</p>
      <p style="margin: 10px 0 0 0;">&copy; 2024 Tech Events Inc.</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'reset-password',
    name: 'Password Reset',
    category: 'Authentication',
    description: 'Secure password reset email',
    preview: '/api/placeholder/300/200',
    tags: ['password', 'reset', 'security'],
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #e74c3c; color: white; padding: 30px; text-align: center; }
    .content { padding: 40px 30px; line-height: 1.6; }
    .security-notice { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
    .button { display: inline-block; padding: 15px 30px; background-color: #e74c3c; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
    .footer { text-align: center; padding: 30px; color: #666; font-size: 14px; border-top: 1px solid #eee; }
    .code { background-color: #f8f9fa; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 18px; text-align: center; margin: 20px 0; border: 2px dashed #dee2e6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🔐 Password Reset Request</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Secure your account</p>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>We received a request to reset the password for your account. If you made this request, click the button below to reset your password:</p>
      
      <div style="text-align: center;">
        <a href="#" class="button">Reset My Password</a>
      </div>
      
      <div class="security-notice">
        <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour for your security. If you didn't request this password reset, please ignore this email or contact our support team.
      </div>
      
      <p>Alternatively, you can copy and paste this code into the password reset form:</p>
      
      <div class="code">
        RST-7X9K-2M4P-8Q1W
      </div>
      
      <p><strong>For your security:</strong></p>
      <ul style="color: #555;">
        <li>Never share this reset link or code with anyone</li>
        <li>Always use a strong, unique password</li>
        <li>Enable two-factor authentication if available</li>
        <li>Log out of all devices after changing your password</li>
      </ul>
      
      <p>If you continue to have problems, please contact our support team.</p>
      
      <p>Best regards,<br>The Security Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message. Please do not reply to this email.</p>
      <p style="margin: 10px 0 0 0;">&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
  }
]

const categories = ['All', 'Onboarding', 'Marketing', 'E-commerce', 'Events', 'Authentication']

interface TemplateLibraryProps {
  onTemplateSelect: (html: string) => void
}

export default function TemplateLibrary({ onTemplateSelect }: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Onboarding': return <Users className="h-4 w-4" />
      case 'Marketing': return <Mail className="h-4 w-4" />
      case 'E-commerce': return <ShoppingCart className="h-4 w-4" />
      case 'Events': return <Calendar className="h-4 w-4" />
      case 'Authentication': return <Briefcase className="h-4 w-4" />
      default: return <Mail className="h-4 w-4" />
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center space-x-1"
            >
              {category !== 'All' && getCategoryIcon(category)}
              <span>{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <ScrollArea className="flex-1">
        <div className="grid gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      {template.featured && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryIcon(template.category)}
                      <span className="ml-1">{template.category}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewTemplate(template)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTemplateSelect(template.html)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={() => onTemplateSelect(template.html)}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold">{previewTemplate.name}</h3>
                <p className="text-sm text-muted-foreground">{previewTemplate.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => onTemplateSelect(previewTemplate.html)}
                  size="sm"
                >
                  Use Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
              <iframe
                srcDoc={previewTemplate.html}
                className="w-full h-96 border rounded"
                title="Template Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
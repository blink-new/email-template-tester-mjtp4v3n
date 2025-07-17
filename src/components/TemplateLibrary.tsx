import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { 
  Search, 
  Eye, 
  Download, 
  Star, 
  Mail, 
  ShoppingCart, 
  Calendar, 
  Users,
  Zap,
  Heart
} from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  html: string
  tags: string[]
  featured?: boolean
}

interface TemplateLibraryProps {
  onTemplateSelect: (html: string) => void
}

const templates: Template[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'Clean welcome email for new subscribers',
    category: 'Onboarding',
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
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .content { padding: 40px 30px; }
    .button { display: inline-block; padding: 15px 30px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
    .footer { text-align: center; padding: 30px; color: #64748b; background-color: #f8fafc; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Welcome Aboard! 🎉</h1>
    </div>
    <div class="content">
      <h2 style="color: #1e293b; margin-bottom: 20px;">Hi there!</h2>
      <p style="line-height: 1.6; color: #475569; margin-bottom: 25px;">
        We're thrilled to have you join our community! You're now part of something amazing, and we can't wait to share our journey with you.
      </p>
      <p style="line-height: 1.6; color: #475569; margin-bottom: 30px;">
        Here's what you can expect from us:
      </p>
      <ul style="color: #475569; line-height: 1.8; margin-bottom: 30px;">
        <li>Weekly insights and tips</li>
        <li>Exclusive content and offers</li>
        <li>Early access to new features</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">Get Started</a>
      </div>
      <p style="line-height: 1.6; color: #475569;">
        If you have any questions, just reply to this email. We're here to help!
      </p>
    </div>
    <div class="footer">
      <p style="margin: 0;">&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'newsletter',
    name: 'Newsletter Template',
    description: 'Modern newsletter with featured content',
    category: 'Newsletter',
    preview: '/api/placeholder/300/200',
    tags: ['newsletter', 'content', 'modern'],
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { padding: 30px; text-align: center; background-color: #0f172a; color: white; }
    .content { padding: 30px; }
    .article { margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #e2e8f0; }
    .article:last-child { border-bottom: none; }
    .article h3 { color: #1e293b; margin-bottom: 10px; }
    .article p { color: #64748b; line-height: 1.6; }
    .read-more { color: #3b82f6; text-decoration: none; font-weight: 500; }
    .footer { background-color: #f8fafc; padding: 30px; text-align: center; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">Weekly Digest</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.8;">Your weekly dose of insights</p>
    </div>
    <div class="content">
      <div class="article">
        <h3>The Future of Web Development</h3>
        <p>Discover the latest trends and technologies shaping the future of web development. From AI-powered tools to new frameworks...</p>
        <a href="#" class="read-more">Read more →</a>
      </div>
      <div class="article">
        <h3>Design Systems That Scale</h3>
        <p>Learn how to build design systems that grow with your team and product. Best practices from industry leaders...</p>
        <a href="#" class="read-more">Read more →</a>
      </div>
      <div class="article">
        <h3>Performance Optimization Tips</h3>
        <p>Simple yet effective techniques to make your websites faster and more responsive. Real-world examples included...</p>
        <a href="#" class="read-more">Read more →</a>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0 0 10px 0;">&copy; 2024 Your Newsletter. All rights reserved.</p>
      <p style="margin: 0;"><a href="#" style="color: #64748b;">Unsubscribe</a> | <a href="#" style="color: #64748b;">Update preferences</a></p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Promotion',
    description: 'Product showcase with discount offer',
    category: 'E-commerce',
    preview: '/api/placeholder/300/200',
    tags: ['ecommerce', 'promotion', 'products'],
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Special Offer</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fef2f2; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { text-align: center; padding: 30px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; }
    .offer-banner { background-color: #fef2f2; text-align: center; padding: 20px; border: 2px dashed #dc2626; margin: 20px; }
    .products { padding: 30px; }
    .product { display: table; width: 100%; margin-bottom: 30px; }
    .product-image { display: table-cell; width: 150px; vertical-align: top; }
    .product-info { display: table-cell; padding-left: 20px; vertical-align: top; }
    .price { font-size: 18px; font-weight: bold; color: #dc2626; }
    .old-price { text-decoration: line-through; color: #9ca3af; margin-right: 10px; }
    .cta { text-align: center; padding: 30px; }
    .button { display: inline-block; padding: 15px 40px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 32px;">🔥 FLASH SALE</h1>
      <p style="margin: 10px 0 0 0; font-size: 18px;">Limited Time Offer</p>
    </div>
    
    <div class="offer-banner">
      <h2 style="margin: 0; color: #dc2626; font-size: 24px;">50% OFF Everything!</h2>
      <p style="margin: 10px 0 0 0; color: #7f1d1d;">Use code: FLASH50</p>
    </div>
    
    <div class="products">
      <div class="product">
        <div class="product-image">
          <div style="width: 120px; height: 120px; background-color: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Product Image</div>
        </div>
        <div class="product-info">
          <h3 style="margin: 0 0 10px 0; color: #1f2937;">Premium Headphones</h3>
          <p style="color: #6b7280; margin: 0 0 15px 0; line-height: 1.5;">High-quality wireless headphones with noise cancellation and premium sound quality.</p>
          <div class="price">
            <span class="old-price">$199.99</span>
            <span>$99.99</span>
          </div>
        </div>
      </div>
      
      <div class="product">
        <div class="product-image">
          <div style="width: 120px; height: 120px; background-color: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Product Image</div>
        </div>
        <div class="product-info">
          <h3 style="margin: 0 0 10px 0; color: #1f2937;">Smart Watch</h3>
          <p style="color: #6b7280; margin: 0 0 15px 0; line-height: 1.5;">Feature-packed smartwatch with health monitoring and GPS tracking capabilities.</p>
          <div class="price">
            <span class="old-price">$299.99</span>
            <span>$149.99</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cta">
      <a href="#" class="button">Shop Now - 50% OFF</a>
      <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px;">*Offer expires in 24 hours</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'event',
    name: 'Event Invitation',
    description: 'Professional event invitation template',
    category: 'Events',
    preview: '/api/placeholder/300/200',
    tags: ['event', 'invitation', 'professional'],
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Invitation</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; }
    .header { text-align: center; padding: 40px 30px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; }
    .content { padding: 40px 30px; }
    .event-details { background-color: #f8fafc; padding: 30px; margin: 30px 0; border-left: 4px solid #6366f1; }
    .detail-row { display: table; width: 100%; margin-bottom: 15px; }
    .detail-label { display: table-cell; width: 100px; font-weight: bold; color: #374151; }
    .detail-value { display: table-cell; color: #6b7280; }
    .cta { text-align: center; margin: 40px 0; }
    .button { display: inline-block; padding: 15px 30px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
    .footer { text-align: center; padding: 30px; background-color: #f9fafb; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">You're Invited!</h1>
      <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Join us for an exclusive event</p>
    </div>
    
    <div class="content">
      <h2 style="color: #1f2937; margin-bottom: 20px;">Tech Innovation Summit 2024</h2>
      <p style="line-height: 1.6; color: #4b5563; margin-bottom: 30px;">
        We're excited to invite you to our annual Tech Innovation Summit, where industry leaders will share insights on the future of technology and innovation.
      </p>
      
      <div class="event-details">
        <h3 style="margin: 0 0 20px 0; color: #374151;">Event Details</h3>
        <div class="detail-row">
          <div class="detail-label">Date:</div>
          <div class="detail-value">March 15, 2024</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Time:</div>
          <div class="detail-value">9:00 AM - 5:00 PM PST</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Location:</div>
          <div class="detail-value">San Francisco Convention Center</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Dress Code:</div>
          <div class="detail-value">Business Casual</div>
        </div>
      </div>
      
      <h3 style="color: #374151; margin-bottom: 15px;">What to Expect:</h3>
      <ul style="color: #4b5563; line-height: 1.8; margin-bottom: 30px;">
        <li>Keynote presentations from industry leaders</li>
        <li>Interactive workshops and demos</li>
        <li>Networking opportunities</li>
        <li>Lunch and refreshments provided</li>
      </ul>
      
      <div class="cta">
        <a href="#" class="button">RSVP Now</a>
        <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px;">Please respond by March 10, 2024</p>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 10px 0;">Questions? Contact us at events@company.com</p>
      <p style="margin: 0;">&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
  }
]

const categories = ['All', 'Onboarding', 'Newsletter', 'E-commerce', 'Events']

export default function TemplateLibrary({ onTemplateSelect }: TemplateLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

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
      case 'Newsletter': return <Mail className="h-4 w-4" />
      case 'E-commerce': return <ShoppingCart className="h-4 w-4" />
      case 'Events': return <Calendar className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
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
              {getCategoryIcon(category)}
              <span>{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
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
                      variant="outline"
                      size="sm"
                      onClick={() => onTemplateSelect(template.html)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No templates found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
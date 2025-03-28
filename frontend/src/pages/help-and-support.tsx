import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import { Book, HelpCircle, MessageSquare, Search } from 'lucide-react'

export default function HelpAndSupport() {
  const [searchQuery, setSearchQuery] = useState('')

  const knowledgeBaseArticles = [
    { id: 1, title: 'Getting Started with Inventory Management', content: 'Learn the basics of using our inventory management system...' },
    { id: 2, title: 'Setting Up Your First Product', content: 'Follow these steps to add your first product to the system...' },
    { id: 3, title: 'Understanding Stock Alerts', content: 'Learn how to configure and interpret stock alerts for efficient inventory management...' },
    { id: 4, title: 'Generating Reports', content: 'Discover how to create and customize various reports for your inventory...' },
    { id: 5, title: 'Managing User Roles', content: 'Learn about different user roles and how to assign them for secure access control...' },
  ]

  const faqs = [
    { id: 1, question: 'How do I reset my password?', answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.' },
    { id: 2, question: 'Can I import my existing inventory data?', answer: 'Yes, you can import your existing inventory data using our CSV import tool. Go to Settings > Data Management > Import Data for detailed instructions.' },
    { id: 3, question: 'How often is the inventory data backed up?', answer: 'By default, we perform daily backups of your inventory data. You can customize the backup frequency in Settings > Data Backup.' },
    { id: 4, question: 'What do I do if I receive a "Low Stock" alert?', answer: 'When you receive a "Low Stock" alert, review the item details and consider restocking. You can adjust alert thresholds in Settings > Preferences.' },
    { id: 5, question: 'How can I generate a custom report?', answer: 'To generate a custom report, go to the Reports section, click on "Create Custom Report," and select the data points and date range you need.' },
  ]

  const filteredArticles = knowledgeBaseArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help and Support</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="knowledge-base" className="space-y-4">
        <TabsList>
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge-base">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Knowledge Base
              </CardTitle>
              <CardDescription>Articles and guides on using the software</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {filteredArticles.map((article) => (
                  <Accordion type="single" collapsible key={article.id}>
                    <AccordionItem value={`article-${article.id}`}>
                      <AccordionTrigger>{article.title}</AccordionTrigger>
                      <AccordionContent>{article.content}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Common issues and solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {filteredFaqs.map((faq) => (
                  <Accordion type="single" collapsible key={faq.id}>
                    <AccordionItem value={`faq-${faq.id}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Describe your issue in detail" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Message</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
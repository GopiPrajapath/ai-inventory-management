"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { ScrollArea } from "../components/ui/scroll-area"
import { useChat } from 'ai/react'
import { Search, MessageSquare, RefreshCw } from 'lucide-react'

// Mock data for inventory items
const inventoryItems = [
  { id: 1, name: 'Wireless Earbuds', sku: 'WE001', currentStock: 150, reorderPoint: 50 },
  { id: 2, name: 'Smart Watch', sku: 'SW002', currentStock: 75, reorderPoint: 30 },
  { id: 3, name: 'Bluetooth Speaker', sku: 'BS003', currentStock: 100, reorderPoint: 40 },
  { id: 4, name: 'Laptop Stand', sku: 'LS004', currentStock: 200, reorderPoint: 80 },
  { id: 5, name: 'USB-C Cable', sku: 'UC005', currentStock: 300, reorderPoint: 100 },
]

// Mock function for getting personalized recommendations
const getPersonalizedRecommendations = () => [
  { item: 'Wireless Earbuds', suggestedReorder: 100 },
  { item: 'Smart Watch', suggestedReorder: 50 },
  { item: 'USB-C Cable', suggestedReorder: 200 },
]

export default function AIInsights() {
  const [query, setQuery] = useState('')
  const [queryResult, setQueryResult] = useState<string>('')
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const handleNaturalLanguageQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, this would be processed by a natural language understanding model
    const lowercaseQuery = query.toLowerCase()
    if (lowercaseQuery.includes('stock level')) {
      const itemName = lowercaseQuery.split('of ')[1]?.replace('?', '')
      const item = inventoryItems.find(i => i.name.toLowerCase() === itemName)
      if (item) {
        setQueryResult(`The current stock level of ${item.name} is ${item.currentStock}.`)
      } else {
        setQueryResult("I couldn't find that item in the inventory.")
      }
    } else if (lowercaseQuery.includes('reorder')) {
      const recommendations = getPersonalizedRecommendations()
      setQueryResult(`Based on current stock levels and sales forecasts, you should consider reordering: ${recommendations.map(r => `${r.item} (${r.suggestedReorder} units)`).join(', ')}.`)
    } else {
      setQueryResult("I'm sorry, I didn't understand that query. Try asking about stock levels or what to reorder.")
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Insights</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Natural Language Queries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Natural Language Queries
            </CardTitle>
            <CardDescription>Ask questions about your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNaturalLanguageQuery} className="space-y-4">
              <Input
                type="text"
                placeholder="E.g., What is the stock level of Wireless Earbuds?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit">Ask</Button>
            </form>
            {queryResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p>{queryResult}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="mr-2 h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Restocking suggestions based on sales history and forecasts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Suggested Reorder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPersonalizedRecommendations().map((rec, index) => (
                  <TableRow key={index}>
                    <TableCell>{rec.item}</TableCell>
                    <TableCell>{rec.suggestedReorder} units</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update Inventory</Button>
          </CardFooter>
        </Card>

        {/* Chatbot Assistant */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              AI Inventory Assistant
            </CardTitle>
            <CardDescription>Chat with our AI-powered assistant for inventory-related queries</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full pr-4">
              {messages.map(m => (
                <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {m.content}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask about your inventory..."
                value={input}
                onChange={handleInputChange}
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
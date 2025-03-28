import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Users, Bell, Database, Brain } from 'lucide-react'
import Sidebar from '../components/ui/HeaderandSideBar'; 


export default function Settings() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john..example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane..example.com', role: 'Manager' },
    { id: 3, name: 'Bob Johnson', email: 'bob..example.com', role: 'User' },
  ])

  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' })

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1 }])
      setNewUser({ name: '', email: '', role: '' })
    }
  }

  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    
  <Sidebar>
    <div className="container mx-auto px-6 py-8">
          {/* Settings Content */}
          <h1 className="text-3xl font-semibold mb-6">Settings</h1>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

      <div className="container mx-auto px-6 py-8">
      <Tabs defaultValue="user-management" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="data-backup">Data Backup</TabsTrigger>
          <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="user-management">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Add, remove users and assign roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <Input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addUser}>Add User</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Button variant="destructive" size="sm" onClick={() => removeUser(user.id)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Configure notification settings, stock thresholds, and default views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch id="push-notifications" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                  <Input id="low-stock-threshold" type="number" placeholder="Enter threshold value" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default View</Label>
                  <Select>
                    <SelectTrigger id="default-view">
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data-backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Data Backup
              </CardTitle>
              <CardDescription>Configure manual and scheduled backups using Google Cloud</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Daily Backup</Label>
                  <Switch id="auto-backup" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-time">Backup Time</Label>
                  <Input id="backup-time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Retention Period (days)</Label>
                  <Input id="retention-period" type="number" placeholder="Enter number of days" />
                </div>
                <Button>Perform Manual Backup Now</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Backup Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ai-settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Settings
              </CardTitle>
              <CardDescription>Toggle AI-powered features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="anomaly-detection">Anomaly Detection</Label>
                  <Switch id="anomaly-detection" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="demand-forecasting">Demand Forecasting</Label>
                  <Switch id="demand-forecasting" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smart-reordering">Smart Reordering</Label>
                  <Switch id="smart-reordering" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="chatbot-assistant">Chatbot Assistant</Label>
                  <Switch id="chatbot-assistant" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select>
                    <SelectTrigger id="ai-model">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save AI Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
      </main>
      </div>
      </Sidebar>

  )
}
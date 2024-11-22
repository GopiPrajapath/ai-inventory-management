
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import { Info, Shield, FileText } from 'lucide-react'

export default function About() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About Our Company</h1>

      <Tabs defaultValue="about-us" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about-us">About Us</TabsTrigger>
          <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms-conditions">Terms and Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="about-us">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" />
                About Us
              </CardTitle>
              <CardDescription>Our mission, vision, and team information</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                <p className="mb-4">
                  At InventoryPro, our mission is to empower businesses of all sizes with cutting-edge inventory management solutions. We strive to simplify complex inventory processes, enhance efficiency, and drive growth for our clients through innovative technology and exceptional service.
                </p>

                <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
                <p className="mb-4">
                  We envision a world where businesses can seamlessly manage their inventory, making informed decisions that lead to sustainable growth and success. Our goal is to be the global leader in inventory management solutions, known for our reliability, innovation, and customer-centric approach.
                </p>

                <h2 className="text-xl font-semibold mb-4">Our Team</h2>
                <p className="mb-4">
                  InventoryPro is powered by a diverse team of passionate professionals, each bringing unique expertise to the table:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>John Doe - CEO and Co-founder</li>
                  <li>Jane Smith - CTO and Co-founder</li>
                  <li>Mike Johnson - Head of Product Development</li>
                  <li>Sarah Brown - Director of Customer Success</li>
                  <li>David Lee - Lead Software Engineer</li>
                  <li>Emily Chen - UX/UI Designer</li>
                </ul>
                <p>
                  Together, we're committed to delivering exceptional inventory management solutions and support to businesses worldwide.
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy-policy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy Policy
              </CardTitle>
              <CardDescription>Our data protection and privacy practices</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, company information, and inventory data.
                </p>

                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
                </p>

                <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                </p>

                <h2 className="text-xl font-semibold mb-4">4. Your Rights</h2>
                <p className="mb-4">
                  You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.
                </p>

                <h2 className="text-xl font-semibold mb-4">5. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                </p>

                <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy, please contact us at privacy..inventorypro.com.
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms-conditions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Terms and Conditions
              </CardTitle>
              <CardDescription>User agreement details</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing or using InventoryPro's services, you agree to be bound by these Terms and Conditions.
                </p>

                <h2 className="text-xl font-semibold mb-4">2. Use of Services</h2>
                <p className="mb-4">
                  You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.
                </p>

                <h2 className="text-xl font-semibold mb-4">3. Intellectual Property</h2>
                <p className="mb-4">
                  All content, features, and functionality of our services are owned by InventoryPro and are protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h2 className="text-xl font-semibold mb-4">4. Limitation of Liability</h2>
                <p className="mb-4">
                  InventoryPro shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                </p>

                <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>

                <h2 className="text-xl font-semibold mb-4">6. Governing Law</h2>
                <p className="mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>

                <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. Your continued use of our services after any changes constitute your acceptance of the new Terms.
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
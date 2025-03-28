"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid verification token');
        setVerifying(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/auth/verify?token=${token}`);
        setSuccess(response.data.message || 'Email verified successfully');
        setVerifying(false);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to verify email');
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            {verifying ? 'Verifying Email' : (success ? <CheckCircle className="mr-2 h-5 w-5 text-green-500" /> : <XCircle className="mr-2 h-5 w-5 text-red-500" />)}
            {verifying ? 'Verifying Email' : (success ? 'Email Verified' : 'Verification Failed')}
          </CardTitle>
          <CardDescription>
            {verifying ? 'Please wait while we verify your email address' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verifying && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {!verifying && (
            <Button className="w-full" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

'use client';

import { Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ApiKeyCard() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Mock API key fetch - replace with actual API call
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // Mock implementation - replace with actual API call
        // const response = await fetch('/api/account/api-key');
        // const data = await response.json();
        // setApiKey(data.apiKey);
        
        // Mock value for now
        setApiKey('sk-1234abcd5678efgh');
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch API key:', error);
        toast.error('Failed to load API key');
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setIsCopied(true);
      toast.success('API key copied');
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy API key:', error);
      toast.error('Failed to copy API key');
    }
  };

  const displayKey = isVisible ? apiKey : '************';

  if (isLoading) {
    return (
      <Card className="max-w-sm">
        <CardHeader className="flex items-center border-b py-4">
          <CardTitle>API Key</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-sm">
      <CardHeader className="flex items-center border-b py-4">
        <CardTitle>API Key</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm font-mono bg-muted px-2 py-1 rounded">
            {displayKey}
          </code>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleVisibility}
            className="flex-1"
          >
            {isVisible ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            disabled={isCopied}
            className="flex-1"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
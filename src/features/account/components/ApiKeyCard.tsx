'use client';

import { Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useEffect, useState, useRef, FC } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Props = {
  apiKey?: string;
};

export const ApiKeyCard: FC<Props> = ({ apiKey }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!apiKey) return;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setIsCopied(true);
      toast.success('API key copied');

      // Clear previous timeout if exists
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set new timeout and store ref
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy API key:', error);
      toast.error('Failed to copy API key');
    }
  };

  const displayKey = isVisible ? apiKey : 'chronos_************';

  return (
    <Card className="max-w-sm pt-0">
      <CardHeader className="flex items-center border-b py-4">
        <CardTitle>API Key</CardTitle>
        <CardAction className="ml-auto">
          <ButtonGroup>
            <Button variant="outline" size="sm" onClick={toggleVisibility} className="w-24">
              {isVisible ? (
                <>
                  <EyeOff className="h-4 w-4" /> Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" /> Show
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={isCopied}
              className="w-24"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy
                </>
              )}
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Input value={displayKey} readOnly />
      </CardContent>
    </Card>
  );
};

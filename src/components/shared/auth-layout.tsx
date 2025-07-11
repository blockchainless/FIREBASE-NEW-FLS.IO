import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="w-full max-w-sm animate-fade-in">
      <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue flex flex-col h-[920px]">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
            {children}
        </CardContent>
      </Card>
    </div>
  );
}

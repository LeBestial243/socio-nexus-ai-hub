
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface GradientCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  gradient?: "blue-purple" | "purple" | "none";
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  description,
  icon,
  className,
  gradient = "none",
  children,
  footer
}) => {
  const isGradient = gradient !== "none";

  return (
    <Card className={cn(
      "border-0 shadow-sm overflow-hidden",
      isGradient ? "text-white" : "",
      gradient === "blue-purple" && "gradient-blue-purple",
      gradient === "purple" && "gradient-purple",
      className
    )}>
      <CardHeader className={cn(
        "pb-2",
        isGradient ? "border-b border-white/20" : "border-b"
      )}>
        <div className="flex items-center gap-3">
          {icon && <div className={cn(
            "p-2 rounded-md",
            isGradient ? "bg-white/20" : "bg-primary/10"
          )}>{icon}</div>}
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {description && (
              <CardDescription className={cn(
                isGradient ? "text-white/80" : "text-muted-foreground"
              )}>
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className={cn(
          "flex justify-between pt-2",
          isGradient ? "border-t border-white/20" : "border-t"
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GradientCard;

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconRendererProps extends LucideProps {
  name: string;
}

export function IconRenderer({ name, className = '', size = 24, ...props }: IconRendererProps) {
  // Convert PascalCase (e.g. ArrowRight) to kebab-case (e.g. arrow-right)
  const kebabName = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase() as keyof typeof dynamicIconImports;

  const IconComponent = dynamicIconImports[kebabName]
    ? dynamic(dynamicIconImports[kebabName])
    : null;

  if (!IconComponent) {
    return <span className={`text-sm ${className}`}>{name}</span>;
  }

  return (
    <Suspense fallback={<span className={`w-${size} h-${size} bg-gray-200 rounded-full animate-pulse`} />}>
      <IconComponent className={className} size={size} {...props} />
    </Suspense>
  );
}

export default IconRenderer;
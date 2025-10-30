export interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'blue' | 'gradient' | 'dark' | 'transparent';
  className?: string;
  container?: boolean;
}

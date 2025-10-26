export interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'blue' | 'gradient';
  className?: string;
  container?: boolean;
}

export interface CardProps {
  title?: string;
  image?: string;
  description?: string;
  footer?: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  icon?: string;
  isActive?: boolean;
}

export interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  techStack: string[];
  projectUrl?: string;
  isFeatured?: boolean;
}

export interface TestimonialCardProps {
  clientName: string;
  clientCompany?: string;
  rating: number;
  review: string;
  avatarUrl?: string;
  isApproved?: boolean;
}

export interface IHeroSection extends Document {
    title: string;
    subtitle?: string;
    imageUrl: string;
    buttonLabel?: string;
    buttonLink?: string;
    ctaSecondaryLabel?: string;
    ctaSecondaryLink?: string;
    description?: string;
    isActive: boolean;
    _id:string
  }
export interface IService {
    _id: string;
    name: string;
    description: string;
    type: 'startup' | 'general';
    category?: string;
    icon?: string;
    ctaLabel?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    formFields?: IFormField[];
  }
  
  export interface IFormField {
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date' | 'file';
    options?: string[]; // for select, radio
    required?: boolean;
    placeholder?: string;
  }
  
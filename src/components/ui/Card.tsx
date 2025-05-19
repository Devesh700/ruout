import React from 'react';
// import { cn } from '../../'; // Optional: if you have a className merging utility

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={
        `'bg-white rounded-2xl shadow-md border border-gray-200' ${className}`}
      {...props}
    />
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => {
  return <div className={`'p-4' ${className}`} {...props} />;
};

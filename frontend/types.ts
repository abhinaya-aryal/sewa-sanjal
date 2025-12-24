import React from 'react';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Added for UI
}

export interface Service {
  id: string;
  providerId: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  durationMin: number;
  categoryId?: string;
}

export interface Provider {
  id: string;
  userId: string;
  user: User;
  bio?: string;
  categories: Category[];
  services: Service[];
  isVerified: boolean;
  location: {
    city: string;
    district: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  rating: number; // Computed field for UI
  reviewCount: number; // Computed field for UI
  earnings: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customer?: User;
  providerId: string;
  provider?: Provider;
  serviceId: string;
  service?: Service;
  scheduledAt: string; // ISO Date string
  durationMin: number;
  price: number;
  currency: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  authorId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// UI specific types
export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}
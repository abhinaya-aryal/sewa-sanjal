import { MOCK_PROVIDERS, MOCK_SERVICES, MOCK_BOOKINGS, MOCK_USERS, CATEGORIES, MOCK_REVIEWS } from '../constants';
import { Provider, Booking, BookingStatus, User, Service, Review } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simple in-memory storage for favorites to simulate session persistence
const favorites = new Set<string>();

export const MockService = {
  getProviders: async (): Promise<Provider[]> => {
    await delay(500);
    return MOCK_PROVIDERS;
  },

  getProviderById: async (id: string): Promise<Provider | undefined> => {
    await delay(300);
    return MOCK_PROVIDERS.find(p => p.id === id);
  },

  getCategories: async () => {
    await delay(200);
    return CATEGORIES;
  },

  getBookingsForUser: async (userId: string, role: 'CUSTOMER' | 'PROVIDER'): Promise<Booking[]> => {
    await delay(600);
    if (role === 'CUSTOMER') {
      return MOCK_BOOKINGS.filter(b => b.customerId === userId);
    } else {
      // Find provider ID linked to user
      const provider = MOCK_PROVIDERS.find(p => p.userId === userId);
      if (!provider) return [];
      return MOCK_BOOKINGS.filter(b => b.providerId === provider.id);
    }
  },

  createBooking: async (booking: Partial<Booking>): Promise<Booking> => {
    await delay(800);
    const newBooking: Booking = {
      id: `b${Math.random().toString(36).substr(2, 9)}`,
      customerId: booking.customerId!,
      providerId: booking.providerId!,
      serviceId: booking.serviceId!,
      scheduledAt: booking.scheduledAt!,
      durationMin: booking.durationMin || 60,
      price: booking.price || 0,
      currency: 'NPR',
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString(),
      service: MOCK_SERVICES.find(s => s.id === booking.serviceId),
      provider: MOCK_PROVIDERS.find(p => p.id === booking.providerId),
      customer: MOCK_USERS.find(u => u.id === booking.customerId)
    };
    return newBooking;
  },

  updateBookingStatus: async (bookingId: string, status: BookingStatus): Promise<void> => {
    await delay(400);
    console.log(`Booking ${bookingId} updated to ${status}`);
  },

  login: async (role: 'CUSTOMER' | 'PROVIDER'): Promise<User> => {
    await delay(600);
    if (role === 'CUSTOMER') return MOCK_USERS[0];
    return MOCK_USERS[1]; // Sita Gurung (Provider)
  },

  // New Features
  getReviewsForProvider: async (providerId: string): Promise<Review[]> => {
    await delay(400);
    // In a real app we'd filter by providerId via bookings, for mock we just return random subset + relevant ones
    // Simulating that reviews belong to the provider
    if (providerId === 'p1') return MOCK_REVIEWS;
    return [MOCK_REVIEWS[1]];
  },

  addReview: async (review: Partial<Review>): Promise<Review> => {
    await delay(500);
    return {
      id: `r${Math.random()}`,
      bookingId: review.bookingId!,
      authorId: review.authorId!,
      authorName: review.authorName!,
      rating: review.rating!,
      comment: review.comment!,
      createdAt: new Date().toISOString()
    };
  },

  toggleFavorite: async (providerId: string): Promise<boolean> => {
    await delay(100);
    if (favorites.has(providerId)) {
      favorites.delete(providerId);
      return false;
    } else {
      favorites.add(providerId);
      return true;
    }
  },

  isFavorite: (providerId: string): boolean => {
    return favorites.has(providerId);
  },

  getProviderServices: async (providerId: string): Promise<Service[]> => {
    await delay(300);
    return MOCK_SERVICES.filter(s => s.providerId === providerId);
  }
};
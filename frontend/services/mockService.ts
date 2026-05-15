import {
  MOCK_PROVIDERS as INITIAL_PROVIDERS,
  MOCK_SERVICES as INITIAL_SERVICES,
  MOCK_BOOKINGS as INITIAL_BOOKINGS,
  MOCK_USERS as INITIAL_USERS,
  CATEGORIES,
  MOCK_REVIEWS as INITIAL_REVIEWS,
} from "../constants";
import {
  Provider,
  Booking,
  BookingStatus,
  User,
  Service,
  Review,
  Role,
} from "../types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory storage for the session
let users = [...INITIAL_USERS];
let providers = [...INITIAL_PROVIDERS];
let bookings = [...INITIAL_BOOKINGS];
let reviews = [...INITIAL_REVIEWS];
let services = [...INITIAL_SERVICES];
const favorites = new Set<string>();

export const MockService = {
  getProviders: async (): Promise<Provider[]> => {
    await delay(500);
    return providers;
  },

  getProviderById: async (id: string): Promise<Provider | undefined> => {
    await delay(300);
    return providers.find((p) => p.id === id);
  },

  getCategories: async () => {
    await delay(200);
    return CATEGORIES;
  },

  getBookingsForUser: async (
    userId: string,
    role: "CUSTOMER" | "PROVIDER",
  ): Promise<Booking[]> => {
    await delay(600);
    if (role === "CUSTOMER") {
      return bookings.filter((b) => b.customerId === userId);
    } else {
      // Find provider ID linked to user
      const provider = providers.find((p) => p.userId === userId);
      if (!provider) return [];
      return bookings.filter((b) => b.providerId === provider.id);
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
      currency: "NPR",
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString(),
      service: services.find((s) => s.id === booking.serviceId),
      provider: providers.find((p) => p.id === booking.providerId),
      customer: users.find((u) => u.id === booking.customerId),
    };
    bookings.push(newBooking);
    return newBooking;
  },

  updateBookingStatus: async (
    bookingId: string,
    status: BookingStatus,
  ): Promise<void> => {
    await delay(400);
    const index = bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], status };
    }
    console.log(`Booking ${bookingId} updated to ${status}`);
  },

  // Auth Methods
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    // Simple mock auth - checks if email exists. In a real app, verify password.
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  },

  register: async (
    name: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<User> => {
    await delay(1000);

    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) {
      throw new Error("Email already is use");
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    };

    users.push(newUser);

    // If registering as provider, create a provider profile stub
    if (role === Role.PROVIDER) {
      const newProvider: Provider = {
        id: `p${Date.now()}`,
        userId: newUser.id,
        user: newUser,
        bio: "New service provider.",
        categories: [CATEGORIES[0]], // Default to first category until they edit profile
        services: [],
        isVerified: false,
        location: {
          city: "Kathmandu",
          district: "Kathmandu",
          address: "Update your address",
        },
        rating: 0,
        reviewCount: 0,
        earnings: 0,
      };
      providers.push(newProvider);
    }

    return newUser;
  },

  // New Features
  getReviewsForProvider: async (providerId: string): Promise<Review[]> => {
    await delay(400);
    if (providerId === "p1") return reviews;
    return reviews.filter((r) => Math.random() > 0.5); // Random subset for others
  },

  addReview: async (review: Partial<Review>): Promise<Review> => {
    await delay(500);
    const newReview = {
      id: `r${Math.random()}`,
      bookingId: review.bookingId!,
      authorId: review.authorId!,
      authorName: review.authorName!,
      rating: review.rating!,
      comment: review.comment!,
      createdAt: new Date().toISOString(),
    };
    reviews.push(newReview);
    return newReview;
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
    return services.filter((s) => s.providerId === providerId);
  },

  addService: async (service: Partial<Service>): Promise<Service> => {
    await delay(600);
    const newService: Service = {
      id: `s${Date.now()}`,
      providerId: service.providerId!,
      title: service.title!,
      description: service.description || "",
      price: service.price || 0,
      currency: "NPR",
      durationMin: service.durationMin || 60,
      categoryId: service.categoryId,
    };
    services.push(newService);
    return newService;
  },
};


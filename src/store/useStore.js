import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const user = (set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUserProfile: (updatedData) => set(state => ({
    user: { ...state.user, ...updatedData }
  })),
  updateUserAddress: (updatedAddress) => set(state => ({
    user: { 
      ...state.user, 
      address: { ...state.user.address, ...updatedAddress } 
    }
  })),
});

const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      user: null,
      isAuthenticated: false,
      searchTerm: '',
      filters: {
        category: null,
        priceRange: { min: 0, max: 50000 },
        rating: null,
      },
      
      // Cart actions
      addToCart: (product) => 
        set((state) => {
          const existingItem = state.cart.find(item => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter(item => item.id !== productId)
        })),
      
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map(item => 
            item.id === productId 
              ? { ...item, quantity } 
              : item
          )
        })),
      
      clearCart: () => set({ cart: [] }),
      
      // Auth actions
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // User profile actions
      updateUserAddress: (addressData) => 
        set((state) => ({
          user: {
            ...state.user,
            address: addressData
          }
        })),
      
      deleteUserAddress: () => 
        set((state) => ({
          user: {
            ...state.user,
            address: null
          }
        })),
        
      // Search actions
      setSearchTerm: (term) => set({ searchTerm: term }),
      clearSearch: () => set({ searchTerm: '' }),
      
      // Filter actions
      setFilter: (filterType, value) => 
        set((state) => ({
          filters: {
            ...state.filters,
            [filterType]: value
          }
        })),
      
      clearFilters: () => set({
        filters: {
          categories: [],
          priceRange: { min: 0, max: 50000 },
          rating: null,
        }
      }),
      ...user(set),
    }),
    {
      name: 'bagstopia-storage',
    }
  )
);

export default useStore;
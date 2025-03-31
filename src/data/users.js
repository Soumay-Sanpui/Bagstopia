// This is just mock data for development
// In a real application, users would be stored in a database
// and passwords would be properly hashed
const users = [
  {
    id: 1,
    username: "demo_user",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    firstName: "Demo",
    lastName: "User",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    orders: []
  }
];

export default users; 
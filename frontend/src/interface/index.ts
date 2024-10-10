export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string; // Use Date if you'd like to work with Date objects
    updatedAt: string;
    UserProfile?: UserProfile | null; // Optional, can be null
}

interface UserProfile {
    // Define the fields that belong to UserProfile if any
    bio?: string;  // Example field
    avatarUrl?: string;  // Example field
}

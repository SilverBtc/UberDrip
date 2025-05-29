export interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export const categories: Category[] = [
    {
        id: "hoodies",
        name: "Hoodies & Sweatshirts",
        icon: "🔥",
        description: "Cozy and trendy",
    },
    {
        id: "jackets",
        name: "Jackets & Outerwear",
        icon: "🧥",
        description: "Stay warm in style",
    },
    {
        id: "shirts",
        name: "T-Shirts & Tops",
        icon: "👕",
        description: "Essential basics",
    },
    {
        id: "pants",
        name: "Pants & Bottoms",
        icon: "👖",
        description: "Complete your look",
    },
    {
        id: "sneakers",
        name: "Sneakers & Shoes",
        icon: "👟",
        description: "Step up your game",
    },
    {
        id: "accessories",
        name: "Accessories",
        icon: "🎒",
        description: "Finishing touches",
    },
    {
        id: "luxury",
        name: "Luxury & Designer",
        icon: "💎",
        description: "Premium collections",
    },
    {
        id: "streetwear",
        name: "Streetwear",
        icon: "🏙️",
        description: "Urban style",
    },
    {
        id: "activewear",
        name: "Activewear",
        icon: "🏃",
        description: "Sports & fitness",
    },
];

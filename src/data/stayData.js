export const stayData = [
  {
    id: 1,
    name: "Blue Horizon Villa",
    location: "Lonavala, Maharashtra",
    price: 4500,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Pool", "WiFi", "AC", "Kitchen", "Free Parking"],
    type: "Entire Villa",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    bathrooms: 4,
    description: "Experience luxury at its finest in our Blue Horizon Villa. Nestled in the lush hills of Lonavala, this stunning villa offers panoramic views, a private infinity pool, and modern amenities that blend perfectly with nature. Ideal for families and large groups looking for a peaceful getaway.",
    amenities: [
      { name: "Private Pool", icon: "Waves" },
      { name: "Free WiFi", icon: "Wifi" },
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Fully Equipped Kitchen", icon: "Utensils" },
      { name: "Smart TV", icon: "Tv" },
      { name: "Garden View", icon: "Trees" },
      { name: "BBQ Grill", icon: "Flame" }
    ],
    nearby: ["Tiger Point (2km)", "Bhushi Dam (5km)", "Lohagad Fort (12km)"]
  },
  {
    id: 2,
    name: "Azure Mountain Cabin",
    location: "Matheran, Maharashtra",
    price: 3200,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1449156001477-059902646ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Mountain View", "WiFi", "Bonfire", "Pet Friendly"],
    type: "Rustic Cabin",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    description: "Escape the city buzz in our cozy mountain cabin. Azure Mountain Cabin is located in the heart of Matheran's forest, offering a unique opportunity to reconnect with nature. Wake up to the sound of birds and enjoy your morning coffee with a breathtaking view of the Sahyadri mountains.",
    amenities: [
      { name: "Panoramic View", icon: "Mountain" },
      { name: "Free WiFi", icon: "Wifi" },
      { name: "Outdoor Fireplace", icon: "Flame" },
      { name: "Pet Friendly", icon: "PawPrint" },
      { name: "Balcony", icon: "Layout" },
      { name: "Dedicated Workspace", icon: "Laptop" }
    ],
    nearby: ["Panorama Point (1km)", "Echo Point (3km)", "Charlotte Lake (2km)"]
  },
  {
    id: 3,
    name: "Sapphire Beach Resort",
    location: "Alibaug, Maharashtra",
    price: 6000,
    rating: 4.9,
    reviews: 215,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Beachfront", "Breakfast Inc.", "Spa", "Kids Play Area"],
    type: "Luxury Resort",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    description: "Our Sapphire Beach Resort is a seaside sanctuary where the waves are your constant companion. Located directly on the silver sands of Alibaug, our resort offers luxurious suites, a full-service spa, and gourmet dining. Perfect for couples seeking a romantic and refreshing getaway.",
    amenities: [
      { name: "Beach Access", icon: "Waves" },
      { name: "Spa & Wellness", icon: "Sprout" },
      { name: "Complimentary Breakfast", icon: "Coffee" },
      { name: "Bar & Lounge", icon: "Beer" },
      { name: "24/7 Concierge", icon: "Clock" },
      { name: "Gym", icon: "Dumbbell" }
    ],
    nearby: ["Varsoli Beach (0km)", "Kolaba Fort (4km)", "Kihim Beach (10km)"]
  },
  {
    id: 4,
    name: "Cloud Nine Homestay",
    location: "Mahabaleshwar, Maharashtra",
    price: 2500,
    rating: 4.7,
    reviews: 65,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Farm-to-table", "Village Experience", "Guided Treks"],
    type: "Homestay",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    description: "Experience the warmth of Maharashtrian hospitality at Cloud Nine Homestay. Surrounded by strawberry farms, this homestay offers a true village experience with home-cooked meals and personalized service. Explore the local culture and terrains with our guided trekking tours.",
    amenities: [
      { name: "Home Cooked Meals", icon: "ChefHat" },
      { name: "Village Tours", icon: "Map" },
      { name: "Parking Area", icon: "Car" },
      { name: "Veranda", icon: "Tent" },
      { name: "First Aid Kit", icon: "Shield" },
      { name: "Heater", icon: "Thermometer" }
    ],
    nearby: ["Mapro Garden (3km)", "Arthur's Seat (8km)", "Panchgani (15km)"]
  }
];

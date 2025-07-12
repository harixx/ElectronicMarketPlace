#!/usr/bin/env tsx

/**
 * Database seeding script for ELORA e-commerce platform
 * This script populates the database with sample products and reviews
 */

import { db } from "../server/db";
import { products, reviews } from "@shared/schema";

const sampleProducts = [
  {
    name: "Satin Night Dress - Sage",
    description: "Luxurious satin slip dress with adjustable straps and lace trim. Perfect for elegant comfort.",
    price: "8500.00",
    salePrice: "6800.00",
    category: "nightdress",
    collection: "new-arrivals",
    fabric: "Premium Satin",
    careInstructions: "Hand wash cold, hang dry, cool iron if needed",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage", "Blush", "Ivory"],
    images: [
      "/attached_assets/image_1752309158083.png",
      "/attached_assets/image_1752309298739.png"
    ],
    stockQuantity: 4,
    featured: true,
    averageRating: "4.9",
    reviewCount: 67
  },
  {
    name: "Silk Pajama Set - Blush Pink",
    description: "Premium Western-style silk pajama set with button-down top and matching shorts. Modern comfort meets timeless elegance.",
    price: "15500.00",
    salePrice: "12400.00",
    category: "sets",
    collection: "silk-collection",
    fabric: "100% Mulberry Silk",
    careInstructions: "Hand wash cold, hang dry, iron on low heat",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush Pink", "Champagne", "Ivory"],
    images: [
      "/attached_assets/image_1752309298739.png",
      "/attached_assets/image_1752309315972.png"
    ],
    stockQuantity: 2,
    featured: true,
    averageRating: "4.8",
    reviewCount: 43
  },
  {
    name: "Cotton Luxury Robe",
    description: "Oversized cotton terry robe with plush texture and spa-style comfort. Features deep pockets and matching belt.",
    price: "9200.00",
    salePrice: null,
    category: "robes",
    collection: "cotton-essentials",
    fabric: "100% Turkish Cotton",
    careInstructions: "Machine wash warm, tumble dry medium",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Stone", "Lavender"],
    images: [
      "/attached_assets/image_1752309315972.png",
      "/attached_assets/image_1752309298739.png"
    ],
    stockQuantity: 8,
    featured: true,
    averageRating: "4.6",
    reviewCount: 32
  },
  {
    name: "Linen Loungewear Set - Stone",
    description: "Relaxed-fit linen set with wide-leg pants and oversized shirt. Perfect for comfortable lounging at home.",
    price: "11200.00",
    salePrice: null,
    category: "loungewear",
    collection: "linen-collection",
    fabric: "100% European Linen",
    careInstructions: "Machine wash cold, tumble dry low, iron if needed",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Stone", "Natural", "Sage"],
    images: [
      "/attached_assets/image_1752309158083.png",
      "/attached_assets/image_1752309315972.png"
    ],
    stockQuantity: 6,
    featured: true,
    averageRating: "4.7",
    reviewCount: 28
  }
];

const sampleReviews = [
  {
    productId: 1,
    customerName: "Ayesha S.",
    rating: 5,
    title: "Absolutely gorgeous!",
    comment: "The silk pajama set is absolutely gorgeous! The quality is exceptional and it feels so luxurious. Perfect fit and the color is exactly as shown. Will definitely order more!",
    verified: true
  },
  {
    productId: 2,
    customerName: "Fatima K.",
    rating: 5,
    title: "Love the comfort!",
    comment: "Love the linen loungewear! So comfortable and breathable. The fabric is high quality and washes beautifully. Great customer service too. Highly recommend!",
    verified: true
  },
  {
    productId: 3,
    customerName: "Maria R.",
    rating: 4,
    title: "Beautiful dress",
    comment: "Beautiful cotton nightdress! The lace detail is delicate and feminine. Fast delivery and excellent packaging. Only wish there were more color options.",
    verified: true
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...');
    
    // Insert products
    console.log('📦 Adding sample products...');
    const insertedProducts = await db.insert(products).values(sampleProducts).returning();
    console.log(`✅ Added ${insertedProducts.length} products`);
    
    // Insert reviews
    console.log('⭐ Adding sample reviews...');
    const insertedReviews = await db.insert(reviews).values(sampleReviews).returning();
    console.log(`✅ Added ${insertedReviews.length} reviews`);
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();
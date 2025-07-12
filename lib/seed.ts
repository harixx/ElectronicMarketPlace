import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  // Create sample products
  const products = [
    {
      name: 'Luxury Silk Pajama Set',
      description: 'Indulge in ultimate comfort with our premium mulberry silk pajama set. Crafted from 100% Grade A mulberry silk, this luxurious set features a classic button-down top with elegant piping details and matching wide-leg pants. Perfect for those who appreciate the finest things in life.',
      price: 15999,
      salePrice: 12799,
      category: 'silk',
      collection: 'silk-collection',
      fabric: 'Mulberry Silk',
      careInstructions: 'Hand wash in cold water, hang dry, do not bleach',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Champagne', 'Midnight Blue', 'Rose Gold'],
      images: ['https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop'],
      stockQuantity: 25,
      featured: true,
      averageRating: 4.8,
      reviewCount: 124,
    },
    {
      name: 'Linen Lounge Dress',
      description: 'Embrace effortless elegance with our breathable European linen lounge dress. This midi-length dress features a relaxed fit, three-quarter sleeves, and a flattering V-neck. Perfect for lounging at home or casual outings.',
      price: 8999,
      category: 'linen',
      collection: 'linen-collection',
      fabric: 'European Linen',
      careInstructions: 'Machine wash cold, tumble dry low',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Natural', 'Sage Green', 'Dusty Pink'],
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop'],
      stockQuantity: 40,
      featured: true,
      averageRating: 4.6,
      reviewCount: 89,
    },
    {
      name: 'Cotton Jersey Nightgown',
      description: 'Sleep in comfort with our soft cotton jersey nightgown. Made from premium organic cotton, this breathable nightgown features a scoop neckline and falls to mid-thigh for optimal comfort.',
      price: 4999,
      category: 'cotton',
      collection: 'cotton-essentials',
      fabric: 'Organic Cotton',
      careInstructions: 'Machine wash warm, tumble dry low',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Heather Gray', 'Soft Pink'],
      images: ['https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop'],
      stockQuantity: 60,
      featured: true,
      averageRating: 4.4,
      reviewCount: 156,
    },
    {
      name: 'Silk Robe',
      description: 'Wrap yourself in luxury with our elegant silk robe. This full-length robe features a self-tie belt, deep pockets, and three-quarter sleeves. Perfect for your morning routine or evening relaxation.',
      price: 12999,
      salePrice: 9999,
      category: 'silk',
      collection: 'silk-collection',
      fabric: 'Mulberry Silk',
      careInstructions: 'Hand wash in cold water, hang dry',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Ivory', 'Blush', 'Charcoal'],
      images: ['https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop'],
      stockQuantity: 30,
      featured: false,
      averageRating: 4.7,
      reviewCount: 78,
    },
    {
      name: 'Linen Pajama Set',
      description: 'Stay cool and comfortable with our breathable linen pajama set. Features a relaxed-fit top with button closure and matching drawstring pants. Perfect for warm nights.',
      price: 9999,
      category: 'linen',
      collection: 'linen-collection',
      fabric: 'European Linen',
      careInstructions: 'Machine wash cold, air dry',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Oatmeal', 'Sage', 'Lavender'],
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop'],
      stockQuantity: 45,
      featured: false,
      averageRating: 4.5,
      reviewCount: 92,
    },
    {
      name: 'Cotton Lounge Set',
      description: 'Relax in style with our cotton lounge set. This two-piece set includes a comfortable pullover top and matching jogger pants. Made from soft, breathable cotton blend.',
      price: 6999,
      category: 'cotton',
      collection: 'cotton-essentials',
      fabric: 'Cotton Blend',
      careInstructions: 'Machine wash warm, tumble dry low',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Light Gray', 'Dusty Rose'],
      images: ['https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop'],
      stockQuantity: 55,
      featured: false,
      averageRating: 4.3,
      reviewCount: 134,
    },
    {
      name: 'Silk Camisole & Shorts Set',
      description: 'Perfect for warm nights, this delicate silk camisole and shorts set combines elegance with comfort. Features adjustable straps and lace trim details.',
      price: 11999,
      category: 'silk',
      collection: 'new-arrivals',
      fabric: 'Mulberry Silk',
      careInstructions: 'Hand wash cold, lay flat to dry',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pearl', 'Burgundy', 'Navy'],
      images: ['https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop'],
      stockQuantity: 20,
      featured: true,
      averageRating: 4.6,
      reviewCount: 45,
    },
    {
      name: 'Linen Sleep Shirt',
      description: 'Oversized comfort meets effortless style in our linen sleep shirt. Features a relaxed fit, button-front design, and chest pocket. Perfect for lounging or sleep.',
      price: 5999,
      category: 'linen',
      collection: 'new-arrivals',
      fabric: 'European Linen',
      careInstructions: 'Machine wash cold, air dry',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Khaki', 'Soft Blue'],
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop'],
      stockQuantity: 35,
      featured: false,
      averageRating: 4.2,
      reviewCount: 67,
    },
  ];

  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
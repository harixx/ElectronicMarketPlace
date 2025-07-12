import { 
  Product, 
  InsertProduct, 
  Review, 
  InsertReview, 
  CartItem, 
  InsertCartItem,
  WishlistItem,
  InsertWishlistItem,
  Order,
  InsertOrder,
  OrderItem,
  InsertOrderItem
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(filters?: {
    category?: string;
    collection?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Reviews
  getProductReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Wishlist
  getWishlistItems(sessionId: string): Promise<(WishlistItem & { product: Product })[]>;
  addToWishlist(item: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(sessionId: string, productId: number): Promise<boolean>;
  
  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product> = new Map();
  private reviews: Map<number, Review> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private wishlistItems: Map<number, WishlistItem> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  
  private currentProductId = 1;
  private currentReviewId = 1;
  private currentCartItemId = 1;
  private currentWishlistItemId = 1;
  private currentOrderId = 1;
  private currentOrderItemId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed products with modern nightwear categories
    const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
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
      },
      {
        name: "Velvet Kimono Robe - Lavender",
        description: "Luxurious velvet kimono-style robe with wide sleeves and matching belt. Perfect for special occasions.",
        price: "13800.00",
        salePrice: "11040.00",
        category: "robes",
        collection: "sale",
        fabric: "Crushed Velvet",
        careInstructions: "Dry clean only or gentle hand wash",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Lavender", "Deep Purple", "Burgundy"],
        images: [
          "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
        ],
        stockQuantity: 5,
        featured: false,
        averageRating: "4.5",
        reviewCount: 21
      },
      {
        name: "Bamboo Modal Night Dress",
        description: "Ultra-soft bamboo modal night dress with empire waist and flutter sleeves. Eco-friendly and breathable.",
        price: "7200.00",
        salePrice: null,
        category: "nightdress",
        collection: "cotton-essentials",
        fabric: "Bamboo Modal Blend",
        careInstructions: "Machine wash cold, tumble dry low",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Sage", "Cream", "Dusty Pink"],
        images: [
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
        ],
        stockQuantity: 15,
        featured: false,
        averageRating: "4.4",
        reviewCount: 38
      },
      {
        name: "Linen Shorts Pajama Set",
        description: "Relaxed linen shorts set with button-down shirt. Perfect for warm weather lounging.",
        price: "8900.00",
        salePrice: null,
        category: "sets",
        collection: "new-arrivals",
        fabric: "100% European Linen",
        careInstructions: "Machine wash cold, air dry naturally",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Natural", "Sage", "Stone"],
        images: [
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
        ],
        stockQuantity: 9,
        featured: false,
        averageRating: "4.6",
        reviewCount: 42
      }
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, {
        ...product,
        id,
        createdAt: new Date()
      });
    });

    // Seed reviews
    const sampleReviews: Omit<Review, 'id' | 'createdAt'>[] = [
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

    sampleReviews.forEach(review => {
      const id = this.currentReviewId++;
      this.reviews.set(id, {
        ...review,
        id,
        createdAt: new Date()
      });
    });
  }

  async getProducts(filters?: {
    category?: string;
    collection?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Promise<Product[]> {
    let products = Array.from(this.products.values());

    if (filters) {
      if (filters.category) {
        products = products.filter(p => p.category === filters.category);
      }
      if (filters.collection) {
        products = products.filter(p => p.collection === filters.collection);
      }
      if (filters.minPrice) {
        products = products.filter(p => parseFloat(p.price) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        products = products.filter(p => parseFloat(p.price) <= filters.maxPrice!);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.fabric.toLowerCase().includes(searchLower)
        );
      }
    }

    return products.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = {
      ...product,
      id,
      createdAt: new Date(),
      averageRating: "0",
      reviewCount: 0,
      salePrice: product.salePrice || null,
      careInstructions: product.careInstructions || null,
      stockQuantity: product.stockQuantity || 0,
      featured: product.featured || null
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async getProductReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(r => r.productId === productId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const newReview: Review = {
      ...review,
      id,
      createdAt: new Date(),
      title: review.title || null,
      verified: review.verified || null
    };
    this.reviews.set(id, newReview);
    
    // Update product rating
    const product = this.products.get(review.productId);
    if (product) {
      const reviews = await this.getProductReviews(review.productId);
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      product.averageRating = avgRating.toFixed(1);
      product.reviewCount = reviews.length;
    }
    
    return newReview;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) throw new Error("Product not found");
      return { ...item, product };
    });
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => 
        cartItem.sessionId === item.sessionId &&
        cartItem.productId === item.productId &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );

    if (existingItem) {
      existingItem.quantity += (item.quantity || 1);
      return existingItem;
    }

    const id = this.currentCartItemId++;
    const newItem: CartItem = {
      ...item,
      id,
      createdAt: new Date(),
      quantity: item.quantity || 1
    };
    this.cartItems.set(id, newItem);
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
    }
    return item;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
    return true;
  }

  async getWishlistItems(sessionId: string): Promise<(WishlistItem & { product: Product })[]> {
    const items = Array.from(this.wishlistItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) throw new Error("Product not found");
      return { ...item, product };
    });
  }

  async addToWishlist(item: InsertWishlistItem): Promise<WishlistItem> {
    // Check if item already exists
    const existingItem = Array.from(this.wishlistItems.values()).find(
      wishlistItem => 
        wishlistItem.sessionId === item.sessionId &&
        wishlistItem.productId === item.productId
    );

    if (existingItem) {
      return existingItem;
    }

    const id = this.currentWishlistItemId++;
    const newItem: WishlistItem = {
      ...item,
      id,
      createdAt: new Date()
    };
    this.wishlistItems.set(id, newItem);
    return newItem;
  }

  async removeFromWishlist(sessionId: string, productId: number): Promise<boolean> {
    const itemToDelete = Array.from(this.wishlistItems.entries()).find(
      ([_, item]) => item.sessionId === sessionId && item.productId === productId
    );
    
    if (itemToDelete) {
      return this.wishlistItems.delete(itemToDelete[0]);
    }
    return false;
  }

  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const orderId = this.currentOrderId++;
    const newOrder: Order = {
      ...order,
      id: orderId,
      status: "pending",
      createdAt: new Date(),
      postalCode: order.postalCode || null,
      shippingCost: order.shippingCost || "0"
    };
    this.orders.set(orderId, newOrder);

    // Add order items
    items.forEach(item => {
      const orderItemId = this.currentOrderItemId++;
      const orderItem: OrderItem = {
        ...item,
        id: orderItemId,
        orderId
      };
      this.orderItems.set(orderItemId, orderItem);
    });

    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();

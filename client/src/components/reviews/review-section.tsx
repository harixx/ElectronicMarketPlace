import { useState } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Review } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  productId: number;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/products", productId, "reviews"],
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: {
      customerName: string;
      rating: number;
      title?: string;
      comment: string;
    }) => {
      const response = await apiRequest("POST", `/api/products/${productId}/reviews`, reviewData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId] });
      setShowForm(false);
      setCustomerName("");
      setTitle("");
      setComment("");
      setRating(5);
      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    createReviewMutation.mutate({
      customerName: customerName.trim(),
      rating,
      title: title.trim() || undefined,
      comment: comment.trim(),
    });
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-playfair font-bold text-charcoal mb-2">Customer Reviews</h3>
          {reviews.length > 0 ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex text-gold mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(averageRating) ? "fill-current" : "stroke-current"
                      )}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-charcoal">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-stone">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <p className="text-stone">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
        
        <Button onClick={() => setShowForm(!showForm)} className="bg-gold hover:bg-gold/90">
          Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h4 className="text-lg font-semibold">Write Your Review</h4>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Name *</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title">Review Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summary of your review"
                  />
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Rating *</Label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          "w-6 h-6",
                          star <= rating 
                            ? "fill-gold text-gold" 
                            : "stroke-gray-300 text-gray-300"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">Your Review *</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={createReviewMutation.isPending}
                  className="bg-gold hover:bg-gold/90"
                >
                  {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blush rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-charcoal">{review.customerName}</h5>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < review.rating ? "fill-current" : "stroke-current"
                            )}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-stone">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              {review.title && (
                <h6 className="font-medium text-charcoal mb-2">{review.title}</h6>
              )}
              
              <p className="text-stone leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

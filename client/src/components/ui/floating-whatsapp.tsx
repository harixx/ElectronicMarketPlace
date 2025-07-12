import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in ELORA's premium loungewear collection. Can you help me?");
    const phoneNumber = "923001234567"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border p-4 max-w-xs animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal text-sm">ELORA Support</h4>
                <p className="text-xs text-stone">Usually replies instantly</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-charcoal mb-3">
            Hi! 👋 Need help choosing the perfect loungewear? I'm here to assist you!
          </p>
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-sm"
          >
            Start Chat on WhatsApp
          </Button>
        </div>
      )}

      {/* WhatsApp button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
          <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface BookTrekButtonProps {
  trekName: string;
  className?: string;
}
import { whatsappNumber } from "@/lib/data";
export function BookTrekButton({ trekName, className }: BookTrekButtonProps) {
  const handleBookClick = () => {
    const message = `Trek Booking Inquiry

I am interested in booking the following trek:
${trekName}

Please share the available dates and further details.

---
Sent via Miles With Nature Website`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      className={`gap-2 rounded-xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5 ${className}`}
      size="lg"
      onClick={handleBookClick}
    >
      <MessageCircle className="h-5 w-5" />
      Book This Trek
    </Button>
  );
}

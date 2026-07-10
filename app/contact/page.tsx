"use client";

import { useState, useMemo, useEffect } from "react";
import { Phone, MapPin, Send, MessageCircle, Mail } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTrekTitles } from "@/lib/data-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const contactOptions = [
  {
    icon: Phone,
    title: "Call for Enquiry",
    subtitle: "Speak directly with our trekking experts",
    action: "Call Now",
    contact: "+91 98765 43210",
    availability: "Mon - Sat, 9am - 6pm IST",
    href: "tel:+919876543210",
  },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    subtitle: "Get instant replies to your queries",
    action: "Start Chat",
    contact: "WhatsApp Business",
    availability: "24/7 Available",
    href: "https://wa.me/917020212486?text=Hi! I am interested in joining a trek with Miles With Nature. Can you share more details?",
  },
  {
    icon: Send,
    title: "Send Us a Message",
    subtitle: "Detailed inquiries and custom requests",
    action: "Fill Form",
    contact: "Contact Form",
    availability: "Response within 24 hours",
    href: "#contact-form",
  },
];

const officeInfo = {
  address: ["Old Manali Road", "Manali, Himachal Pradesh 175131", "India"],
  email: ["hello@mileswithnature.com", "bookings@mileswithnature.com"],
  phone: "+91 98765 43210",
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [trekSearch, setTrekSearch] = useState("");
  const [dynamicTrekNames, setDynamicTrekNames] = useState<string[]>([]);

  useEffect(() => {
    getTrekTitles()
      .then(setDynamicTrekNames)
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    trek: "",
    subject: "",
    message: "",
  });

  const filteredTreks = useMemo(() => {
    if (!trekSearch) return dynamicTrekNames;
    return dynamicTrekNames.filter((trek) =>
      trek.toLowerCase().includes(trekSearch.toLowerCase()),
    );
  }, [trekSearch, dynamicTrekNames]);

  function handleInputChange(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function formatWhatsAppMessage() {
    const subjectLabels: { [key: string]: string } = {
      booking: "Trek Booking",
      inquiry: "General Inquiry",
      custom: "Custom Trek Request",
      group: "Group Booking",
      feedback: "Feedback",
      partnership: "Partnership",
    };

    const cityLabels: { [key: string]: string } = {
      pune: "Pune",
      mumbai: "Mumbai",
      solapur: "Solapur",
    };

    const trekLabels: { [key: string]: string } = dynamicTrekNames.reduce(
      (acc, trek) => {
        acc[trek.toLowerCase()] = trek;
        return acc;
      },
      {} as { [key: string]: string },
    );

    const message = `New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}${formData.phone ? `\nPhone: ${formData.phone}` : ""}${formData.city ? `\nCity: ${cityLabels[formData.city] || formData.city}` : ""}${formData.trek ? `\nInterested Trek: ${trekLabels[formData.trek] || formData.trek}` : ""}
Subject: ${subjectLabels[formData.subject] || formData.subject}

Message:
${formData.message}

---
Sent via Miles With Nature Contact Form`;

    return encodeURIComponent(message);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const whatsappMessage = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/917020212486?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        trek: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-stone-50 py-32 text-center px-6 sm:py-40">
          <div className="mx-auto max-w-4xl mt-10">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
              Get in Touch
            </span>
            <h1 className="text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Let&apos;s Start Your{" "}
              <em className="italic text-stone-400">Adventure</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-stone-500">
              Ready to explore the mountains? Choose how you&apos;d like to
              connect with our trekking experts and let&apos;s plan your next
              unforgettable journey.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-20 grid gap-5 md:grid-cols-3">
              {contactOptions.map((option) => (
                <div
                  key={option.title}
                  className="group flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-950 hover:bg-zinc-950 hover:shadow-2xl hover:shadow-zinc-950/20 sm:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/10">
                    <option.icon className="h-5 w-5 text-zinc-900 transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 transition-colors duration-500 group-hover:text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500 transition-colors duration-500 group-hover:text-stone-300">
                    {option.subtitle}
                  </p>
                  <div className="mt-5 space-y-1">
                    <p className="text-sm font-medium text-zinc-900 transition-colors duration-500 group-hover:text-white">
                      {option.contact}
                    </p>
                    <p className="text-xs text-stone-400 transition-colors duration-500 group-hover:text-stone-400">
                      {option.availability}
                    </p>
                  </div>
                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl border-stone-200 bg-transparent text-xs font-bold uppercase tracking-[0.1em] transition-all duration-500 group-hover:border-white/20 group-hover:text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href={option.href}>{option.action}</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-2" id="contact-form">
              {/* Contact Form */}
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-light text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                    Send a Message
                  </h2>
                  <p className="mt-2 text-sm text-stone-400">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="John Doe"
                        className="rounded-xl border-stone-200 bg-stone-50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className="rounded-xl border-stone-200 bg-stone-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
                      >
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 98765 43210"
                        className="rounded-xl border-stone-200 bg-stone-50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
                      >
                        City (Optional)
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) =>
                          handleInputChange("city", value)
                        }
                      >
                        <SelectTrigger className="rounded-xl border-stone-200 bg-stone-50">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="solapur">Solapur</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2 flex flex-col">
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                        Interested Trek
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between rounded-xl border-stone-200 bg-stone-50 font-normal hover:bg-white",
                              !formData.trek && "text-muted-foreground",
                            )}
                          >
                            {formData.trek
                              ? dynamicTrekNames.find(
                                  (trek) =>
                                    trek.toLowerCase() === formData.trek,
                                )
                              : "Select a trek"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0" align="start">
                          <Command>
                            <CommandInput
                              placeholder="Search trek..."
                              onValueChange={setTrekSearch}
                            />
                            <CommandEmpty>No trek found.</CommandEmpty>
                            <CommandGroup className="max-h-[300px] overflow-auto">
                              {filteredTreks.map((trek) => (
                                <CommandItem
                                  key={trek}
                                  value={trek}
                                  onSelect={(currentValue) => {
                                    handleInputChange("trek", currentValue);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.trek === trek.toLowerCase()
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {trek}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
                      >
                        Subject *
                      </Label>
                      <Select
                        required
                        value={formData.subject}
                        onValueChange={(value) =>
                          handleInputChange("subject", value)
                        }
                      >
                        <SelectTrigger className="rounded-xl border-stone-200 bg-stone-50">
                          <SelectValue placeholder="How can we help?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Trek Booking</SelectItem>
                          <SelectItem value="inquiry">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="custom">
                            Custom Trek Request
                          </SelectItem>
                          <SelectItem value="group">
                            Group Booking (10+)
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your requirements..."
                      className="min-h-[140px] rounded-xl border-stone-200 bg-stone-50 focus:bg-white resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-zinc-950 py-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-950/20 hover:-translate-y-0.5"
                    disabled={submitted}
                  >
                    {submitted ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> Message Sent
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send via WhatsApp <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Office Info */}
              <div className="flex flex-col justify-center">
                <div className="rounded-3xl bg-stone-50 p-8 sm:p-10 border border-stone-200 lg:p-12">
                  <h3 className="text-3xl font-light text-zinc-900 mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
                    Our Basecamp
                  </h3>

                  <div className="space-y-7">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white">
                        <MapPin className="h-5 w-5 text-zinc-900" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                          Visit Us
                        </p>
                        {officeInfo.address.map((line) => (
                          <p
                            key={line}
                            className="text-sm text-stone-600"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white">
                        <Mail className="h-5 w-5 text-zinc-900" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                          Email Us
                        </p>
                        {officeInfo.email.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="block text-sm text-stone-600 hover:text-zinc-900 transition-colors"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white">
                        <Phone className="h-5 w-5 text-zinc-900" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                          Call Us
                        </p>
                        <a
                          href={`tel:${officeInfo.phone}`}
                          className="block text-sm text-stone-600 hover:text-zinc-900 transition-colors"
                        >
                          {officeInfo.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 overflow-hidden rounded-xl border border-stone-200 bg-white">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27161.42445889246!2d77.16439169999999!3d32.247653200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sOld%20Manali%2C%20Manali%2C%20Himachal%20Pradesh%20175131!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin"
                      width="100%"
                      height="280"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

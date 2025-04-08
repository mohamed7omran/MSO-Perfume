"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Facebook, MessageSquare, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    alert("Your message has been sent successfully! We will contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Contact us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We are happy to answer your inquiries and meet your requests.{" "}
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">
                    mo1234512345ed@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">What's</p>
                  <p className="text-muted-foreground">+201030576522</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    القاهرة، جمهورية مصر العربية
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-6">Follow Us </h2>
            <div className="flex gap-4">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 hover:bg-muted/80"
              >
                <Link
                  href="https://wa.me/+201030576522"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 hover:bg-muted/80"
              >
                <Link
                  href="https://www.instagram.com/omranperfumes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 hover:bg-muted/80"
              >
                <Link
                  href="https://www.facebook.com/share/1AKQYzt5cL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <form
            action="https://formsubmit.co/mo1234512345ed@gmail.com"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_autoresponse"
              value="تم استلام رسالتك، وسنرد عليك قريبًا إن شاء الله."
            />

            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-medium">
                Phone
              </label>
              <Input id="phone" name="phone" placeholder="أدخل رقم هاتفك" />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="اكتب رسالتك هنا"
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        </div>

        {/* Google Map (Optional) */}
        {/* <div className="mt-16 rounded-lg overflow-hidden h-[400px] border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674457217312!2d46.6752!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzAuNyJF!5e0!3m2!1sar!2ssa!4v1616661626045!5m2!1sar!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع عطور عمران"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
}

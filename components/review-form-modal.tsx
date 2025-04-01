"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRatingInput } from "@/components/star-rating-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample product data for the dropdown
const products = [
  { id: 1, name: "عطر تمبتيشن" },
  { id: 2, name: "شانيل N°5" },
  { id: 3, name: "جنتلمان أونلي" },
  { id: 4, name: "دينيم كولكشن" },
  { id: 5, name: "بنتلي مومنتوم" },
  { id: 6, name: "عطر العمران الخاص" },
];

type ReviewFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReviewFormModal({ open, onOpenChange }: ReviewFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    rating: 5,
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleProductChange = (value: string) => {
    setFormData((prev) => ({ ...prev, product: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Submitted review:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          product: "",
          rating: 5,
          review: "",
        });
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">إضافة تقييم</DialogTitle>
          <DialogDescription>
            شاركنا رأيك في منتجاتنا. تقييمك يساعدنا على التحسين المستمر.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium">تم إرسال تقييمك بنجاح!</h3>
            <p className="mt-2 text-muted-foreground">
              شكراً لمشاركة رأيك معنا. نقدر ملاحظاتك.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-medium">
                  الاسم
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك"
                />
              </div>
              {/* <div>
                <label htmlFor="email" className="mb-2 block font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div> */}
            </div>

            <div>
              <label htmlFor="product" className="mb-2 block font-medium">
                المنتج
              </label>
              <Select
                value={formData.product}
                onValueChange={handleProductChange}
                required
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block font-medium">التقييم</label>
              <StarRatingInput
                rating={formData.rating}
                onRatingChange={handleRatingChange}
              />
            </div>

            <div>
              <label htmlFor="review" className="mb-2 block font-medium">
                التقييم
              </label>
              <Textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
                placeholder="اكتب رأيك هنا..."
                rows={4}
              />
            </div>

            <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="mt-3 sm:mt-0 sm:ml-3"
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

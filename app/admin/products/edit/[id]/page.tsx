"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getProductById, updateProduct } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowRight, Upload } from "lucide-react"
import type { Product } from "@/types/product"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    notes: "",
    price: 0,
    discountedPrice: 0,
    offer: "",
    image: "",
    isNew: false,
  })

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const product = await getProductById(id)

        if (!product) {
          setError("المنتج غير موجود")
          return
        }

        setFormData({
          name: product.name,
          description: product.description,
          notes: product.notes,
          price: product.price,
          discountedPrice: product.discountedPrice,
          offer: product.offer,
          image: product.image,
          isNew: product.isNew,
        })

        setImagePreview(product.image)
      } catch (err) {
        setError("حدث خطأ أثناء تحميل بيانات المنتج")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "price" || name === "discountedPrice") {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isNew: checked,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name) {
      setError("يرجى إدخال اسم المنتج")
      return
    }

    if (!imageFile && !formData.image) {
      setError("يرجى اختيار صورة للمنتج")
      return
    }

    if (formData.price <= 0) {
      setError("يرجى إدخال سعر صحيح للمنتج")
      return
    }

    // If discounted price is 0, set it equal to price
    if (formData.discountedPrice <= 0) {
      setFormData({
        ...formData,
        discountedPrice: formData.price,
      })
    }

    try {
      setSaving(true)
      setError(null)

      await updateProduct(id, formData, imageFile)
      router.push("/admin/products")
    } catch (err) {
      setError("حدث خطأ أثناء تحديث المنتج")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2">جاري تحميل بيانات المنتج...</span>
      </div>
    )
  }

  if (error && !formData.name) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
          {error}
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/products")} className="mt-4">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة إلى قائمة المنتجات
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" onClick={() => router.push("/admin/products")} className="ml-2">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة
        </Button>
        <h1 className="text-3xl font-bold">تعديل المنتج</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>معلومات المنتج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم المنتج</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="أدخل اسم المنتج"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المنتج</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="أدخل وصف المنتج"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">المكونات</Label>
                <Input
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="مثال: عود، مسك، فانيليا"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">السعر (ر.س)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    placeholder="أدخل السعر"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountedPrice">السعر بعد الخصم (ر.س)</Label>
                  <Input
                    id="discountedPrice"
                    name="discountedPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.discountedPrice || ""}
                    onChange={handleInputChange}
                    placeholder="أدخل السعر بعد الخصم"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offer">العرض</Label>
                <Input
                  id="offer"
                  name="offer"
                  value={formData.offer}
                  onChange={handleInputChange}
                  placeholder="مثال: اشترِ عبوة واحصل على عبوة أخرى بنصف السعر"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isNew" checked={formData.isNew} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="isNew" className="mr-2">
                  منتج جديد
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>صورة المنتج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 aspect-square w-full max-w-[300px] overflow-hidden rounded-md border-2 border-dashed border-muted bg-muted/20">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="معاينة الصورة"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-muted-foreground">
                      <Upload className="mb-2 h-10 w-10" />
                      <p>اختر صورة للمنتج</p>
                      <p className="text-xs">PNG, JPG, WEBP</p>
                    </div>
                  )}
                </div>

                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  اختر صورة
                </Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>يفضل استخدام صور بأبعاد متساوية (مربعة)</p>
                <p>الحد الأقصى لحجم الصورة: 5 ميجابايت</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <CardFooter className="mt-8 flex justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")} className="ml-2">
            إلغاء
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </CardFooter>
      </form>
    </div>
  )
}


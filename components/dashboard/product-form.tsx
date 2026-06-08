"use client"

import { useState, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, X, ImagePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { createProduct, updateProduct, getOrCreateCategory, getOrCreateBrand } from "@/lib/actions"
import Image from "next/image"

interface Variant {
  name: string
  value: string
  price: string
}

interface ProductFormProps {
  locale: string
  /** If provided, we are editing; otherwise creating */
  product?: {
    id: string
    name: string
    description: string | null
    sku: string | null
    barcode: string | null
    costPrice: number
    sellPrice: number
    stockQty: number
    status: string
    images: string[]
    category: { id: string; name: string } | null
    brand: { id: string; name: string } | null
    variants: { name: string; value: string; additionalPrice: number }[]
  }
}

export function ProductForm({ locale, product }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(product?.name ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [sku, setSku] = useState(product?.sku ?? "")
  const [barcode, setBarcode] = useState(product?.barcode ?? "")
  const [costPrice, setCostPrice] = useState(product?.costPrice?.toString() ?? "")
  const [sellPrice, setSellPrice] = useState(product?.sellPrice?.toString() ?? "")
  const [stockQty, setStockQty] = useState(product?.stockQty?.toString() ?? "")
  const [categoryName, setCategoryName] = useState(product?.category?.name ?? "")
  const [brandName, setBrandName] = useState(product?.brand?.name ?? "")
  const [status, setStatus] = useState(product?.status ?? "ACTIVE")
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [variants, setVariants] = useState<Variant[]>(
    product?.variants?.length
      ? product.variants.map(v => ({ name: v.name, value: v.value, price: v.additionalPrice.toString() }))
      : [{ name: "", value: "", price: "" }]
  )

  const addVariant = () => setVariants(v => [...v, { name: "", value: "", price: "" }])
  const removeVariant = (i: number) => setVariants(v => v.filter((_, idx) => idx !== i))

  const uploadImage = async (file: File) => {
    setUploadingImage(true)
    try {
      // Step 1: Get auth params
      const authRes = await fetch("/api/imagekit-auth")
      const auth = await authRes.json()

      // Step 2: Upload to ImageKit
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileName", file.name)
      formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? auth.publicKey ?? "")
      formData.append("signature", auth.signature)
      formData.append("expire", auth.expire)
      formData.append("token", auth.token)
      formData.append("folder", "/products")

      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      })
      const uploadData = await uploadRes.json()
      if (uploadData.url) {
        setImages(prev => [...prev, uploadData.url])
      } else {
        alert("Image upload failed: " + (uploadData.message || "Unknown error"))
      }
    } catch (err) {
      console.error(err)
      alert("Image upload failed")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach(file => uploadImage(file))
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeImage = (url: string) => setImages(prev => prev.filter(u => u !== url))

  const handleSave = () => {
    if (!name || !costPrice || !sellPrice) {
      alert("Please fill in all required fields (Name, Cost Price, Sell Price).")
      return
    }

    startTransition(async () => {
      try {
        let categoryId: string | undefined
        let brandId: string | undefined

        if (categoryName.trim()) {
          const cat = await getOrCreateCategory(categoryName.trim())
          if (cat) categoryId = cat.id
        }
        if (brandName.trim()) {
          const br = await getOrCreateBrand(brandName.trim())
          if (br) brandId = br.id
        }

        const payload = {
          name,
          description,
          sku,
          barcode,
          costPrice: parseFloat(costPrice) || 0,
          sellPrice: parseFloat(sellPrice) || 0,
          stockQty: parseInt(stockQty) || 0,
          status,
          categoryId,
          brandId,
          images,
          variants: variants
            .map(v => ({ name: v.name, value: v.value, price: parseFloat(v.price) || 0 }))
            .filter(v => v.name && v.value),
        }

        let res
        if (product) {
          res = await updateProduct(product.id, payload)
        } else {
          res = await createProduct(payload)
        }

        if (res?.success) {
          router.push(`/${locale}/dashboard/products`)
        }
      } catch (error) {
        console.error(error)
        alert("Failed to save product")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/dashboard/products`}>
          <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product ? "Edit Product" : "New Product"}</h1>
          <p className="text-muted-foreground mt-1">{product ? "Update product details" : "Add a new product to your catalog"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name <span className="text-red-500">*</span></Label>
                <Input placeholder="e.g. Wireless Earbuds Pro" value={name} onChange={e => setName(e.target.value)} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea className="w-full min-h-[120px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" placeholder="Describe this product..." value={description} onChange={e => setDescription(e.target.value)} disabled={isPending} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input placeholder="WEP-001" value={sku} onChange={e => setSku(e.target.value)} disabled={isPending} />
                </div>
                <div className="space-y-2">
                  <Label>Barcode</Label>
                  <Input placeholder="1234567890" value={barcode} onChange={e => setBarcode(e.target.value)} disabled={isPending} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cost Price <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input className="pl-7" type="number" placeholder="0.00" value={costPrice} onChange={e => setCostPrice(e.target.value)} disabled={isPending} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sell Price <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input className="pl-7" type="number" placeholder="0.00" value={sellPrice} onChange={e => setSellPrice(e.target.value)} disabled={isPending} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Variants</CardTitle>
                <Button variant="outline" size="sm" className="gap-2" onClick={addVariant} disabled={isPending}>
                  <Plus className="h-4 w-4" /> Add Variant
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
                  <div className="space-y-1">
                    <Label className="text-xs">Option (e.g. Size)</Label>
                    <Input placeholder="Size" value={v.name} onChange={e => setVariants(vs => vs.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} disabled={isPending} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Value (e.g. Large)</Label>
                    <Input placeholder="Large" value={v.value} onChange={e => setVariants(vs => vs.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x))} disabled={isPending} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">+Price</Label>
                    <Input placeholder="0.00" type="number" className="w-20" value={v.price} onChange={e => setVariants(vs => vs.map((x, idx) => idx === i ? { ...x, price: e.target.value } : x))} disabled={isPending} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeVariant(i)} disabled={variants.length === 1 || isPending}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Images – ImageKit Upload */}
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Images</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map(url => (
                    <div key={url} className="relative group rounded-lg overflow-hidden border aspect-square">
                      <Image src={url} alt="Product" fill sizes="(max-width: 768px) 33vw, 150px" className="object-cover" unoptimized />
                      <button
                        onClick={() => removeImage(url)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div
                className="border-2 border-dashed rounded-xl p-10 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadingImage ? (
                  <Loader2 className="h-8 w-8 mx-auto text-primary mb-3 animate-spin" />
                ) : (
                  <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                )}
                <p className="font-medium">{uploadingImage ? "Uploading..." : "Click to upload images"}</p>
                <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB · Multiple files supported</p>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Active / Published</Label>
                <Switch checked={status === "ACTIVE"} onCheckedChange={c => setStatus(c ? "ACTIVE" : "DRAFT")} disabled={isPending} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Organisation</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="e.g. Electronics" value={categoryName} onChange={e => setCategoryName(e.target.value)} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input placeholder="Brand name" value={brandName} onChange={e => setBrandName(e.target.value)} disabled={isPending} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle>Inventory</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Stock Qty</Label>
                <Input type="number" placeholder="0" value={stockQty} onChange={e => setStockQty(e.target.value)} disabled={isPending} />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full gap-2" size="lg" onClick={handleSave} disabled={isPending || uploadingImage}>
            {isPending ? "Saving..." : product ? "Update Product" : "Save Product"}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

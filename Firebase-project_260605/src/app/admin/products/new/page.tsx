
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, ImagePlus, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { aiProductDescriptionGenerator } from '@/ai/flows/ai-product-description-generator';
import { useToast } from '@/hooks/use-toast';

export default function NewProduct() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    features: '',
  });

  const handleAiGenerate = async () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Missing Info",
        description: "Please provide a product name and category for the AI.",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      const result = await aiProductDescriptionGenerator({
        name: formData.name,
        category: formData.category,
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : []
      });
      
      setFormData(prev => ({ ...prev, description: result.description }));
      toast({
        title: "Success",
        description: "AI description generated!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the description.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save logic
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Product Created",
        description: "The product has been added to the catalog.",
      });
    }, 1500);
  };

  return (
    <div className="container max-w-5xl px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 -ml-4">
          <Link href="/admin"><ArrowLeft className="mr-2" size={16} /> Dashboard</Link>
        </Button>
        <h1 className="text-4xl font-bold font-headline">Add New Product</h1>
        <p className="text-muted-foreground">List a new item in your PrimeMarket catalog.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Ultra-Wide Curve Monitor" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (Comma separated)</Label>
                <Input 
                  id="features" 
                  placeholder="e.g. 4K, 144Hz, USB-C" 
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>

              <div className="space-y-2 relative">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="desc">Product Description</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="text-secondary border-secondary/20 hover:bg-secondary/5 h-8 gap-2"
                    onClick={handleAiGenerate}
                    disabled={generating}
                  >
                    {generating ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} />}
                    AI Generate
                  </Button>
                </div>
                <Textarea 
                  id="desc" 
                  placeholder="Describe your product in detail..." 
                  className="min-h-[200px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Inventory & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  placeholder="0" 
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                  <ImagePlus className="text-muted-foreground" size={40} />
                  <p className="text-xs text-muted-foreground text-center px-4">Click to upload or drag and drop image file</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full font-bold h-12" disabled={loading}>
              {loading && <Loader2 className="mr-2 animate-spin" />}
              <Save className="mr-2" size={18} /> Save Product
            </Button>
            <Button variant="outline" size="lg" className="w-full h-12" asChild>
              <Link href="/admin">Cancel</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

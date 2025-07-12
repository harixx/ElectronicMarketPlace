import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ProductFilters } from "@/lib/types";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

export function ProductFiltersComponent({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 20000]);

  const categories = [
    { value: "silk", label: "Silk Collection" },
    { value: "linen", label: "Linen Loungewear" },
    { value: "cotton", label: "Cotton Essentials" },
  ];

  const collections = [
    { value: "new-arrivals", label: "New Arrivals" },
    { value: "silk-collection", label: "Silk Collection" },
    { value: "linen-loungewear", label: "Linen Loungewear" },
    { value: "cotton-essentials", label: "Cotton Essentials" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined,
    });
  };

  const handleCollectionChange = (collection: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      collection: checked ? collection : undefined,
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          Search Products
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name, fabric..."
          value={filters.search || ""}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={filters.category === category.value}
                onCheckedChange={(checked) => handleCategoryChange(category.value, checked as boolean)}
              />
              <Label htmlFor={`category-${category.value}`} className="text-sm">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Collection</Label>
        <div className="space-y-2">
          {collections.map((collection) => (
            <div key={collection.value} className="flex items-center space-x-2">
              <Checkbox
                id={`collection-${collection.value}`}
                checked={filters.collection === collection.value}
                onCheckedChange={(checked) => handleCollectionChange(collection.value, checked as boolean)}
              />
              <Label htmlFor={`collection-${collection.value}`} className="text-sm">
                {collection.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Price Range: Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          max={20000}
          min={0}
          step={500}
          className="w-full"
        />
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="w-full"
      >
        <X className="w-4 h-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Filters</h3>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4 lg:hidden">
        <Select value={filters.category || "all"} onValueChange={(value) => onFiltersChange({ ...filters, category: value === "all" ? undefined : value })}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.collection || "all"} onValueChange={(value) => onFiltersChange({ ...filters, collection: value === "all" ? undefined : value })}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Collections</SelectItem>
            {collections.map((collection) => (
              <SelectItem key={collection.value} value={collection.value}>
                {collection.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

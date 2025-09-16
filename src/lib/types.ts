export interface PricingTier {
  id: string; // e.g., "price_plaquette"
  unitName: string; // e.g., "Plaquette", "Boîte", "Comprimé"
  price: number;
  itemsPerUnit: number; // e.g., 10 (for a blister pack of 10 tablets)
}

export interface Medicine {
  id: string;
  name: string;
  unit: string; // This remains the display unit, e.g., "Boîte de 20", "Flacon 100ml"
  stock: number;
  purchasePrice: number; // Prix d'achat unitaire (PAU) for the base unit
  expiryDate: string;
  pricing: PricingTier[];
}

export interface Sale {
  id: string;
  items: {
    medicineId: string;
    name: string;
    quantity: number; // How many units were sold (e.g., 2 plaquettes)
    pricePerUnit: number; // The price of the unit sold (e.g., price of one plaquette)
    unitName: string; // The unit that was sold (e.g., "Plaquette")
    itemsPerUnit: number; // How many base items are in the sold unit.
  }[];
  total: number;
  date: string;
}

export interface StockEntry {
  id: string;
  date: string;
  items: {
    medicineId: string;
    name: string;
    quantityAdded: number; // Number of base units added
  }[];
}

export interface CartItem {
  medicineId: string;
  name: string;
  unit: string; // Display unit of medicine
  quantity: number; // How many units are in the cart
  stock: number;
  
  // Pricing details for the selected unit
  pricingId: string;
  price: number; // price for the selected unitName
  unitName: string; // e.g., "Plaquette"
  itemsPerUnit: number; // e.g., 10
}

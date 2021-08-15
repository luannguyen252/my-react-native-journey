export default interface IListing {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_email: string;
  agent_phone: string;
  agent_code: string;
  title: string;
  description: string;
  address_area: string;
  address: string;
  features: string[];
  type: 'for_sale' | 'for_rent' | string;
  rooms: string;
  baths: string;
  area: string;
  on_sale: boolean;
  price: number;
  sale_price: string;
  images: string[];
  amenities: string[];
  property_type: string;
  verified: string;
  created_at: string;
  furnish: boolean;
  floors: string;
  build_year: string;
  daily_lease: boolean;
  party_allowed: boolean;
  building_type: string;
  owner: string;
}

export type IAddListing = Omit<IListing, 'id'>;

export interface IListingFavorite extends IListing {
  product_id: string;
  user_id: string;
}

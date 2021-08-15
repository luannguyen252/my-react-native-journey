import IListing from '../../types/listing.type';

const listings: IListing[] = [
  {
    id: 1,
    title: 'Great place for a picnic',
    description:
      'This is a a test description for listing with somew of the details needed, at this point i am just trying to make up content. This is a a test description for listing with somew of the details needed, at this point i am just trying to make up content.',
    address: 'Sleman, Yogyakarta',
    features: '',
    type: 'for_rent',
    rooms: '3',
    baths: '2',
    area: '1.25',
    price: '2400',
    sale_price: '2300',
    on_sale: true,
    images: [
      require('../../../assets/images/listing1.jpeg'),
      require('../../../assets/images/listing1.jpeg'),
      require('../../../assets/images/listing1.jpeg'),
    ],
  },
  {
    id: 2,
    title: 'Great place for a picnic',
    description: '',
    address: 'Sleman, Yogyakarta',
    features: '',
    type: 'for_rent',
    rooms: '3',
    baths: '2',
    area: '2.35',
    price: '3400',
    sale_price: '',
    on_sale: false,
    images: [require('../../../assets/images/listing1.jpeg')],
  },
  {
    id: 3,
    title: 'Great place for a picnic',
    description: '',
    address: 'Sleman, Yogyakarta',
    features: '',
    type: 'for_sale',
    rooms: '3',
    baths: '2',
    area: '2',
    price: '2600000',
    sale_price: '',
    on_sale: false,
    images: [require('../../../assets/images/listing1.jpeg')],
  },
];

export default listings;

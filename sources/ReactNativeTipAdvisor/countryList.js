export const countries = [
  /**
   * name => the name of the country
   * flag => the code used by the flag api to retreive a png of the country's flag
   * tips => an array which holds tip percentages for the country. Can be null. Can be just one item. When more than one item is present a 'type' must be declared for each percentage (eg. taxi, restaurant, etc.)
   * selectedTipIndex => remains set to 0 when 'tips' is a one item array. This index refers to the selected tip type
   * currency => the country's currency symbol
   * optional => indicates if tipping is expected or not
   */

  {
    name: "Afghanistan",
    flag: "AF",
    tips: [null],
    selectedTipIndex: 0,
    currency: "؋"
  },
  {
    name: "Albania",
    flag: "AL",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "L"
  },
  {
    name: "Algeria",
    flag: "DZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "د.ج"
  },
  {
    name: "Andorra",
    flag: "AD",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Angola",
    flag: "AO",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Kz"
  },
  {
    name: "Antigua and Barbuda",
    flag: "AG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Argentina",
    flag: "AR",
    tips: [{ percentage: 0.05, optional: true }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Armenia",
    flag: "AM",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "֏"
  },
  {
    name: "Australia",
    flag: "AU",
    tips: [{ percentage: 0.05, optional: true }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Austria",
    flag: "AT",
    tips: [
      { type: "Restaurant", percentage: 0.05, optional: false },
      { type: "Taxi", percentage: 0.05, optional: true },
      { type: "Anywhere else", percentage: 0, optional: false }
    ],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Azerbaijan",
    flag: "AZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₼"
  },
  {
    name: "Bahamas",
    flag: "BS",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Bahrain",
    flag: "BH",
    tips: [null],
    selectedTipIndex: 0,
    currency: ".د.ب"
    // currency: ""
  },
  {
    name: "Bangladesh",
    flag: "BD",
    tips: [null],
    selectedTipIndex: 0,
    currency: "৳"
  },
  {
    name: "Barbados",
    flag: "BB",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Belarus",
    flag: "BY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Br"
  },
  {
    name: "Belgium",
    flag: "BE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Belize",
    flag: "BZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Benin",
    flag: "BJ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Bhutan",
    flag: "BT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Nu"
  },
  {
    name: "Bolivia",
    flag: "BO",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Bs"
  },
  {
    name: "Bosnia and Herzogovina",
    flag: "BA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "КМ"
  },
  {
    name: "Botswana",
    flag: "BW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "P"
  },
  {
    name: "Brazil",
    flag: "BR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "R$"
  },
  {
    name: "Brunei",
    flag: "BN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Bulgaria",
    flag: "BG",
    tips: [{ percentage: 0.1, optional: true }],
    selectedTipIndex: 0,
    currency: "лв"
  },
  {
    name: "Burkina Faso",
    flag: "BF",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Burundi",
    flag: "BI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Cambodia",
    flag: "KH",
    tips: [null],
    selectedTipIndex: 0,
    currency: "៛"
  },
  {
    name: "Cameroon",
    flag: "CM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Canada",
    flag: "CA",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Cape Verde",
    flag: "CV",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Esc"
  },
  {
    name: "Central African Republic",
    flag: "CF",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Chad",
    flag: "TD",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Chile",
    flag: "CL",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "China",
    flag: "CN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "元"
  },
  {
    name: "Colombia",
    flag: "CO",
    tips: [{ percentage: 0.1, optional: true }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Comoros",
    flag: "KM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Congo",
    flag: "CG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Congo, D.R.",
    flag: "CD",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Costa Rica",
    flag: "CR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₡"
  },
  {
    name: "Croatia",
    flag: "HR",
    tips: [
      { type: "Restaurant", percentage: 0.1, optional: false },
      { type: "Anywhere else", percentage: 0, optional: false }
    ],
    selectedTipIndex: 0,
    currency: "kn"
  },
  {
    name: "Cuba",
    flag: "CU",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Cyprus",
    flag: "CY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Czechia",
    flag: "CZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Kč"
  },
  {
    name: "Denmark",
    flag: "DK",
    tips: [null],
    selectedTipIndex: 0,
    currency: "kr"
  },
  {
    name: "Djibouti",
    flag: "DJ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Dominica",
    flag: "DM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Dominican Republic",
    flag: "DO",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "East Timor",
    flag: "TL",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Ecuador",
    flag: "EC",
    tips: [{ percentage: 0.05, optional: true }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Egypt",
    flag: "EG",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "ج.م"
  },
  {
    name: "El Salvador",
    flag: "SV",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Equatorial Guinea",
    flag: "GQ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Eritrea",
    flag: "ER",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Nfk"
  },
  {
    name: "Estonia",
    flag: "EE",
    tips: [{ percentage: 0.1, optional: true }],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Eswatini",
    flag: "SZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "L"
  },
  {
    name: "Ethiopia",
    flag: "ET",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Br"
  },
  {
    name: "Fiji",
    flag: "FJ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Finland",
    flag: "FI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "France",
    flag: "FR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Gabon",
    flag: "GA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Gambia, The",
    flag: "GM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "D"
  },
  {
    name: "Georgia",
    flag: "GE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₾"
  },
  {
    name: "Germany",
    flag: "DE",
    tips: [
      { type: "Waiter", percentage: 0.05, optional: true },
      { type: "Anywhere else", percentage: 0, optional: false }
    ],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Ghana",
    flag: "GH",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₵"
  },
  {
    name: "Greece",
    flag: "GR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Grenada",
    flag: "GD",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Guatemala",
    flag: "GT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Q"
  },
  {
    name: "Guinea",
    flag: "GN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Guinea-Bissau",
    flag: "GW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Guyana",
    flag: "GY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Haiti",
    flag: "HT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "G"
  },
  {
    name: "Honduras",
    flag: "HN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "L"
  },
  {
    name: "Hungary",
    flag: "HU",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Ft"
  },
  {
    name: "Iceland",
    flag: "IS",
    tips: [null],
    selectedTipIndex: 0,
    currency: "kr"
  },
  {
    name: "India",
    flag: "IN",
    tips: [
      { type: "Cheap street meal", percentage: 0.1, optional: false },
      { type: "Anything else", percentage: 0.05, optional: true }
    ],
    selectedTipIndex: 0,
    currency: "₹"
  },
  {
    name: "Indonesia",
    flag: "ID",
    tips: [
      { type: "Restaurant", percentage: 0.1, optional: false },
      { type: "Pub", percentage: 0.1, optional: true },
      { type: "Massage", percentage: 0.1, optional: false },
      { type: "Taxi", percentage: 0.05, optional: false }
    ],
    selectedTipIndex: 0,
    currency: "Rp"
  },
  {
    name: "Iran",
    flag: "IR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "﷼"
  },
  {
    name: "Iraq",
    flag: "IQ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ع.د"
  },
  {
    name: "Ireland",
    flag: "IE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Israel",
    flag: "IL",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "₪"
  },
  {
    name: "Italy",
    flag: "IT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Ivory Coast",
    flag: "CI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Jamaica",
    flag: "JM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Japan",
    flag: "JP",
    tips: [null],
    selectedTipIndex: 0,
    currency: "¥"
  },
  {
    name: "Jordan",
    flag: "JO",
    tips: [null],
    selectedTipIndex: 0,
    currency: "د.ا"
  },
  {
    name: "Kazakhstan",
    flag: "KZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₸"
  },
  {
    name: "Kenya",
    flag: "KE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Sh"
  },
  {
    name: "Kiribati",
    flag: "KI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Korea, North",
    flag: "KP",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₩"
  },
  {
    name: "Korea, South",
    flag: "KR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₩"
  },
  {
    name: "Kuwait",
    flag: "KW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "د.ك"
  },
  {
    name: "Kyrgyzstan",
    flag: "KG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "c"
  },
  {
    name: "Laos",
    flag: "LA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₭"
  },
  {
    name: "Latvia",
    flag: "LV",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Lebanon",
    flag: "LB",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ل.ل"
  },
  {
    name: "Lesotho",
    flag: "LS",
    tips: [null],
    selectedTipIndex: 0,
    currency: "L"
  },
  {
    name: "Liberia",
    flag: "LR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Libya",
    flag: "LY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ل.د"
  },
  {
    name: "Liechtenstein",
    flag: "LI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Lithuania",
    flag: "LT",
    tips: [{ percentage: 0.05, optional: false }],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Luxembourg",
    flag: "LU",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Macedonia",
    flag: "MK",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ден"
  },
  {
    name: "Madagascar",
    flag: "MG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Ar"
  },
  {
    name: "Malawi",
    flag: "MW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "MK"
  },
  {
    name: "Malaysia",
    flag: "MY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "RM"
  },
  {
    name: "Maldives",
    flag: "MV",
    tips: [null],
    selectedTipIndex: 0,
    currency: ".ރ"
  },
  {
    name: "Mali",
    flag: "ML",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Malta",
    flag: "MT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Marshall Islands",
    flag: "MH",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Mauritania",
    flag: "MR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "UM"
  },
  {
    name: "Mauritius",
    flag: "MU",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Rs"
  },
  {
    name: "Mexico",
    flag: "MX",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Moldova",
    flag: "MD",
    tips: [{ percentage: 0.05, optional: true }],
    selectedTipIndex: 0,
    currency: "L"
  },
  {
    name: "Monaco",
    flag: "MC",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Mongolia",
    flag: "MN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₮"
  },
  {
    name: "Montenegro",
    flag: "ME",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Morocco",
    flag: "MA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Mozambique",
    flag: "MZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "MT"
  },
  {
    name: "Myanmar",
    flag: "MM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Ks"
  },
  {
    name: "Namibia",
    flag: "NA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Nauru",
    flag: "NR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Nepal",
    flag: "NP",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Rs"
  },
  {
    name: "Netherlands",
    flag: "NL",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "New Zealand",
    flag: "NZ",
    tips: [{ percentage: 0.05, optional: true }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Nicaragua",
    flag: "NI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "C$"
  },
  {
    name: "Niger",
    flag: "NE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Nigeria",
    flag: "NG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₦"
  },
  {
    name: "Norway",
    flag: "NO",
    tips: [null],
    selectedTipIndex: 0,
    currency: "kr"
  },
  {
    name: "Oman",
    flag: "OM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ر.ع."
  },
  {
    name: "Pakistan",
    flag: "PK",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Rs"
  },
  {
    name: "Palau",
    flag: "PW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Panama",
    flag: "PA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "B/."
  },
  {
    name: "Papua New Guinea",
    flag: "PG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "K"
  },
  {
    name: "Paraguay",
    flag: "PY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₲"
  },
  {
    name: "Peru",
    flag: "PE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "S/."
  },
  {
    name: "Philippines",
    flag: "PH",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₱"
  },
  {
    name: "Poland",
    flag: "PL",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "zł"
  },
  {
    name: "Portugal",
    flag: "PT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Qatar",
    flag: "QA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ر.ق"
  },
  {
    name: "Romania",
    flag: "RO",
    tips: [{ percentage: 0.05, optional: false }],
    selectedTipIndex: 0,
    currency: "lei"
  },
  {
    name: "Russia",
    flag: "RU",
    tips: [
      { type: "Metered taxi", percentage: 0.05, optional: false },
      { type: "Restaurant", percentage: 0.1, optional: false },
      { type: "Hotel", percentage: 0.1, optional: false },
      { type: "Anywhere else", percentage: 0, optional: false }
    ],
    selectedTipIndex: 0,
    currency: "₽"
  },
  {
    name: "Rwanda",
    flag: "RW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "KN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Saint Lucia",
    flag: "LC",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "VC",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Samoa",
    flag: "WS",
    tips: [null],
    selectedTipIndex: 0,
    currency: "T"
  },
  {
    name: "San Marino",
    flag: "SM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Sao Tome and Principe",
    flag: "ST",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Db"
  },
  {
    name: "Saudi Arabia",
    flag: "SA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ر.س"
  },
  {
    name: "Senegal",
    flag: "SN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Serbia",
    flag: "RS",
    tips: [null],
    selectedTipIndex: 0,
    currency: "дин"
  },
  {
    name: "Seychelles",
    flag: "SC",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Rs"
  },
  {
    name: "Sierra Leone",
    flag: "SL",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Le"
  },
  {
    name: "Singapore",
    flag: "SG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Slovakia",
    flag: "SK",
    tips: [{ percentage: 0.1, optional: true }],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Slovenia",
    flag: "SI",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Solomon Islands",
    flag: "SB",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Somalia",
    flag: "SO",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Sh"
  },
  {
    name: "South Africa",
    flag: "ZA",
    tips: [null],
    selectedTipIndex: 0,
    currency: "R"
  },
  {
    name: "Spain",
    flag: "ES",
    tips: [null],
    selectedTipIndex: 0,
    currency: "€"
  },
  {
    name: "Sri Lanka",
    flag: "LK",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Rs"
  },
  {
    name: "Sudan",
    flag: "SD",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ج.س."
  },
  {
    name: "Sudan, South",
    flag: "SS",
    tips: [null],
    selectedTipIndex: 0,
    currency: "	£"
  },
  {
    name: "Suriname",
    flag: "SR",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Sweden",
    flag: "SE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "kr"
  },
  {
    name: "Switzerland",
    flag: "CH",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Syria",
    flag: "SY",
    tips: [null],
    selectedTipIndex: 0,
    currency: "£"
  },
  {
    name: "Tajikistan",
    flag: "TJ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "SM"
  },
  {
    name: "Tanzania",
    flag: "TZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Sh"
  },
  {
    name: "Thailand",
    flag: "TH",
    tips: [null],
    selectedTipIndex: 0,
    currency: "฿"
  },
  {
    name: "Togo",
    flag: "TG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Fr"
  },
  {
    name: "Tonga",
    flag: "TO",
    tips: [null],
    selectedTipIndex: 0,
    currency: "T$"
  },
  {
    name: "Trinidad and Tobago",
    flag: "TT",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Tunisia",
    flag: "TN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "د.ت"
  },
  {
    name: "Turkey",
    flag: "TR",
    tips: [{ percentage: 0.05, optional: true }],
    selectedTipIndex: 0,
    currency: "₺"
  },
  {
    name: "Turkmenistan",
    flag: "TM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "m"
  },
  {
    name: "Tuvalu",
    flag: "TV",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Uganda",
    flag: "UG",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Sh"
  },
  {
    name: "Ukraine",
    flag: "UA",
    tips: [{ percentage: 0.1, optional: false }],
    selectedTipIndex: 0,
    currency: "₴"
  },
  {
    name: "United Arab Emirates",
    flag: "AE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "د.إ"
  },
  {
    name: "United Kingdom",
    flag: "GB",
    tips: [null],
    selectedTipIndex: 0,
    currency: "£"
  },
  {
    name: "United States of America",
    flag: "US",
    tips: [{ percentage: 0.15, optional: false }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Uruguay",
    flag: "UY",
    tips: [{ percentage: 0.1, optional: true }],
    selectedTipIndex: 0,
    currency: "$"
  },
  {
    name: "Uzbekistan",
    flag: "UZ",
    tips: [null],
    selectedTipIndex: 0,
    currency: "so'm"
  },
  {
    name: "Vanuatu",
    flag: "VU",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Vt"
  },
  {
    name: "Venezuela",
    flag: "VE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "Bs.S"
  },
  {
    name: "Vietnam",
    flag: "VN",
    tips: [null],
    selectedTipIndex: 0,
    currency: "₫"
  },
  {
    name: "Yemen",
    flag: "YE",
    tips: [null],
    selectedTipIndex: 0,
    currency: "﷼"
  },
  {
    name: "Zambia",
    flag: "ZM",
    tips: [null],
    selectedTipIndex: 0,
    currency: "ZK"
  },
  {
    name: "Zimbabwe",
    flag: "ZW",
    tips: [null],
    selectedTipIndex: 0,
    currency: "$"
  }
];

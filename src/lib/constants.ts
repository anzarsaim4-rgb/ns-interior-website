export const BUSINESS_INFO = {
  name: "N.S. INTERIOR",
  tagline: "Expert Interior Execution & Contracting Services",
  experienceYears: "7+",
  phone: "6391916867",
  formattedPhone: "+91 6391916867",
  whatsapp: "916391916867",
  email: "itsnaushad014@gmail.com",
  instagram: "n__s_interior",
  instagramUrl: "https://instagram.com/n__s_interior",
  facebook: null,
  primaryLocations: ["Mumbai", "Mumbra", "Thane"],
  secondaryLocations: ["Navi Mumbai", "Kalyan", "Dombivli", "Mira Road"],
  strengths: [
    "7+ years of hands-on execution experience",
    "Experienced & dedicated team of craftsmen",
    "Direct execution — No middleman commissions",
    "High quality workmanship & premium finishing",
    "Reasonable & transparent labour cost",
    "Fast project completion with time commitment",
    "Custom interior work tailored to client needs",
    "Strict on-site supervision by senior contractor",
    "Clean & organized work site management"
  ]
};

export interface ServiceDefinition {
  slug: string;
  name: string;
  category: "residential" | "commercial" | "renovation" | "core";
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

export const ALL_SERVICES: ServiceDefinition[] = [
  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    category: "core",
    shortDesc: "Custom acrylic, PU, ceramic, and laminate modular kitchens built for heavy Indian cooking.",
    fullDesc: "Complete modular kitchen design and execution including waterproof marine ply cabinets, soft-close hardware, tandem drawers, corner solutions, and quartz/granite counter top fitting.",
    highlights: ["BWP Marine Ply", "Hettich / Hafele Soft-Close Hardware", "Custom Pantry Units", "Waterproof Execution"]
  },
  {
    slug: "carpenter-work",
    name: "Carpenter Work",
    category: "core",
    shortDesc: "Precision wood joinery, custom furniture fabrication, door frame fitting, and storage solutions.",
    fullDesc: "Expert site carpenter work for residential and commercial spaces. Custom wooden paneling, safety doors, TV units, crockeries, and built-in storage made strictly as per space dimensions.",
    highlights: ["Custom Wood Joinery", "Precision Fitting", "Durable Hardware", "Termite Treated Plywood"]
  },
  {
    slug: "wardrobe",
    name: "Wardrobe",
    category: "residential",
    shortDesc: "Sliding, hinged, walk-in, and floor-to-ceiling wardrobes with custom internal organizers.",
    fullDesc: "Space-maximizing wardrobes crafted with heavy-duty hinges, internal tie/belt drawers, hidden safes, mirror doors, and high-gloss or matte laminate finishes.",
    highlights: ["Sliding & Hinged Doors", "Loft Maximization", "Profile Handle Lights", "Custom Compartments"]
  },
  {
    slug: "false-ceiling",
    name: "False Ceiling",
    category: "core",
    shortDesc: "Gypsum board, POP cove lighting, wooden rafter, and grid ceilings for living rooms and offices.",
    fullDesc: "Architectural ceiling work integrating ambient LED cove lighting, magnetic track lights, chandelier framing, and acoustic thermal insulation.",
    highlights: ["Gyproc / Saint-Gobain Boards", "Concealed LED Strip Channels", "Seamless Joint Finishing", "Acoustic Insulation"]
  },
  {
    slug: "gypsum-work",
    name: "Gypsum Work",
    category: "core",
    shortDesc: "Gypsum partition walls, decorative wall moldings, and smooth ceiling framing.",
    fullDesc: "Fast, lightweight, fire-rated gypsum drywall partitions and decorative wall accents for quick room divisions and office layouts.",
    highlights: ["Fire-Resistant Framing", "Quick Drywall Installation", "Smooth Paintable Surface", "Soundproof Options"]
  },
  {
    slug: "pop-work",
    name: "POP Work",
    category: "core",
    shortDesc: "Plaster of Paris wall punning, decorative ceiling cornices, and smooth wall leveling.",
    fullDesc: "Traditional skilled POP punning for micro-smooth wall mirror finishes, handcrafted ceiling moldings, and structural repair leveling prior to painting.",
    highlights: ["Mirror Smooth Punning", "Handcrafted Cornice Molding", "Crack Repair & Leveling", "High Durability"]
  },
  {
    slug: "painting",
    name: "Painting",
    category: "core",
    shortDesc: "Royal emulsion, texture painting, PU wood polish, metal coating, and waterproofing primers.",
    fullDesc: "Professional interior and exterior painting services using Asian Paints / Berger products. Includes putty sanding, moisture-proof base coats, washable velvet finishes, and stencil textures.",
    highlights: ["Dust-Free Machine Sanding", "Asian Paints Royal Emulsion", "PU Italian Wood Polish", "Moisture Sealing Base"]
  },
  {
    slug: "electrical",
    name: "Electrical",
    category: "core",
    shortDesc: "Concealed wiring, circuit breaker distribution, modular switches, and LED architectural lighting.",
    fullDesc: "Safe, certified electrical execution for entire homes and offices. Includes fire-resistant Polycab/Finolex copper wiring, modular switchboards (Legrand/Schneider), AC points, and profile lights.",
    highlights: ["FR Grade Copper Wiring", "Modular Switches & DB", "Smart Lighting Ready", "Load Calculation & Safety"]
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    category: "core",
    shortDesc: "Concealed CPVC/UPVC piping, wall-hung sanitary fitting, bathroom pressure testing, and drainage.",
    fullDesc: "Leak-proof plumbing solutions including Astral/Finolex piping, concealed diverters, Jacuzzi/shower panel plumbing, wall-mounted WC frames, and kitchen sink drain lines.",
    highlights: ["Leak-Tested CPVC Piping", "Concealed Diverter Valves", "Sanitaryware Installation", "Pressure Testing"]
  },
  {
    slug: "flooring",
    name: "Flooring",
    category: "core",
    shortDesc: "Vitrified tile laying, wooden SPC flooring, marble polishing, and vinyl sheet installation.",
    fullDesc: "Flawless floor laying services. Precision leveling, laser-aligned tile jointing, epoxy grouting, engineered wooden flooring, and Italian marble diamond polishing.",
    highlights: ["Laser Level Alignment", "Stain-Proof Epoxy Grouting", "SPC Wooden Flooring", "Italian Marble Polishing"]
  },
  {
    slug: "tile-work",
    name: "Tile Work",
    category: "core",
    shortDesc: "Large format slab tiling, bathroom wall tiles, kitchen dados, and anti-skid terrace tiles.",
    fullDesc: "Specialized installation of 4x2 and 6x4 large format vitrified tiles, mosaic highlight backsplashes, step risers, and anti-skid bathroom tile laying using polymer adhesives.",
    highlights: ["Large Format Slab Tiling", "Polymer Adhesive Laying", "Paper Joint Precision", "Anti-Skid Safety Tiling"]
  },
  {
    slug: "wallpaper",
    name: "Wallpaper",
    category: "residential",
    shortDesc: "3D textured wallpapers, customized canvas wall murals, and vinyl washable wall coverings.",
    fullDesc: "Seamless wallpaper installation for feature accent walls in master bedrooms, living rooms, and reception areas using non-toxic imported adhesives.",
    highlights: ["Custom Canvas Murals", "Washable Vinyl Material", "3D Textured Patterns", "Seamless Joint Pasting"]
  },
  {
    slug: "furniture-making",
    name: "Furniture Making",
    category: "residential",
    shortDesc: "Custom sofas, dining tables, study desks, shoe racks, and accent consoles built to order.",
    fullDesc: "On-site and workshop furniture fabrication. High-density foam sofas upholstered in leatherette or velvet, solid teak wood dining tables, ergonomic study stations, and console tables.",
    highlights: ["High-Density Sleepwell Foam", "Solid Teak & Plywood Frame", "Custom Fabric Upholstery", "Ergonomic Crafting"]
  },
  {
    slug: "civil-work",
    name: "Civil Work",
    category: "core",
    shortDesc: "Wall demolition, brick masonry, concrete waterproofing, door frame breaking, and plastering.",
    fullDesc: "Structural civil alterations for layout remodeling. AAC block wall construction, doorway enlargement, slab waterproofing, debris disposal, and sub-floor leveling.",
    highlights: ["AAC Block Masonry", "Chemical Waterproofing", "Debris Clearance", "Structural Alterations"]
  },
  {
    slug: "full-home-interior",
    name: "Full Home Interior",
    category: "residential",
    shortDesc: "End-to-end turnkey interior execution for 1 BHK, 2 BHK, 3 BHK, 4 BHK, and luxury villas.",
    fullDesc: "Complete hassle-free home transformation from civil layout changes to furniture, ceiling, painting, electrical, and final deep cleaning with dedicated site supervision.",
    highlights: ["Turnkey Site Supervision", "100% Custom Execution", "Fixed Timeline Guarantee", "Post-Handover Support"]
  },
  {
    slug: "office-interior",
    name: "Office Interior",
    category: "commercial",
    shortDesc: "Modern office fit-outs, workstation desks, manager cabins, glass partitions, and conference rooms.",
    fullDesc: "Professional commercial workspace execution focusing on employee ergonomics, cable management, acoustic privacy partitions, reception desks, and corporate lighting.",
    highlights: ["Glass & Aluminum Partitions", "Modular Workstations", "Acoustic Ceiling Grid", "Server Room Cabling"]
  },
  {
    slug: "shop-interior",
    name: "Shop Interior",
    category: "commercial",
    shortDesc: "Retail display racks, glass storefronts, cashier counters, spotlighting, and branding walls.",
    fullDesc: "High-impact retail store interior execution engineered to attract walk-in customers and showcase merchandise under specialized warm spotlighting.",
    highlights: ["Toughened Glass Frontage", "High-Load Display Racks", "Cash Counter Security", "Focus Spot Lighting"]
  },
  {
    slug: "restaurant-interior",
    name: "Restaurant Interior",
    category: "commercial",
    shortDesc: "Café and dining area fit-outs, booth seating, acoustic wall paneling, and commercial kitchen setups.",
    fullDesc: "Atmospheric dining ambiance creation with heavy-duty commercial flooring, ambient lighting, fire-safe ceiling materials, and custom dining booths.",
    highlights: ["Theme Wall Textures", "Heavy-Duty Commercial Floors", "Custom Booth Benches", "Exhaust Ducting Support"]
  },
  {
    slug: "home-renovation",
    name: "Home Renovation",
    category: "renovation",
    shortDesc: "Complete overhaul of old apartments, updating layout, flooring, wiring, and modern woodwork.",
    fullDesc: "Revitalizing 10+ year old flats in Mumbai, Mumbra, and Thane into sleek modern living spaces with updated plumbing, rewiring, and contemporary woodwork.",
    highlights: ["Old Flat Transformation", "Plumbing & Wiring Upgrade", "Space Re-allocation", "Clean Work Management"]
  },
  {
    slug: "kitchen-renovation",
    name: "Kitchen Renovation",
    category: "renovation",
    shortDesc: "Replacing old civil kitchen platforms with modern modular cabinets, quartz counters, and new tiles.",
    fullDesc: "Converting legacy concrete kitchen platforms into modern modular setups with pull-out pantries, chimney installation, updated dado tiles, and anti-leakage plumbing.",
    highlights: ["Concrete Platform Removal", "Granite/Quartz Counter Top", "Waterproof Marine Cabinets", "Chimney & Hob Fitting"]
  },
  {
    slug: "bathroom-renovation",
    name: "Bathroom Renovation",
    category: "renovation",
    shortDesc: "Complete bathroom remodeling, chemical waterproofing, wall tile replacement, and CP fittings.",
    fullDesc: "Full bathroom redesigning including complete tile breaking, 3-coat chemical waterproofing, concealed diverter valves, wall-hung WC installation, and glass shower enclosures.",
    highlights: ["3-Coat Waterproof Guarantee", "Concealed Sanitaryware", "Large Format Anti-Skid Tiles", "Glass Shower Partition"]
  }
];

export const PROPERTY_TYPES = [
  "Residential Apartment",
  "Villa / Independent House",
  "Commercial Office",
  "Retail Shop",
  "Restaurant / Cafe",
  "Other Commercial Space"
];

export const BHK_OPTIONS = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK+",
  "Villa / Duplex",
  "Not Applicable (Commercial)"
];

export const BUDGET_RANGES = [
  "Below ₹2 Lakhs (Single Room / Minor Work)",
  "₹2 Lakhs - ₹5 Lakhs",
  "₹5 Lakhs - ₹8 Lakhs",
  "₹8 Lakhs - ₹12 Lakhs",
  "₹12 Lakhs - ₹20 Lakhs",
  "₹20 Lakhs+"
];

export const TIMELINE_OPTIONS = [
  "Immediately (Within 7 days)",
  "Within 15-30 days",
  "Next 1-2 months",
  "Planning ahead (2+ months)"
];

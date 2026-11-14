/**
 * DEMO CATALOG — placeholder content for the Phase 1 storefront.
 *
 * Every entry here is illustrative. Nothing in this file describes real
 * stock, suppliers, prices, customer reviews or shipping terms. Prices are
 * intentionally omitted until sourcing and pricing research are complete.
 *
 * Import this module only from `lib/catalog.ts`.
 */
import type { Collection, Product } from "@/lib/types";

/**
 * Collections are real (the store's five categories). Their images are
 * generated editorial scenes, not product photos, so they show no specific
 * catalog item. 4:5 masters (920×1150; Gear is a 616×770 crop that removes
 * an off-palette apparel item). `position` sets the focal point used when a
 * slot crops them.
 */
const collectionImage = (
  slug: string,
  alt: string,
  position: string,
  size: { width: number; height: number } = { width: 920, height: 1150 },
): Collection["image"] => ({
  src: `/images/collections/${slug}.webp`,
  alt,
  ...size,
  position,
});

export const demoCollections: readonly Collection[] = [
  {
    slug: "gear",
    name: "Gear",
    summary: "Everyday carry and travel accessories.",
    description:
      "Compact, practical pieces for the things you take with you, from the daily commute to longer trips.",
    image: collectionImage(
      "gear",
      "A charcoal waxed-canvas backpack with orange zip pulls hanging from a black hook on a concrete pillar beside a loft window.",
      "58% 38%",
      { width: 616, height: 770 },
    ),
  },
  {
    slug: "home",
    name: "Home",
    summary: "Practical home and kitchen essentials.",
    description:
      "Useful, well-considered essentials for the kitchen and the rest of the home.",
    image: collectionImage(
      "home",
      "Stoneware mugs, a black pour-over kettle, a linen cloth and a small succulent on an oak shelf beside a loft window.",
      "62% 50%",
    ),
  },
  {
    slug: "tech",
    name: "Tech",
    summary: "Useful gadgets and desk accessories.",
    description:
      "Practical gadgets and desk accessories that keep your setup tidy and working.",
    image: collectionImage(
      "tech",
      "A closed laptop, a braided charging cable, a power bank, an earbuds case and a notebook arranged on a felt desk mat.",
      "58% 62%",
    ),
  },
  {
    slug: "active",
    name: "Active",
    summary: "Fitness and outdoor accessories.",
    description:
      "Accessories for training, movement and time spent outdoors.",
    image: collectionImage(
      "active",
      "A rolled exercise mat with a leather carry strap, an insulated bottle, a folded towel and grey trainers on a concrete floor.",
      "50% 74%",
    ),
  },
  {
    slug: "tools",
    name: "Tools",
    summary: "DIY and workshop essentials.",
    description:
      "Dependable essentials for repairs, projects and the workshop.",
    image: collectionImage(
      "tools",
      "A multitool, a flashlight, a utility knife, two tape measures and a canvas tool roll laid out on a steel workbench.",
      "52% 52%",
    ),
  },
];

type DemoProductInput = Omit<Product, "images" | "status" | "isDemo"> &
  Partial<Pick<Product, "status">>;

function demo(product: DemoProductInput): Product {
  return { images: [], status: "published", ...product, isDemo: true };
}

export const demoProducts: readonly Product[] = [
  // Gear
  demo({
    id: "demo-gear-001",
    slug: "everyday-carry-pouch",
    name: "Everyday Carry Pouch",
    category: "gear",
    sku: "DEMO-GEAR-001",
    shortDescription:
      "A slim zip pouch that keeps small daily items in one place.",
    description: [
      "A compact pouch for the small things that tend to scatter: cables, cards, keys and earbuds.",
      "Sized to slip into a bag or jacket pocket without adding bulk.",
    ],
    variants: [
      { id: "charcoal", name: "Charcoal", options: { Color: "Charcoal" } },
      { id: "sand", name: "Sand", options: { Color: "Sand" } },
    ],
    specifications: [
      { label: "Closure", value: "Zip" },
      { label: "Use", value: "Everyday carry" },
    ],
  }),
  demo({
    id: "demo-gear-002",
    slug: "travel-cable-organizer",
    name: "Travel Cable Organizer",
    category: "gear",
    sku: "DEMO-GEAR-002",
    shortDescription:
      "A structured case for chargers, cables and small tech on the move.",
    description: [
      "Keeps chargers, cables and adapters separated and easy to find when you travel.",
      "A flat profile so it packs neatly alongside a laptop or tablet.",
    ],
    specifications: [
      { label: "Layout", value: "Elastic loops and mesh pockets" },
      { label: "Use", value: "Travel" },
    ],
  }),
  demo({
    id: "demo-gear-003",
    slug: "minimal-card-wallet",
    name: "Minimal Card Wallet",
    category: "gear",
    sku: "DEMO-GEAR-003",
    shortDescription: "A low-profile wallet for a few cards and folded notes.",
    description: [
      "A pared-back wallet for carrying only what you need day to day.",
      "Designed to sit comfortably in a front pocket.",
    ],
    variants: [
      { id: "black", name: "Black", options: { Color: "Black" } },
      { id: "tan", name: "Tan", options: { Color: "Tan" } },
    ],
    specifications: [{ label: "Format", value: "Card sleeve" }],
  }),
  demo({
    id: "demo-gear-004",
    slug: "packable-daypack",
    name: "Packable Daypack",
    category: "gear",
    sku: "DEMO-GEAR-004",
    shortDescription:
      "A lightweight backpack that folds away into its own pocket.",
    description: [
      "A spare bag for day trips, errands and travel days that folds down small when not in use.",
      "Simple straps and a single main compartment keep it light.",
    ],
    specifications: [
      { label: "Format", value: "Packable backpack" },
      { label: "Use", value: "Day trips and travel" },
    ],
  }),

  // Home
  demo({
    id: "demo-home-001",
    slug: "glass-storage-container-set",
    name: "Glass Storage Container Set",
    category: "home",
    sku: "DEMO-HOME-001",
    shortDescription:
      "Stackable glass containers for leftovers, meal prep and pantry staples.",
    description: [
      "A set of nesting glass containers for storing food in the fridge or pantry.",
      "Clear sides make it easy to see what is inside at a glance.",
    ],
    variants: [
      { id: "set-of-3", name: "Set of 3", options: { Size: "Set of 3" } },
      { id: "set-of-5", name: "Set of 5", options: { Size: "Set of 5" } },
    ],
    specifications: [
      { label: "Material", value: "Glass with snap-lock lids" },
      { label: "Use", value: "Kitchen storage" },
    ],
  }),
  demo({
    id: "demo-home-002",
    slug: "everyday-stoneware-mug",
    name: "Everyday Stoneware Mug",
    category: "home",
    sku: "DEMO-HOME-002",
    shortDescription:
      "A sturdy, simple mug for coffee, tea and everything in between.",
    description: [
      "A generously sized mug with a comfortable handle for daily use.",
      "A plain, understated form that suits any kitchen.",
    ],
    variants: [
      { id: "white", name: "White", options: { Color: "White" } },
      { id: "charcoal", name: "Charcoal", options: { Color: "Charcoal" } },
    ],
    specifications: [{ label: "Material", value: "Stoneware" }],
  }),
  demo({
    id: "demo-home-003",
    slug: "bamboo-cutting-board",
    name: "Bamboo Cutting Board",
    category: "home",
    sku: "DEMO-HOME-003",
    shortDescription:
      "A practical board for daily prep, with a groove to catch juices.",
    description: [
      "An everyday board for chopping, slicing and serving.",
      "A channel around the edge helps keep the counter clean.",
    ],
    specifications: [{ label: "Material", value: "Bamboo" }],
  }),
  demo({
    id: "demo-home-004",
    slug: "pour-over-coffee-set",
    name: "Pour-Over Coffee Set",
    category: "home",
    sku: "DEMO-HOME-004",
    shortDescription: "A dripper and carafe for brewing coffee by hand.",
    description: [
      "A simple setup for brewing one to a few cups of coffee at a time.",
      "Pairs a cone dripper with a matching carafe.",
    ],
    specifications: [
      { label: "Includes", value: "Dripper and carafe" },
      { label: "Use", value: "Manual coffee brewing" },
    ],
  }),

  // Tech
  demo({
    id: "demo-tech-001",
    slug: "aluminum-laptop-stand",
    name: "Aluminum Laptop Stand",
    category: "tech",
    sku: "DEMO-TECH-001",
    shortDescription:
      "Raises your laptop to a more comfortable viewing height.",
    description: [
      "Lifts a laptop screen closer to eye level for a more comfortable desk setup.",
      "An open design leaves room for airflow beneath the laptop.",
    ],
    specifications: [{ label: "Material", value: "Aluminum" }],
  }),
  demo({
    id: "demo-tech-002",
    slug: "braided-usb-c-cable",
    name: "Braided USB-C Cable",
    category: "tech",
    sku: "DEMO-TECH-002",
    shortDescription: "A braided USB-C to USB-C cable for everyday charging.",
    description: [
      "A braided cable for charging and connecting USB-C devices.",
      "Available in two lengths for the desk or the bedside.",
    ],
    variants: [
      { id: "1m", name: "1 m", options: { Length: "1 m" } },
      { id: "2m", name: "2 m", options: { Length: "2 m" } },
    ],
    specifications: [{ label: "Connectors", value: "USB-C to USB-C" }],
  }),
  demo({
    id: "demo-tech-003",
    slug: "under-desk-cable-tray",
    name: "Under-Desk Cable Tray",
    category: "tech",
    sku: "DEMO-TECH-003",
    shortDescription:
      "Keeps power strips and cables off the floor and out of sight.",
    description: [
      "Mounts beneath a desk to hold power strips, adapters and excess cable.",
      "Helps keep a workspace clear and easy to clean around.",
    ],
    specifications: [{ label: "Mounting", value: "Under desk" }],
  }),
  demo({
    id: "demo-tech-004",
    slug: "compact-charging-pad",
    name: "Compact Charging Pad",
    category: "tech",
    sku: "DEMO-TECH-004",
    shortDescription:
      "A small charging pad for compatible phones and earbuds.",
    description: [
      "A low-profile pad for topping up compatible devices on a desk or nightstand.",
      "Device compatibility will be confirmed before launch.",
    ],
    specifications: [{ label: "Format", value: "Charging pad" }],
  }),

  // Active
  demo({
    id: "demo-active-001",
    slug: "resistance-band-set",
    name: "Resistance Band Set",
    category: "active",
    sku: "DEMO-ACTV-001",
    shortDescription:
      "A set of bands for strength work, mobility and warm-ups.",
    description: [
      "A versatile set of bands for training at home, at the gym or while travelling.",
      "Multiple resistance levels allow for gradual progression.",
    ],
    specifications: [{ label: "Includes", value: "Multiple resistance levels" }],
  }),
  demo({
    id: "demo-active-002",
    slug: "insulated-water-bottle",
    name: "Insulated Water Bottle",
    category: "active",
    sku: "DEMO-ACTV-002",
    shortDescription: "A double-wall bottle for water on the move.",
    description: [
      "A reusable bottle for the gym, the trail or the desk.",
      "Available in two capacities.",
    ],
    variants: [
      { id: "500ml", name: "500 ml", options: { Capacity: "500 ml" } },
      { id: "750ml", name: "750 ml", options: { Capacity: "750 ml" } },
    ],
    specifications: [{ label: "Construction", value: "Double wall" }],
  }),
  demo({
    id: "demo-active-003",
    slug: "quick-dry-travel-towel",
    name: "Quick-Dry Travel Towel",
    category: "active",
    sku: "DEMO-ACTV-003",
    shortDescription:
      "A lightweight towel that packs small for the gym, beach or trail.",
    description: [
      "A thin, light towel that takes up little room in a bag.",
      "Comes with a small pouch for storage.",
    ],
    specifications: [{ label: "Includes", value: "Storage pouch" }],
  }),
  demo({
    id: "demo-active-004",
    slug: "rechargeable-headlamp",
    name: "Rechargeable Headlamp",
    category: "active",
    sku: "DEMO-ACTV-004",
    shortDescription:
      "A compact headlamp for early runs, camping and power outages.",
    description: [
      "A hands-free light for running, camping and jobs around the house.",
      "Recharges over USB instead of using disposable batteries.",
    ],
    specifications: [{ label: "Charging", value: "USB rechargeable" }],
  }),

  // Tools
  demo({
    id: "demo-tools-001",
    slug: "precision-screwdriver-set",
    name: "Precision Screwdriver Set",
    category: "tools",
    sku: "DEMO-TOOL-001",
    shortDescription:
      "Interchangeable bits for electronics, eyewear and small repairs.",
    description: [
      "A compact driver with interchangeable bits for small fasteners.",
      "Stored in a case that keeps every bit in its place.",
    ],
    specifications: [{ label: "Includes", value: "Driver handle and bit case" }],
  }),
  demo({
    id: "demo-tools-002",
    slug: "folding-utility-knife",
    name: "Folding Utility Knife",
    category: "tools",
    sku: "DEMO-TOOL-002",
    shortDescription:
      "A compact folding knife for opening boxes and everyday cutting.",
    description: [
      "A pocketable utility knife for packaging, cord and general cutting tasks.",
      "Folds closed for safer storage.",
    ],
    specifications: [{ label: "Format", value: "Folding" }],
  }),
  demo({
    id: "demo-tools-003",
    slug: "compact-tape-measure",
    name: "Compact Tape Measure",
    category: "tools",
    sku: "DEMO-TOOL-003",
    shortDescription:
      "A pocket-sized tape measure for quick jobs around the home.",
    description: [
      "A small tape measure that lives in a drawer or toolbox for everyday measuring.",
      "A belt clip keeps it within reach during projects.",
    ],
    specifications: [{ label: "Format", value: "Retractable tape" }],
  }),
  demo({
    id: "demo-tools-004",
    slug: "magnetic-parts-tray",
    name: "Magnetic Parts Tray",
    category: "tools",
    sku: "DEMO-TOOL-004",
    shortDescription:
      "Keeps screws, nuts and small parts together while you work.",
    description: [
      "A shallow magnetic tray that holds small metal parts during repairs.",
      "Useful on the workbench, under the car or on a ladder.",
    ],
    specifications: [{ label: "Base", value: "Magnetic" }],
  }),
  demo({
    id: "demo-tools-005",
    slug: "workbench-organizer",
    name: "Workbench Organizer",
    category: "tools",
    status: "draft",
    shortDescription: "Draft entry used to verify unpublished products stay hidden.",
    description: ["This draft product is not shown in the storefront."],
  }),
];

import productPromImg from '../assets/power-plant-prom.jpg';
import productPotashImg from '../assets/power-plant-potash.jpg';
import productGrowImg from '../assets/power-plant-grow.jpg';
import productNitroKingImg from '../assets/power-plant-nitro-king.jpg';
import productPremiumImg from '../assets/power-plant-premium.jpg';
import productBhoomiPowerImg from '../assets/kaipoi-bhoomi-power.jpg';
import productBloomImg from '../assets/power-plant-bloom.jpg';
import productFruiterImg from '../assets/power-plant-fruiter.jpg';
import productStImg from '../assets/power-plant-st.jpg';
import productStressOutImg from '../assets/power-plant-stress-out.jpg';
import productAgroSudhaImg from '../assets/agro-crop-sudha.jpg';

// Ultra-Photorealistic 8K HD 3D Product Images (Wooden Podium in Sunlit Farm)
import hdProductPromImg from '../assets/hd-power-plant-prom.jpg';
import hdProductPotashImg from '../assets/hd-power-plant-potash.jpg';
import hdProductGrowImg from '../assets/hd-power-plant-grow.jpg';
import hdProductNitroKingImg from '../assets/hd-power-plant-nitro-king.jpg';
import hdProductPremiumImg from '../assets/hd-power-plant-premium.jpg';
import hdProductBhoomiPowerImg from '../assets/hd-kaipoi-bhoomi-power.jpg';
import hdProductBloomImg from '../assets/hd-power-plant-bloom.jpg';
import hdProductFruiterImg from '../assets/hd-power-plant-fruiter.jpg';
import hdProductStImg from '../assets/hd-power-plant-st.jpg';
import hdProductStressOutImg from '../assets/hd-power-plant-stress-out.jpg';
import hdProductAgroSudhaImg from '../assets/hd-agro-crop-sudha.jpg';

// Agricultural background photo assets for card visual frames
import bgSugarcaneCrop from '../assets/sugarcane-crop.jpg';
import bgFarmField from '../assets/farm-field.jpg';
import bgSugarcaneRows from '../assets/sugarcane-rows.jpg';
import bgSugarcaneField from '../assets/sugarcane-field.jpg';
import bgBanana from '../assets/banana.jpg';

export const AGRICULTURE_PRODUCTS = [
  {
    id: 'power-plant-prom',
    slug: 'prom',
    name: 'Power Plant PROM',
    subtitle: 'Phosphate Rich Organic Manure',
    category: 'fertilizer',
    categoryLabel: 'Organic Fertilizer',
    netContent: '50 Kg Bag',
    image: hdProductPromImg,
    bgImage: bgSugarcaneCrop,
    badge: '100% Organic Manure',
    threeBenefits: [
      'Enriches soil with organic nutrients',
      'Improves soil health naturally',
      'Supports strong crop growth'
    ],
    shortDescription:
      'Enriches soil with organic nutrients, improves soil health and supports strong crop growth naturally.',
    description:
      'Power Plant PROM (Phosphate Rich Organic Manure) is a superior organic phosphorus source enriched with biological carbon and rock phosphate. It stimulates root growth, improves soil humus, and provides balanced phosphorus nutrition without chemical fixation in acidic or alkaline soils.',
    highlights: [
      'Enriches soil with organic nutrients & biological carbon',
      'Prevents phosphate fixation in acidic/alkaline soils',
      'Promotes robust root branching & early seedling vigor',
      'Eco-friendly DAP alternative safe for earthworms and soil microflora'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Vegetables']
  },
  {
    id: 'power-plant-potash',
    slug: 'potash',
    name: 'Power Plant Potash',
    subtitle: 'Organic Fertilizer',
    category: 'fertilizer',
    categoryLabel: 'Organic Fertilizer',
    netContent: '50 Kg Bag',
    image: hdProductPotashImg,
    bgImage: bgFarmField,
    badge: 'High Potassium Source',
    threeBenefits: [
      'Supports plant development',
      'Strengthens crops and growth',
      'Helps in better nutrient absorption'
    ],
    shortDescription:
      'Supports plant development, strengthens crops and helps in better nutrient absorption.',
    description:
      'Power Plant Potash is a bio-available organic potassium fertilizer derived from natural botanical sources. It accelerates sugar synthesis, increases stalk girth in sugarcane, elevates bunch weight in banana, and enhances sweetness and crispness in watermelon.',
    highlights: [
      'Naturally derived potassium for rapid crop absorption',
      'Enhances crop resistance to heat, drought, and moisture stress',
      'Significantly improves fruit size, rind strength, and sugar brix',
      'Enhances nutrient translocation during grand growth & flowering'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Watermelon', 'Papaya', 'Horticulture']
  },
  {
    id: 'power-plant-grow',
    slug: 'grow',
    name: 'Power Plant Grow',
    subtitle: 'Plant Growth Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: hdProductGrowImg,
    bgImage: bgSugarcaneRows,
    badge: 'Humic & Seaweed Formula',
    threeBenefits: [
      'Enhances plant growth',
      'Improves soil fertility',
      'Supports better yields'
    ],
    shortDescription:
      'Enhances plant growth, improves soil fertility and supports better yields.',
    description:
      'Power Plant Grow is an advanced bio-stimulant formulated with Humic Acid, Seaweed Extract, free amino acids, and vital micro-nutrients. It promotes white feeder root proliferation, energizes vegetative tillering, and maximizes nutrient uptake from the soil.',
    highlights: [
      'Stimulates white feeder root proliferation and soil microbial life',
      'Accelerates vegetative shoots, internode length, and canopy cover',
      'Optimizes moisture retention and nutrient assimilation',
      'Fortified with trace minerals, vitamins, and natural growth boosters'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Cereals']
  },
  {
    id: 'power-plant-nitro-king',
    slug: 'nitro-king',
    name: 'Power Plant Nitro King',
    subtitle: 'Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: hdProductNitroKingImg,
    bgImage: bgSugarcaneField,
    badge: 'Chlorophyll Energizer',
    threeBenefits: [
      'Supports plant growth',
      'Improves crop quality',
      'Helps in healthy plant development'
    ],
    shortDescription:
      'Supports plant growth, improves crop quality and helps in healthy plant development with natural extracts.',
    description:
      'Power Plant Nitro King is a rapid-action organic foliage bio-stimulant enriched with Seaweed Extract and Amino Acids. It drives dark-green chlorophyll synthesis, expands leaf surface area, and triggers healthy, stress-resilient vegetative development.',
    highlights: [
      'Supplies bio-available organic nitrogen peptides and amino acids',
      'Prevents leaf yellowing and vegetative growth stagnation',
      'Enhances photosynthetic efficiency and solar light capture',
      'Safe, non-toxic formulation for foliar spray and drip irrigation'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Vegetables']
  },
  {
    id: 'power-plant-premium',
    slug: 'premium',
    name: 'Power Plant Premium',
    subtitle: 'Bio-Stimulant Tonic Bottle',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: hdProductPremiumImg,
    bgImage: bgFarmField,
    badge: 'Cellular Growth Booster',
    threeBenefits: [
      'Triggers cellular multiplication',
      'Accelerates vegetative flushes',
      'Boosts plant immunity & yield'
    ],
    shortDescription:
      'Concentrated bio-stimulant formulated with ocean algae and humic acid to energize active crop metabolism.',
    description:
      'Power Plant Premium is a premium bio-stimulant tonic formulated with sea plant extracts, fulvic fractions, and amino acids. It stimulates cellular multiplication, accelerates vegetative flushes, and boosts plant immunity against adverse environmental stresses.',
    highlights: [
      'Triggers cellular multiplication and lush canopy formation',
      'Accelerates vegetative shoots and stem girth',
      'Enhances photosynthetic chlorophyll levels',
      'Suitable for foliar spray and fertigation'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon']
  },
  {
    id: 'kaipoi-bhoomi-power',
    slug: 'bhoomi-power',
    name: 'Kaipoi Bhoomi Power',
    subtitle: 'Granular Soil Rejuvenator & Conditioner',
    category: 'fertilizer',
    categoryLabel: 'Soil Conditioner',
    netContent: '4 Kg Granular Pack',
    image: hdProductBhoomiPowerImg,
    bgImage: bgSugarcaneCrop,
    badge: 'Multi-Nutrient Soil Food',
    threeBenefits: [
      'Unlocks locked soil nutrients',
      'Increases moisture retention',
      'Fosters beneficial soil microflora'
    ],
    shortDescription:
      'Granular organic soil energizer enriched with humic fractions, mycorrhiza, and vital micronutrients for complete crop development.',
    description:
      'Kaipoi Bhoomi Power is a multi-nutrient granular soil rejuvenator designed for agricultural use. It unlocks locked nutrients in compact soils, increases soil water-holding capacity, and fosters rich mycorrhizal fungal networks for healthy crop root systems.',
    highlights: [
      'Unlocks unavailable locked nutrients in hard soil',
      'Boosts soil water retention, porosity, and aeration',
      'Stimulates beneficial microbial and mycorrhizal colonies',
      'Ideal basal mix for Sugarcane, Banana, Papaya, and Watermelon'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon', 'Field Crops']
  },
  {
    id: 'power-plant-bloom',
    slug: 'bloom',
    name: 'Power Plant Bloom',
    subtitle: 'Flower Bud & Inflorescence Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: hdProductBloomImg,
    bgImage: bgFarmField,
    badge: 'Profuse Flowering Shield',
    threeBenefits: [
      'Stimulates profuse flowering',
      'Minimizes blossom & bud drop',
      'Improves pollination & fruit set'
    ],
    shortDescription:
      'Specialized bio-stimulant formulated to stimulate profuse flowering and prevent blossom drop.',
    description:
      'Power Plant Bloom induces synchronized flower bud differentiation, improves pollination efficiency, and significantly minimizes blossom drop in fruit and flowering crops.',
    highlights: [
      'Promotes uniform and synchronized flowering',
      'Minimizes flower and early bud shed',
      'Enhances female flower ratio in melons & papaya',
      'Strengthens flower pedicel attachment'
    ],
    recommendedCrops: ['Watermelon', 'Papaya', 'Banana', 'Vegetables']
  },
  {
    id: 'power-plant-fruiter',
    slug: 'fruiter',
    name: 'Power Plant Fruiter',
    subtitle: 'Advanced Bio-Stimulator for Fruit Setting',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulator',
    netContent: '1000 ml Bottle',
    image: hdProductFruiterImg,
    bgImage: bgBanana,
    badge: 'Fruit Set & Vigour',
    threeBenefits: [
      'Accelerates fruit enlargement',
      'Improves natural sweetness & brix',
      'Minimizes fruit drop & cracking'
    ],
    shortDescription:
      'Advanced bio-stimulator designed to enhance pollen germination, fruit set, and uniform enlargement.',
    description:
      'Power Plant Fruiter is designed for the post-flowering phase. It enhances pollen viability, fertilisation success, rapid fruit set, and uniform fruit enlargement with higher pulp density and brix.',
    highlights: [
      'Accelerates pollen germination and fruit set',
      'Maximizes fruit weight, circumference, and pulp density',
      'Enhances natural fruit color, gloss, and sweetness',
      'Reduces fruit cracking and physiological drop'
    ],
    recommendedCrops: ['Watermelon', 'Papaya', 'Banana', 'Horticulture']
  },
  {
    id: 'power-plant-st',
    slug: 'st',
    name: 'Power Plant ST',
    subtitle: 'Humic Acid 5% Bio-Stimulant for Seed & Sett',
    category: 'biostimulant',
    categoryLabel: 'Bio-Stimulant',
    netContent: '1000 ml Bottle',
    image: hdProductStImg,
    bgImage: bgSugarcaneRows,
    badge: 'Seed & Sett Treatment',
    threeBenefits: [
      'Breaks cane & seed bud dormancy',
      'Accelerates radicle & shoot emergence',
      'Protects against early soil stress'
    ],
    shortDescription:
      'Specialized 5% humic acid formulation for seed soaking and sugarcane sett treatment.',
    description:
      'Power Plant ST is an organic seed and sugarcane sett treatment liquid. It breaks bud dormancy quickly, accelerates radicle and plumule emergence, and shields seedlings from early soil-borne stress.',
    highlights: [
      'Breaks seed and cane bud dormancy rapidly',
      'Accelerates initial radicle and plumule emergence',
      'Protects young seedlings against damping stress',
      'Ensures uniform, high-percentage field germination'
    ],
    recommendedCrops: ['Sugarcane', 'Watermelon', 'Papaya', 'Cereals']
  },
  {
    id: 'power-plant-stress-out',
    slug: 'stress-out',
    name: 'Power Plant Stress Out',
    subtitle: 'Anti-Stress Crop Shield Bio-Stimulant',
    category: 'biostimulant',
    categoryLabel: 'Crop Protection Shield',
    netContent: '1000 ml Bottle',
    image: hdProductStressOutImg,
    bgImage: bgFarmField,
    badge: 'Abiotic Stress Shield',
    threeBenefits: [
      'Shields crops from drought & heat',
      'Reduces leaf scorching & wilting',
      'Promotes rapid weather recovery'
    ],
    shortDescription:
      'Protective shield for crops against climate uncertainties, moisture stress, and heat shock.',
    description:
      'Power Plant Stress Out is formulated to protect crops from abiotic stress including droughts, unseasonal temperatures, moisture fluctuations, and spray shocks.',
    highlights: [
      'Enhances physiological tolerance against drought and heat',
      'Activates plant antioxidant defense enzymes',
      'Reduces leaf scorching and wilting during dry spells',
      'Promotes rapid recovery from adverse weather shock'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon']
  },
  {
    id: 'agro-crop-sudha',
    slug: 'agro-crop-sudha',
    name: 'Agro Crop Sudha',
    subtitle: 'Plant Growth Promoter & Immunity Booster',
    category: 'biostimulant',
    categoryLabel: 'Growth Promoter',
    netContent: '1000 ml Bottle',
    image: hdProductAgroSudhaImg,
    bgImage: bgSugarcaneField,
    badge: 'Immunity Booster',
    threeBenefits: [
      'Boosts natural disease resistance',
      'Stimulates dark green chlorophyll',
      'Enhances vegetative branch nodes'
    ],
    shortDescription:
      'Herbal plant growth promoter engineered to stimulate vegetative flushes and systemic disease resistance.',
    description:
      'Agro Crop Sudha is an herbal growth promoter and immunity booster that strengthens plant resistance against environmental stresses and promotes healthy foliage development.',
    highlights: [
      'Boosts natural plant immune resistance against pathogens',
      'Stimulates dark green chlorophyll biosynthesis',
      'Enhances vegetative branch nodes and flower clusters',
      'Eco-friendly and certified for organic production'
    ],
    recommendedCrops: ['Sugarcane', 'Banana', 'Papaya', 'Watermelon']
  }
];

export const getFeaturedProducts = () => {
  return AGRICULTURE_PRODUCTS.slice(0, 4);
};

export const getProductById = (idOrSlug) => {
  if (!idOrSlug) return null;
  const clean = idOrSlug.toLowerCase().trim();
  return (
    AGRICULTURE_PRODUCTS.find(
      (p) =>
        p.id.toLowerCase() === clean ||
        p.slug.toLowerCase() === clean ||
        p.name.toLowerCase().replace(/\s+/g, '-') === clean
    ) || null
  );
};

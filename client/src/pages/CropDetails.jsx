import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Droplets,
  Bug,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  HelpCircle,
  Clock,
  TrendingUp,
  MapPin,
  ExternalLink,
  Eye,
  Leaf,
  Package,
  Zap,
  Info
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import Lightbox from '../components/Lightbox';
import { cropService, settingsService, DEFAULT_SETTINGS } from '../services/api';
import { openWhatsApp } from '../utils/whatsapp';

// Crop Photography Assets
import sugarcaneField from '../assets/sugarcane-field.jpg';
import sugarcaneCrop from '../assets/sugarcane-crop.jpg';
import sugarcaneRows from '../assets/sugarcane-rows.jpg';
import sugarcaneCloseup from '../assets/sugarcane-closeup.jpg';

import hdBananaPlantation from '../assets/hd-banana-plantation.jpg';
import bananaImg from '../assets/banana.jpg';
import bananaBunch from '../assets/banana-bunch.jpg';
import aboutFarmer from '../assets/about-farmer-inspecting.jpg';

import papayaImg from '../assets/papaya.jpg';
import papayaTree from '../assets/papaya-tree.jpg';
import heroFarmer from '../assets/hero-farmer.jpg';

import hdWatermelonField from '../assets/hd-watermelon-field.jpg';
import watermelonImg from '../assets/watermelon.jpg';
import rameshFarmer from '../assets/ramesh-farmer.jpg';

import farmField from '../assets/farm-field.jpg';
import farmTractor from '../assets/farm-tractor.jpg';

// Ultra-HD 3D Product Mockup Assets
import hdProductProm from '../assets/hd-power-plant-prom.jpg';
import hdProductPotash from '../assets/hd-power-plant-potash.jpg';
import hdProductGrow from '../assets/hd-power-plant-grow.jpg';
import hdProductNitroKing from '../assets/hd-power-plant-nitro-king.jpg';
import hdProductPremium from '../assets/hd-power-plant-premium.jpg';
import hdProductBhoomiPower from '../assets/hd-kaipoi-bhoomi-power.jpg';
import hdProductBloom from '../assets/hd-power-plant-bloom.jpg';
import hdProductFruiter from '../assets/hd-power-plant-fruiter.jpg';
import hdProductSt from '../assets/hd-power-plant-st.jpg';
import hdProductStressOut from '../assets/hd-power-plant-stress-out.jpg';
import hdProductAgroSudha from '../assets/hd-agro-crop-sudha.jpg';

export const CROP_CONFIGS = {
  sugarcane: {
    slug: 'sugarcane',
    name: 'Sugarcane Farming',
    cropName: 'Sugarcane',
    tagline: 'High Yield • Better Sugar Recovery • Expert Organic Guidance',
    heroDescription:
      'Systematic agronomic support covering sett selection, deep trench preparation, biological nutrition, borer scouting, and peak brix harvesting for maximum commercial cane tonnage.',
    heroBg: sugarcaneField,
    cropPhoto: sugarcaneCrop,
    quickStats: [
      { label: 'Crop Duration', val: '10–14 Months', icon: 'clock' },
      { label: 'Ideal Soil pH', val: '6.5 – 7.8', icon: 'soil' },
      { label: 'Prime Variety', val: 'Co 86032 / CoM 0265', icon: 'sprout' },
      { label: 'Target Yield', val: '65–85 Tons / Acre', icon: 'award' }
    ],
    checklist: [
      'Certified High-Yield Cultivar Selection',
      'Deep Furrow & Trench Land Architecture',
      'Organic Sett Bio-Treatment Slurry',
      'Micro-Drip Fertigation Schedules',
      'Biological IPM & Shoot Borer Suppression',
      'Peak Sucrose Brix Harvest Timing'
    ],
    overview:
      'Sugarcane (Saccharum officinarum) is an intensive, long-duration cash crop requiring systematic agronomic attention. Sri Nandi Krishi Organic Enterprise provides specialized advisory to help farmers transition from excessive chemical dependency to high-efficiency biological farming. Through balanced humic inputs, Trichoderma sett treatment, and micro-drip fertigation, our farmers achieve superior stalk girth, dense internodes, and high commercial cane sugar (CCS) recovery.',
    keyBenefits: [
      {
        badge: 'Higher Tonnage',
        text: 'Balanced organic silicon and bio-potash strengthen rind integrity and maximize cane stalk weight.'
      },
      {
        badge: '18°+ Sugar Brix',
        text: 'Scientifically calibrated irrigation withdrawal enhances sugar crystallization before factory mill delivery.'
      },
      {
        badge: 'Red Rot Shield',
        text: 'Biological biocontrol agents and pheromone trapping slash early shoot borer and fungal losses.'
      },
      {
        badge: '3+ Ratoon Yields',
        text: 'Stubble management protocols ensure profitable second and third ratoon harvests matching plant crops.'
      }
    ],
    galleryImages: [
      {
        imageUrl: sugarcaneField,
        title: 'Deep Trench Plantation Geometry',
        caption: '5-foot wide furrow trench setup delivering uniform sunlight and aeration across Karnataka cane fields.',
        tag: 'Field Geometry'
      },
      {
        imageUrl: sugarcaneCrop,
        title: 'Dense Internodes & Stalk Girth',
        caption: 'Healthy crop development under Power Plant PROM and organic potassium bio-fertigation.',
        tag: 'Crop Health'
      },
      {
        imageUrl: sugarcaneRows,
        title: 'Paired-Row Micro-Drip System',
        caption: 'Inline drip laterals conserving 45% water while delivering soluble biological nutrients directly to root zones.',
        tag: 'Micro-Irrigation'
      },
      {
        imageUrl: sugarcaneCloseup,
        title: 'Disease-Free High-Brix Stalks',
        caption: 'Uniform maturity and thick stalks ready for harvesting with refractometer brix exceeding 19°.',
        tag: 'Harvest Quality'
      }
    ],
    recommendedProducts: [
      {
        name: 'Power Plant PROM',
        subtitle: 'Phosphate Rich Organic Manure',
        netContent: '50 Kg Bag',
        image: hdProductProm,
        slug: 'prom',
        stageTag: 'Basal Land Preparation',
        usage: '50–100 Kg / Acre incorporated in planting trenches with compost',
        benefit: 'Accelerates early root branching and prevents phosphate lockup'
      },
      {
        name: 'Power Plant ST',
        subtitle: 'Humic Acid 5% Bio-Stimulant',
        netContent: '1000 ml Bottle',
        image: hdProductSt,
        slug: 'st',
        stageTag: 'Sett Treatment & Sprouting',
        usage: '2–3 ml / Liter water for sett soaking slurry (15-20 mins)',
        benefit: 'Breaks cane bud dormancy and ensures uniform 95%+ field germination'
      },
      {
        name: 'Power Plant Potash',
        subtitle: 'Bio-Available Organic Fertilizer',
        netContent: '50 Kg Bag',
        image: hdProductPotash,
        slug: 'potash',
        stageTag: 'Grand Growth & Earthing-Up',
        usage: '50 Kg / Acre applied during second earthing-up (Day 100–120)',
        benefit: 'Drives stalk thickness, internode girth and elevated sugar brix'
      },
      {
        name: 'Power Plant Grow',
        subtitle: 'Plant Growth Bio-Stimulant',
        netContent: '1000 ml Bottle',
        image: hdProductGrow,
        slug: 'grow',
        stageTag: 'Active Tillering Phase',
        usage: '2–3 ml / Liter foliar spray at Day 45 and Day 75',
        benefit: 'Encourages 8–10 vigorous productive tillers per clump'
      }
    ],
    agronomicPillars: [
      {
        icon: 'soil',
        image: farmField,
        metric: 'pH 6.5–7.8 • Deep Fertile Loam',
        title: 'Suitable Soil & Climate',
        content:
          'Deep, well-drained loams, clay loams, or alluvial soils with a neutral pH of 6.5–7.8. Sugarcane requires warm, tropical temperatures between 20°C and 35°C with abundant sunshine during maturation. Avoid waterlogged or heavy saline-alkali fields.'
      },
      {
        icon: 'sprout',
        image: farmTractor,
        metric: '4–5 ft Trenches • Trichoderma',
        title: 'Land Preparation & Planting',
        content:
          'Deep subsoiling and moldboard plowing (2–3 passes) followed by rotavator tilling. Incorporate 10–15 tons of well-rotted FYM, vermicompost, and Trichoderma per acre. Form deep trenches at 4 to 5 ft row spacing. Treat 2-bud setts in a slurry of Trichoderma viride and Jeevamrutha before placing buds laterally.'
      },
      {
        icon: 'sparkles',
        image: sugarcaneCloseup,
        metric: 'Co 86032 & CoM 0265',
        title: 'Variety Selection',
        content:
          'Premier certified cultivars: Co 86032 (Nayana – high sugar recovery and unmatched ratoon vigor), CoM 0265 (heavy tonnage and drought resilience), Co 09004, and Co 8014. Selected based on mill demand and local water security.'
      },
      {
        icon: 'droplets',
        image: sugarcaneRows,
        metric: 'Micro-Drip • 45% Water Savings',
        title: 'Irrigation & Nutrient Management',
        content:
          'Inline micro-drip irrigation with 45% water savings. Basal fertilization with neem cake and rock phosphate; regular fertigation with fermented Jeevamrutha and Potash Mobilizing Bacteria (KSB). Micronutrient sprays of Zinc, Iron, and Silica during grand growth prevent chlorosis.'
      },
      {
        icon: 'bug',
        image: sugarcaneCrop,
        metric: 'Bio-IPM • Pheromone Trapping',
        title: 'Pest & Disease Management',
        content:
          'Integrated pest management (IPM): Early shoot borer control using pheromone traps (5/acre) and Trichogramma egg parasitoids; white grub management with Metarhizium anisopliae; red rot and smut prevention through sett sanitization and botanical Dashaparni sprays.'
      },
      {
        icon: 'shield',
        image: sugarcaneField,
        metric: 'Stubble Shaving & Trash Mulch',
        title: 'Ratoon Management Protocol',
        content:
          'Post-harvest stubble shaving at ground level, off-barring, trash mulching with biological decomposing consortia, and immediate flush irrigation to deliver ratoon yields matching the plant crop.'
      }
    ],
    stages: [
      {
        stepNumber: 1,
        durationBadge: 'Days 0–35',
        stageStatus: 'Sett Sprouting & Roots',
        title: 'Germination Stage',
        description:
          'Sett sprouting, primary root development, and weed-free furrow maintenance. Ensure uniform soil moisture without water stagnation.'
      },
      {
        stepNumber: 2,
        durationBadge: 'Days 35–100',
        stageStatus: 'Tillering Phase',
        title: 'Tillering Stage',
        description:
          'Shoot multiplication, initial earthing-up, and high-nitrogen organic bio-fertigation. Encourage 8–10 vigorous tillers per clump.'
      },
      {
        stepNumber: 3,
        durationBadge: 'Days 100–270',
        stageStatus: 'Canopy & Girth Bulking',
        title: 'Grand Growth Stage',
        description:
          'Rapid internode elongation, full canopy leaf development, and second earthing-up. Supplement with bio-potash and silica for thick cane girth.'
      },
      {
        stepNumber: 4,
        durationBadge: 'Days 270–360',
        stageStatus: 'Sucrose Accumulation',
        title: 'Maturation & Ripening',
        description:
          'Sucrose synthesis within stalk tissues. Withhold irrigation 10–15 days prior to cutting to concentrate sugar juice density.'
      },
      {
        stepNumber: 5,
        durationBadge: 'Months 11–14',
        stageStatus: 'Brix 18°+ Verification',
        title: 'Harvest & Mill Transit',
        description:
          'Ground-level cutting using sharp cane knives when refractometer brix exceeds 18–20%. Quick factory transit prevents post-cut inversion losses.'
      }
    ],
    faqs: [
      {
        question: 'What spacing is best for high sugarcane yield with drip irrigation?',
        answer:
          'We recommend wide-row spacing of 4 to 5 feet, which allows ample sunlight interception, encourages vigorous tillering, and facilitates mechanized weeding and earthing-up.'
      },
      {
        question: 'How do organic practices improve sugarcane brix and sugar recovery?',
        answer:
          'Organic bio-fertilizers like Potash Mobilizing Bacteria (KSB) and rich humic fractions improve stalk density and nutrient assimilation, preventing excessive vegetative nitrogen succulent growth and maximizing sucrose crystallization.'
      },
      {
        question: 'What is the recommended sett treatment before planting?',
        answer:
          'Soak setts for 15-20 minutes in a biological slurry of Trichoderma viride, Pseudomonas fluorescens, and diluted Jeevamrutha or Power Plant ST to prevent red rot and enhance sprouting percentage.'
      },
      {
        question: 'How does Sri Nandi Krishi support sugarcane ratoon crops?',
        answer:
          'We offer tailored ratoon management protocols: stubble shaving, off-barring, trash mulching, and immediate root stimulation to ensure 1st and 2nd ratoon yields match the plant crop.'
      }
    ]
  },

  banana: {
    slug: 'banana',
    name: 'Banana Farming',
    cropName: 'Banana',
    tagline: 'Healthy Plants • Heavy Bunch Weight • Export Quality Guidance',
    heroDescription:
      'Complete technical guidance from secondary hardened tissue culture plantlets to nutrition scheduling, bunch bagging, and premium marketing for maximum bunch weight.',
    heroBg: hdBananaPlantation,
    cropPhoto: bananaBunch,
    quickStats: [
      { label: 'Crop Duration', val: '10–12 Months', icon: 'clock' },
      { label: 'Ideal Soil pH', val: '6.0 – 7.5', icon: 'soil' },
      { label: 'Prime Variety', val: 'Grand Naine (G9)', icon: 'sprout' },
      { label: 'Target Yield', val: '32–42 Tons / Acre', icon: 'award' }
    ],
    checklist: [
      'Virus-Indexed Secondary Hardened Plants',
      'Paired Row & Pit Spacing Architecture',
      'Organic Drip Fertigation Schedules',
      'Sigatoka Leaf Spot Preventive Shield',
      'Denavelling & Bunch Sleeving Protocols',
      'Export Finger Grading & Post-Harvest'
    ],
    overview:
      'Banana (Musa acuminata) is a fast-growing, heavy-feeding tropical fruit requiring regular nutritional replenishment and uniform moisture. Sri Nandi Krishi Organic Enterprise guides farmers on high-density planting using certified tissue culture plantlets, balanced organic fertilizers, and biological bunch protection to produce clean, spot-free hands that command premium prices in wholesale and export markets.',
    keyBenefits: [
      {
        badge: '32–36 Kg Bunches',
        text: 'Scientific denavelling and potassium bio-fertigation yield heavy, uniform, well-filled bunches.'
      },
      {
        badge: 'Spot-Free Export Grade',
        text: 'Breathable non-woven bunch covers protect against thrips, sunscald, and abrasions.'
      },
      {
        badge: 'Anti-Lodging Anchor',
        text: 'Bio-silicon and organic humates strengthen pseudostems and root anchors under heavy loads.'
      },
      {
        badge: '10-Month Harvest',
        text: 'Uniform tissue culture seedlings synchronize harvest windows within 10–11 months.'
      }
    ],
    galleryImages: [
      {
        imageUrl: hdBananaPlantation,
        title: 'Grand Naine G9 Plantation',
        caption: 'Commercial-grade high-density banana orchard with micro-drip fertigation lines and healthy broad leaves.',
        tag: 'Plantation Overview'
      },
      {
        imageUrl: bananaImg,
        title: 'Lush Pseudostem Canopy',
        caption: 'Vigorous leaf growth maintaining 30+ functional green leaves prior to flower shooting.',
        tag: 'Vegetative Vigor'
      },
      {
        imageUrl: bananaBunch,
        title: 'Heavy 35 Kg Bunch Bulking',
        caption: 'Spot-free banana hands with uniform finger curving protected under organic Sleeving protocols.',
        tag: 'Bunch Quality'
      },
      {
        imageUrl: aboutFarmer,
        title: 'Agronomist Field Advisory',
        caption: 'One-on-one farm inspection checking root proliferation, soil moisture, and pest scouting.',
        tag: 'Field Advisory'
      }
    ],
    recommendedProducts: [
      {
        name: 'Kaipoi Bhoomi Power',
        subtitle: 'Soil Rejuvenator & Conditioner',
        netContent: '4 Kg Granular Pack',
        image: hdProductBhoomiPower,
        slug: 'bhoomi-power',
        stageTag: 'Pit Preparation & Planting',
        usage: '100–150g per pit mixed with composted FYM',
        benefit: 'Fosters mycorrhizal fungal networks and prevents transplant shock'
      },
      {
        name: 'Power Plant Grow',
        subtitle: 'Plant Growth Bio-Stimulant',
        netContent: '1000 ml Bottle',
        image: hdProductGrow,
        slug: 'grow',
        stageTag: 'Canopy Building (Months 2–5)',
        usage: '2 ml / Liter foliar spray or 1L / acre fertigation monthly',
        benefit: 'Ensures 30+ healthy green functional leaves before flower shooting'
      },
      {
        name: 'Power Plant Potash',
        subtitle: 'Bio-Available Potassium Fertilizer',
        netContent: '50 Kg Bag',
        image: hdProductPotash,
        slug: 'potash',
        stageTag: 'Shooting & Bunch Bulking',
        usage: '150g / plant split into 2 monthly doses after flower emergence',
        benefit: 'Significantly increases bunch weight to 32–36 kg with uniform fingers'
      },
      {
        name: 'Power Plant Fruiter',
        subtitle: 'Advanced Fruit Bio-Stimulator',
        netContent: '1000 ml Bottle',
        image: hdProductFruiter,
        slug: 'fruiter',
        stageTag: 'Post-Denavelling Bunch Spray',
        usage: '2 ml / Liter foliar spray after removing male flower bud',
        benefit: 'Improves finger length, export shine and reduces peel abrasions'
      }
    ],
    agronomicPillars: [
      {
        icon: 'soil',
        image: hdBananaPlantation,
        metric: '15°C–35°C • pH 6.0–7.5',
        title: 'Climate & Soil Requirements',
        content:
          'Warm, humid tropical climate (15°C–35°C) shielded from high-velocity desiccating winds. Deep, fertile, well-drained sandy loam or clay loam with high organic matter and pH 6.0–7.5. Banana roots are highly sensitive to poor drainage and waterlogging.'
      },
      {
        icon: 'sprout',
        image: farmTractor,
        metric: '6×6 ft • 10kg Organic FYM',
        title: 'Tissue Culture & Pit Preparation',
        content:
          'Dig pits of 45×45×45 cm or 60×60×60 cm spaced at 6×6 ft (1,200 plants/acre) or 5×7 ft paired row spacing. Incorporate 10 kg composted FYM, 250g neem cake, 50g Trichoderma, and mycorrhiza per pit. Plant tissue culture seedlings carefully without breaking root plugs and irrigate immediately.'
      },
      {
        icon: 'sparkles',
        image: bananaBunch,
        metric: 'Grand Naine (G9) Certified',
        title: 'Variety Selection & Planting Material',
        content:
          'Grand Naine (G9 – the leading commercial variety with large cylindrical bunches, uniform fingers, and excellent transport resilience), Robusta, Yelakki (Ney Poovan – high retail aroma and premium local price), and Red Banana.'
      },
      {
        icon: 'droplets',
        image: bananaImg,
        metric: 'Drip 20L/day • Bio-Potash',
        title: 'Irrigation & Fertilizer Scheduling',
        content:
          'Drip irrigation delivering 15–20 liters/plant/day during vegetative stages and 20–25 liters during shooting. Structured monthly fertigation with Jeevamrutha, bio-potash (Frateuria aurantia), and foliar sprays of Zinc, Boron, and Magnesium to prevent bunch choking.'
      },
      {
        icon: 'bug',
        image: aboutFarmer,
        metric: 'Sigatoka Shield • Bio-IPM',
        title: 'Pest & Disease Prevention',
        content:
          'Preventive Sigatoka leaf spot control through timely de-trashing and potassium silicate + bio-fungicide sprays; rhizome weevil & stem borer management using cosmos traps and Beauveria bassiana; aphid vector suppression with yellow sticky cards and neem oil.'
      },
      {
        icon: 'shield',
        image: bananaBunch,
        metric: 'Denavelling • 35kg Bunches',
        title: 'Bunch Management & Protection',
        content:
          'Propping fruiting trees with bamboo poles; removal of the terminal male bud (denavelling) to channel photoassimilates; non-woven polypropylene bunch sleeving; harvesting when finger angles round off and peel turns light green.'
      }
    ],
    stages: [
      {
        stepNumber: 1,
        durationBadge: 'Months 1–2',
        stageStatus: 'Acclimatization & Roots',
        title: 'Planting & Establishment',
        description:
          'Acclimatization, root proliferation, and preventive root-drenching with bio-inoculants.'
      },
      {
        stepNumber: 2,
        durationBadge: 'Months 3–5',
        stageStatus: 'Canopy Bulking',
        title: 'Active Vegetative Growth',
        description:
          'Vigorous leaf canopy formation, targeting 30+ healthy green functional leaves before flowering.'
      },
      {
        stepNumber: 3,
        durationBadge: 'Months 6–8',
        stageStatus: 'Denavelling & Hands',
        title: 'Shooting & Inflorescence',
        description:
          'Emergence of flower bracts, opening of hands, and timely denavelling of the terminal male bud.'
      },
      {
        stepNumber: 4,
        durationBadge: 'Months 8–10',
        stageStatus: 'Potassium Bulking',
        title: 'Bunch Bulking & Sleeving',
        description:
          'Bagging with non-woven protective sleeves, potassium fertigation, and bamboo bunch propping.'
      },
      {
        stepNumber: 5,
        durationBadge: 'Months 10–12',
        stageStatus: '75–80% Maturity Cut',
        title: 'Harvest & Sorting',
        description:
          'Harvesting bunches at 75–80% maturity; washing in alum water, sorting, and cushioned packing.'
      }
    ],
    faqs: [
      {
        question: 'Why should I choose tissue culture plants over conventional suckers?',
        answer:
          'Tissue culture plants are uniform, virus-free, disease-resistant, mature earlier (within 10-11 months), and produce 20-30% higher bunch weights compared to regular suckers.'
      },
      {
        question: 'What is denavelling and why is it important in banana?',
        answer:
          'Denavelling is the removal of the male flower bud after the last hand of the bunch has formed. It conserves plant energy and increases bunch weight by 8-12%.'
      },
      {
        question: 'How do I prevent Sigatoka leaf spot during monsoon?',
        answer:
          'Maintain good plantation aeration, remove dried or infected lower leaves (de-trashing), improve soil drainage, and apply preventive sprays of bio-fungicides combined with neem oil.'
      },
      {
        question: 'What spacing gives the best return for Grand Naine banana?',
        answer:
          '6 ft × 6 ft (1,200 plants/acre) or 5 ft × 7 ft (1,240 plants/acre) with drip irrigation delivers optimal bunch weight, uniform sunlight, and convenient intercultural access.'
      }
    ]
  },

  papaya: {
    slug: 'papaya',
    name: 'Papaya Farming',
    cropName: 'Papaya',
    tagline: 'Fast Growth • High Sugar Content • Continuous Cash Flow',
    heroDescription:
      'Specialized commercial guidance on raised bed geometry, ring irrigation, PRSV vector barriers, and high-brix Red Lady 786 production for premium market prices.',
    heroBg: papayaImg,
    cropPhoto: papayaTree,
    quickStats: [
      { label: 'First Harvest', val: '8–10 Months', icon: 'clock' },
      { label: 'Ideal Soil pH', val: '6.0 – 7.0', icon: 'soil' },
      { label: 'Prime Variety', val: 'Red Lady 786', icon: 'sprout' },
      { label: 'Target Yield', val: '45–65 Tons / Acre', icon: 'award' }
    ],
    checklist: [
      '100% Productive Gynodioecious Seedlings',
      'Raised Bed & Deep Drainage Layout',
      'Ring Irrigation (Dry Collar Protocol)',
      'Organic Humic & Bio-Fertilizer Schedule',
      'PRSV Vector Barrier & Sticky Trapping',
      'Fruit Thinning & Harvest Handling'
    ],
    overview:
      'Papaya (Carica papaya) is one of the highest returning horticultural crops, yielding delicious, market-demanded fruits within 9 months of planting. Sri Nandi Krishi Organic Enterprise guides growers in virgin field preparation, raised bed architecture, ring irrigation to prevent stem rot, and biological aphid suppression to protect orchards from Papaya Ringspot Virus (PRSV).',
    keyBenefits: [
      {
        badge: 'Zero Collar Rot',
        text: 'Raised bed geometry and isolated ring irrigation keep stem bases dry and prevent fungal rot.'
      },
      {
        badge: '14° Brix Sweetness',
        text: 'Organic potassium bio-fertilizers produce deep orange-red, sweet, thick, fragrant pulp.'
      },
      {
        badge: '24+ Month Harvest',
        text: 'Balanced nutrition and micronutrient foliar sprays extend productive harvest lifespan.'
      },
      {
        badge: '100% Female / Hermaphrodite',
        text: 'Zero male tree wastage with certified gynodioecious seedlings maximizing yield per acre.'
      }
    ],
    galleryImages: [
      {
        imageUrl: papayaImg,
        title: 'Raised-Bed Red Lady 786 Orchard',
        caption: '1.5-foot raised beds with dedicated ring irrigation preventing water stagnation around tree collars.',
        tag: 'Orchard Architecture'
      },
      {
        imageUrl: papayaTree,
        title: 'Spiral Fruit Bearing on Trunk',
        caption: 'Dense fruit cluster bearing 50-80 kg per tree with balanced organic bio-stimulants.',
        tag: 'Heavy Bearing'
      },
      {
        imageUrl: farmField,
        title: 'Border Windbreak & Vector Shield',
        caption: 'Maize and sorghum barrier borders repelling aphid vectors to keep orchards PRSV-free.',
        tag: 'Biosecurity Barrier'
      },
      {
        imageUrl: heroFarmer,
        title: 'Commercial Harvest & Sorting',
        caption: 'Harvesting at color break stage with gentle cushioned packing for export and metro markets.',
        tag: 'Harvest & Sorting'
      }
    ],
    recommendedProducts: [
      {
        name: 'Power Plant Grow',
        subtitle: 'Plant Growth Bio-Stimulant',
        netContent: '1000 ml Bottle',
        image: hdProductGrow,
        slug: 'grow',
        stageTag: 'Vegetative Trunk Building',
        usage: '2 ml / Liter foliar spray every 25 days during vegetative phase',
        benefit: 'Accelerates sturdy stem girth and deep green sun-harvesting umbrella canopy'
      },
      {
        name: 'Power Plant Bloom',
        subtitle: 'Flower Bud & Inflorescence Stimulant',
        netContent: '1000 ml Bottle',
        image: hdProductBloom,
        slug: 'bloom',
        stageTag: 'Flowering & Fruit Set (Months 4–6)',
        usage: '2 ml / Liter foliar spray at early flowering flush',
        benefit: 'Minimizes blossom shed and maximizes hermaphrodite fruit retention'
      },
      {
        name: 'Power Plant Fruiter',
        subtitle: 'Advanced Fruit Bulking Stimulator',
        netContent: '1000 ml Bottle',
        image: hdProductFruiter,
        slug: 'fruiter',
        stageTag: 'Fruit Sizing & Flesh Thickness',
        usage: '2.5 ml / Liter spray every 20 days during fruit bulking',
        benefit: 'Eliminates fruit cracking, thickens pulp wall and elevates sugar brix'
      },
      {
        name: 'Power Plant Stress Out',
        subtitle: 'Anti-Stress Crop Shield',
        netContent: '1000 ml Bottle',
        image: hdProductStressOut,
        slug: 'stress-out',
        stageTag: 'Monsoon & Heat Protection',
        usage: '2 ml / Liter preventive spray during adverse weather',
        benefit: 'Shields delicate papaya tissues from weather shock and vector stress'
      }
    ],
    agronomicPillars: [
      {
        icon: 'soil',
        image: farmField,
        metric: '22°C–32°C • Strict Drainage',
        title: 'Climate, Sunlight & Soil Conditions',
        content:
          'Warm, sunny climate (22°C–32°C) free from frost and strong winds. Fertile, well-drained sandy loam or alluvial soil with pH 6.0–7.0. Stagnant moisture for even 24–48 hours causes fatal collar rot; excellent internal soil drainage is compulsory.'
      },
      {
        icon: 'sprout',
        image: farmTractor,
        metric: 'Raised Beds 1.5ft • 6×6 ft',
        title: 'Pit Preparation & Raised Bed Planting',
        content:
          'Build raised beds 1–1.5 ft high. Dig pits of 45×45×45 cm spaced at 6×6 ft (1,200 plants/acre) or 7×6 ft. Fill pits with topsoil, 8 kg vermicompost, 200g neem cake, and Trichoderma viride. Transplant 45-day-old vigorous nursery seedlings in the evening.'
      },
      {
        icon: 'sparkles',
        image: papayaTree,
        metric: 'Red Lady 786 Gynodioecious',
        title: 'Variety Selection (Red Lady 786)',
        content:
          'Red Lady 786 (Taiwan 786 – champion gynodioecious hybrid producing heavy female and bisexual fruits, deep red sweet flesh, 12–14° Brix, and thick skin ideal for transport), Iceberg, and Pusa Delicious.'
      },
      {
        icon: 'droplets',
        image: papayaImg,
        metric: 'Ring Drip • Dry Collar Zone',
        title: 'Water Management & Ring Irrigation',
        content:
          'Strictly avoid flood irrigation or water splashing onto the main stem trunk. Install double lateral drip lines situated 30–45 cm away from the stem base or create circular earthen ring ridges to keep collar dry at all times.'
      },
      {
        icon: 'bug',
        image: heroFarmer,
        metric: 'Barrier Crops • 25 Traps/Acre',
        title: 'Viral Disease Protection (PRSV & Vectors)',
        content:
          'Plant 4 dense perimeter barrier rows of maize, sorghum, or Napier grass; install 25 yellow sticky cards per acre; spray neem oil (10,000 ppm) with bio-stimulants to repel vector aphids; rogue out infected plants immediately.'
      },
      {
        icon: 'shield',
        image: papayaTree,
        metric: 'Monthly Bio-NPK & Boron',
        title: 'Fertilizer Application & Micronutrients',
        content:
          'Papaya feeds continuously. Apply monthly doses of composted manure, bio-NPK consortia, mustard/neem cake, and humic acid. Monthly foliar sprays of Boron (to prevent bumpy fruit deformity), Zinc, and Calcium for firm skin and transport shelf life.'
      }
    ],
    stages: [
      {
        stepNumber: 1,
        durationBadge: 'Months 1–2',
        stageStatus: 'Raised Bed Transplanting',
        title: 'Nursery & Transplanting',
        description:
          'Healthy seedling raising, hardening, and planting on raised beds with bio-inoculant drenches.'
      },
      {
        stepNumber: 2,
        durationBadge: 'Months 2–4',
        stageStatus: 'Trunk & Umbrella Canopy',
        title: 'Vegetative Growth',
        description:
          'Stem height expansion, leaf umbrella development, and basal organic feeding.'
      },
      {
        stepNumber: 3,
        durationBadge: 'Months 4–6',
        stageStatus: 'Fruit Set & Node Thinning',
        title: 'Flowering & Fruit Set',
        description:
          'Flower opening, fruit set, and thinning overcrowded fruits to 1–2 per node for uniform sizing.'
      },
      {
        stepNumber: 4,
        durationBadge: 'Months 6–8',
        stageStatus: 'Pulp Thickness & Sugar',
        title: 'Fruit Sizing & Sugar Bulking',
        description:
          'Potassium and boron fertigation for flesh thickness, firm texture, and sugar accumulation.'
      },
      {
        stepNumber: 5,
        durationBadge: 'Months 8–12+',
        stageStatus: 'Color Break Harvest',
        title: 'Color Break & Harvest',
        description:
          'Harvesting when 1–2 yellow streaks appear at blossom end; cushioning in paper crates.'
      }
    ],
    faqs: [
      {
        question: 'Why is Red Lady 786 preferred by commercial growers?',
        answer:
          'Red Lady 786 is gynodioecious (every plant produces fruit, eliminating unproductive male trees), starts fruiting at low height, yields 50-80 kg/plant, and has firm red flesh with high market appeal.'
      },
      {
        question: 'How do you prevent collar rot and root rot in papaya?',
        answer:
          'Raised bed planting, ensuring drip emitters are kept away from the trunk, applying Trichoderma viride enriched compost, and avoiding soil waterlogging are critical preventive measures.'
      },
      {
        question: 'Can Papaya Ringspot Virus (PRSV) be cured once a plant is infected?',
        answer:
          'No chemical cure exists for viral diseases; preventive management is key. We focus on barrier crops, aphid suppression, high-vigor organic nutrition, and prompt rogueing of early infected specimens to protect the orchard.'
      },
      {
        question: 'How many plants can be cultivated in 1 acre of land?',
        answer:
          'At 6 ft × 6 ft spacing, approximately 1,200 plants are accommodated. At 7 ft × 6 ft, around 1,030 plants are planted, allowing tractor inter-cultivation.'
      }
    ]
  },

  watermelon: {
    slug: 'watermelon',
    name: 'Watermelon Farming',
    cropName: 'Watermelon',
    tagline: 'Fast 80-Day Cycle • Crisp Sweet Fruit • High Profit Potential',
    heroDescription:
      'Precision agronomy for short-cycle watermelon cultivation, covering silver-black mulching setup, drip fertigation schedules, and peak brix sweetness for summer markets.',
    heroBg: hdWatermelonField,
    cropPhoto: watermelonImg,
    quickStats: [
      { label: 'Crop Duration', val: '75–90 Days', icon: 'clock' },
      { label: 'Ideal Soil pH', val: '6.0 – 7.2', icon: 'soil' },
      { label: 'Prime Variety', val: 'Sugar Baby / Kiran', icon: 'sprout' },
      { label: 'Target Yield', val: '26–36 Tons / Acre', icon: 'award' }
    ],
    checklist: [
      'Certified High-Yield Hybrid Seed Selection',
      'Raised Broad Bed & Drip Lateral Setup',
      '25-Micron Silver-Black Mulching Sheet',
      'Bee Pollination & Flower Retention Care',
      'Bio-Fungicide & Fruit Fly Pheromone Traps',
      'Tendril-Dry & Ground-Spot Harvest Timing'
    ],
    overview:
      'Watermelon (Citrullus lanatus) is a fast, highly profitable short-duration cash crop requiring precise soil moisture and nutritional calibration. Sri Nandi Krishi Organic Enterprise guides farmers through raised bed construction, silver-black plastic mulching, inline drip fertigation, and natural pollinator management to achieve dense, sweet fruits with high sugar brix and zero hollow-heart.',
    keyBenefits: [
      {
        badge: '12°+ Brix Sweetness',
        text: 'Calibrated organic potassium and irrigation withdrawal create crisp, deep-red, sweet flesh.'
      },
      {
        badge: 'Zero Weed Competition',
        text: 'Silver-black mulch blocks weeds completely and conserves 50% irrigation moisture.'
      },
      {
        badge: 'No Blossom End Rot',
        text: 'Balanced calcium-boron foliar sprays prevent fruit cracking and blossom rot.'
      },
      {
        badge: 'Fast 80-Day Revenue',
        text: 'Quick crop cycle catches lucrative early-season pricing before market gluts.'
      }
    ],
    galleryImages: [
      {
        imageUrl: hdWatermelonField,
        title: 'Silver-Black Mulch Broad Beds',
        caption: '25-micron reflective mulch conserving soil water and warming root zones for 12 days earlier harvest.',
        tag: 'Mulch Technology'
      },
      {
        imageUrl: watermelonImg,
        title: 'Heavy Uniform Melon Bulking',
        caption: 'Uniform oval fruits developing on clean plastic mulch without ground rot or blemishes.',
        tag: 'Fruit Bulking'
      },
      {
        imageUrl: farmField,
        title: 'Micro-Drip Fertigation Setup',
        caption: 'Precision inline emitters delivering soluble organic bio-stimulants directly to root zones.',
        tag: 'Precision Drip'
      },
      {
        imageUrl: rameshFarmer,
        title: 'Crisp High-Brix 12° Harvest',
        caption: 'Peak harvest verification based on dry curly tendril and golden ground spot maturity indicators.',
        tag: 'Harvest & Brix'
      }
    ],
    recommendedProducts: [
      {
        name: 'Power Plant ST',
        subtitle: 'Seed Priming & Treatment',
        netContent: '1000 ml Bottle',
        image: hdProductSt,
        slug: 'st',
        stageTag: 'Seed Priming Before Sowing',
        usage: '5 ml / Kg seed soaking for 30 minutes in water',
        benefit: 'Ensures 98%+ uniform germination and protects tender radicles'
      },
      {
        name: 'Power Plant Grow',
        subtitle: 'Plant Growth Bio-Stimulant',
        netContent: '1000 ml Bottle',
        image: hdProductGrow,
        slug: 'grow',
        stageTag: 'Active Vine Running (Days 15–30)',
        usage: '2 ml / Liter foliar spray or fertigation drench',
        benefit: 'Drives rapid vine spreading and thick leaf cover over silver mulch'
      },
      {
        name: 'Power Plant Bloom',
        subtitle: 'Flowering & Pollination Booster',
        netContent: '1000 ml Bottle',
        image: hdProductBloom,
        slug: 'bloom',
        stageTag: 'Blossom Opening (Days 35–45)',
        usage: '2 ml / Liter foliar spray at first flower appearance',
        benefit: 'Attracts natural bee pollinators and promotes female flower retention'
      },
      {
        name: 'Power Plant Fruiter',
        subtitle: 'Fruit Setting & Sweetness Tonic',
        netContent: '1000 ml Bottle',
        image: hdProductFruiter,
        slug: 'fruiter',
        stageTag: 'Fruit Sizing & Ripening (Days 50–75)',
        usage: '2.5 ml / Liter spray when fruit reaches lemon size',
        benefit: 'Creates deep red, crisp sweet pulp with 12°+ Brix and zero hollow-heart'
      }
    ],
    agronomicPillars: [
      {
        icon: 'soil',
        image: farmField,
        metric: '24°C–32°C • Warm Sandy Loam',
        title: 'Soil Type, Temperature & Sun Requirements',
        content:
          'Warm, sunny dry weather (24°C–32°C) during fruit ripening. Sandy loam or rich alluvial riverbed soil with good water retention and pH 6.0–7.2. Cold wet soils induce seedling damping-off and stunt vine extension.'
      },
      {
        icon: 'sprout',
        image: hdWatermelonField,
        metric: 'Broad Beds • 25μ Mulch Film',
        title: 'Raised Bed & Mulching Setup',
        content:
          'Prepare broad raised beds of 3 ft width and 1 ft height, spaced 6–8 ft apart center-to-center. Lay 16mm inline drip laterals with 40 cm dripper spacing. Stretch 25-micron silver-black mulching film tightly. Punch holes at 1.5–2 ft spacing and sow 2 seeds per hole.'
      },
      {
        icon: 'sparkles',
        image: watermelonImg,
        metric: 'Sugar Baby & Kiran Hybrid',
        title: 'Variety Selection',
        content:
          'Icebox & Sugar Baby varieties, Kiran (dark black-green rind with deep red crisp flesh, high sweetness), Saraswati, and Max. Selected for high sugar brix (11–13°), crack resistance, and transport durability.'
      },
      {
        icon: 'droplets',
        image: hdWatermelonField,
        metric: 'Controlled Drip • Dry Ripening',
        title: 'Precision Fertigation Protocol',
        content:
          'Daily drip irrigation adjusted for evapotranspiration. Early vegetative feeding with bio-NPK consortia and humates; shift to high-potassium organic liquids during fruit bulking. Strictly stop irrigation 7–10 days before harvest to build brix and avoid fruit cracking.'
      },
      {
        icon: 'bug',
        image: rameshFarmer,
        metric: 'Fruit Fly Traps • Bio-Shield',
        title: 'Pollination & Pest Management',
        content:
          'Place 1–2 beehives per acre during flowering for active cross-pollination. Install fruit fly cue-lure pheromone traps (6–8/acre) from fruit set stage. Control powdery mildew and downy mildew using copper bio-fungicides and Trichoderma sprays.'
      },
      {
        icon: 'shield',
        image: watermelonImg,
        metric: '12°+ Brix • Tendril-Dry Indicator',
        title: 'Maturity & Harvest Quality',
        content:
          'Harvest when the tendril nearest the fruit stalk dries to brown; the ground belly spot turns creamy yellow; and a dull hollow sound echoes upon thumb thumping. Harvest in early morning with attached stalk.'
      }
    ],
    stages: [
      {
        stepNumber: 1,
        durationBadge: 'Days 0–15',
        stageStatus: 'Mulch Bed Germination',
        title: 'Sowing & Germination',
        description:
          'Seed soaking, sowing on mulch beds, and maintaining warm, moist soil for rapid 4–5 day emergence.'
      },
      {
        stepNumber: 2,
        durationBadge: 'Days 15–35',
        stageStatus: 'Vine Running & Canopy',
        title: 'Vegetative Vine Growth',
        description:
          'Secondary branching, vine training across mulch, and basal organic fertigation.'
      },
      {
        stepNumber: 3,
        durationBadge: 'Days 35–50',
        stageStatus: 'Bee Pollination Peak',
        title: 'Flowering & Pollination',
        description:
          'Opening of yellow blossoms, active bee pollination, and early fruit set.'
      },
      {
        stepNumber: 4,
        durationBadge: 'Days 50–70',
        stageStatus: 'Potassium Sizing & Thinning',
        title: 'Fruit Sizing & Bulking',
        description:
          'Rapid expansion of watermelon fruit; thinning to 1–2 well-formed fruits per vine.'
      },
      {
        stepNumber: 5,
        durationBadge: 'Days 70–85',
        stageStatus: 'Peak Sugar Cut',
        title: 'Ripening & Harvest',
        description:
          'Tendril drying, ground spot yellowing, high brix accumulation, and careful field harvesting.'
      }
    ],
    faqs: [
      {
        question: 'What is the benefit of using silver-black mulching in watermelon?',
        answer:
          'Mulch conserves 50% soil moisture, blocks weed emergence completely, reflects light to repel sap-sucking thrips/aphids, and warms the root zone for 10-15 days earlier harvest.'
      },
      {
        question: 'How do I ensure watermelons develop high sweetness (Brix)?',
        answer:
          'Restrict heavy irrigation during the last 8-10 days before harvest and ensure adequate organic potassium and micronutrient supplementation during fruit sizing.'
      },
      {
        question: 'Why do watermelon fruits crack or rot at the bottom?',
        answer:
          'Cracking is caused by erratic watering after dry spells. Blossom end rot is caused by Calcium deficiency and uneven moisture. Drip irrigation and balanced calcium-boron sprays prevent both issues.'
      },
      {
        question: 'What is the average yield per acre under Sri Nandi Krishi guidance?',
        answer:
          'With precision mulching, drip fertigation, and bio-nutritional management, farmers typically harvest 25 to 35+ tons of uniform, premium watermelons per acre.'
      }
    ]
  }
};

const ALL_CROP_KEYS = ['sugarcane', 'banana', 'papaya', 'watermelon'];

export default function CropDetails() {
  const { slug: paramSlug } = useParams();
  const location = useLocation();

  // Extract the slug either from url param or trailing path segment
  const pathSlug = location.pathname.split('/').filter(Boolean).pop();
  const currentKey = (paramSlug || pathSlug || 'sugarcane').toLowerCase();
  const config = CROP_CONFIGS[currentKey] || CROP_CONFIGS.sugarcane;

  const [service, setService] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    Promise.allSettled([
      cropService.getBySlug(currentKey),
      settingsService.getPublic()
    ])
      .then(([cropRes, setRes]) => {
        if (cropRes.status === 'fulfilled' && cropRes.value) {
          setService(cropRes.value);
        }
        if (setRes.status === 'fulfilled' && setRes.value) {
          setSettings(setRes.value);
        }
      })
      .catch(console.error);
  }, [currentKey]);

  const whatsappNumber = settings?.whatsappNumber && !settings.whatsappNumber.includes('98765') ? settings.whatsappNumber : '917975305677';

  const handleBook = () => {
    openWhatsApp(config.cropName, '', whatsappNumber);
  };

  const handleProductEnquire = (prodName) => {
    const text = `Hello Sri Nandi Krishi Organic Enterprise, I am cultivating ${config.cropName} and would like to order or enquire about ${prodName}. Please share dosage instructions and farm delivery details.`;
    openWhatsApp('', text, whatsappNumber);
  };

  // Other 3 crops for the Related Services section
  const relatedCrops = ALL_CROP_KEYS.filter((k) => k !== currentKey).map(
    (k) => CROP_CONFIGS[k]
  );

  const getPillarIcon = (iconType) => {
    switch (iconType) {
      case 'soil':
        return <Layers size={22} />;
      case 'sprout':
        return <Sprout size={22} />;
      case 'sparkles':
        return <Sparkles size={22} />;
      case 'droplets':
        return <Droplets size={22} />;
      case 'bug':
        return <Bug size={22} />;
      default:
        return <ShieldCheck size={22} />;
    }
  };

  return (
    <div className="crop-details-page-root">
      <Navbar settings={settings} />

      <main className="page-main-content">
        {/* ===================================================================
            1. Spacious Crop Hero Section (Ultra-Premium Contrast & Backdrop)
            =================================================================== */}
        <section className="crop-page-hero">
          <img
            src={config.heroBg}
            alt={`${config.name} background`}
            className="crop-page-hero-bg"
          />
          <div className="crop-page-hero-overlay"></div>

          <div className="container crop-page-hero-container">
            {/* Breadcrumb Navigation */}
            <div className="page-breadcrumb light">
              <Link to="/">Home</Link>
              <span className="sep">&gt;</span>
              <Link to="/services">Services</Link>
              <span className="sep">&gt;</span>
              <span className="active">{config.name}</span>
            </div>

            {/* Small Gold Badge */}
            <div className="crop-hero-badge">
              <Sparkles size={14} />
              <span>Sri Nandi Krishi Organic Crop Consultation • Field Verified</span>
            </div>

            {/* Heading & Tagline */}
            <h1 className="crop-page-hero-title">{config.name}</h1>
            <p className="crop-page-hero-tagline">{config.tagline}</p>
            <p className="crop-page-hero-desc">{config.heroDescription}</p>

            {/* CTA Buttons in Hero */}
            <div className="crop-hero-btn-row">
              <button
                className="btn-hero-consult"
                onClick={handleBook}
                title={`Book consultation for ${config.cropName} on WhatsApp`}
              >
                <FaWhatsapp size={18} />
                <span>Book Consultation via WhatsApp</span>
                <ArrowRight size={16} />
              </button>

              <Link to="/services" className="btn-hero-back">
                <ArrowLeft size={16} />
                <span>Back to All Services</span>
              </Link>
            </div>

            {/* Quick Key Stat Strip */}
            <div className="crop-quick-stats-strip">
              {config.quickStats.map((st, i) => (
                <div key={i} className="crop-quick-stat-box">
                  <div className="stat-icon-pill">
                    {st.icon === 'clock' && <Clock size={16} />}
                    {st.icon === 'soil' && <Layers size={16} />}
                    {st.icon === 'sprout' && <Sprout size={16} />}
                    {st.icon === 'award' && <Award size={16} />}
                  </div>
                  <span className="stat-value">{st.val}</span>
                  <span className="stat-label">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. Master Overview Card (Editorial 3-Column Luxury Layout)
            =================================================================== */}
        <section className="crop-showcase-section">
          {/* Ambient Lighting Orbs */}
          <div className="crop-showcase-ambient-glow sc-glow-left" aria-hidden="true"></div>
          <div className="crop-showcase-ambient-glow sc-glow-right" aria-hidden="true"></div>

          <div className="container">
            <motion.div
              className="crop-showcase-box"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Luxury Accent Crown */}
              <div className="crop-showcase-top-crown"></div>

              <div className="crop-showcase-grid">
                {/* Column 1: Checklist & Direct WhatsApp Action */}
                <div className="showcase-col checklist-col">
                  <div className="checklist-col-card">
                    <div className="col-subtag">
                      <Sparkles size={13} className="sc-subtag-icon" />
                      <span>Specialized Advisory</span>
                    </div>
                    <h3 className="showcase-col-title">
                      What We <span className="sc-title-accent">Provide</span>
                    </h3>
                    <ul className="showcase-check-list">
                      {config.checklist.map((item, idx) => (
                        <li key={idx} className="sc-check-item">
                          <span className="sc-check-icon">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className="sc-check-text">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className="btn-sc-book-wa"
                      onClick={handleBook}
                      title={`Book consultation for ${config.cropName} on WhatsApp`}
                    >
                      <span className="btn-wa-icon-glow">
                        <FaWhatsapp size={18} />
                      </span>
                      <span className="btn-wa-label">Book via WhatsApp</span>
                      <ArrowRight size={15} className="btn-wa-arrow" />
                    </button>
                  </div>
                </div>

                {/* Column 2: Crisp Foreground Photograph */}
                <div className="showcase-col image-col">
                  <div className="sc-image-card-wrapper">
                    <div
                      className="sc-image-card"
                      onClick={() =>
                        setActiveLightboxImg({
                          imageUrl: config.cropPhoto,
                          title: `${config.name} Field Verification`,
                          caption: `Authentic organic farming practices for ${config.cropName} guided by Sri Nandi Krishi Organic Enterprise.`
                        })
                      }
                      title="Click to view full screen"
                    >
                      <div className="sc-image-badge-top">
                        <ShieldCheck size={13} />
                        <span>Field-Verified</span>
                      </div>
                      <img
                        src={config.cropPhoto}
                        alt={`${config.name} photograph`}
                        className="sc-crop-photo"
                      />
                      <div className="sc-image-overlay-vignette"></div>
                      <div className="sc-image-overlay-pill">
                        <span className="dot-pulse"></span>
                        <span className="pill-text">Field-Verified Organic Methods</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Agronomic Overview & Key Benefits */}
                <div className="showcase-col benefits-col">
                  <div className="sc-benefits-col-inner">
                    <div className="sc-guidance-header-wrap">
                      <h2 className="sc-guidance-title">
                        Complete Guidance for <span className="sc-crop-title-highlight">{config.cropName}</span> Cultivation
                      </h2>
                      <p className="sc-guidance-desc">{config.overview}</p>
                    </div>

                    <div className="sc-benefits-divider-row">
                      <div className="sc-benefits-header-badge">
                        <Award size={14} className="sc-award-icon" />
                        <span>Key Grower Benefits</span>
                      </div>
                      <div className="sc-benefits-line"></div>
                    </div>

                    <div className="sc-benefits-cards-wrap">
                      {config.keyBenefits.map((benefit, idx) => (
                        <div key={idx} className="sc-benefit-card-item">
                          <span className="sc-benefit-check-gold">
                            <Check size={13} strokeWidth={3} />
                          </span>
                          <div className="sc-benefit-text-wrap">
                            <strong className="sc-benefit-badge">{benefit.badge}: </strong>
                            <span className="sc-benefit-body">{benefit.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===================================================================
            3. NEW SECTION: Recommended Organic Products for this Crop
            =================================================================== */}
        <section className="crop-products-showcase-section">
          <div className="container">
            <div className="section-header-wrap text-center">
              <div className="section-sub-tag">
                <Leaf size={15} />
                <span>Tailored Bio-Inputs</span>
              </div>
              <h2 className="section-h2">
                Recommended Organic Products for <em>{config.cropName}</em>
              </h2>
              <p className="section-desc">
                Scientifically formulated organic fertilizers and bio-stimulants engineered by our agronomists to maximize {config.cropName} yield, sugar brix, and soil fertility.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '14px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            <div className="crop-products-grid">
              {config.recommendedProducts.map((prod, idx) => (
                <div key={idx} className="crop-product-rec-card">
                  {/* Visual HD Image Frame with Curved Gold Divider */}
                  <Link
                    to={`/products/${prod.slug}`}
                    className="crop-prod-img-frame"
                    title={`View ${prod.name} details`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="crop-prod-hd-img"
                      loading="lazy"
                    />
                    <span className="crop-prod-pack-chip">{prod.netContent}</span>
                  </Link>

                  {/* Card Content Body */}
                  <div className="crop-prod-body">
                    {/* Stage Tag Pill */}
                    <div className="crop-prod-stage-pill">
                      <Zap size={13} />
                      <span>{prod.stageTag}</span>
                    </div>

                    <h3 className="crop-prod-title">
                      <Link to={`/products/${prod.slug}`}>{prod.name}</Link>
                    </h3>
                    <span className="crop-prod-subtitle">{prod.subtitle}</span>

                    {/* Application Dose & Benefit */}
                    <div className="crop-prod-usage-box">
                      <div className="crop-usage-row">
                        <span className="usage-label">How to Apply:</span>
                        <span className="usage-val">{prod.usage}</span>
                      </div>
                      <div className="crop-benefit-row">
                        <CheckCircle2 size={14} className="crop-benefit-check" />
                        <span>{prod.benefit}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="crop-prod-action-row">
                      <Link
                        to={`/products/${prod.slug}`}
                        className="btn-crop-prod-view"
                        title={`View ${prod.name}`}
                      >
                        <span>Details</span>
                        <ArrowRight size={14} />
                      </Link>

                      <button
                        className="btn-crop-prod-wa"
                        onClick={() => handleProductEnquire(prod.name)}
                        title={`Enquire about ${prod.name} on WhatsApp`}
                      >
                        <FaWhatsapp size={16} />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. Detailed Cultivation Guidance (The Agronomic Pillars)
            =================================================================== */}
        <section className="crop-guidelines-section">
          <div className="container">
            <div className="section-header-wrap text-center">
              <div className="section-sub-tag" style={{ margin: '0 auto 10px' }}>
                <Sprout size={15} />
                <span>Field-Tested Cultivation Guidelines</span>
              </div>
              <h2 className="section-h2">
                Scientific & Organic <em>Cultivation Protocol</em>
              </h2>
              <p className="section-desc">
                Step-by-step agronomy engineered for superior crop vigor, natural pest resistance, and maximum harvest weight.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '14px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            <div className="crop-agronomy-grid">
              {config.agronomicPillars.map((pillar, idx) => (
                <div key={idx} className="agronomy-pillar-card">
                  {pillar.image && (
                    <div className="pillar-image-wrap">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="pillar-image"
                        loading="lazy"
                      />
                      <div className="pillar-image-overlay" />
                      <span className="pillar-index-badge">0{idx + 1}</span>
                      <div className="pillar-floating-icon">
                        {getPillarIcon(pillar.icon)}
                      </div>
                    </div>
                  )}

                  <div className="pillar-body">
                    {!pillar.image && (
                      <div className="pillar-header">
                        <div className="pillar-icon-wrap">
                          {getPillarIcon(pillar.icon)}
                        </div>
                        <span className="pillar-index">0{idx + 1}</span>
                      </div>
                    )}

                    {/* Glanceable Quick Metric Pill */}
                    {pillar.metric && (
                      <div className="pillar-metric-chip">
                        <Sparkles size={12} />
                        <span>{pillar.metric}</span>
                      </div>
                    )}

                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-text">{pillar.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. Lifecycle Growth Stages & Harvesting Timeline
            =================================================================== */}
        <section className="crop-roadmap-section">
          <div className="container">
            <div className="section-header-wrap text-center">
              <div className="section-sub-tag" style={{ margin: '0 auto 10px' }}>
                <Layers size={15} />
                <span>Crop Growth Roadmap</span>
              </div>
              <h2 className="section-h2">
                Growth Stages & <em>Harvest Indicators</em>
              </h2>
              <p className="section-desc">
                Key agronomic milestones from initial land preparation through peak brix maturity.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '14px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            <div className="cultivation-stages-grid">
              {config.stages.map((st, i) => (
                <div key={i} className="stage-step-card">
                  <div className="stage-card-top">
                    <span className="stage-number-badge">0{st.stepNumber || i + 1}</span>
                    <span className="stage-duration-chip">
                      <Clock size={13} />
                      <span>{st.durationBadge}</span>
                    </span>
                  </div>

                  <span className="stage-status-kicker">{st.stageStatus}</span>
                  <h4>{st.title}</h4>
                  <p>{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. NEW SECTION: Visual Field Photography Gallery for this Service
            =================================================================== */}
        <section className="crop-field-gallery-section">
          <div className="container">
            <div className="section-header-wrap text-center">
              <div className="section-sub-tag">
                <Eye size={15} />
                <span>Field Glance & Success Gallery</span>
              </div>
              <h2 className="section-h2">
                Visual Glance of High-Yield <em>{config.cropName}</em> Farms
              </h2>
              <p className="section-desc">
                Field photography from partner farms across Karnataka guided under Sri Nandi Krishi organic protocols.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '14px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            <div className="crop-gallery-grid-4">
              {config.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="crop-gallery-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onClick={() => setActiveLightboxImg(img)}
                  title="Click to view high-resolution photo"
                >
                  <img src={img.imageUrl} alt={img.title} className="gallery-card-img" />
                  <div className="gallery-card-gradient"></div>

                  <div className="gallery-card-meta">
                    <span className="gallery-card-tag">{img.tag}</span>
                    <h4 className="gallery-card-title">{img.title}</h4>
                    <p className="gallery-card-caption">{img.caption}</p>
                  </div>

                  <div className="gallery-zoom-pill" aria-hidden="true">
                    <Eye size={14} />
                    <span>View HD</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            7. Direct Specialist Consultation CTA Card
            =================================================================== */}
        <section className="crop-cta-banner-section">
          <div className="container">
            <div className="crop-cta-banner-card">
              <div className="crop-cta-banner-content">
                <span className="cta-badge">
                  <Sparkles size={14} /> One-on-One Field Advisory
                </span>
                <h3 className="crop-cta-title">
                  Ready to Optimize Your {config.cropName} Crop Yield?
                </h3>
                <p className="crop-cta-desc">
                  Connect directly with Sri Nandi Krishi agronomists on WhatsApp. Share your field photographs, soil reports, and water parameters for tailored organic solutions.
                </p>
                <div className="crop-cta-btn-wrap">
                  <button
                    className="btn-cta-whatsapp"
                    onClick={handleBook}
                    title={`Book Consultation for ${config.cropName}`}
                  >
                    <FaWhatsapp size={18} />
                    <span>Book Consultation via WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>
                  <Link to="/contact" className="btn-cta-secondary">
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            8. Frequently Asked Questions (Accordion)
            =================================================================== */}
        <section className="crop-faq-section">
          <div className="container">
            <div className="section-header-wrap text-center">
              <div className="section-sub-tag" style={{ margin: '0 auto 10px' }}>
                <HelpCircle size={15} />
                <span>Farmer Inquiries</span>
              </div>
              <h2 className="section-h2">
                Frequently Asked <em>Questions</em>
              </h2>
              <p className="section-desc">
                Common questions from farmers regarding {config.cropName} organic cultivation and advisory.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '14px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            <div className="crop-faq-list">
              {config.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-accordion-item ${openFaq === idx ? 'open' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
                  </button>
                  {openFaq === idx && (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            9. Related Services Section (Explore Other Crops)
            =================================================================== */}
        <section className="crop-related-section">
          <div className="container">
            <div className="section-header-wrap text-center">
              <div className="section-sub-tag" style={{ margin: '0 auto 10px' }}>
                <Sprout size={15} />
                <span>Related Services</span>
              </div>
              <h2 className="section-h2">
                Explore Other <em>Crop Guidance</em>
              </h2>
              <p className="section-desc">
                Discover our specialized organic advisory programs across our other core commercial crops.
              </p>
              <div className="agri-gold-ornament" aria-hidden="true" style={{ margin: '14px auto 0' }}>
                <span className="agri-ornament-line" />
                <span className="agri-ornament-diamond" />
                <span className="agri-ornament-line" />
              </div>
            </div>

            <div className="related-crops-grid">
              {relatedCrops.map((relCrop) => (
                <div key={relCrop.slug} className="related-crop-card">
                  <Link
                    to={`/services/${relCrop.slug}`}
                    className="related-crop-img-wrap"
                    title={`View details for ${relCrop.name}`}
                  >
                    <img
                      src={relCrop.cropPhoto}
                      alt={`${relCrop.name} photograph`}
                      className="related-crop-img"
                    />
                  </Link>

                  <div className="related-crop-body">
                    <h3 className="related-crop-title">
                      <Link to={`/services/${relCrop.slug}`}>{relCrop.name}</Link>
                    </h3>
                    <p className="related-crop-tagline">{relCrop.tagline}</p>

                    <Link
                      to={`/services/${relCrop.slug}`}
                      className="btn-services-details"
                      title={`View Details for ${relCrop.name}`}
                    >
                      <span>View Details</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="back-to-services-center">
              <Link to="/services" className="btn-all-services">
                <ArrowLeft size={16} />
                <span>Back to All Services</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
      <FloatingActions settings={settings} />

      {/* Lightbox for Full-Screen HD Image Inspection */}
      {activeLightboxImg && (
        <Lightbox
          image={activeLightboxImg}
          onClose={() => setActiveLightboxImg(null)}
        />
      )}
    </div>
  );
}

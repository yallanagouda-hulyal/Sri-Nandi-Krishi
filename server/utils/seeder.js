import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import GalleryImage from '../models/GalleryImage.js';
import WebsiteSettings from '../models/WebsiteSettings.js';

export const seedDatabase = async () => {
  try {
    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@srinandikrishi.com').toLowerCase().trim();
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await Admin.create({
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        name: 'Sri Nandi Krishi Admin',
        role: 'superadmin',
      });
      console.log(`[Seed] Default administrator created: ${adminEmail}`);
    }

    // 2. Seed Website Settings
    const existingSettings = await WebsiteSettings.findOne();
    if (!existingSettings) {
      await WebsiteSettings.create({
        businessName: 'Sri Nandi Krishi Organic Enterprise',
        tagline: 'Better Farming. Brighter Tomorrow.',
        email: process.env.BUSINESS_EMAIL || 'srinandikrushi70@gmail.com',
        phone: process.env.BUSINESS_PHONE || '+91 98765 43210',
        whatsappNumber: process.env.WHATSAPP_NUMBER || '919876543210',
        location: 'Karnataka, India',
        address: 'Agricultural Guidance Center, Karnataka, India',
        workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
        websiteUrl: process.env.BUSINESS_WEBSITE || 'https://srinandikrishi.com',
        facebookUrl: process.env.FACEBOOK_URL || 'https://www.facebook.com/share/19CwgVuDLW/?mibextid=wwXIfr',
        instagramUrl: process.env.INSTAGRAM_URL || 'https://www.instagram.com/sri_nandi_krishi_bio_fertilser?igsh=eHBrcG5jemNhYzF3&utm_source=qr&wa_status_inline=true',
        youtubeUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        developerCredit: 'Designed and developed by bookmywebsite.in',
        developerUrl: 'https://bookmywebsite.in',
      });
      console.log('[Seed] Website settings initialized.');
    }

    // 3. Seed Crop Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          slug: 'sugarcane',
          name: 'Sugarcane Farming',
          cropName: 'Sugarcane',
          subtitle: 'High yield • Better quality • Expert guidance',
          shortDescription: 'Get complete support for sugarcane cultivation from land preparation to harvest with modern and organic methods.',
          fullDescription: 'Sugarcane cultivation requires precision across all vegetative and ripening stages. Sri Nandi Krishi Organic Enterprise provides comprehensive agronomic guidance covering soil conditioning, sett treatment, organic nutrient scheduling, tillering management, and water conservation techniques to maximize cane weight and sugar content.',
          heroImage: '/images/sugarcane-field.jpg',
          cardImage: '/images/sugarcane-crop.jpg',
          highlights: [
            'Variety Selection',
            'Fertilizer Guidance',
            'Irrigation Management',
            'Disease Control',
            'Harvest Support'
          ],
          cultivationStages: [
            { stepNumber: 1, title: 'Land & Soil Preparation', description: 'Deep plowing, organic manure incorporation, furrow spacing, and soil pH optimization.' },
            { stepNumber: 2, title: 'Sett Selection & Treatment', description: 'Certified disease-free seed sett selection, biological seed treatment, and spacing calibration.' },
            { stepNumber: 3, title: 'Nutrient & Moisture Management', description: 'Balanced basal and top-dressing organic fertilizer scheduling, micro-irrigation scheduling.' },
            { stepNumber: 4, title: 'Canopy & Earthing Up', description: 'Timely weeding, earthing up for root anchorage, and shoot borer prevention.' },
            { stepNumber: 5, title: 'Maturity Testing & Harvest', description: 'Brix checking, harvesting at optimal sugar accumulation, and ratoon management.' }
          ],
          guidanceDetails: {
            soilAndPreparation: 'Well-drained deep loamy soil with neutral pH (6.5 to 7.5). Deep plowing with adequate basal organic manure enhances root development.',
            varietySelection: 'High-sugar, drought-tolerant, and disease-resistant cultivars tailored to local agro-climatic conditions and crushing schedules.',
            irrigationAndNutrition: 'Drip irrigation for water efficiency and targeted fertigation. Organic bio-fertilizers like Azospirillum and PSB to boost root vigor.',
            pestAndDisease: 'Preventive monitoring for early shoot borer, red rot, and woolly aphid through biological controls, traps, and botanical extracts.',
            harvestPlanning: 'Harvesting at peak maturity (10-12 months depending on variety) using clean ground-level cuts to preserve ratoon potential.'
          },
          faqs: [
            { question: 'When is the best time to plant sugarcane?', answer: 'Spring and autumn plantings are generally ideal depending on your regional irrigation and temperature profiles.' },
            { question: 'How can I prevent early shoot borer organically?', answer: 'Timely earthing up, light trash mulching, pheromone traps, and bio-agents like Trichogramma cards provide effective organic control.' },
            { question: 'What is the optimal row spacing for sugarcane?', answer: 'Single-row spacing of 4 to 5 feet or paired-row systems (3x5 ft) allow adequate sunlight, mechanical weed management, and drip lateral layout.' }
          ],
          order: 1,
          isActive: true
        },
        {
          slug: 'banana',
          name: 'Banana Farming',
          cropName: 'Banana',
          subtitle: 'Healthy plants • Higher yield • Better profit',
          shortDescription: 'Expert consultation for banana plant cultivation with scientific and organic methods.',
          fullDescription: 'Banana is a high-demand, nutrient-intensive crop that responds dramatically to balanced care. Sri Nandi Krishi provides end-to-end guidance from tissue-culture plantlet hardening, pit preparation, precise potassium-nitrogen management, to bunch protection for flawless marketable fruit.',
          heroImage: '/images/banana.jpg',
          cardImage: '/images/banana.jpg',
          highlights: [
            'Tissue Culture Guidance',
            'Soil & Nutrient Management',
            'Pest & Disease Control',
            'Growth Monitoring',
            'Market Support'
          ],
          cultivationStages: [
            { stepNumber: 1, title: 'Field Layout & Pit Preparation', description: 'Optimum plant geometry (6x6 ft or paired row), organic compost pit filling, and drainage.' },
            { stepNumber: 2, title: 'Transplantation & Root Care', description: 'Healthy hardened tissue-culture plantlet transplanting and bio-inoculant root dipping.' },
            { stepNumber: 3, title: 'Vegetative Nutrition', description: 'Split doses of nitrogen, potassium, and micronutrient foliar sprays for rapid leaf canopy development.' },
            { stepNumber: 4, title: 'Shooting & Bunch Care', description: 'De-naveling, bunch sleeve bagging, propping against lodging, and hand removal of false hands.' },
            { stepNumber: 5, title: 'Harvest & Post-Harvest', description: 'Harvesting at 75-80% roundness, gentle de-handing, washing, and protective packing.' }
          ],
          guidanceDetails: {
            soilAndPreparation: 'Rich, well-drained loamy soil high in organic matter with excellent water retention and low salinity (EC < 1.0 mS/cm).',
            varietySelection: 'Grand Naine (G9), Robusta, or regional cultivars renowned for uniform fingers, heavy bunch weights, and premium market acceptance.',
            irrigationAndNutrition: 'Consistent soil moisture without waterlogging. Split nutrient application matching high vegetative and bunch filling demands.',
            pestAndDisease: 'Vigilance against Panama wilt, Sigatoka leaf spot, and rhizome weevils through neem cakes, biocontrol fungi (Trichoderma), and sanitation.',
            harvestPlanning: 'Careful cutting when fruit ridges become rounded, preventing bruising or latex staining to command top wholesale value.'
          },
          faqs: [
            { question: 'Why choose Tissue Culture banana plants?', answer: 'Tissue culture plants ensure true-to-type genetics, disease-free starting material, synchronized flowering, and uniform maturity.' },
            { question: 'How do I protect banana bunches from sun scalding and insects?', answer: 'Using breathable UV-stabilized bunch covers or skirter sleeves shields fruit from sunburn, dust, and insect punctures.' },
            { question: 'How much water does a banana plant require?', answer: 'A mature banana plant requires 15 to 25 liters of water daily depending on atmospheric humidity and temperature.' }
          ],
          order: 2,
          isActive: true
        },
        {
          slug: 'papaya',
          name: 'Papaya Farming',
          cropName: 'Papaya',
          subtitle: 'Fast growth • High demand • Good returns',
          shortDescription: 'Complete guidance for papaya cultivation with modern and responsible techniques.',
          fullDescription: 'Papaya provides quick returns on investment within 9 to 11 months of planting. Our consultancy provides specialized protocols for raised-bed layout, ring spot virus risk mitigation, precise drip fertigation, and high-sugar fruit development.',
          heroImage: '/images/papaya.jpg',
          cardImage: '/images/papaya.jpg',
          highlights: [
            'Variety Selection',
            'Plantation Guidance',
            'Fertilizer Schedule',
            'Disease Management',
            'Harvest & Marketing'
          ],
          cultivationStages: [
            { stepNumber: 1, title: 'Raised Bed Preparation', description: 'Raised ridge beds with plastic mulching to ensure zero water logging around root collars.' },
            { stepNumber: 2, title: 'Transplantation & Spacing', description: 'Planting healthy 45-day nursery seedlings at 7x7 or 6x6 ft spacing with neem-compost mix.' },
            { stepNumber: 3, title: 'Growth & Micronutrient Spray', description: 'Boron, zinc, and calcium nutrition to prevent fruit deformities and latex drips.' },
            { stepNumber: 4, title: 'Pest & Virus Monitoring', description: 'Border barrier crops, yellow sticky traps, and biological aphid suppression to ward off PRSV.' },
            { stepNumber: 5, title: 'Harvest & Packaging', description: 'Picking fruit at color-break stage (first yellow streaks) for optimal transit durability.' }
          ],
          guidanceDetails: {
            soilAndPreparation: 'Light, porous sandy loam with exceptional internal drainage. Papaya cannot tolerate standing water for even 24 hours.',
            varietySelection: 'Red Lady 786 (Taiwanese gynodioecious hybrid) for high sweetness, firm pulp, and dependable fruit setting.',
            irrigationAndNutrition: 'Drip irrigation with strict moisture sensors. Regular potassium and calcium feeding to build firm flesh and thick skin.',
            pestAndDisease: 'Controlling aphid vectors of Papaya Ring Spot Virus (PRSV) and root rot fungi using prophylactic neem applications and Trichoderma.',
            harvestPlanning: 'Careful twist-and-snap harvesting when color streaks begin to appear, placing in soft padded crates to prevent skin scuffing.'
          },
          faqs: [
            { question: 'How sensitive is papaya to excess water?', answer: 'Papaya roots are extremely prone to collar rot and damping off if water stagnates. Raised beds and drip irrigation are essential.' },
            { question: 'What is the ideal spacing for Red Lady papaya?', answer: 'A standard spacing of 6 ft x 6 ft or 7 ft x 7 ft accommodates 1,000 to 1,200 plants per acre.' },
            { question: 'When do papaya trees start fruiting?', answer: 'Flowering begins within 3 to 4 months of transplanting, with the first harvest ready around 9 to 10 months.' }
          ],
          order: 3,
          isActive: true
        },
        {
          slug: 'watermelon',
          name: 'Watermelon Farming',
          cropName: 'Watermelon',
          subtitle: 'Healthy crop • Sweet fruit • Better income',
          shortDescription: 'Expert support for watermelon cultivation from sowing to high-yield harvest.',
          fullDescription: 'Watermelon is a fast-turnaround short-duration cash crop that thrives with proper drip irrigation and mulch culture. Sri Nandi Krishi guides growers on bed formation, hybrid seed selection, pollinator management, and brix optimization for intensely sweet, heavy fruit.',
          heroImage: '/images/watermelon.jpg',
          cardImage: '/images/watermelon.jpg',
          highlights: [
            'Seed Selection',
            'Land Preparation',
            'Nutrient Management',
            'Pest Control',
            'Harvest Support'
          ],
          cultivationStages: [
            { stepNumber: 1, title: 'Raised Bed & Mulching', description: 'Broad beds with drip lines covered with reflective silver-black plastic mulch.' },
            { stepNumber: 2, title: 'Direct Sowing / Nursery', description: 'Direct punching or plug-tray seedlings spaced at 1.5 to 2 ft along drip lines.' },
            { stepNumber: 3, title: 'Vine Spreading & Training', description: 'Directing vines uniformly across inter-row spaces to prevent overlapping and rot.' },
            { stepNumber: 4, title: 'Fruit Setting & Thinning', description: 'Retaining 2 to 3 well-formed fruits per vine for maximum size and uniform sweetness.' },
            { stepNumber: 5, title: 'Harvest Determination', description: 'Checking ground spot yellowing, tendril drying, and dull hollow resonance before harvest.' }
          ],
          guidanceDetails: {
            soilAndPreparation: 'Sandy loam or well-drained alluvial soil warmed by solar mulch. Well-rotted farmyard manure incorporated prior to bedding.',
            varietySelection: 'High-sugar icebox hybrids (Kiran, Max, Black Prince) or traditional oblong striped varieties with firm red pulp.',
            irrigationAndNutrition: 'Consistent drip irrigation during vegetative and fruit expansion; deliberate water cutback 7-10 days before harvest to concentrate sugars.',
            pestAndDisease: 'Proactive scouting for thrips, fruit fly, and powdery/downy mildew with eco-safe botanicals and yellow/blue traps.',
            harvestPlanning: 'Harvesting in cool early morning hours when tendril opposite the fruit attachment dries up completely.'
          },
          faqs: [
            { question: 'Why use plastic mulch for watermelon farming?', answer: 'Mulching conserves moisture, maintains warm root temperature, prevents weed competition, and keeps fruit off bare wet soil.' },
            { question: 'How do you increase fruit sweetness (Brix)?', answer: 'Gradually tapering irrigation 7 to 10 days before harvest and ensuring adequate potassium and boron nutrition during ripening.' },
            { question: 'What is the duration of a watermelon crop cycle?', answer: 'Watermelon crops mature quickly, generally ready for harvest within 75 to 90 days from planting.' }
          ],
          order: 4,
          isActive: true
        }
      ];

      await Service.insertMany(defaultServices);
      console.log('[Seed] 4 Crop Guidance Services seeded.');
    }

    // 4. Seed Testimonials (Verified farmer testimonials across crops)
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const testimonialsToSeed = [
        {
          name: 'Ramesh Patil',
          role: 'Sugarcane Farmer',
          crop: 'Sugarcane',
          rating: 5,
          text: 'Nagaraj provided excellent support throughout the entire sugarcane farming journey. He has a strong understanding of sugarcane growth stages and recommends the right fertilizers based on crop conditions and growth requirements. His practical knowledge and timely guidance helped ensure healthy crop development and better farm outcomes.',
          location: 'Karnataka',
          isFeatured: true,
          order: 1,
        },
        {
          name: 'Suresh Gowda',
          role: 'Banana Cultivator',
          crop: 'Banana',
          rating: 5,
          location: 'Mandya, Karnataka',
          text: "Following Sri Nandi Krishi's tissue culture and bio-nutrition schedule gave us remarkable bunch weight and uniform finger size in our G9 bananas. Pest attacks were controlled naturally without heavy chemicals, increasing our harvest tonnage by over 25%.",
          isFeatured: true,
          order: 2,
        },
        {
          name: 'Mallikarjun Biradar',
          role: 'Papaya Grower',
          crop: 'Papaya',
          rating: 5,
          location: 'Vijayapura, Karnataka',
          text: "Virus and root rot management was a huge struggle in our Taiwan Red Lady papaya orchard until we consulted Nagaraj. His organic soil drenching and micronutrient schedule revitalized our plants, resulting in heavy fruit set and excellent fruit quality.",
          isFeatured: true,
          order: 3,
        },
        {
          name: 'Basavaraj Kulkarni',
          role: 'Watermelon Cultivator',
          crop: 'Watermelon',
          rating: 5,
          location: 'Bagalkot, Karnataka',
          text: "Sri Nandi Krishi gave us precision drip schedules and organic plant stimulants from day one. Our watermelons reached 9 to 12 kg per fruit with exceptional sweetness and crispness. The yield surpassed our expectations and fetched peak market rates.",
          isFeatured: true,
          order: 4,
        },
        {
          name: 'Anand Patil',
          role: 'Sugarcane & Horticulture Farmer',
          crop: 'Sugarcane',
          rating: 5,
          location: 'Dharwad, Karnataka',
          text: "The biological inputs and compost enrichment methods recommended by Sri Nandi Krishi cut our chemical input costs by 40%. The soil fertility and root development improved visibly within one season. Truly reliable ground-level consultancy!",
          isFeatured: true,
          order: 5,
        }
      ];
      await Testimonial.insertMany(testimonialsToSeed);
      console.log('[Seed] 5 Verified farmer testimonials seeded.');
    }

    // 5. Seed Gallery Images
    const galleryCount = await GalleryImage.countDocuments();
    if (galleryCount === 0) {
      const defaultGallery = [
        {
          title: 'Vibrant Sugarcane Plantation',
          category: 'Sugarcane',
          imageUrl: '/images/sugarcane-field.jpg',
          caption: 'Healthy sugarcane crop with lush vegetative growth and uniform canopy.',
          order: 1,
        },
        {
          title: 'Sugarcane Cultivation Rows',
          category: 'Sugarcane',
          imageUrl: '/images/sugarcane-rows.jpg',
          caption: 'Precision furrow spacing and drip irrigation layout in field.',
          order: 2,
        },
        {
          title: 'Sugarcane Stalk Close-Up',
          category: 'Sugarcane',
          imageUrl: '/images/sugarcane-closeup.jpg',
          caption: 'Thick, robust cane internodes demonstrating optimal nutrient intake.',
          order: 3,
        },
        {
          title: 'Banana Plantation Support',
          category: 'Banana',
          imageUrl: '/images/banana.jpg',
          caption: 'High-density banana plants with healthy bunch setting.',
          order: 4,
        },
        {
          title: 'Papaya Orchard Management',
          category: 'Papaya',
          imageUrl: '/images/papaya.jpg',
          caption: 'Heavy fruiting Red Lady papaya trees on elevated drainage beds.',
          order: 5,
        },
        {
          title: 'Watermelon Harvest Readiness',
          category: 'Watermelon',
          imageUrl: '/images/watermelon.jpg',
          caption: 'Uniform, high-brix watermelons ready for wholesale dispatch.',
          order: 6,
        },
        {
          title: 'Tractor Field Work & Tillage',
          category: 'Field Work',
          imageUrl: '/images/farm-tractor.jpg',
          caption: 'Deep plowing and soil aeration prior to plantation setup.',
          order: 7,
        },
        {
          title: 'Expansive Farmland Planning',
          category: 'Field Work',
          imageUrl: '/images/farm-field.jpg',
          caption: 'Comprehensive field assessment for organic crop guidance.',
          order: 8,
        }
      ];

      await GalleryImage.insertMany(defaultGallery);
      console.log('[Seed] Gallery images seeded.');
    }

  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
};

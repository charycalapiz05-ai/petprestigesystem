// ==========================================
// Pet Prestige - Complete JavaScript
// Last updated: March 2026
// ==========================================

// ==========================================
// DATABASE
// ==========================================
const DB = {
    products: [
        // Dogs - Food & Treats
        { id: 1, name: "Royal Canin Adult Dog Food 2kg", category: "dogs", subcategory: "food", price: 850, comparePrice: 950, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQuRo23oRftQ9z4I87EFaNzxdRZLcWm37IcGR19f63D-MNL98i8508PZ9Z9ovnzp8XoQ2D86-JzAr8BEIsdUBRHw6orcTM-dIHWi0-g1vvvaxFB6syBvI1f5w", rating: 4.8, reviews: 124, stock: 50, description: "Premium nutrition for adult dogs with high-quality proteins and balanced nutrients.", featured: true },
        { id: 2, name: "Pedigree Dry Dog Food 3kg", category: "dogs", subcategory: "food", price: 450, comparePrice: 520, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRpSschWil6fnPttaaoM4G6raUQ7wChOTDStBoV6PdAeAUSeThUo6kub2GIjJBAyHkuj2ZzM2NVZ8AZZ3iw2kDMfmty4_wAbA", rating: 4.5, reviews: 89, stock: 75, description: "Complete and balanced nutrition with essential vitamins and minerals." },
        { id: 3, name: "Bacon Flavor Dog Treats 500g", category: "dogs", subcategory: "food", price: 180, comparePrice: 220, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSmM-i8_zaJv7sWhDtGisQ9oQWLGiAWp6E4tUBCYO42M2CfRiJcCsh-6m0QcVG6o8fyUG2a2x-tU8rKMTPYhXVq_0x4gCV6mOjPe7MR7ykTYl3wzjeg0Sky0A", rating: 4.7, reviews: 203, stock: 100, description: "Delicious bacon-flavored treats perfect for training and rewards." },
        { id: 4, name: "Dental Chew Sticks (Pack of 10)", category: "dogs", subcategory: "food", price: 250, comparePrice: 300, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS3LzXUVhUvpUkqO-3nmcz2YDUm3daRtKDh5k9pgy_StdsMA1j6bmPcCfsdkr1vgIHYZlfMOJw0Qr1-R02YfqgZgMMYvZKvvXsQImwoYgez8GlUfSYt5zmRXQ", rating: 4.6, reviews: 67, stock: 40, description: "Helps clean teeth and freshen breath while satisfying chewing instincts." },
        { id: 5, name: "Grain-Free Puppy Food 1.5kg", category: "dogs", subcategory: "food", price: 680, comparePrice: 750, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTtYLVUr7TkkmZWfHU7ZdfxeRl5oncTBe3S9yULrG29sieY0KCqgou4h3G0ga0qB9nSWv1GaSeaGGlxcaLGSug-2V7RdRtA", rating: 4.9, reviews: 45, stock: 30, description: "Specially formulated for growing puppies with DHA for brain development." },
        
        // Dogs - Toys & Accessories
        { id: 6, name: "Interactive Puzzle Toy", category: "dogs", subcategory: "toys", price: 450, comparePrice: 550, image: "https://happiepawsco.com/cdn/shop/files/S8f4f8653d48244ebad433a5d52ca09e0l.webp?v=1734291534&width=600", rating: 4.8, reviews: 156, stock: 25, description: "Mental stimulation toy that dispenses treats as your dog solves puzzles." },
        { id: 7, name: "Rope Tug Toy Set", category: "dogs", subcategory: "toys", price: 280, comparePrice: 350, image: "https://down-ph.img.susercontent.com/file/ph-11134258-81ztq-meo33tpgadq825", rating: 4.4, reviews: 78, stock: 60, description: "Durable cotton rope toys perfect for tug-of-war and chewing." },
        { id: 8, name: "Squeaky Plush Bone", category: "dogs", subcategory: "toys", price: 180, comparePrice: 220, image: "https://down-ph.img.susercontent.com/file/ph-11134207-7r992-lx936cpy4pvob4_tn", rating: 4.3, reviews: 92, stock: 45, description: "Soft plush toy with squeaker inside for hours of entertainment." },
        { id: 9, name: "Adjustable Dog Collar", category: "dogs", subcategory: "toys", price: 320, comparePrice: 380, image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rdww-ly6fmoa96xhiab_tn", rating: 4.6, reviews: 134, stock: 80, description: "Comfortable nylon collar with quick-release buckle and ID tag ring." },
        { id: 10, name: "Retractable Dog Leash 5m", category: "dogs", subcategory: "toys", price: 550, comparePrice: 650, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTrg8LcIGa2ytejWzO0-9YB8aL3jl_Ge8NB_pJ4aANREE0kklxRpnlroWV_61iXtMXRs6-wY7dYr7KwcF-RAufxhPuhx9g", rating: 4.5, reviews: 112, stock: 35, description: "Smooth retractable leash with ergonomic grip and brake button." },
        
        // Dogs - Grooming
        { id: 11, name: "Deshedding Tool Brush", category: "dogs", subcategory: "grooming", price: 380, comparePrice: 450, image: "https://down-ph.img.susercontent.com/file/sg-11134201-7qvd5-lker4j4g32yo58_tn", rating: 4.7, reviews: 89, stock: 40, description: "Reduces shedding by up to 90% with stainless steel edge." },
        { id: 12, name: "Oatmeal Dog Shampoo 500ml", category: "dogs", subcategory: "grooming", price: 280, comparePrice: 320, image: "https://down-ph.img.susercontent.com/file/ph-11134207-81ztl-mhlhvbjxvu9yf4.webp", rating: 4.8, reviews: 167, stock: 55, description: "Gentle formula with oatmeal for sensitive skin and coat conditioning." },
        { id: 13, name: "Nail Clippers with Guard", category: "dogs", subcategory: "grooming", price: 220, comparePrice: 280, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQsWHQ5wxpoZ9pT4qI91RWv7y6aTdJ4TahvB50aFPPukfjVKis8qWrAUrA9DsVfdswZ-vzGHURFGN5Csu6q_X7vtWctNj9VgzDkILr6UJc8Pf4WLqx5BBSmxUr0&usqp=CAc", rating: 4.5, reviews: 203, stock: 70, description: "Safety guard prevents over-cutting, includes nail file." },
        { id: 14, name: "Pet Grooming Gloves", category: "dogs", subcategory: "grooming", price: 180, comparePrice: 250, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMp2dWGoMF3lMPhc-dqzDaKUss1Ps0zxmlSpmU0BNlJncc6Fcz8T9xt_z7LDMMW2a6iy2p8LrsLuLX5vzcdCa8spvZJ0Dq_Qt59amvPutd&usqp=CAc", rating: 4.4, reviews: 145, stock: 90, description: "Five-finger design for easy grooming while petting your dog." },
        
        // Cats - Food & Treats
        { id: 15, name: "Whiskas Adult Cat Food 1.2kg", featured: true, category: "cats", subcategory: "food", price: 320, comparePrice: 380, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQFlOuLzgPataBPSuFaKX0o5NSvznRNQMxfTNqmyUuF44aC9DkSRmOrcrYpeAffSkMj7SeecEGb_RVP9-cvZfGKm5AjxKWaUG3jW0CLjabUENQUntfKOvYTxaB3a0f3ZaUMjxYddA&usqp=CAc", rating: 4.6, reviews: 234, stock: 85, description: "Complete nutrition with real fish and meat for adult cats." },
        { id: 16, name: "Premium Wet Cat Food (12 cans)", category: "cats", subcategory: "food", price: 480, comparePrice: 580, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSDyOzkksGvs3EHqqzTbS83LJDgjz05BWlrUUT1tNKimvbIUHO5w92jdQVc8Rqock2SELerP3Sg9jrsH1ZylsqFoNqosP4Ze37izM3M5EWZ-kER_P_GfnAV2G3mPxPu3woH6o6VDNGL&usqp=CAc", rating: 4.8, reviews: 178, stock: 60, description: "Grain-free wet food with real meat chunks in gravy." },
        { id: 17, name: "Cat Treats Tuna Flavor 100g", category: "cats", subcategory: "food", price: 120, comparePrice: 150, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcShXnx40qthvCodWJwRdMvHtkmGiNMx2LMW-bGSBMtuEMHFqLLVq9wDkLMgYe9L70P7qQosFCmYmE4ET_DiegAfzFTTuOhOBrqwmjquobM", rating: 4.7, reviews: 89, stock: 100, description: "Crunchy treats with real tuna flavor cats love." },
        { id: 18, name: "Hairball Control Formula 1kg", category: "cats", subcategory: "food", price: 450, comparePrice: 520, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSSep2ToTt8YCh6ThB_rjFhQjAJQN8CeqNfv8DMrIepf7yiseW7QdbHmgZnhf7BXvKfAUisk8kaXprNDmErWCWD8K9uj4avWkmlTTFi_CnOlb3Oh30QpB6hCdw", rating: 4.5, reviews: 67, stock: 40, description: "Special formula to reduce hairballs and support digestion." },
        
        // Cats - Litter & Sand
        { id: 19, name: "Clumping Cat Litter 10L", category: "cats", subcategory: "litter", price: 280, comparePrice: 350, image: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98u-lphjrm1z1pu225.webp", rating: 4.6, reviews: 312, stock: 120, description: "Fast-clumping formula with odor control technology." },
        { id: 20, name: "Crystal Cat Litter 5L", category: "cats", subcategory: "litter", price: 380, comparePrice: 450, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQSkD4STxmrfo9aQFA4loOtOWBf9eVz676tWotwjgJeInWGTvyZezDilP1czzRR9kgK169WKR-lGIYT_CvKBTv1AFv_8VjzYYGgIIO2qstimlqBqec3z9IL", rating: 4.4, reviews: 89, stock: 50, description: "Absorbs moisture and odors, lasts up to one month." },
        { id: 21, name: "Covered Litter Box", category: "cats", subcategory: "litter", price: 650, comparePrice: 800, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ00H5YQpt8Hn9vo71ABOjoEJ7rRCnenHcy8dZMi3ayzdQEktIt5Rpg0vNXahNn0ncQlkziQHUdYSpDWFyXKcAPjGeR-X1Jqst2bajxKV2-xtdpNQ4WVkYB67VH&usqp=CAc", rating: 4.7, reviews: 156, stock: 25, description: "Privacy hood with carbon filter for odor control." },
        { id: 22, name: "Litter Scoop with Holder", category: "cats", subcategory: "litter", price: 150, comparePrice: 200, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTUX2A5eGUsq5Hu4TQIe7soRhZATF-DiRdNNU8HUsDfA0ggfyes3IuVo6iPBlt2-SQeRkA8LT5nXNZx-AtDeoDgMmBVaukypptcx8e0Atne3dm766JazUtlNlrtlNgBFSazr3g7gA&usqp=CAc", rating: 4.3, reviews: 78, stock: 80, description: "Durable plastic scoop with convenient wall mount." },
        
        // Cats - Toys & Scratchers
        { id: 23, name: "Cat Scratching Post 60cm", category: "cats", subcategory: "toys", price: 450, comparePrice: 550, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQPfxkAEAR-bBcv4CkdRdialhh9GkZH5PznJNSR2jg0qcdrh3wHrJvbe7wChrFIrcgYqUXLu_x_DgNH3tu4VAuMV6Cd_lGoy56yfnCkQYk38c3-tfEDx6QkKQ", rating: 4.5, reviews: 134, stock: 30, description: "Sisal-wrapped post with stable base and hanging toy." },
        { id: 24, name: "Interactive Laser Toy", category: "cats", subcategory: "toys", price: 280, comparePrice: 350, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRo9LQjJQeC0dobvgy-K_AcRqoEnYYNJL199lRPY3Vxg_-z-2FGkB8ri8VbaM87UMcJLlr5v-qCSRqHBjnlae26g7tRHwcSpp_bgxVCMVhiaMqbw9LIxbNWCXfMnijFrxfAfjPGNQw&usqp=CAc", rating: 4.8, reviews: 89, stock: 45, description: "Automatic rotating laser for endless entertainment." },
        { id: 25, name: "Feather Wand Toy", category: "cats", subcategory: "toys", price: 120, comparePrice: 180, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRHP7dVr1zLEOX_6fHmCMbubWNZPR8A_jBDSHLwksfJ4oRu7M3XjT81FZHnikujlDt4-C0xt9l-fb2yj6TB-rarv817M3jsetgGc0bXEbI3Z6qTksqK7Hm1-iHzhQUiwFvhpgmS9Q&usqp=CAc", rating: 4.6, reviews: 203, stock: 70, description: "Interactive toy with feathers and bell for active play." },
        { id: 26, name: "Catnip Mouse Toy Set", category: "cats", subcategory: "toys", price: 180, comparePrice: 250, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRefQK-kBqYzK0ez7NxR7XKrVgOiq7YhlOp79SRqOpjXYCcJK4q_xRR0ajA52t9ztRrI5fAi3Oc2PeVIad5QcpzKqIy85VTHWRpYDEvtHHAdDGTK83tA5bweMdfog&usqp=CAc", rating: 4.4, reviews: 167, stock: 90, description: "Plush mice filled with premium catnip." },
        
        // Birds
        { id: 27, name: "Premium Bird Seed Mix 1kg", category: "birds", subcategory: "food", price: 220, comparePrice: 280, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQO-MPzkkQYMZHvu-OgVXM99xpDiuWEyr7DDwCix8FXSUZnC2Ue88vwKjpGiQCpgQcBS9jC72fz-NCP-oYYzZ3HsxxOQCIG", rating: 4.5, reviews: 67, stock: 40, description: "Nutritious blend of seeds, nuts, and dried fruits." },
        { id: 28, name: "Large Bird Cage with Stand", category: "birds", subcategory: "cages", price: 2500, comparePrice: 3200, image: "https://down-ph.img.susercontent.com/file/ph-11134207-81ztn-mfwc92v2st1r24_tn", rating: 4.7, reviews: 34, stock: 15, description: "Spacious cage with perches, feeders, and pull-out tray." },
        { id: 29, name: "Bird Swing and Perch Set", category: "birds", subcategory: "toys", price: 180, comparePrice: 250, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRR5r1SyhBmZ-sZWEQqU4kSCe5gEeAH5H7jR2VqqTgtM9OGyvXIm9dSMqGxrXrh5BBHCNaXWUc9Pgkx3fAHcEvQhaO21SPS7xOQRULBCRaexT1R3NAmfIZ0q9LQ&usqp=CAc", rating: 4.3, reviews: 56, stock: 50, description: "Natural wood perches and swing for exercise and fun." },
        { id: 30, name: "Cuttlebone Mineral Block", category: "birds", subcategory: "food", price: 80, comparePrice: 120, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR_tImsadIWLqAMvIuzyVVVCPzAbZVD8a1AqyenknW1wcMdWg4mZjb8xMZMIlJ3iDavJbj-oPa8ux97pbO1Gj-7DIlwKFqbO0pI4AoDBpK3mxF2SO8mB_62zar-&usqp=CAc", rating: 4.6, reviews: 89, stock: 100, description: "Essential calcium source for beak health." },
        
        // Fish
        { id: 31, name: "Tropical Fish Flakes 100g", category: "fish", subcategory: "food", price: 150, comparePrice: 200, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTE68Ky91FVRw5fWkDwdoQSmAw_fykxHOoOttiuJmqYoetKMAQmf6pGEVv0LdjdiqlMSnt36tFLchEARuFXGv1qjm1dKQphdg", rating: 4.4, reviews: 123, stock: 80, description: "Complete nutrition for tropical community fish." },
        { id: 32, name: "10-Gallon Aquarium Starter Kit", category: "fish", subcategory: "tanks", price: 1800, comparePrice: 2200, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRf40S4wrN1qvw9trkmkhoy9dltcnuH7ki6blR1SgsaH0R5Nl88rAaGcRY4K-_KCNsq5fZxh5_3ro-tQu73-sCrU5uZYsaCLDvtIq_58EMT&usqp=CAc", rating: 4.8, reviews: 45, stock: 20, description: "Complete kit with filter, LED light, and accessories." },
        { id: 33, name: "External Canister Filter", category: "fish", subcategory: "filters", price: 1200, comparePrice: 1500, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ81jCbAPMTY6BdrXGwwXucfqfrMWCrtwEOoGG4qdZZXgiemriX9vm3mxdBQwcLrdD0r7vpTbe9jECg63KoK2FqCny5cn6RqsYkRPC5yMoqFYKikyXu-hSdKvty7nMQzC17NiuE7g&usqp=CAc", rating: 4.6, reviews: 34, stock: 25, description: "Multi-stage filtration for crystal clear water." },
        { id: 34, name: "Aquarium Heater 100W", category: "fish", subcategory: "filters", price: 350, comparePrice: 450, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTFbRo1IvAf1Q1R843QHC9T_tj9liQCEL5mTWbyHTPfAn5A4FBqY1I4m1jz6KZQd8iZxNsJKIKQYOVSXwmsidGlKwu-wYTMKOFc8rpj4pMcTqqh3QgFmUhLjA&usqp=CAc", rating: 4.5, reviews: 78, stock: 40, description: "Submersible heater with thermostat control." },
        { id: 35, name: "Artificial Plant Decor Set", category: "fish", subcategory: "decorations", price: 280, comparePrice: 380, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQEzsxzYzON9whLflJH-vvRVGTCL63PL8l6NDj_CR66Pbi2xOismfm9nS-5-l_EKjMLebRxsYBhcrA5jNnWN1cLb69RnFMN6XG4kWIJeCbVCUF7hZrqxMpClJZNs_71s3zK1hJh1Fw&usqp=CAc", rating: 4.3, reviews: 156, stock: 60, description: "Realistic plastic plants for aquarium decoration." },
        
        // Small Pets
        { id: 36, name: "Hamster Cage with Accessories", category: "small-pets", subcategory: "cages", price: 850, comparePrice: 1100, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTm17aeNCElS6wr7s5R5REYb4qFoK8_yBP7LzJr236qlhqObMErMZo1iwsJHxbTqSENTMGNyJtqdU8x00whKqciINslD61acQCg_ZLDiyTN2Gsb1kwJaEpuKHGi1CjZWT_UO6-C4n4&usqp=CAc", rating: 4.5, reviews: 89, stock: 20, description: "Multi-level cage with wheel, water bottle, and food bowl." },
        { id: 37, name: "Guinea Pig Food Pellets 1kg", category: "small-pets", subcategory: "food", price: 280, comparePrice: 350, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQiN2ndVeXVKY0oV1Cu-GzkKgmCHGdyfV2HwxwmTxdnHyE07luPDARJsPZjqrEgUNyIeJacecueq-xfZ491eOY6-BkHHkO9UttuM4d0UL0myE96ncuNA1DpFQ", rating: 4.6, reviews: 45, stock: 50, description: "Vitamin C fortified pellets for guinea pigs." },
        { id: 38, name: "Rabbit Hay Feeder", category: "small-pets", subcategory: "supplies", price: 180, comparePrice: 250, image: "https://down-ph.img.susercontent.com/file/ph-11134207-81ztk-mfktpukkak2058.webp", rating: 4.4, reviews: 67, stock: 40, description: "Reduces waste and keeps hay clean and accessible." },
        { id: 39, name: "Small Pet Exercise Ball", category: "small-pets", subcategory: "toys", price: 220, comparePrice: 300, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRSfffI0gDtwx-uuWdx2CnJJiNHn8yf9xNbE8tdNpTEjBenUGjmsQOrhhhh8f7igx2_HCMF6iMMZuwTjqCnmDiyVfg2Xu5uemnb7V6QFDTd1l71bSW3nGZfUnK7cnsXD6DfggIaJA&usqp=CAc", rating: 4.2, reviews: 134, stock: 35, description: "Safe exercise ball for hamsters and mice." },
        { id: 40, name: "Wood Chew Toys Pack", category: "small-pets", subcategory: "toys", price: 150, comparePrice: 200, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ8tpUnUN20wYgACrlNPd-nKGyfWRiuCTcFm9mLBb1PwrXy7S6gsis3TcSgu809ZgUS2ifu_ba7WflBXmXATJVp2TCE7w6zelTB8fPt3N_YJhP3bm6ufOQTtQ", rating: 4.5, reviews: 78, stock: 70, description: "Natural wood toys to keep teeth healthy." },
        
        // Additional products to reach 100+
        { id: 41, name: "Dog Training Clicker", category: "dogs", subcategory: "training", price: 80, comparePrice: 120, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUir-LFSQQl9biVS0MnUa8dNXT7ivyE8gP5VXzjWXxIun0GVFLu7cTy_bUiyEVtY3Xnu078A1Ryv0OXNZ4IqB3G2tU41QmVL-vwJJsojxxIuoM-MJGK3yTBlOOUw1aybE1-sRtPw&usqp=CAc", rating: 4.3, reviews: 45, stock: 100, description: "Effective training tool with wrist strap." },
        { id: 42, name: "Puppy Training Pads (50pcs)", category: "dogs", subcategory: "training", price: 350, comparePrice: 450, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTXRkPcsNMH0ziJiHBvkIoVpAxUYSVAdecJMN5xzNCMtNEYNW6nsgUi3TDQmzxqh45-Hbc8sW2duqXRHahzJ7dlb8RPDi2hPcflpt163RemmeIcVI_1EA4f6-N32khp44-ebIRkCQ&usqp=CAc", rating: 4.4, reviews: 234, stock: 60, description: "Super absorbent pads with leak-proof backing." },
        { id: 43, name: "Dog Car Seat Cover", category: "dogs", subcategory: "accessories", price: 650, comparePrice: 850, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGHn2XXUGsBjvrc_9MGlixITDxHzez2iYY7M6e5VYxPe-Y5BKVFyri01CcsHS7YbHg11VpivTZqO1gBGpdNFZSNolPRozSdoWyrPy2Oiw&usqp=CAc", rating: 4.6, reviews: 89, stock: 25, description: "Waterproof hammock-style seat protector." },
        { id: 44, name: "Automatic Pet Feeder", category: "dogs", subcategory: "accessories", price: 1200, comparePrice: 1500, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQDvercAZ2AlDiXyjVBOClde6uEMGXQPrWOSRCJbPwH7X4Rsug7MFjO10FxJ0nRHzKxH8S_tqevJ_3UjK2NkfhNTQh6cZ_tZAAUAM_D6bAE30RFMmC46FWpMBniCl3pEANiqEE9jEU&usqp=CAc", rating: 4.5, reviews: 56, stock: 20, description: "Programmable feeder with portion control." },
        { id: 45, name: "Dog Bed Large Size", featured: true, category: "dogs", subcategory: "accessories", price: 850, comparePrice: 1100, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTi38c0b3dcCX_9zuQ2fghwr31NwxsOIKtCOTl8bnSYPiSq53PS8DRnBpviDym8Qp4aLeqhSBHVfn9_x4T08KE8O9XnqpAcwf2PCgsdktsydYsLRTEMkxjOTgFb63raBKSnonwOwQ&usqp=CAc", rating: 4.7, reviews: 167, stock: 30, description: "Orthopedic foam bed with removable cover." },
        
        { id: 46, name: "Cat Window Perch", category: "cats", subcategory: "accessories", price: 450, comparePrice: 600, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTUjlze1RvA2__QC86yxa8fIlXpcsmPsNDDGfUfGUNZLEIb-CdjNYSSMN0xyic04zHUmhRHcCjB9CEErKRDGGT433ZqycJ5mw", rating: 4.8, reviews: 123, stock: 40, description: "Sunny seat for cats to watch the world." },
        { id: 47, name: "Cat Carrier Soft-Sided", category: "cats", subcategory: "accessories", price: 550, comparePrice: 700, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRWIX0RYGaia9_w7-LbeSJ9qtGgWiE8xwGFFO85co1swbcPBcMVAetkJvLyYGeqW6IYD1byUyKQkhzFX42lsw5Tv-lbdihU42pLPBNSp6dBGTIjRpc8wXpupGSseA&usqp=CAc", rating: 4.4, reviews: 89, stock: 35, description: "Comfortable carrier with mesh ventilation." },
        { id: 48, name: "Automatic Cat Water Fountain", category: "cats", subcategory: "accessories", price: 750, comparePrice: 950, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ0wE0YD_bhk0HcqdAWkzUsK6OnBg-gC56R1SWPDrEGwn6tl6O9coeRXpjscoid6ZiOQyFWa70ULEtaUB1YgamTJS9qcYa_F20MokzzcnHiCU8BlPhPsW4sKAUZEYEUr4__u4D87gg&usqp=CAc", rating: 4.6, reviews: 234, stock: 25, description: "Encourages hydration with flowing water." },
        { id: 49, name: "Cat Tree Tower 150cm", featured: true, category: "cats", subcategory: "toys", price: 1800, comparePrice: 2300, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSoHpyz4pQ9dCFnaroXrWqcnrSzw-dB5GkziZ3PYvzgHU7jaGlXj0BunFefyLdh1YbZP4vVY17IT9o5JfTyJ4GdYkehj4QPW8t95zyqk8Ez1LY0S86pTJs_&usqp=CAc", rating: 4.9, reviews: 78, stock: 15, description: "Multi-level playground with condos and perches." },
        { id: 50, name: "Flea Comb for Cats", category: "cats", subcategory: "grooming", price: 120, comparePrice: 180, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSVb1iBaYQ6YxRZaeoWTqJOKzhgFeORXYRXccPGfX86HvJsXsmRStHbkfcPnQqFW85xJxfipLeX9afpkH5Bc1hC9u8GPneuVE0oqzn7_t3j&usqp=CAc", rating: 4.3, reviews: 45, stock: 80, description: "Fine-tooth comb for flea detection and removal." },
        
        // Continue with more products...
        { id: 51, name: "Parrot Toy Set", category: "birds", subcategory: "toys", price: 350, comparePrice: 450, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhm2fDQ9WA6niodA7Npm9V0lS1sYjmwWgkrf75Zgw0ONwfjm3fS4kRuP8oGfDhKDLcE9bKdObLU6uskrqZojwNJ1m6bDMsAy62i-LQp-X2", rating: 4.5, reviews: 34, stock: 30, description: "Colorful toys to prevent bird boredom." },
        { id: 52, name: "Bird Bath Tub", category: "birds", subcategory: "accessories", price: 180, comparePrice: 250, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRo8OIi5qfHeitgEQam6_AmR_Fs_nf8-fmpPD_yDqGV0Jvq1UbENSkCP6lkReDzbbWgyqpgoJQWFyaP4gXKn4ba-pUIK_z0in-bfXt-smINPTZHYTnBB8qh0TV8hyLzdlJxzOQ-Q64&usqp=CAc", rating: 4.2, reviews: 56, stock: 45, description: "Universal fitting bath for cage doors." },
        { id: 53, name: "Mineral Block for Birds", category: "birds", subcategory: "food", price: 100, comparePrice: 150, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQx-oKxyXzH2fE9L6DpnsSUWyNBZFrgPRdtvvEW0kS8KsnH4YmneOR1PGKllmYcdF1qnr0woGoKKlmCiXz_NpyzaWjZOaPT3qEJXDcjmNl_AG1XiBKZlRzs7S4&usqp=CAc", rating: 4.4, reviews: 78, stock: 90, description: "Essential minerals and beak conditioning." },
        { id: 54, name: "Breeding Box for Birds", category: "birds", subcategory: "cages", price: 280, comparePrice: 380, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSjuTGoHLxsLDpB7ULsHUJD1YQB08n3ey3o0hTlUHTfBb_n5UaPsnoKeTPPtsCfS427y4aRkIZfAE_AZ6HyPFvDN6GTdIHpfjXQKjabeUKd-Ur4l6e31e-xQrgNoKQySBDTyaYrP2k&usqp=CAc", rating: 4.3, reviews: 23, stock: 25, description: "Cozy nesting box for breeding pairs." },
        
        { id: 55, name: "Aquarium Gravel 5kg", category: "fish", subcategory: "decorations", price: 180, comparePrice: 250, image: "https://down-ph.img.susercontent.com/file/ph-11134207-81ztm-mkdpamussjybd0.webp", rating: 4.4, reviews: 89, stock: 60, description: "Colorful pebbles for aquarium substrate." },
        { id: 56, name: "Air Pump with Stones", category: "fish", subcategory: "filters", price: 320, comparePrice: 420, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQDvnaMdhIX5AIG56kJEa3mPE-yxeFtGMxaMmxc1NUZhz6_CMD-oZ-nOBgdBSeKhBkQLq9ZjK3n8VpO9WzJYB7iDKmLIbOOAA", rating: 4.5, reviews: 67, stock: 40, description: "Quiet operation with air stones included." },
        { id: 57, name: "Fish Net Set", category: "fish", subcategory: "accessories", price: 80, comparePrice: 120, image: "https://down-ph.img.susercontent.com/file/sg-11134275-8262a-mk805bzbrpc5da", rating: 4.1, reviews: 134, stock: 100, description: "Various sizes for different fish types." },
        { id: 58, name: "Water Test Kit", category: "fish", subcategory: "accessories", price: 450, comparePrice: 600, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR-Am7i4vqVmAg7eAdV7ExpUxiBUPqVta5jZn92qN68T_0BOOReoaxJq-Jdx7XWSAREn_kgZvXb6oJmd_MsuJfJAeuZl0zQk4Kev82Sx8ptDhrUDMkxn2wiQw", rating: 4.7, reviews: 45, stock: 30, description: "Complete testing for pH, ammonia, nitrites." },
        { id: 59, name: "Driftwood Decoration", category: "fish", subcategory: "decorations", price: 280, comparePrice: 380, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQlPHO5PK53PoUWYPmdjD6NIpBKVKowNS69t9vHHnT4oLsPdcLqBSJt8BGJaeVnXe003cVkXj7fYWX2vBRqyMXPpP9QqgN01bB2QT0kvau9", rating: 4.3, reviews: 56, stock: 20, description: "Natural Malaysian driftwood for aquascaping." },
        
        { id: 60, name: "Hamster Wheel Silent", category: "small-pets", subcategory: "toys", price: 250, comparePrice: 350, image: "https://down-ph.img.susercontent.com/file/sg-11134207-8260m-mkohp2vk09hj5c", rating: 4.6, reviews: 123, stock: 40, description: "Quiet spinner wheel for night activity." },
        { id: 61, name: "Rabbit Hutch Outdoor", category: "small-pets", subcategory: "cages", price: 3500, comparePrice: 4500, image: "https://down-ph.img.susercontent.com/file/ph-11134201-7r98w-lvs6908h1byqbc", rating: 4.8, reviews: 34, stock: 10, description: "Weatherproof two-story rabbit home." },
        { id: 62, name: "Guinea Pig Tunnel", category: "small-pets", subcategory: "toys", price: 180, comparePrice: 250, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQsi_7JZ8DdQhZP3V5nh-GbQBndtwMBq3RAgEOWxmEYdE2pNEt7H8t-W56K2Sd4VjTPlpvEHfzrPL07AJi9mJmvGj57jji_zJijebSOeoWgSeYzv3YOgLw5", rating: 4.4, reviews: 67, stock: 50, description: "Crinkle tunnel for play and hiding." },
        { id: 63, name: "Small Pet Carrier", category: "small-pets", subcategory: "accessories", price: 380, comparePrice: 500, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSlFw-Ud4MN2cFkxS54civ9H-m1oikHyNHFTK0c_hRtcaMxqKmedZW_pfZ3vw-fywPBMhm51SgELylv4XVx-SQwBKSXZi0Ya9ZHrtojWiMF84Y1nH0p8QCz", rating: 4.5, reviews: 89, stock: 35, description: "Ventilated carrier for vet visits." },
        { id: 64, name: "Bedding Material 10L", category: "small-pets", subcategory: "supplies", price: 220, comparePrice: 300, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQzialhp1NKEXb6mPXAELMINBi4TAyFfzA6bK-IWbSmkHetnxEXSHOmNR5Gaf0Wq2KaquCMjYbqLmIt24oz9gsEofcdip_oEQ", rating: 4.3, reviews: 112, stock: 70, description: "Dust-free paper bedding, highly absorbent." },
        
        // Additional products to reach 100
        { id: 65, name: "Dog Poop Bags (200pcs)", category: "dogs", subcategory: "supplies", price: 150, comparePrice: 200, image: "https://down-ph.img.susercontent.com/file/sg-11134201-8262k-mk4u1gn9smx440", rating: 4.5, reviews: 334, stock: 150, description: "Biodegradable bags with dispenser." },
        { id: 66, name: "Cat Litter Mat", category: "cats", subcategory: "litter", price: 280, comparePrice: 380, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR3YFKRBgfx-aj8Kk-tnq3ZpLGqQO-NM0bBkDQBJAtqNF-3DyZctNzm5Za5jx2Jc32onfqT2lB_u7O4dbak7UasQ6wRNorf1oshxAnpfVFKQDuU5L5g-9OSMw", rating: 4.4, reviews: 167, stock: 80, description: "Traps litter from paws, easy to clean." },
        { id: 67, name: "Bird Cage Cover", category: "birds", subcategory: "accessories", price: 350, comparePrice: 480, image: "https://down-ph.img.susercontent.com/file/sg-11134201-824i8-mdvmh7w4wq2r45.webp", rating: 4.3, reviews: 45, stock: 30, description: "Blocks light for better bird sleep." },
        { id: 68, name: "Aquarium Light LED", category: "fish", subcategory: "accessories", price: 650, comparePrice: 850, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTb4lgi27g4HIq_vRhWLvokdA_qWxtbZE5XG7-HmV2Obyn8y_iwgoYz_plUXRB91QnFVfsZVxXAGeYoEVnuyfnH7kke9RDWJMHCJisUh2A&usqp=CAc", rating: 4.6, reviews: 78, stock: 25, description: "Full spectrum LED for plant growth." },
        { id: 69, name: "Hamster Food Mix 1kg", category: "small-pets", subcategory: "food", price: 180, comparePrice: 250, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ5WOiqZWxOi8KJYz-DywphDkdZBc-Ay0KDdSAzzqwRTjlAg3qb59Xk3CMPeZgt9VgJJAcY54MXkUlcPitXBPH6byLubJMshfFn2pFnvSxT", rating: 4.4, reviews: 89, stock: 60, description: "Balanced diet with seeds and pellets." },
        
        { id: 70, name: "Dog Muzzle Adjustable", category: "dogs", subcategory: "training", price: 220, comparePrice: 300, image: "https://down-ph.img.susercontent.com/file/sg-11134201-7rd3q-m7vqxvdolog32b.webp", rating: 4.2, reviews: 56, stock: 40, description: "Soft nylon muzzle for safe grooming." },
        { id: 71, name: "Cat Collar with Bell", category: "cats", subcategory: "accessories", price: 120, comparePrice: 180, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTQ3gGnnn8sTGJ478vCIG7UmodvjolhUqEpp1urydVSPJmk33I6sDB4bavJsD6lmduBjjCvWHP7pSz46NH8eEqlY2EdrcS8xCByQbAl7MAwqUgNjaRF3S9AF5vjtABafSVmLJOr6qCKYLg&usqp=CAc", rating: 4.3, reviews: 234, stock: 100, description: "Breakaway safety collar with cute bell." },
        { id: 72, name: "Bird Perch Stand", category: "birds", subcategory: "accessories", price: 280, comparePrice: 380, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTS8YYza_iJt01t8nE413376vFyiBbfmrUbntqRsyKovqjJfwZsmWPhxB7JeULwJeh-kWW-rxKCClTHu2dWJP56RihtTBPRAbpXoY5nVfCLsP7WgeQuRU30Mh4YUhq8A07CqhvyKzc&usqp=CAc", rating: 4.5, reviews: 67, stock: 45, description: "Portable stand for out-of-cage time." },
        { id: 73, name: "Fish Tank Cleaner", category: "fish", subcategory: "supplies", price: 180, comparePrice: 250, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSUt8ifDFTtXFAuNlU4aNND1e5RzUPDqsJLq7jkmF9p-I-M2W9Za4LgY8jNNaGFfLLDi46mDiHMylfjohdPBcs6DeuOrlqWTeDgdjfT1CU3wg7utU2F0bgoOyg", rating: 4.4, reviews: 123, stock: 70, description: "Magnetic algae scraper for glass tanks." },
        { id: 74, name: "Rabbit Grooming Brush", category: "small-pets", subcategory: "grooming", price: 150, comparePrice: 220, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQOjrGYFVxQO_IgpNF1s-urqAJhoRG4gnL-1TXFLpEh6A1CgmDvb8Dra0zRgw8XhHwhXPrDYpVQBJmGicyVJbMj-jBUaLpzXVekhMm5f00&usqp=CAc", rating: 4.6, reviews: 45, stock: 55, description: "Gentle bristles for sensitive rabbit skin." },
        
        { id: 75, name: "Dog Treat Pouch", category: "dogs", subcategory: "training", price: 280, comparePrice: 380, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT8ZV6RM7yM7BOhnzg1Q_h1Btd6w7EZdJTLV7aBpTKDtyui1wLwVM79Uto1wMn9sJWTnp1ODkDE5gujwgBx_67BuDE6mjE2R_TrRkGttvW-ozBxqM_u8IRMxMZak9khVlQbUDifaA&usqp=CAc", rating: 4.5, reviews: 89, stock: 50, description: "Waist pouch for easy treat access." },
        { id: 76, name: "Cat Food Bowl Slow Feed", category: "cats", subcategory: "accessories", price: 180, comparePrice: 280, image: "https://down-ph.img.susercontent.com/file/ph-11134207-81zte-mhbcnkb8meq26a.webp", rating: 4.4, reviews: 112, stock: 60, description: "Prevents fast eating and aids digestion." },
        { id: 77, name: "Bird Mirror Toy", category: "birds", subcategory: "toys", price: 100, comparePrice: 150, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfhM5maYeU4JnR1pSxy77TkE0dGTlbz5DuG4abFxcu8jvGWbU8URb5hMnTunNV4xsJCU1jOOKpJtrBYP50jiMblBtw0Yruqw4M8_NJmkY", rating: 4.1, reviews: 78, stock: 80, description: "Shatterproof mirror for bird entertainment." },
        { id: 78, name: "Aquarium Thermometer", category: "fish", subcategory: "accessories", price: 80, comparePrice: 120, image: "https://down-ph.img.susercontent.com/file/e1ea093812a16191727c76b5fb7d4138.webp", rating: 4.3, reviews: 156, stock: 90, description: "Digital thermometer with probe." },
        { id: 79, name: "Guinea Pig Hideout", category: "small-pets", subcategory: "accessories", price: 220, comparePrice: 320, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTC2TnaqVJ72BkP0ffOCjo-XtSMjj7epd33qvx8goZlOu_0ovbGz66r1_4IRQvnpRiQaECUwgDrgUQc-c0blt3_NaNlCRAJcm_Gk6V84hqXDzFHQoJf6gUKX4E", rating: 4.5, reviews: 67, stock: 40, description: "Cozy wooden hideaway for guinea pigs." },
        
        { id: 80, name: "Dog First Aid Kit", category: "dogs", subcategory: "health", price: 450, comparePrice: 650, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRRnx00P1sqrnwu_EqsNtwIIdNbTaB_xsPj9kiFydufnFrckJOw27Zckusu1vzVpapKtSAJhhv8VUNHMkvWvqDQv0acmN0cEg", rating: 4.7, reviews: 34, stock: 25, description: "Essential supplies for pet emergencies." },
        { id: 81, name: "Cat Calming Diffuser", category: "cats", subcategory: "health", price: 550, comparePrice: 750, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRGNR4Ecr3oQYT6yoTwBQHPiLTP2vCbjErP7fRfAkQdr-0vFYXTupl60GCh_bCfTFqaDHgNgEgDonM1Z4JxwFY7b7N1A1I8zaL07iorVyEEFTyh7Qmwc7mI3gc", rating: 4.3, reviews: 89, stock: 30, description: "Pheromone diffuser reduces cat stress." },
        { id: 82, name: "Bird Vitamin Drops", category: "birds", subcategory: "health", price: 180, comparePrice: 250, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRJsmExDW4nVCnJKU5-7mnfLqmRBU4ZTMRTxKoI1B5ftrKOMPw_HoUufXWKyLeyrRLl8MM0I8AJE8Qo99O_70fGTNy9v_r-EGToEZchPgOxOlYhgttRATLF1fk", rating: 4.4, reviews: 45, stock: 50, description: "Essential vitamins for bird health." },
        { id: 83, name: "Fish Medication Set", category: "fish", subcategory: "health", price: 380, comparePrice: 550, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ0nMI1xboBjjzzOT2VeCDsMIh-1cH878f7PGMsJsgat84THOvHlznGp4O4j3jkOwOJlaHJfwQ3xjeTuBU1ila4n_fZwixFwXHYtoGlz4yewU5edvmTvWGodw", rating: 4.2, reviews: 23, stock: 20, description: "Treats common fish diseases." },
        { id: 84, name: "Small Pet Nail Clippers", category: "small-pets", subcategory: "grooming", price: 120, comparePrice: 180, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSmufjO31PqmyYcwLUPaTwNA4hQ_vE5rAIYAE9GKl6nbyC1NB7JPSiPRBt0Nh8fVkdvO2lYcvznXmZNex0w_px0G8vdO8XfaixdBRMNtt-6", rating: 4.3, reviews: 78, stock: 70, description: "Small size perfect for guinea pigs and rabbits." },
        
        { id: 85, name: "Dog Raincoat", category: "dogs", subcategory: "accessories", price: 350, comparePrice: 480, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_I4UEL_EDYYUSXBtA0QqqEsOzqCIJwmu--8YreQBP44-lCNRkjmY7i-pEm38FdYJioii0s2i_yIrYs7LcCaTVe0R_e957NMWKFAhUM2E&usqp=CAc", rating: 4.5, reviews: 56, stock: 35, description: "Waterproof coat with reflective strips." },
        { id: 86, name: "Cat Harness and Leash", category: "cats", subcategory: "accessories", price: 280, comparePrice: 400, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS_kuc5Fa_AZtg_deTO2sOsgLxrzlfgvd1bnyO1LM3NmMcXk1HSpHZCWRSElulN34xnIgeKL0qmVdmF3dqnyP4ApjL4HnjzCXx_Bpe22YMqLN5Qd_vUPA0-1w8IFuYHlkSA9WS5w&usqp=CAc", rating: 4.2, reviews: 134, stock: 45, description: "Escape-proof harness for safe outdoor walks." },
        { id: 87, name: "Bird Food Storage Container", category: "birds", subcategory: "accessories", price: 220, comparePrice: 320, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGCi8idX0PZp4fFinAqY2qkOOa_vh2UNgZX4NCm5jSR6Z5hO_EPdgCUZRpCJuMUn1oWExMQaQTEHBzxbGOfAubfAvBe6fkqLovCpvqfOXK4WF8K60r_Nm7Wts", rating: 4.4, reviews: 67, stock: 40, description: "Airtight container keeps food fresh." },
        { id: 88, name: "Aquarium CO2 System", category: "fish", subcategory: "accessories", price: 1200, comparePrice: 1800, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4mZoDwvrBqn8OnpuKdkfyKEBLh83Lk-sG3nJrLIqTY3sLZj0Bpoup6z-TNlhQ8yBAYEqaEMic-WKC3_SkLHZo9pZKGfrO3cqY_ZCQXebJLOcNv2CfSSqFPzMbndmQIrkPooDtoog&usqp=CAc", rating: 4.6, reviews: 12, stock: 15, description: "Complete CO2 kit for planted tanks." },
        { id: 89, name: "Hamster Sand Bath", category: "small-pets", subcategory: "supplies", price: 150, comparePrice: 220, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTzv_68UIE6DAxbAEgmPNu_mJNZpNJVu10MkBu_9xHVbpwSwoik30w3x9VoeL6UqeufOnvveuaIHJa2YAipECdFtL0b3k5vTq00BTx89GmYNA-1cG-UErEu", rating: 4.5, reviews: 89, stock: 60, description: "Chinchilla sand for hamster grooming." },
        
        { id: 90, name: "Dog Sunscreen", category: "dogs", subcategory: "health", price: 280, comparePrice: 380, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSivHw0cdxncuCCch15fgUKpbEe9gRL5A-b0dTGyWNAzY0hsf7UAwLiY7YX7zFYyT_ejXxQJM2FIQI80IZ-YYrx5imKQSgjKmAXsQ7NUx5IvycHbL3S7D9ccA", rating: 4.3, reviews: 23, stock: 30, description: "SPF protection for dogs with thin coats." },
        { id: 91, name: "Cat Toothbrush Set", category: "cats", subcategory: "grooming", price: 180, comparePrice: 280, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR7Ld5Dmw22sWyjIxC0ouI0K5HZH67_o19zqG6OPDA-YfJkAR2oVyWkNDwEFBa_VeF4IU4i_sSllOlJ1afW7lLjH42kvvRfjw", rating: 4.1, reviews: 45, stock: 50, description: "Finger brush and toothpaste for cats." },
        { id: 92, name: "Bird Scale Digital", category: "birds", subcategory: "health", price: 450, comparePrice: 650, image: "https://down-ph.img.susercontent.com/file/ph-11134207-81zte-mir09v3fhhxicb.webp", rating: 4.4, reviews: 12, stock: 20, description: "Monitor bird weight for health tracking." },
        { id: 93, name: "Fish Breeding Tank", category: "fish", subcategory: "tanks", price: 380, comparePrice: 550, image: "https://down-ph.img.susercontent.com/file/d7d07a4a9755255d9cc13e9b1019b60a.webp", rating: 4.3, reviews: 34, stock: 25, description: "Separate tank for breeding and fry raising." },
        { id: 94, name: "Rabbit Playpen", category: "small-pets", subcategory: "accessories", price: 850, comparePrice: 1200, image: "https://down-ph.img.susercontent.com/file/83525bea686a7bd7b9db03ea988e7c64.webp", rating: 4.6, reviews: 45, stock: 20, description: "Modular panels for safe play area." },
        
        { id: 95, name: "Dog Cooling Mat", category: "dogs", subcategory: "accessories", price: 450, comparePrice: 650, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRC0Biq_MTYwrcZv5OmlQH5PUtvgq8vii7VY7634hTk5iXolaYm8dmTbqPoY39wCLn140uSAUfq-k4Q-uQFuQ2q8ofpbeCJ", rating: 4.5, reviews: 78, stock: 35, description: "Self-cooling gel mat for hot weather." },
        { id: 96, name: "Cat Stain Remover", category: "cats", subcategory: "supplies", price: 220, comparePrice: 320, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTqGp657W0F9CHvvlXHDEycQFctRJ9iu8sOjp1tWLE1qs0kDSUhtrawxuSo9NPprVAl0lFMzIncg53fT6LxaooGg6ITOoRO-_SzWNksGrRYnq2iULYl89vgHOinAIN6YWgtgsuZJU_X1ys&usqp=CAc", rating: 4.4, reviews: 123, stock: 60, description: "Enzyme cleaner removes odors and stains." },
        { id: 97, name: "Bird Cage Cleaner", category: "birds", subcategory: "supplies", price: 180, comparePrice: 280, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTGferYoN5n4p-iOA4Rh1-YKP4MBmsesYd2WJ1TdgA7GhFjp5cy9yun6VgaEgYnjDRWfiDYlEwnWBa7RanbBqtIISONs2XYo626-fT2hDrE", rating: 4.3, reviews: 56, stock: 45, description: "Safe cleaner for bird cages and accessories." },
        { id: 98, name: "Aquarium Plant Fertilizer", category: "fish", subcategory: "supplies", price: 280, comparePrice: 400, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRlI2oOMWQYlaWtqitYkEXNQ2UhNYNXj8sZaiiUZJM7FugGVY5JY1HGUNs94a2tYZtq6Iv7Shx73CAGSLdhni5oCQUEiyW9_-2r8qIXt1R&usqp=CAc", rating: 4.5, reviews: 34, stock: 40, description: "Liquid fertilizer for aquatic plants." },
        { id: 99, name: "Small Pet Water Bottle", category: "small-pets", subcategory: "supplies", price: 120, comparePrice: 180, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR3I5J3HksS7cjMF0QA82EEF2kSYKDpoZlHXV9P3seAAxdcg8rGfb8M_5ugQy02IIg70ruk3ycD3WwZQjZqBDe7EdQVPRYuBVoSfLi0VZyfPajdHit92jz5iw", rating: 4.2, reviews: 167, stock: 100, description: "Leak-proof bottle with metal spout." },
        { id: 100, name: "Pet First Aid Book", category: "general", subcategory: "books", price: 350, comparePrice: 500, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfei2RxxxFQ0veaq_VxgVuc_iSWaAT_ll8oWHgr38BUCNWvokESAfq3uPmMYjb2uwkTIRWwXQlVeXAzf5n2zs4HQAI0wnF17e11GyVt6rE2eg2neDA92jj", rating: 4.8, reviews: 23, stock: 30, description: "Comprehensive guide to pet emergencies." }
    ],
    
    lostFound: [
        {
            id: 1,
            type: "lost",
            petType: "dog",
            name: "Max",
            breed: "Golden Retriever",
            color: "Golden",
            size: "large",
            location: "Makati City, near Greenbelt",
            date: "2024-03-10",
            contactName: "Juan Dela Cruz",
            contactPhone: "09123456789",
            description: "Wearing red collar, very friendly, responds to name",
            image: "https://assets.orvis.com/is/image/orvisprd/9X3Y0621HDAlt1_018?wid=456&src=is($object$:3-4)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
            status: "active",
            comments: []
        },
        {
            id: 2,
            type: "found",
            petType: "cat",
            name: "Unknown",
            breed: "Persian Mix",
            color: "White/Gray",
            size: "medium",
            location: "Quezon City, Katipunan Area",
            date: "2024-03-11",
            contactName: "Maria Santos",
            contactPhone: "09987654321",
            description: "Found near Ministop, very clean, probably escaped from home",
            image: "https://assets.parade.pet/images/6934727/original.jpg",
            status: "active",
            comments: []
        },
        {
            id: 3,
            type: "lost",
            petType: "bird",
            name: "Mango",
            breed: "Lovebird",
            color: "Yellow/Green",
            size: "small",
            location: "Pasig City, Ortigas",
            date: "2024-03-09",
            contactName: "Pedro Reyes",
            contactPhone: "09171234567",
            description: "Green body with yellow head, can say 'hello'",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkfIqVrTQCMVPZQLqCc_UZtW3D7pWv_Bb6Q&s",
            status: "active",
            comments: []
        },
        {
            id: 4,
            type: "found",
            petType: "dog",
            name: "Unknown",
            breed: "Shih Tzu",
            color: "White/Brown",
            size: "small",
            location: "Taguig City, BGC",
            date: "2024-03-12",
            contactName: "Ana Lim",
            contactPhone: "09281234567",
            description: "Well-groomed, wearing pink bow, no collar",
            image: "https://static.vecteezy.com/system/resources/thumbnails/074/519/184/small/a-cute-fluffy-brown-and-white-shih-tzu-puppy-wearing-a-pink-bow-looks-at-the-camera-while-lying-on-a-pink-blanket-photo.jpg",
            status: "active",
            comments: []
        }
    ],
    
    community: [
        { id: 1, author: "Sarah PetLover", avatar: "S", topic: "dogs", title: "Best dog food for sensitive stomach?", content: "My 2-year-old Labrador has been having digestive issues. Has anyone tried limited ingredient diets? Would love recommendations!", image: null, likes: 24, likedBy: [], comments: [], time: "2 hours ago" },
        { id: 2, author: "Mark CatDad", avatar: "M", topic: "cats", title: "My cat's first birthday party ideas", content: "Planning to celebrate my kitty's first birthday next week. Any ideas for cat-safe treats and decorations? Share your celebration photos!", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop", likes: 56, likedBy: [], comments: [], time: "5 hours ago" },
        { id: 3, author: "Aquarium Pro", avatar: "A", topic: "fish", title: "New planted tank setup - Day 1", content: "Just started my first aquascape project. Using ADA Amazonia soil and Monte Carlo carpet. Will update progress weekly!", image: "https://images.unsplash.com/photo-1522069365940-3ccea4d79fa2?w=600&h=400&fit=crop", likes: 89, likedBy: [], comments: [], time: "1 day ago" }
    ],

    
    guides: [
        { id: 1, category: "dogs", title: "Complete Guide to Puppy Training", excerpt: "Learn the basics of house training, crate training, and socialization for your new puppy.", readTime: "8 min read", image: "https://m.media-amazon.com/images/I/610BOcuj6vL._AC_UF1000,1000_QL80_.jpg", content: "<h3>House Training Basics</h3><p>Puppy training is one of the most important investments you will make in your dog's future. Start house training by establishing a consistent routine: take your puppy outside first thing in the morning, after every meal, after naps, after play, and right before bed.</p><h3>Crate Training</h3><p>A crate gives your puppy a safe den-like space. Introduce it gradually with treats and toys. Start with short 15-30 minute sessions and build up over weeks. The crate should always feel positive, never like punishment.</p><h3>Basic Commands</h3><p>Start with sit, stay, come, and leave it. Use positive reinforcement: treats, praise, and play. Keep sessions short, 5-10 minutes, and always end on a successful note. Every family member must use the same commands consistently.</p><h3>Socialization</h3><p>The critical window is 3-14 weeks. Safely expose your puppy to different people, children, animals, sounds, and environments. Positive experiences during this time shape your dog's personality for life.</p><ul><li>Never punish accidents, clean thoroughly and redirect positively</li><li>Be patient: puppies have limited bladder control until 6 months</li><li>Consistency is everything, everyone at home must use the same rules</li><li>Socialization is just as important as obedience training</li></ul>" },
        { id: 2, category: "cats", title: "Understanding Cat Body Language", excerpt: "Decode your cat's signals to build a stronger, more trusting bond.", readTime: "6 min read", image: "https://m.media-amazon.com/images/I/61L-7UcelEL._AC_UF350,350_QL50_.jpg", content: "<h3>Reading the Tail</h3><p>A cat's tail is one of their most expressive tools. A tail held high signals confidence and happiness. A puffed-up tail indicates fear or aggression. A tail tucked low signals anxiety or submission.</p><h3>Ear Positions</h3><p>Forward-facing ears show interest and alertness. Ears flattened sideways, called airplane ears, signal fear or stress. Ears pinned flat means the cat is frightened or about to become aggressive.</p><h3>Eye Language</h3><p>Slow blinking at you is a cat's way of showing trust. Slow blink back to communicate affection. A prolonged direct stare is a dominance challenge. Cats that look away are showing they trust you.</p><h3>Vocalizations</h3><p>Short meow means greeting. Multiple meows means excitement or demand. Low meow means complaint. Trill or chirp means affectionate greeting. Hissing or growling means stay away. Purring usually means contentment but cats also purr when stressed.</p><ul><li>Loaf position means relaxed and comfortable</li><li>Exposed belly shows trust but does not always mean pet me</li><li>Head bunting means marking you as theirs, a high compliment</li><li>Kneading is contentment, leftover behavior from nursing as a kitten</li></ul>" },
        { id: 3, category: "health", title: "Pet First Aid Essentials", excerpt: "Be prepared for emergencies with these basic first aid techniques every pet owner should know.", readTime: "12 min read", image: "https://m.media-amazon.com/images/I/416S8F3ZE5L._AC_UF1000,1000_QL80_.jpg", content: "<h3>Your Pet First Aid Kit</h3><p>Every pet owner needs a dedicated kit. Include sterile gauze pads, medical tape, blunt-tip scissors, digital rectal thermometer, tweezers, disposable gloves, saline solution, pet-safe antiseptic wipes, a soft muzzle, and your vet's emergency number.</p><h3>When to Go to the Vet Immediately</h3><p>Life-threatening emergencies include difficulty breathing, uncontrolled bleeding, collapse or seizures, suspected poisoning from chocolate, grapes, onions, xylitol or medications, severe vomiting or diarrhea, inability to urinate especially in male cats, eye injuries, or broken bones.</p><h3>Wound Care</h3><p>Apply firm pressure with clean gauze for 5 minutes without lifting. Once bleeding slows, rinse gently with saline. Apply pet-safe antiseptic. Cover loosely and never bandage tightly as this cuts circulation. All wounds need vet evaluation even if minor.</p><h3>Choking Response</h3><p>Signs include pawing at mouth, blue gums, and distress. For dogs use modified Heimlich by placing fist just below the ribcage and thrusting upward firmly. For cats use very gentle back blows between shoulder blades. Always follow a choking incident with a vet visit.</p><ul><li>Normal dog and cat temperature is 38.0 to 39.2 degrees Celsius</li><li>Normal dog heart rate is 60 to 140 bpm and cat is 140 to 220 bpm</li><li>ASPCA Animal Poison Control is +1-888-426-4435 available 24/7</li><li>Never give human pain medications to pets as many are toxic</li></ul>" },
        { id: 4, category: "nutrition", title: "Reading Pet Food Labels", excerpt: "Learn to identify quality ingredients and avoid harmful fillers in commercial pet foods.", readTime: "6 min read", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdCRTjkftqfCV5xK-0f1OweBQ2QbtrVtq6Bg&s", content: "<h3>Understanding the Ingredient List</h3><p>Ingredients are listed by weight before cooking. The first ingredient should always be a named animal protein like chicken, salmon, or beef. Be cautious of vague terms like poultry, meat meal, or animal by-products without a species specified.</p><h3>Ingredients to Avoid</h3><p>Artificial preservatives BHA, BHT, and ethoxyquin have raised health concerns. Look for foods preserved with mixed tocopherols instead. Artificial colors like Red 40 and Yellow 5 serve no nutritional purpose. Corn syrup and added sugars contribute to obesity.</p><h3>The AAFCO Statement</h3><p>Look for the phrase formulated to meet the nutritional levels established by the AAFCO Dog or Cat Food Nutrient Profiles. Complete and balanced means all required nutrients are present. All life stages is the most comprehensive option.</p><h3>Reading the Guaranteed Analysis</h3><p>To compare wet and dry foods fairly, convert to dry matter basis by dividing by 100 minus moisture percentage. Wet food showing 10% protein with 78% moisture equals 45.5% on dry matter basis, which may equal or exceed dry food.</p><ul><li>Match food to life stage: puppy and kitten formulas have higher calories and DHA</li><li>Transition to new food slowly over 7 to 10 days to avoid digestive upset</li><li>More expensive does not automatically mean better, always read the label</li><li>Consult your vet for breed-specific or health-condition dietary needs</li></ul>" },
        { id: 5, category: "birds", title: "Complete Bird Care Guide", excerpt: "Essential care tips for keeping pet birds healthy, social and stimulated.", readTime: "7 min read", image: "https://m.media-amazon.com/images/I/71yJCGObfxL._AC_UF1000,1000_QL80_.jpg", content: "<h3>Cage Size Requirements</h3><p>Birds need the largest cage your space allows. For small birds like budgies and cockatiels, the minimum is 18 by 18 by 24 inches but aim larger. Bar spacing must match your bird's size. Horizontal bars are preferred as they allow birds to climb and exercise naturally.</p><h3>Proper Diet</h3><p>Seeds alone are not a complete diet and lead to malnutrition and obesity. Pellets should make up 50 to 70 percent of most birds' diet. Fresh vegetables like leafy greens, carrots, and bell peppers add essential nutrients. Never feed avocado, chocolate, caffeine, alcohol, onions, garlic, or xylitol as all are toxic to birds.</p><h3>Mental Stimulation</h3><p>Birds are highly intelligent and social. Boredom causes feather plucking and aggression. Rotate at least 5 to 6 different toys including foraging, puzzle, and shredding toys. Cover the cage at night for 10 to 12 hours of darkness. Daily out-of-cage time in a bird-safe room is essential.</p><h3>Health Monitoring</h3><p>Healthy signs include bright clear eyes, smooth feathers, active and vocal behavior, good appetite, and normal droppings. Warning signs requiring immediate vet attention include sitting fluffed up for extended periods, discharge from eyes or nostrils, tail bobbing which indicates respiratory distress, and significant weight loss.</p><ul><li>Find an avian-specialist vet before you need one in an emergency</li><li>Change water daily as birds often bathe and defecate in their water</li><li>Weigh your bird weekly as sudden weight loss is often the first sign of illness</li><li>Birds require annual wellness exams even when appearing healthy</li></ul>" },
        { id: 6, category: "fish", title: "Setting Up Your First Aquarium", excerpt: "Everything you need to know to set up a thriving freshwater aquarium.", readTime: "10 min read", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkfIqVrTQCMVPZQLqCc_UZtW3D7pWv_Bb6Q&s", content: "<h3>The Nitrogen Cycle</h3><p>Before adding any fish, your aquarium must complete the nitrogen cycle where beneficial bacteria convert toxic ammonia from fish waste into nitrite and then into nitrate which is much less harmful. This takes 4 to 8 weeks. Only add fish when ammonia and nitrite both read zero.</p><h3>Essential Equipment</h3><p>You need a filter rated for at least double your tank volume, a heater to maintain 24 to 28 degrees Celsius for tropical fish, LED lighting for 8 to 10 hours per day for planted tanks, appropriate substrate, and a liquid test kit to test pH, ammonia, nitrite, and nitrate weekly.</p><h3>Choosing Compatible Fish</h3><p>Research adult size, temperament, water requirements, diet, and swimming level before buying. Start with hardy beginner species like zebra danios, guppies, or platies. Add fish gradually with no more than a few at a time to avoid ammonia spikes.</p><h3>Water Maintenance</h3><p>Perform 25 to 30 percent water changes weekly using dechlorinated water at tank temperature. Vacuum the substrate during water changes. Never change more than 50 percent at once as this crashes your beneficial bacteria cycle.</p><ul><li>The golden rule is that the solution to pollution is dilution through regular water changes</li><li>Never rinse filter media under tap water, use old tank water instead</li><li>Quarantine all new fish for 2 to 4 weeks before adding to the main tank</li><li>Overfeeding is the number one cause of poor water quality</li></ul>" },
        { id: 7, category: "small-pets", title: "Small Pet Care Guide", excerpt: "How to properly house, feed and care for hamsters, guinea pigs and rabbits.", readTime: "5 min read", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQiN2ndVeXVKY0oV1Cu-GzkKgmCHGdyfV2HwxwmTxdnHyE07luPDARJsPZjqrEgUNyIeJacecueq-xfZ491eOY6-BkHHkO9UttuM4d0UL0myE96ncuNA1DpFQ", content: "<h3>Housing by Species</h3><p>Hamsters need at least 450 square inches of unbroken floor space. Syrian hamsters are solitary and must be kept alone. Guinea pigs are social and need pairs with a minimum of 7.5 square feet for two. Rabbits are highly active and need large enclosures plus several hours of daily exercise outside their cage.</p><h3>Bedding</h3><p>Paper-based bedding like Carefresh or Kaytee Clean and Cozy is the safest and most absorbent for all small pets. Avoid cedar and pine shavings as the aromatic oils cause respiratory problems and liver damage. Provide at least 6 inches of deep bedding for hamsters who burrow naturally.</p><h3>Diet by Species</h3><p>Hamsters eat commercial mix at 70 percent, fresh vegetables at 20 percent, and occasional protein like mealworms at 10 percent. Guinea pigs cannot produce vitamin C so feed bell peppers, leafy greens, and parsley daily plus vitamin C pellets. Rabbits need unlimited timothy hay at 80 percent of diet, fresh leafy greens at 15 percent, and limited pellets at 5 percent.</p><h3>Enrichment</h3><p>Small pets need mental stimulation to prevent stress. For hamsters provide a large silent wheel of at least 21cm, tunnels, and hides. For guinea pigs provide tunnels and foraging for treats in hay. For rabbits provide cardboard boxes, digging boxes, safe wood to chew, and puzzle feeders.</p><ul><li>Handle from a young age regularly and let the pet approach you first</li><li>Guinea pigs and rabbits are social and isolated animals develop health problems</li><li>Regular vet checkups are essential as small pets hide illness until severely ill</li><li>Check teeth, nails, and coat condition weekly as key health indicators</li></ul>" },
    ],
    
    orders: [],
    users: []
};

// ==========================================
// STATE & STORAGE
// ==========================================
let cart = JSON.parse(localStorage.getItem('petPrestigeCart')) || [];
let appliedVoucher = JSON.parse(localStorage.getItem('petPrestigeVoucher')) || null;

const VOUCHERS = {
    'SAVE8':    { type: 'percent',  value: 8,  minSpend: 1000, description: '8% off — min. ₱1,000 spend' },
    'SAVE9':    { type: 'percent',  value: 9,  minSpend: 2000, description: '9% off — min. ₱2,000 spend' },
    'SAVE10':   { type: 'percent',  value: 10, minSpend: 5000, description: '10% off — min. ₱5,000 spend' },
    'FREESHIP': { type: 'shipping', value: 80, minSpend: 500,  description: 'Free shipping — min. ₱500 spend' },
    'PETLOVE':  { type: 'percent',  value: 15, minSpend: 1500, description: '15% off — min. ₱1,500 spend' }
};

const ADMIN_EMAIL    = 'admin@petprestige.ph';
const ADMIN_PASSWORD = 'admin123';

// ==========================================
// UTILITIES
// ==========================================
function formatPrice(p) {
    return '₱' + Number(p).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('petPrestigeUser') || 'null');
}

function saveCurrentUser(user) {
    localStorage.setItem('petPrestigeUser', JSON.stringify(user));
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
}

// ==========================================
// LOGIN REQUIRED OVERLAY
// ==========================================
function requireLogin(message = 'Please log in to continue.') {
    if (isLoggedIn()) return true;
    localStorage.setItem('petPrestigeLoginRedirect', window.location.href);
    showLoginRequiredOverlay(message);
    return false;
}

function showLoginRequiredOverlay(msg = 'Please log in to continue.') {
    let overlay = document.getElementById('loginRequiredOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loginRequiredOverlay';
        overlay.innerHTML = `
            <div class="login-required-box">
                <div class="login-required-icon">🔐</div>
                <h2>Login Required</h2>
                <p>${msg}</p>
                <div class="login-required-btns">
                    <a href="login.html" class="btn btn-primary">Sign In</a>
                    <a href="login.html#register" class="btn btn-outline">Register</a>
                </div>
                <button class="login-required-close" onclick="closeLoginOverlay()">Maybe later</button>
            </div>`;
        document.body.appendChild(overlay);
    }
    overlay.querySelector('p').textContent = msg;
    setTimeout(() => overlay.classList.add('show'), 50);
}

function closeLoginOverlay() {
    const overlay = document.getElementById('loginRequiredOverlay');
    if (overlay) { overlay.classList.remove('show'); setTimeout(() => overlay.remove(), 300); }
}

function logout() {
    localStorage.removeItem('petPrestigeUser');
    localStorage.removeItem('petPrestigeAdminSession');
    localStorage.removeItem('petPrestigeLoginRedirect');
    localStorage.removeItem('petPrestigeVoucher');
    cart = [];
    saveCart();
    updateCartCount();
    showToast('Logged out successfully.');
    setTimeout(() => window.location.href = 'index.html', 1000);
}

// ==========================================
// CART FUNCTIONS
// ==========================================
function addToCart(id, qty = 1) {
    if (!requireLogin('Please log in to add items to your cart.')) return;
    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];
    const product = allProducts.find(p => p.id === id);
    if (!product) { showToast('Product not found.', 'error'); return; }
    if (product.stock < 1) { showToast('Sorry, this product is out of stock.', 'error'); return; }
    let item = cart.find(i => i.id === id);
    if (item) { item.quantity += qty; }
    else { cart.push({ id, name: product.name, price: product.price, image: product.image, quantity: qty }); }
    saveCart();
    updateCartCount();
    showToast(`🛒 ${product.name} added to cart!`);
}

function buyNow(id) {
    if (!requireLogin('Please log in to purchase.')) return;
    addToCart(id, 1);
    setTimeout(() => window.location.href = 'cart.html', 600);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartCount();
    if (document.getElementById('cartItems')) loadCart();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + delta);
    saveCart();
    updateCartCount();
    if (document.getElementById('cartItems')) loadCart();
}

function saveCart() {
    localStorage.setItem('petPrestigeCart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function getCartTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

function getShippingCost() {
    const sub = getCartTotal();
    const settings = JSON.parse(localStorage.getItem('petPrestigeShippingSettings') || '{}');
    const threshold = settings.freeShippingThreshold ?? 500;
    const fee = settings.flatShippingFee ?? 80;
    if (appliedVoucher?.type === 'shipping' && sub >= (appliedVoucher.minSpend || 0)) return 0;
    return sub >= threshold ? 0 : fee;
}

function getDiscount() {
    const sub = getCartTotal();
    if (!appliedVoucher || sub < (appliedVoucher.minSpend || 0)) return 0;
    if (appliedVoucher.type === 'percent') return Math.round(sub * (appliedVoucher.value / 100));
    return 0;
}

function getFinalTotal() {
    const loyaltyDisc = window._loyaltyRedeemPoints > 0 ? getLoyaltyDiscount(window._loyaltyRedeemPoints) : 0;
    return Math.max(0, getCartTotal() + getShippingCost() - getDiscount() - loyaltyDisc);
}

function getLoyaltyRedeemDiscount() {
    return window._loyaltyRedeemPoints > 0 ? getLoyaltyDiscount(window._loyaltyRedeemPoints) : 0;
}

// ==========================================
// CART PAGE
// ==========================================
function loadCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartLayoutEl = document.getElementById('cartLayout');
    const emptyCartEl  = document.getElementById('emptyCart');
    if (!cartItemsEl) return;

    if (cart.length === 0) {
        if (cartLayoutEl) cartLayoutEl.style.display = 'none';
        if (emptyCartEl)  emptyCartEl.style.display  = 'block';
        return;
    }
    if (cartLayoutEl) cartLayoutEl.style.display = 'grid';
    if (emptyCartEl)  emptyCartEl.style.display  = 'none';

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img class="cart-item-image" src="${item.image}" alt="${item.name}"
                 onerror="this.src='https://via.placeholder.com/100?text=Product'">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${formatPrice(item.price)} each</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <input type="number" value="${item.quantity}" min="1"
                           onchange="setQuantity(${item.id}, this.value)">
                    <button onclick="updateQuantity(${item.id}, +1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>`).join('');

    updateCartSummary();
    updateFreeShippingProgress();
}

function setQuantity(id, val) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity = Math.max(1, parseInt(val) || 1);
    saveCart();
    updateCartCount();
    loadCart();
}

function updateCartSummary() {
    const subtotal  = getCartTotal();
    const shipping  = getShippingCost();
    const discount  = getDiscount();
    const total     = getFinalTotal();

    const el = id => document.getElementById(id);
    if (el('subtotal'))     el('subtotal').textContent     = formatPrice(subtotal);
    if (el('shipping'))     el('shipping').textContent     = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (el('total'))        el('total').textContent        = formatPrice(total);

    const discRow = el('discountRow');
    if (discRow) {
        discRow.style.display = discount > 0 ? 'flex' : 'none';
        if (el('discountAmount')) el('discountAmount').textContent = '-' + formatPrice(discount);
    }
}

function updateFreeShippingProgress() {
    const settings   = JSON.parse(localStorage.getItem('petPrestigeShippingSettings') || '{}');
    const threshold  = settings.freeShippingThreshold ?? 500;
    const subtotal   = getCartTotal();
    const progress   = Math.min((subtotal / threshold) * 100, 100);
    const remaining  = Math.max(threshold - subtotal, 0);

    const bar = document.getElementById('freeShippingProgress');
    const msg = document.getElementById('freeShippingMessage');
    if (bar) bar.style.width = progress + '%';
    if (msg) {
        msg.textContent = remaining > 0
            ? `Add ${formatPrice(remaining)} more for FREE shipping! 🚚`
            : '🎉 You qualify for FREE shipping!';
    }
}

function applyVoucher() {
    const code = document.getElementById('voucherCode')?.value?.trim().toUpperCase();
    if (!code) { showToast('Please enter a voucher code.', 'error'); return; }

    // Check admin-managed vouchers first (from settings page)
    const adminVoucherList = JSON.parse(localStorage.getItem('petPrestigeVoucherList') || '[]');
    let voucher = null;

    const adminV = adminVoucherList.find(v => v.code === code && v.active !== false);
    if (adminV) {
        // Check max uses
        if (adminV.maxUses > 0 && (adminV.uses || 0) >= adminV.maxUses) {
            showToast('This voucher has reached its usage limit.', 'error'); return;
        }
        voucher = { type: adminV.type, value: adminV.value, minSpend: adminV.minSpend || 0, description: adminV.description };
    } else {
        // Fall back to hardcoded VOUCHERS
        voucher = VOUCHERS[code];
    }

    if (!voucher) { showToast('Invalid or expired voucher code.', 'error'); return; }

    const subtotal = getCartTotal();
    if (subtotal < (voucher.minSpend || 0)) {
        showToast(`Minimum spend of ${formatPrice(voucher.minSpend)} required.`, 'error'); return;
    }
    appliedVoucher = voucher;
    localStorage.setItem('petPrestigeVoucher', JSON.stringify(voucher));

    // Increment use count for admin vouchers
    if (adminV) {
        adminV.uses = (adminV.uses || 0) + 1;
        localStorage.setItem('petPrestigeVoucherList', JSON.stringify(adminVoucherList));
    }

    showToast(`✅ Voucher applied: ${voucher.description}`);
    loadCart();
}

function proceedToCheckout() {
    if (!requireLogin('Please log in to proceed to checkout.')) return;
    if (cart.length === 0) { showToast('Your cart is empty.', 'error'); return; }
    window.location.href = 'checkout.html';
}

// ==========================================
// CHECKOUT PAGE
// ==========================================
function loadCheckoutSummary() {
    const summaryItems = document.getElementById('summaryItems');
    if (!summaryItems) return;

    if (cart.length === 0) { window.location.href = 'cart.html'; return; }

    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}"
                 onerror="this.src='https://via.placeholder.com/60?text=P'">
            <div class="summary-item-info">
                <h4>${item.name}</h4>
                <p>x${item.quantity} × ${formatPrice(item.price)}</p>
            </div>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>`).join('');

    const subtotal = getCartTotal();
    const shipping = getShippingCost();
    const discount = getDiscount();
    const total    = getFinalTotal();

    const elId = id => document.getElementById(id);
    if (elId('checkoutSubtotal')) elId('checkoutSubtotal').textContent = formatPrice(subtotal);
    if (elId('checkoutShipping')) elId('checkoutShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);

    const dRow = elId('checkoutDiscountRow');
    if (dRow) {
        dRow.style.display = discount > 0 ? 'flex' : 'none';
        if (elId('checkoutDiscount')) elId('checkoutDiscount').textContent = '-' + formatPrice(discount);
    }
    document.querySelectorAll('#checkoutTotal').forEach(el => el.textContent = formatPrice(total));

    // Pre-fill user info if logged in
    const user = getCurrentUser();
    if (user) {
        if (elId('firstName') && user.name) {
            const parts = user.name.split(' ');
            elId('firstName').value = parts[0] || '';
            elId('lastName').value  = parts.slice(1).join(' ') || '';
        }
        if (elId('email') && user.email) elId('email').value = user.email;
        if (elId('phone') && user.phone) elId('phone').value = user.phone;

        // Populate saved addresses dropdown
        const savedAddresses = user.savedAddresses || [];
        const bar = elId('savedAddressBar');
        const sel = elId('savedAddressSelect');
        if (bar && sel && savedAddresses.length > 0) {
            bar.style.display = 'block';
            sel.innerHTML = '<option value="">— Select a saved address —</option>' +
                savedAddresses.map((addr, i) =>
                    `<option value="${i}">${addr.label || addr.address + ', ' + addr.city}</option>`
                ).join('');

            // Auto-fill from the first/default address
            const defaultIdx = savedAddresses.findIndex(a => a.isDefault) ?? 0;
            if (savedAddresses[defaultIdx]) {
                fillAddressFields(savedAddresses[defaultIdx]);
                sel.value = defaultIdx;
            }
        }
    }
}

function applySavedAddress() {
    const user = getCurrentUser();
    if (!user) return;
    const sel = document.getElementById('savedAddressSelect');
    const idx = parseInt(sel?.value);
    if (isNaN(idx)) return;
    const addr = (user.savedAddresses || [])[idx];
    if (addr) fillAddressFields(addr);
}

function fillAddressFields(addr) {
    const elId = id => document.getElementById(id);
    if (addr.firstName && elId('firstName')) elId('firstName').value = addr.firstName;
    if (addr.lastName  && elId('lastName'))  elId('lastName').value  = addr.lastName;
    if (addr.phone     && elId('phone'))     elId('phone').value     = addr.phone;
    if (addr.email     && elId('email'))     elId('email').value     = addr.email;
    if (addr.address   && elId('address'))   elId('address').value   = addr.address;
    if (addr.city      && elId('city'))      elId('city').value      = addr.city;
    if (addr.province  && elId('province'))  elId('province').value  = addr.province;
    if (addr.postal    && elId('postal'))    elId('postal').value    = addr.postal;
}

function goToPayment() {
    const form = document.getElementById('shippingForm');
    if (!form) return;
    const inputs = form.querySelectorAll('[required]');
    for (const input of inputs) {
        if (!input.value.trim()) { input.focus(); showToast('Please fill all required fields.', 'error'); return; }
    }
    document.getElementById('shippingBox').style.display  = 'none';
    document.getElementById('paymentBox').style.display   = 'block';
    document.querySelectorAll('.step')[1]?.classList.add('active');
}

function backToShipping() {
    document.getElementById('paymentBox').style.display  = 'none';
    document.getElementById('shippingBox').style.display = 'block';
}

function reviewOrder() {
    document.getElementById('paymentBox').style.display = 'none';
    document.getElementById('reviewBox').style.display  = 'block';
    document.querySelectorAll('.step')[2]?.classList.add('active');

    const elId = id => document.getElementById(id)?.value || '';
    document.getElementById('reviewAddress').innerHTML =
        `${elId('firstName')} ${elId('lastName')}<br>
         ${elId('phone')} | ${elId('email')}<br>
         ${elId('address')}, ${elId('city')}, ${elId('province')} ${elId('postal')}`;

    const method = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
    document.getElementById('reviewPayment').textContent =
        method === 'cod' ? '💵 Cash on Delivery' : method === 'gcash' ? '📱 GCash' : '📱 PayMaya';

    document.getElementById('reviewItems').innerHTML = cart.map(item =>
        `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>`).join('');

    document.querySelectorAll('#checkoutTotal').forEach(el => el.textContent = formatPrice(getFinalTotal()));
    const reviewTotalEl = document.getElementById('reviewTotal');
    if (reviewTotalEl) reviewTotalEl.textContent = formatPrice(getFinalTotal());
}

function backToPayment() {
    document.getElementById('reviewBox').style.display  = 'none';
    document.getElementById('paymentBox').style.display = 'block';
}

function placeOrder() {
    const elId = id => document.getElementById(id)?.value || '';
    const order = {
        id:           'PP-' + Date.now(),
        date:         new Date().toISOString(),
        status:       'pending',
        items:        cart,
        subtotal:     getCartTotal(),
        shippingCost: getShippingCost(),
        discount:     getDiscount(),
        total:        getFinalTotal(),
        shippingInfo: {
            firstName: elId('firstName'), lastName: elId('lastName'),
            phone:     elId('phone'),     email:    elId('email'),
            address:   elId('address'),   city:     elId('city'),
            province:  elId('province'),  postal:   elId('postal')
        },
        paymentInfo: {
            method: document.querySelector('input[name="payment"]:checked')?.value || 'cod'
        }
    };

    let orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
    orders.push(order);
    localStorage.setItem('petPrestigeOrders', JSON.stringify(orders));

    // Clear cart and voucher
    cart = [];
    appliedVoucher = null;
    localStorage.removeItem('petPrestigeCart');
    localStorage.removeItem('petPrestigeVoucher');

    // Update user order history + award loyalty points
    const user = getCurrentUser();
    if (user) {
        user.orders = user.orders || [];
        user.orders.push(order.id);
        saveCurrentUser(user);
        // Award points: 1 point per ₱1 spent
        const pts = addLoyaltyPoints(order.total);
        // Store points awarded on order for reference
        order.pointsEarned = pts;
        // Save redeemed points on order if any
        if (window._loyaltyRedeemPoints > 0) {
            order.pointsRedeemed = window._loyaltyRedeemPoints;
            window._loyaltyRedeemPoints = 0;
        }
        // Re-save order with points info
        let ordersWithPts = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
        const idx = ordersWithPts.findIndex(o => o.id === order.id);
        if (idx >= 0) ordersWithPts[idx] = order;
        localStorage.setItem('petPrestigeOrders', JSON.stringify(ordersWithPts));
    }

    window.location.href = 'order-success.html?order=' + order.id;
}

// ==========================================
// SEARCH
// ==========================================
function performSearch() {
    const q = (document.getElementById('globalSearch') || document.getElementById('shopSearch'))?.value?.trim();
    if (!q) return;
    window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
}

// ==========================================
// SHOP PAGE
// ==========================================
let activeCategory = 'all';
let activeSubcategory = 'all';

// Subcategory map per category
const SUBCATEGORY_MAP = {
    dogs:       ['food','toys','grooming','training','accessories','health','supplies'],
    cats:       ['food','litter','toys','grooming','accessories','health','supplies'],
    birds:      ['food','cages','toys','accessories','health','supplies'],
    fish:       ['food','tanks','filters','decorations','accessories','health','supplies'],
    'small-pets':['food','cages','toys','grooming','accessories','health','supplies'],
};

const SUBCATEGORY_LABELS = {
    food:'🍖 Food', toys:'🎾 Toys', grooming:'✂️ Grooming', training:'🎓 Training',
    accessories:'🎀 Accessories', health:'💊 Health', supplies:'🛍️ Supplies',
    litter:'🪣 Litter', cages:'🏠 Cages', filters:'🔧 Filters',
    decorations:'🪸 Decorations', tanks:'🐠 Tanks', books:'📚 Books',
};

function selectCategory(cat) {
    activeCategory = cat;
    activeSubcategory = 'all';
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    // Update subcategory filter
    const subcatGroup = document.getElementById('subcatFilterGroup');
    const subcatBtns  = document.getElementById('subcatBtns');
    if (subcatGroup && subcatBtns) {
        const subs = SUBCATEGORY_MAP[cat];
        if (subs && cat !== 'all') {
            subcatBtns.innerHTML = `<button class="cat-filter-btn active" data-subcat="all" onclick="selectSubcategory('all')">All</button>` +
                subs.map(s => `<button class="cat-filter-btn" data-subcat="${s}" onclick="selectSubcategory('${s}')">${SUBCATEGORY_LABELS[s] || s}</button>`).join('');
            subcatGroup.style.display = 'block';
        } else {
            subcatGroup.style.display = 'none';
            subcatBtns.innerHTML = '';
        }
    }
    filterProducts();
}

function selectSubcategory(sub) {
    activeSubcategory = sub;
    document.querySelectorAll('#subcatBtns .cat-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subcat === sub);
    });
    filterProducts();
}

function loadShopProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    const cat = urlParams.get('category') || 'all';
    const sub = urlParams.get('subcategory') || 'all';
    if (searchQuery && document.getElementById('shopSearch')) {
        document.getElementById('shopSearch').value = searchQuery;
    }
    if (cat !== 'all') {
        selectCategory(cat);
        if (sub !== 'all') selectSubcategory(sub);
    } else {
        filterProducts();
    }
}

function filterProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const query     = (document.getElementById('shopSearch')?.value || '').toLowerCase().trim();
    const sort      = document.getElementById('sortSelect')?.value   || 'featured';
    const maxPrice  = parseInt(document.getElementById('priceRange')?.value || '99999');
    const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || '0');

    if (document.getElementById('priceValue')) {
        document.getElementById('priceValue').textContent = '₱' + maxPrice.toLocaleString();
    }

    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];

    let filtered = allProducts.filter(p => {
        const matchSearch = !query ||
            p.name.toLowerCase().includes(query) ||
            (p.description || '').toLowerCase().includes(query) ||
            p.subcategory?.toLowerCase().includes(query);
        const matchCat    = activeCategory === 'all' || p.category === activeCategory;
        const matchSubcat = activeSubcategory === 'all' || p.subcategory === activeSubcategory;
        const matchPrice  = p.price <= maxPrice;
        const matchRat    = (p.rating || 0) >= minRating;
        return matchSearch && matchCat && matchSubcat && matchPrice && matchRat;
    });

    if (sort === 'price-low')  filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'featured')   filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    const countEl = document.getElementById('showingCount');
    const totalEl = document.getElementById('totalCount');
    if (countEl) countEl.textContent = filtered.length;
    if (totalEl) totalEl.textContent = allProducts.length;

    grid.innerHTML = filtered.length
        ? filtered.map(p => createProductCard(p)).join('')
        : '<div class="no-results" style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;">No products found matching your filters.</div>';
}

function createProductCard(p) {
    const discount   = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;
    const inWish     = isInWishlist(p.id);
    const lowStockThreshold = JSON.parse(localStorage.getItem('petPrestigeShippingSettings') || '{}').lowStockThreshold ?? 5;
    const lowStock   = p.stock > 0 && p.stock <= lowStockThreshold;
    const outOfStock = p.stock === 0;
    return `
    <div class="product-card" style="position:relative;">
        ${discount > 0 ? `<span class="product-badge sale">-${discount}%</span>` : ''}
        ${p.featured && !p.comparePrice ? '<span class="product-badge">FEATURED</span>' : ''}
        <button onclick="toggleWishlist(${p.id})" title="${inWish ? 'Remove from wishlist' : 'Save to wishlist'}"
            style="position:absolute;top:10px;right:10px;background:white;border:none;border-radius:50%;width:34px;height:34px;
                   display:flex;align-items:center;justify-content:center;cursor:pointer;
                   box-shadow:0 2px 8px rgba(0,0,0,0.12);color:${inWish ? '#e74c3c' : '#ccc'};
                   font-size:1rem;z-index:2;transition:all 0.2s;">
            <i class="${inWish ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <a href="product-detail.html?id=${p.id}">
            <img class="product-image" src="${p.image}" alt="${p.name}"
                 onerror="this.src='https://via.placeholder.com/300x300/FF6B35/fff?text=${encodeURIComponent(p.name.substring(0,12))}'">
        </a>
        <div class="product-info">
            <div class="product-category">${p.subcategory || p.category}</div>
            <a class="product-name" href="product-detail.html?id=${p.id}">${p.name}</a>
            <div class="product-rating">
                <span class="stars">${'★'.repeat(Math.floor(p.rating || 0))}${'☆'.repeat(5 - Math.floor(p.rating || 0))}</span>
                <span class="count">(${(p.reviews || 0).toLocaleString()})</span>
            </div>
            ${lowStock   ? `<div style="color:#e67e22;font-size:0.78rem;font-weight:600;margin-bottom:4px;"><i class="fas fa-exclamation-triangle"></i> Only ${p.stock} left!</div>` : ''}
            ${outOfStock ? `<div style="color:#e74c3c;font-size:0.78rem;font-weight:600;margin-bottom:4px;"><i class="fas fa-times-circle"></i> Out of Stock</div>` : ''}
            <div class="product-price">
                <span class="current-price">${formatPrice(p.price)}</span>
                ${p.comparePrice ? `<span class="original-price">${formatPrice(p.comparePrice)}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${p.id})" ${outOfStock ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                <i class="fas fa-cart-plus"></i> ${outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button class="buy-now-btn" onclick="buyNow(${p.id})" ${outOfStock ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>Buy Now</button>
        </div>
    </div>`;
}

// ==========================================
// FEATURED PRODUCTS (Homepage)
// ==========================================
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];
    const featured = allProducts.filter(p => p.featured).slice(0, 8);
    container.innerHTML = featured.length
        ? featured.map(createProductCard).join('')
        : '<p style="text-align:center;color:#aaa;padding:40px;">No featured products yet.</p>';
}

// ==========================================
// PRODUCT DETAIL PAGE
// ==========================================
function loadProductDetail() {
    const container = document.getElementById('productDetail');
    if (!container) return;

    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];
    const product = allProducts.find(p => p.id === id);

    if (!product) {
        container.innerHTML = '<p style="text-align:center;padding:60px;color:#aaa;">Product not found. <a href="shop.html">Back to shop</a></p>';
        return;
    }

    document.title = product.name + ' - Pet Prestige';
    if (document.getElementById('productBreadcrumb')) {
        document.getElementById('productBreadcrumb').textContent = product.name;
    }

    const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

    container.innerHTML = `
        <div class="product-gallery">
            <img class="main-image" id="mainImage" src="${product.image}" alt="${product.name}"
                 onerror="this.src='https://via.placeholder.com/400x400/FF6B35/fff?text=${encodeURIComponent(product.name.substring(0,12))}'" >
        </div>
        <div class="product-detail-info">
            <div class="product-category">${product.category} / ${product.subcategory || ''}</div>
            <h1>${product.name}</h1>
            <div class="product-rating" style="font-size:1.2rem;margin-bottom:15px;">
                <span style="color:#FFE66D;">${'★'.repeat(Math.floor(product.rating || 0))}${'☆'.repeat(5 - Math.floor(product.rating || 0))}</span>
                <span style="color:#aaa;font-size:0.9rem;">(${(product.reviews || 0).toLocaleString()} reviews)</span>
            </div>
            <div class="price" style="display:flex;align-items:center;gap:15px;margin-bottom:20px;">
                <span style="font-size:2rem;font-weight:700;color:var(--primary);">${formatPrice(product.price)}</span>
                ${product.comparePrice ? `<span style="text-decoration:line-through;color:#aaa;">${formatPrice(product.comparePrice)}</span>` : ''}
                ${discount > 0 ? `<span style="background:var(--danger);color:white;padding:4px 10px;border-radius:20px;font-size:0.85rem;font-weight:700;">-${discount}%</span>` : ''}
            </div>
            <p class="product-description">${product.description || 'Premium quality product for your beloved pet.'}</p>
            <div class="quantity-selector">
                <label>Quantity:</label>
                <div class="quantity-control">
                    <button onclick="changeDetailQty(-1)">−</button>
                    <input type="number" id="detailQty" value="1" min="1" max="${product.stock}">
                    <button onclick="changeDetailQty(+1)">+</button>
                </div>
                <span style="color:#aaa;font-size:0.85rem;">${product.stock} in stock</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id}, parseInt(document.getElementById('detailQty').value))">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="buyNow(${product.id})">
                    <i class="fas fa-bolt"></i> Buy Now
                </button>
                <button onclick="toggleWishlist(${product.id})" id="wishlistBtn_${product.id}"
                    style="padding:12px 16px;border-radius:8px;border:1.5px solid #eee;background:white;cursor:pointer;font-size:1rem;color:${isInWishlist(product.id) ? '#e74c3c' : '#ccc'};transition:all 0.2s;"
                    title="${isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}">
                    <i class="${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button onclick="shareProduct(${product.id}, '${product.name.replace(/'/g, "\\'")}')"
                    style="padding:12px 16px;border-radius:8px;border:1.5px solid #eee;background:white;cursor:pointer;font-size:1rem;color:#888;transition:all 0.2s;"
                    title="Share this product">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
            <div class="product-meta">
                <span><i class="fas fa-tag"></i> Category: ${product.category}</span>
                <span><i class="fas fa-box"></i> Stock: ${product.stock} available</span>
                <span><i class="fas fa-truck"></i> Free shipping on orders over ₱500</span>
                <span><i class="fas fa-shield-alt"></i> 7-day return policy</span>
            </div>
        </div>`;

    // Load related products
    const related = allProducts.filter(p => p.category === product.category && p.id !== id).slice(0, 4);
    const relGrid = document.getElementById('relatedProducts');
    if (relGrid) relGrid.innerHTML = related.map(createProductCard).join('');

    // Load reviews
    loadProductReviews(id);

    // Track & render recently viewed
    trackRecentlyViewed(id);
    loadRecentlyViewed(id);
}

function changeDetailQty(delta) {
    const input = document.getElementById('detailQty');
    if (!input) return;
    input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}

function loadProductReviews(productId) {
    const list = document.getElementById('reviewsList');
    if (!list) return;
    const allReviews   = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    const adminReplies = JSON.parse(localStorage.getItem('petPrestigeAdminReplies') || '{}');
    const reviews = allReviews[productId] || [];

    list.innerHTML = reviews.length
        ? reviews.map(r => {
            const replyKey   = `${productId}_${r.id}`;
            const adminReply = adminReplies[replyKey];
            return `
            <div class="review-item" style="border-bottom:1px solid #eee;padding:16px 0;">
                <div class="review-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <span class="reviewer"><i class="fas fa-user-circle" style="color:var(--primary);"></i> <strong>${r.author}</strong></span>
                    <span class="review-date" style="color:#aaa;font-size:0.82rem;">${r.date}</span>
                </div>
                <div style="color:#FFE66D;margin-bottom:8px;font-size:1.1rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                <p style="color:#555;margin:0;">${r.text}</p>
                ${adminReply ? `
                <div style="margin-top:12px;background:#f0f7ff;border-left:3px solid #3498db;border-radius:0 8px 8px 0;padding:10px 14px;">
                    <div style="font-size:0.8rem;font-weight:700;color:#2980b9;margin-bottom:4px;">
                        <i class="fas fa-store"></i> Pet Prestige replied · ${adminReply.date}
                    </div>
                    <p style="margin:0;font-size:0.88rem;color:#444;">${adminReply.text}</p>
                </div>` : ''}
            </div>`;
        }).join('')
        : '<p style="color:#aaa;padding:20px 0;">No reviews yet. Be the first to review!</p>';

    // Update summary stats
    if (reviews.length) {
        const avg   = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
        const stars = Math.round(avg);
        const avgEl  = document.getElementById('avgRating');
        const starEl = document.getElementById('avgStars');
        const totEl  = document.getElementById('totalReviews');
        if (avgEl)  avgEl.textContent  = avg;
        if (starEl) starEl.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
        if (totEl)  totEl.textContent  = `(${reviews.length} review${reviews.length !== 1 ? 's' : ''})`;
    }
}

function submitReview() {
    if (!requireLogin('Please log in to leave a review.')) return;
    const text = document.getElementById('reviewText')?.value?.trim();
    // Read currentRating from window scope (set by product-detail.html's setRating())
    const rating = window.currentRating || 0;
    if (!text || rating === 0) { showToast('Please select a rating and write a review.', 'error'); return; }

    const id   = parseInt(new URLSearchParams(window.location.search).get('id'));
    const user = getCurrentUser();
    const review = {
        id:     Date.now(),
        author: user.name || user.email || 'Anonymous',
        rating,
        text,
        date: new Date().toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' })
    };

    const allReviews = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    if (!allReviews[id]) allReviews[id] = [];

    // Prevent duplicate review from same user on same product
    const alreadyReviewed = allReviews[id].find(r => r.author === review.author);
    if (alreadyReviewed) { showToast('You have already reviewed this product.', 'error'); return; }

    allReviews[id].unshift(review);
    localStorage.setItem('petPrestigeReviews', JSON.stringify(allReviews));

    showToast('Review submitted! Thank you 🐾');
    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById('reviewText').value = '';
    window.currentRating = 0;
    // Reset stars
    document.querySelectorAll('#starInput i').forEach(el => el.className = 'far fa-star');
    loadProductReviews(id);
}

// ==========================================
// GUIDES (Learn Page)
// ==========================================
let activeGuideCategory = 'all';

function loadGuides() {
    const grid = document.getElementById('guidesGrid');
    if (!grid) return;
    filterGuides(activeGuideCategory);
}

function filterGuides(cat) {
    activeGuideCategory = cat;
    document.querySelectorAll('.guide-cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(cat) || cat === 'all' && btn.textContent.toLowerCase().includes('all'));
    });
    const query = document.getElementById('guideSearch')?.value?.toLowerCase() || '';
    const grid = document.getElementById('guidesGrid');
    if (!grid) return;

    let guides = DB.guides.filter(g => {
        const matchCat = cat === 'all' || g.category === cat;
        const matchQ   = !query || g.title.toLowerCase().includes(query) || g.excerpt?.toLowerCase().includes(query);
        return matchCat && matchQ;
    });

    grid.innerHTML = guides.length
        ? guides.map(g => `
            <div class="guide-card" onclick="window.location.href='guide-detail.html?id=${g.id}'">
                <img class="guide-image" src="${g.image}" alt="${g.title}"
                     onerror="this.src='https://via.placeholder.com/400x200/4ECDC4/fff?text=Pet+Guide'">
                <div class="guide-content">
                    <span class="guide-tag">${g.category}</span>
                    <h3>${g.title}</h3>
                    <p>${g.excerpt || ''}</p>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:15px;">
                        <small style="color:var(--gray);"><i class="far fa-clock"></i> ${g.readTime}</small>
                        <a href="guide-detail.html?id=${g.id}" class="btn btn-sm btn-outline">Read</a>
                    </div>
                </div>
            </div>`).join('')
        : '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;">No guides found.</p>';
}

function searchGuides() { filterGuides(activeGuideCategory); }

// ==========================================
// PROFILE PAGE
// ==========================================
function loadProfile() {
    const user = getCurrentUser();
    const nameEl  = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');

    if (!user) {
        if (nameEl)  nameEl.textContent  = 'Guest User';
        if (emailEl) emailEl.textContent = 'Not logged in';
        renderGuestProfile();
        return;
    }

    if (nameEl)  nameEl.textContent  = user.name  || 'Pet Lover';
    if (emailEl) emailEl.textContent = user.email || '';

    renderProfileOverview(user);
    renderProfileOrders(user);
    renderProfileAddresses(user);
    renderMyReviews(user);
    renderProfileSettings(user);
    renderPetProfiles(user);

    // Tab switching
    document.querySelectorAll('.profile-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.profile-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.dataset.tab;
            const tab = document.getElementById(tabId);
            if (tab) tab.classList.add('active');
            // Re-render dynamic tabs on click
            const user = getCurrentUser();
            if (tabId === 'wishlist') renderWishlist();
            if (tabId === 'myreviews' && user) renderMyReviews(user);
        });
    });
}

function renderGuestProfile() {
    const main = document.querySelector('.profile-main');
    if (!main) return;
    main.innerHTML = `
        <div class="guest-profile-card">
            <div class="guest-icon"><i class="fas fa-user-circle"></i></div>
            <h3>Welcome to Pet Prestige!</h3>
            <p>Log in or create an account to track orders, save favorites, and more.</p>
            <a href="login.html" class="btn btn-primary">Sign In</a>
            <a href="login.html" class="btn btn-outline">Create Account</a>
        </div>`;
}

function markNotifRead(id, email) {
    var notifs = JSON.parse(localStorage.getItem('petPrestigeNotifications') || '[]');
    var n = notifs.find(function(x){ return x.id === id; });
    if (n) { n.read = true; localStorage.setItem('petPrestigeNotifications', JSON.stringify(notifs)); }
    var user = getCurrentUser();
    if (user) renderProfileOverview(user);
}

function markAllNotifsRead(email) {
    var notifs = JSON.parse(localStorage.getItem('petPrestigeNotifications') || '[]');
    notifs.filter(function(n){ return n.email === email; }).forEach(function(n){ n.read = true; });
    localStorage.setItem('petPrestigeNotifications', JSON.stringify(notifs));
    var user = getCurrentUser();
    if (user) renderProfileOverview(user);
}

function renderProfileOverview(user) {
    var overview = document.getElementById('overview');
    if (!overview) return;
    var orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]')
        .filter(function(o){ return o.shippingInfo && o.shippingInfo.email === user.email; });
    var allReviews = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    var myReviewCount = Object.values(allReviews).flat().filter(function(r){ return r.author === (user.name || user.email); }).length;

    var allNotifs = JSON.parse(localStorage.getItem('petPrestigeNotifications') || '[]');
    var myNotifs  = allNotifs.filter(function(n){ return n.email === user.email; });
    var unread    = myNotifs.filter(function(n){ return !n.read; });

    var notifsHtml = '';
    if (myNotifs.length) {
        var unreadBadge = unread.length > 0
            ? '<span style="background:#e74c3c;color:white;font-size:0.72rem;padding:2px 7px;border-radius:10px;vertical-align:middle;margin-left:6px;">' + unread.length + ' new</span>'
            : '';
        var markAllBtn = unread.length > 0
            ? '<button id="markAllNotifsBtn" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:0.82rem;">Mark all read</button>'
            : '';

        var entriesHtml = '';
        myNotifs.slice(0, 5).forEach(function(n) {
            var icon    = n.status === 'shipped' ? '&#128666;' : '&#9989;';
            var bg      = n.read ? '#f8f9fa' : '#fff8f5';
            var border  = n.read ? '#eee'    : '#ffd0b3';
            var dateStr = new Date(n.sentAt).toLocaleDateString('en-PH', {month:'short', day:'numeric', year:'numeric'});
                        var markBtn = !n.read
                ? '<button data-notif-id="' + n.id + '" class="notif-mark-btn" style="background:none;border:none;color:#aaa;cursor:pointer;font-size:0.8rem;flex-shrink:0;">&#10003;</button>'
                : '';            entriesHtml +=
                '<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 14px;' +
                'background:' + bg + ';border:1.5px solid ' + border + ';border-radius:10px;margin-bottom:8px;">' +
                '<div style="font-size:1.4rem;flex-shrink:0;">' + icon + '</div>' +
                '<div style="flex:1;">' +
                '<div style="font-weight:600;font-size:0.9rem;">' + n.subject + '</div>' +
                '<div style="color:#888;font-size:0.78rem;margin-top:2px;">' + dateStr + '</div>' +
                '</div>' + markBtn + '</div>';
        });

        notifsHtml =
            '<div style="margin-bottom:20px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
            '<h4 style="margin:0;">&#128276; Order Notifications' + unreadBadge + '</h4>' +
            markAllBtn + '</div>' +
            entriesHtml + '</div>';
    }

    var totalSpent = orders.reduce(function(s,o){ return s + (o.total || 0); }, 0);

    overview.innerHTML =
        '<div class="admin-card">' +
        '<h3 style="margin-bottom:20px;">Welcome back, ' + (user.name || 'Pet Lover') + '! &#128062;</h3>' +
        notifsHtml +
                '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:20px;">' +

        '<div class="profile-stat-card" data-switch-tab="orders" style="text-align:center;padding:20px;background:var(--light);border-radius:12px;cursor:pointer;">' +
        '<div style="font-size:2rem;font-weight:700;color:var(--primary);">' + orders.length + '</div>' +
        '<div style="color:var(--gray);font-size:0.88rem;">Total Orders</div></div>' +

        '<div class="profile-stat-card" data-switch-tab="wishlist" style="text-align:center;padding:20px;background:var(--light);border-radius:12px;cursor:pointer;">' +
        '<div style="font-size:2rem;font-weight:700;color:#e74c3c;">' + wishlist.length + '</div>' +
        '<div style="color:var(--gray);font-size:0.88rem;">&#10084; Wishlist</div></div>' +

        '<div style="text-align:center;padding:20px;background:var(--light);border-radius:12px;">' +
        '<div style="font-size:2rem;font-weight:700;color:var(--primary);">' + cart.length + '</div>' +
        '<div style="color:var(--gray);font-size:0.88rem;">Cart Items</div></div>' +

        '<div class="profile-stat-card" data-switch-tab="myreviews" style="text-align:center;padding:20px;background:var(--light);border-radius:12px;cursor:pointer;">' +
        '<div style="font-size:2rem;font-weight:700;color:#f39c12;">' + myReviewCount + '</div>' +
        '<div style="color:var(--gray);font-size:0.88rem;">&#11088; Reviews Written</div></div>' +
        '</div>' +

'</div>' +

        '<div style="background:var(--light);border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;grid-column:1/-1;">' +
        '<div style="display:flex;gap:32px;flex-wrap:wrap;align-items:center;">' +
        '<div><div style="font-weight:600;margin-bottom:2px;">Total Spent</div>' +
        '<div style="font-size:1.5rem;font-weight:700;color:var(--primary);">' + formatPrice(totalSpent) + '</div></div>' +
        '<div><div style="font-weight:600;margin-bottom:2px;">&#127381; Loyalty Points</div>' +
        '<div style="font-size:1.5rem;font-weight:700;color:#f39c12;">' + (user.loyaltyPoints || 0) + ' pts</div>' +
        '<div style="font-size:0.75rem;color:#aaa;">= ' + formatPrice(getLoyaltyDiscount(user.loyaltyPoints || 0)) + ' discount</div></div>' +
        '</div>' +
        '<a href="shop.html" class="btn btn-primary btn-sm"><i class="fas fa-store"></i> Shop Now</a>' +
        '</div></div>';

    // Wire up notification buttons via event delegation
    var markAllBtn2 = document.getElementById('markAllNotifsBtn');
    if (markAllBtn2) {
        markAllBtn2.addEventListener('click', function() { markAllNotifsRead(user.email); });
    }
    overview.querySelectorAll('.notif-mark-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            markNotifRead(parseInt(btn.dataset.notifId), user.email);
        });
    });
    // Wire up stat card tab switches
    overview.querySelectorAll('.profile-stat-card').forEach(function(card) {
        card.addEventListener('click', function() {
            var tabName = card.dataset.switchTab;
            var btn = document.querySelector('[data-tab="' + tabName + '"]');
            if (btn) btn.click();
        });
    });
}


function renderProfileOrders(user) {
    const ordersEl = document.getElementById('orders');
    if (!ordersEl) return;
    const orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]')
        .filter(o => o.shippingInfo?.email === user.email)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const statusIcon = { pending:'⏳', processing:'⚙️', shipped:'🚚', delivered:'✅', cancelled:'❌' };

    // Find any newly-delivered unrated orders for prompt
    const unratedDelivered = orders.filter(o => o.status === 'delivered' && !o.rated);
    const reviewPrompt = unratedDelivered.length ? `
        <div style="background:linear-gradient(135deg,#fff8f5,#fff3ec);border:1.5px solid #ffd0b3;border-radius:14px;padding:18px 20px;margin-bottom:20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
            <div style="font-size:2rem;flex-shrink:0;">⭐</div>
            <div style="flex:1;">
                <div style="font-weight:700;margin-bottom:4px;">How was your recent order?</div>
                <div style="color:#666;font-size:0.88rem;">Your order <strong>${unratedDelivered[0].id}</strong> was delivered — share your experience!</div>
            </div>
            <button onclick="openReviewPrompt('${unratedDelivered[0].id}')" class="btn btn-primary btn-sm" style="flex-shrink:0;">Leave a Review</button>
        </div>` : '';

    ordersEl.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom:20px;">My Orders</h3>
            ${reviewPrompt}
            ${orders.length ? `
            <table class="admin-table">
                <thead><tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    ${orders.map(o => `
                    <tr>
                        <td><strong>${o.id}</strong></td>
                        <td>${new Date(o.date).toLocaleDateString()}</td>
                        <td>${o.items?.length || 0}</td>
                        <td>${formatPrice(o.total)}</td>
                        <td><span class="status-badge ${o.status}">${statusIcon[o.status] || ''} ${o.status}</span></td>
                        <td style="display:flex;gap:6px;flex-wrap:wrap;">
                            <a href="order-success.html?order=${o.id}" class="btn btn-sm btn-primary">Track</a>
                            <button onclick="printInvoice('${o.id}')" class="btn btn-sm btn-outline" title="Print Invoice"><i class="fas fa-print"></i></button>
                            ${o.status === 'pending' ? '<button onclick="cancelOrder(\''+o.id+'\',this)" class="btn btn-sm" style="background:#fdecea;color:#c0392b;border:1px solid #f5c6cb;">Cancel</button>' : ''}
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>` : '<p style="color:#aaa;text-align:center;padding:40px;">No orders yet. <a href="shop.html">Start shopping!</a></p>'}
        </div>`;
}

function cancelOrder(orderId, btn) {
    if (!confirm('Cancel this order? This cannot be undone.')) return;
    const orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
    const order  = orders.find(o => o.id === orderId);
    if (!order) return;
    if (order.status !== 'pending') { showToast('Only pending orders can be cancelled.', 'error'); return; }
    order.status = 'cancelled';
    order.cancelledAt = new Date().toISOString();
    order.cancelledBy = 'customer';
    localStorage.setItem('petPrestigeOrders', JSON.stringify(orders));

    // Refund loyalty points if any were redeemed
    const user = getCurrentUser();
    if (user && order.pointsRedeemed > 0) {
        user.loyaltyPoints = (user.loyaltyPoints || 0) + order.pointsRedeemed;
        saveCurrentUser(user);
    }

    showToast('Order cancelled successfully.');
    if (btn) {
        // Update row status inline
        const row = btn.closest('tr');
        if (row) {
            const statusCell = row.querySelector('.status-badge');
            if (statusCell) { statusCell.className = 'status-badge cancelled'; statusCell.textContent = '❌ cancelled'; }
            btn.remove();
        }
    }
}

function renderProfileSettings(user) {
    const settings = document.getElementById('settings');
    if (!settings) return;
    settings.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom:20px;">Account Settings</h3>
            <div class="form-group"><label>Full Name</label><input type="text" id="settingName" value="${user.name || ''}"></div>
            <div class="form-group"><label>Email</label><input type="email" id="settingEmail" value="${user.email || ''}" readonly style="opacity:0.6;"></div>
            <div class="form-group"><label>Phone</label><input type="tel" id="settingPhone" value="${user.phone || ''}"></div>
            <button class="btn btn-primary" onclick="saveProfileSettings()" style="margin-bottom:10px;">Save Changes</button>
        </div>
        <div class="admin-card">
            <h3 style="margin-bottom:20px;">Change Password</h3>
            <div class="form-group"><label>Current Password</label><input type="password" id="currentPass" placeholder="Enter current password"></div>
            <div class="form-group"><label>New Password</label><input type="password" id="newPass" placeholder="At least 6 characters"></div>
            <div class="form-group"><label>Confirm New Password</label><input type="password" id="confirmPass" placeholder="Repeat new password"></div>
            <button class="btn btn-primary" onclick="changePassword()">Update Password</button>
        </div>`;
}

function changePassword() {
    const current = document.getElementById('currentPass')?.value;
    const newP    = document.getElementById('newPass')?.value;
    const confirm = document.getElementById('confirmPass')?.value;
    if (!current || !newP || !confirm) { showToast('Please fill all password fields.', 'error'); return; }
    if (newP.length < 6) { showToast('New password must be at least 6 characters.', 'error'); return; }
    if (newP !== confirm) { showToast('New passwords do not match.', 'error'); return; }

    const user = getCurrentUser();
    const accounts = JSON.parse(localStorage.getItem('petPrestigeAccounts') || '[]');
    const acc = accounts.find(a => a.email === user?.email);
    if (!acc) { showToast('Account not found.', 'error'); return; }
    if (acc.password !== btoa(current)) { showToast('Current password is incorrect.', 'error'); return; }

    acc.password = btoa(newP);
    localStorage.setItem('petPrestigeAccounts', JSON.stringify(accounts));
    showToast('Password updated successfully! 🔐');
    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmPass').value = '';
}

function renderProfileAddresses(user) {
    const addrEl = document.getElementById('addresses');
    if (!addrEl) return;
    const saved = user.savedAddresses || [];
    addrEl.innerHTML = `
        <div class="admin-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;">Saved Addresses</h3>
                <button class="btn btn-primary btn-sm" onclick="showAddAddressForm()"><i class="fas fa-plus"></i> Add Address</button>
            </div>
            <div id="addAddressForm" style="display:none;background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:20px;">
                <div class="form-row">
                    <div class="form-group"><label>Label</label><input type="text" id="addrLabel" placeholder="e.g. Home, Office"></div>
                    <div class="form-group"><label>Full Name</label><input type="text" id="addrName"></div>
                </div>
                <div class="form-group"><label>Address</label><input type="text" id="addrStreet" placeholder="House no., Street, Barangay"></div>
                <div class="form-row">
                    <div class="form-group"><label>City</label><input type="text" id="addrCity"></div>
                    <div class="form-group"><label>Province</label><input type="text" id="addrProvince"></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label>Postal Code</label><input type="text" id="addrPostal"></div>
                    <div class="form-group"><label>Phone</label><input type="tel" id="addrPhone"></div>
                </div>
                <div style="display:flex;gap:10px;margin-top:10px;">
                    <button class="btn btn-primary" onclick="saveAddress()">Save Address</button>
                    <button class="btn btn-outline" onclick="document.getElementById('addAddressForm').style.display='none'">Cancel</button>
                </div>
            </div>
            ${saved.length ? saved.map((a, i) => `
                <div style="border:1.5px solid #eee;border-radius:12px;padding:16px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:flex-start;">
                    <div>
                        <div style="font-weight:600;color:var(--primary);margin-bottom:4px;">${a.label || 'Address ' + (i+1)}</div>
                        <div style="font-size:0.9rem;color:#555;line-height:1.6;">
                            ${a.name}<br>${a.street}, ${a.city}, ${a.province} ${a.postal}<br>
                            <i class="fas fa-phone" style="font-size:0.8rem;"></i> ${a.phone}
                        </div>
                    </div>
                    <button onclick="deleteAddress(${i})" style="background:none;border:none;color:#e74c3c;cursor:pointer;font-size:1rem;"><i class="fas fa-trash"></i></button>
                </div>`).join('')
            : '<p style="color:#aaa;text-align:center;padding:30px;">No saved addresses yet.</p>'}
        </div>`;
}

function showAddAddressForm() {
    const form = document.getElementById('addAddressForm');
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveAddress() {
    const user = getCurrentUser();
    if (!user) return;
    const addr = {
        label:    document.getElementById('addrLabel')?.value.trim() || 'Address',
        name:     document.getElementById('addrName')?.value.trim() || '',
        street:   document.getElementById('addrStreet')?.value.trim() || '',
        city:     document.getElementById('addrCity')?.value.trim() || '',
        province: document.getElementById('addrProvince')?.value.trim() || '',
        postal:   document.getElementById('addrPostal')?.value.trim() || '',
        phone:    document.getElementById('addrPhone')?.value.trim() || ''
    };
    if (!addr.street || !addr.city) { showToast('Please fill address and city at minimum.', 'error'); return; }
    user.savedAddresses = user.savedAddresses || [];
    user.savedAddresses.push(addr);
    saveCurrentUser(user);
    showToast('Address saved!');
    renderProfileAddresses(user);
}

function deleteAddress(index) {
    const user = getCurrentUser();
    if (!user || !user.savedAddresses) return;
    user.savedAddresses.splice(index, 1);
    saveCurrentUser(user);
    showToast('Address removed.');
    renderProfileAddresses(user);
}

function saveProfileSettings() {
    const user = getCurrentUser();
    if (!user) return;
    user.name  = document.getElementById('settingName')?.value  || user.name;
    user.phone = document.getElementById('settingPhone')?.value || user.phone;
    saveCurrentUser(user);
    showToast('Profile updated successfully!');
    document.getElementById('profileName').textContent = user.name;
}

// ==========================================
// MOBILE MENU
// ==========================================
function toggleMobileMenu() {
    const links = document.getElementById('navLinks');
    if (links) links.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const links = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (links && links.classList.contains('active')) {
        if (!links.contains(e.target) && (!menuBtn || !menuBtn.contains(e.target))) {
            links.classList.remove('active');
        }
    }
});

// ==========================================
// SUPPORT CHAT
// ==========================================
// ==========================================
// AI SUPPORT CHAT (Anthropic API)
// ==========================================
let chatHistory = []; // Maintains conversation context
let chatIsTyping = false;

const CHAT_SYSTEM_PROMPT = `You are a friendly and knowledgeable pet care assistant for Pet Prestige, a Philippine-based online pet supplies store. 

Your role:
- Help customers with questions about pet care, products, orders, and shipping
- Give helpful, accurate advice about dogs, cats, birds, fish, and small pets
- Be warm, friendly, and use occasional pet emojis 🐾
- Keep responses concise — 2-4 sentences max unless a detailed answer is truly needed
- For order-specific issues (tracking, refunds), politely direct them to email hello@petprestige.ph or call +63 912 345 6789
- Prices are in Philippine Peso (₱). Free shipping on orders over ₱500, flat ₱80 below that.
- Return policy: 7 days for defective/incorrect items
- Payment methods: Cash on Delivery, GCash, PayMaya
- Delivery: 1-3 business days within Metro Manila and select provincial areas
- Never make up specific order details, stock levels, or prices you don't know
- Always be helpful, never dismissive`;

function openSupportChat() {
    const widget = document.getElementById('chatWidget');
    if (!widget) return;
    widget.style.display = 'block';
    // Scroll to bottom
    const body = document.getElementById('chatBody');
    if (body) body.scrollTop = body.scrollHeight;
}

function closeSupportChat() {
    const widget = document.getElementById('chatWidget');
    if (widget) widget.style.display = 'none';
}

function appendChatMessage(text, role) {
    const body = document.getElementById('chatBody');
    if (!body) return;
    const div = document.createElement('div');
    div.className = `chat-message ${role}`;
    div.innerHTML = `<p>${text}</p>`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function showChatTyping() {
    const body = document.getElementById('chatBody');
    if (!body) return;
    const div = document.createElement('div');
    div.className = 'chat-message bot chat-typing';
    div.id = 'chatTypingIndicator';
    div.innerHTML = `<p><span style="display:inline-flex;gap:4px;align-items:center;">
        <span style="width:7px;height:7px;background:#aaa;border-radius:50%;animation:chatBounce 1s infinite 0s;display:inline-block;"></span>
        <span style="width:7px;height:7px;background:#aaa;border-radius:50%;animation:chatBounce 1s infinite 0.2s;display:inline-block;"></span>
        <span style="width:7px;height:7px;background:#aaa;border-radius:50%;animation:chatBounce 1s infinite 0.4s;display:inline-block;"></span>
    </span></p>`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    // Inject animation CSS once
    if (!document.getElementById('chatBounceStyle')) {
        const style = document.createElement('style');
        style.id = 'chatBounceStyle';
        style.textContent = '@keyframes chatBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}';
        document.head.appendChild(style);
    }
}

function removeChatTyping() {
    const indicator = document.getElementById('chatTypingIndicator');
    if (indicator) indicator.remove();
}

async function sendChatMessage() {
    if (chatIsTyping) return;
    const input = document.getElementById('chatInput');
    const text = input?.value.trim();
    if (!text) return;

    input.value = '';
    appendChatMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });

    chatIsTyping = true;
    showChatTyping();

    // Disable input while waiting
    if (input) input.disabled = true;
    const sendBtn = document.querySelector('.chat-input button');
    if (sendBtn) sendBtn.disabled = true;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: CHAT_SYSTEM_PROMPT,
                messages: chatHistory
            })
        });

        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t get a response. Please try again!';

        removeChatTyping();
        appendChatMessage(reply, 'bot');
        chatHistory.push({ role: 'assistant', content: reply });

        // Keep history manageable (last 20 messages)
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    } catch (err) {
        removeChatTyping();
        appendChatMessage('Sorry, I\'m having trouble connecting right now. Please email us at hello@petprestige.ph or call +63 912 345 6789 🐾', 'bot');
    } finally {
        chatIsTyping = false;
        if (input) { input.disabled = false; input.focus(); }
        if (sendBtn) sendBtn.disabled = false;
    }
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) sendChatMessage();
}

// ==========================================
// BACK TO ADMIN BUTTON (for storefront)
// ==========================================
function injectBackToAdminBtn() {
    const user = getCurrentUser();
    if (!user || user.email !== ADMIN_EMAIL) return;
    // Don't show on admin pages (they have data-admin-page="true")
    if (document.body.dataset.adminPage === 'true') return;
    if (document.getElementById('backToAdminBtn')) return;
    const btn = document.createElement('div');
    btn.id = 'backToAdminBtn';
    btn.innerHTML = `<a href="admin/dashboard.html"><i class="fas fa-shield-alt"></i> Admin Panel</a>`;
    document.body.appendChild(btn);
}




// ==========================================
// GUIDE DETAIL PAGE
// ==========================================
function loadGuideDetail() {
    const container = document.getElementById('guideDetail'); if(!container) return;
    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const guide = DB.guides.find(g => g.id === id);
    if(!guide) { container.innerHTML = '<p style="text-align:center;padding:60px;color:#aaa;">Guide not found. <a href="learn.html">Back to Learn</a></p>'; return; }
    document.title = guide.title + ' — Pet Prestige';
    const bc = document.getElementById('guideBreadcrumb'); if(bc) bc.textContent = guide.title;
    container.innerHTML = `
        <div style="max-width:800px;margin:0 auto;padding:20px;">
            <div style="margin-bottom:10px;"><a href="learn.html" style="color:var(--primary);text-decoration:none;font-size:0.9rem;"><i class="fas fa-arrow-left"></i> Back to Guides</a></div>
            <img src="${guide.image}" alt="${guide.title}" style="width:100%;height:360px;object-fit:cover;border-radius:16px;margin-bottom:28px;" onerror="this.style.display='none'">
            <span style="background:var(--primary);color:white;padding:4px 14px;border-radius:20px;font-size:0.82rem;font-weight:600;text-transform:capitalize;">${guide.category}</span>
            <h1 style="font-size:2rem;margin:14px 0 6px;color:#222;line-height:1.3;">${guide.title}</h1>
            <div style="color:#888;font-size:0.88rem;margin-bottom:28px;display:flex;gap:20px;flex-wrap:wrap;"><span><i class="far fa-clock"></i> ${guide.readTime}</span><span><i class="fas fa-calendar"></i> ${guide.date}</span></div>
            <div style="line-height:1.9;color:#444;font-size:1rem;">${guide.content}</div>
            <div style="margin-top:40px;padding-top:24px;border-top:1px solid #eee;display:flex;gap:14px;flex-wrap:wrap;">
                <a href="learn.html" class="btn btn-outline"><i class="fas fa-arrow-left"></i> All Guides</a>
                <a href="shop.html" class="btn btn-primary">Shop Pet Products</a>
            </div>
        </div>`;
}


// ==========================================
// COMMUNITY PAGE
// ==========================================
let communityPosts = JSON.parse(localStorage.getItem('petPrestigePosts') || JSON.stringify(DB.community));
let likedPosts = JSON.parse(localStorage.getItem('petPrestigeLikedPosts') || '[]');

function saveCommunityPosts() { localStorage.setItem('petPrestigePosts', JSON.stringify(communityPosts)); }

function loadCommunityPosts(filter = 'all') {
    const feed = document.getElementById('postsFeed');
    if (!feed) return;

    let posts = filter === 'all' ? [...communityPosts] : communityPosts.filter(p => p.topic === filter);

    // Apply sort from dropdown if present
    const sort = document.getElementById('sortPosts')?.value || 'newest';
    if (sort === 'popular') {
        posts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
        posts.sort((a, b) => b.id - a.id);
    }

    feed.innerHTML = posts.length
        ? posts.map(createPostCard).join('')
        : '<p style="text-align:center;padding:40px;color:#aaa;">No posts in this topic yet. Be the first to share!</p>';
}

function createPostCard(post) {
    const user = getCurrentUser();
    const isOwner = user && user.name === post.author;
    const isLiked = likedPosts.includes(post.id);
    return `<div class="post-card" id="postCard_${post.id}">
        <div class="post-header">
            <div class="post-avatar">${post.avatar || post.author.charAt(0)}</div>
            <div class="post-meta"><h4>${post.author}</h4><span>${post.time} · ${post.topic}</span></div>
            ${isOwner ? `<div style="margin-left:auto;position:relative;">
                <button onclick="togglePostMenu(${post.id})" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#999;padding:4px 10px;">⋯</button>
                <div id="postMenu_${post.id}" style="display:none;position:absolute;right:0;top:32px;background:white;border:1.5px solid #eee;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.12);z-index:100;min-width:140px;">
                    <button onclick="startEditPost(${post.id})" style="display:flex;align-items:center;gap:8px;width:100%;padding:11px 16px;border:none;background:none;cursor:pointer;font-family:inherit;font-size:0.88rem;"><i class="fas fa-edit" style="color:var(--primary);width:16px;"></i> Edit Post</button>
                    <button onclick="deletePost(${post.id})" style="display:flex;align-items:center;gap:8px;width:100%;padding:11px 16px;border:none;background:none;cursor:pointer;font-family:inherit;font-size:0.88rem;color:#e74c3c;"><i class="fas fa-trash" style="width:16px;"></i> Delete Post</button>
                </div>
            </div>` : ''}
        </div>
        <div class="post-content" id="postContent_${post.id}">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" style="width:100%;border-radius:10px;margin-top:10px;" onerror="this.style.display='none'">` : ''}
        </div>
        <div class="post-actions">
            <button onclick="likePost(${post.id})" style="background:none;border:none;padding:8px 14px;border-radius:20px;cursor:pointer;color:${isLiked ? '#e74c3c' : '#666'};font-size:0.9rem;display:flex;align-items:center;gap:6px;"><i class="${isLiked ? 'fas' : 'far'} fa-heart"></i> <span id="likeCount_${post.id}">${post.likes}</span></button>
            <button onclick="togglePostComments(${post.id})" style="background:none;border:none;padding:8px 14px;border-radius:20px;cursor:pointer;color:#666;font-size:0.9rem;display:flex;align-items:center;gap:6px;"><i class="far fa-comment"></i> <span id="commentCount_${post.id}">${(post.comments||[]).length}</span></button>
            <button onclick="sharePost(${post.id})" style="background:none;border:none;padding:8px 14px;border-radius:20px;cursor:pointer;color:#666;font-size:0.9rem;display:flex;align-items:center;gap:6px;"><i class="far fa-share-square"></i> Share</button>
        </div>
        <div id="postComments_${post.id}" style="display:none;border-top:1px solid #eee;padding-top:14px;margin-top:10px;">
            <div id="postCommentsList_${post.id}">${(post.comments||[]).map(c => renderComment(c, post.id)).join('') || '<p style="color:#aaa;font-size:0.85rem;text-align:center;padding:10px 0;">No comments yet.</p>'}</div>
            <div style="display:flex;gap:8px;margin-top:10px;"><input type="text" id="commentInput_${post.id}" placeholder="Write a comment..." style="flex:1;padding:9px 14px;border:1.5px solid #ddd;border-radius:20px;font-size:0.88rem;outline:none;font-family:inherit;" onkeypress="if(event.key==='Enter')addComment(${post.id})"><button class="btn btn-primary" style="padding:9px 16px;font-size:0.85rem;" onclick="addComment(${post.id})">Post</button></div>
        </div>
    </div>`;
}

function renderComment(c, postId) {
    const user = getCurrentUser();
    const isOwner = user && user.name === c.author;
    return `<div id="comment_${c.id}" style="margin-bottom:12px;">
        <div style="display:flex;gap:10px;"><div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;flex-shrink:0;">${c.author.charAt(0)}</div>
        <div style="flex:1;background:#f8f9fa;border-radius:12px;padding:10px 14px;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><strong style="font-size:0.88rem;">${c.author}</strong><span style="color:#aaa;font-size:0.78rem;">${c.time}</span>
            <div style="margin-left:auto;display:flex;gap:6px;">
                <button onclick="replyToComment(${postId},'${c.id}')" style="background:none;border:none;cursor:pointer;color:#888;font-size:0.78rem;padding:2px 6px;">Reply</button>
                ${isOwner ? `<button onclick="editComment(${postId},'${c.id}')" style="background:none;border:none;cursor:pointer;color:var(--primary);font-size:0.78rem;padding:2px 6px;">Edit</button><button onclick="deleteComment(${postId},'${c.id}')" style="background:none;border:none;cursor:pointer;color:#e74c3c;font-size:0.78rem;padding:2px 6px;">Delete</button>` : ''}
            </div></div>
            <p id="commentText_${c.id}" style="font-size:0.88rem;color:#555;margin:4px 0 0;">${c.text}</p>
        </div></div>
        ${(c.replies||[]).map(r => `<div style="display:flex;gap:8px;margin-top:8px;margin-left:42px;"><div style="width:26px;height:26px;border-radius:50%;background:#6c5ce7;color:white;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;flex-shrink:0;">${r.author.charAt(0)}</div><div style="flex:1;background:#f0f0f0;border-radius:10px;padding:8px 12px;"><strong style="font-size:0.82rem;">${r.author}</strong> <span style="color:#aaa;font-size:0.75rem;">${r.time}</span><p style="font-size:0.85rem;color:#555;margin:3px 0 0;">${r.text}</p></div></div>`).join('')}
        <div id="replyBox_${c.id}" style="display:none;margin-left:42px;margin-top:8px;"><div style="display:flex;gap:6px;"><input type="text" id="replyInput_${c.id}" placeholder="Write a reply..." style="flex:1;padding:7px 12px;border:1.5px solid #ddd;border-radius:16px;font-size:0.85rem;outline:none;font-family:inherit;" onkeypress="if(event.key==='Enter')submitReplyComment(${postId},'${c.id}')"><button class="btn btn-primary" style="padding:7px 12px;font-size:0.82rem;" onclick="submitReplyComment(${postId},'${c.id}')">Send</button><button style="padding:7px 10px;background:none;border:1.5px solid #ddd;border-radius:16px;cursor:pointer;" onclick="document.getElementById('replyBox_${c.id}').style.display='none'">✕</button></div></div>
    </div>`;
}

function togglePostComments(postId) { const el = document.getElementById(`postComments_${postId}`); if(el) el.style.display = el.style.display === 'none' ? 'block' : 'none'; }
function togglePostMenu(postId) { const m = document.getElementById(`postMenu_${postId}`); if(!m) return; const open = m.style.display !== 'none'; document.querySelectorAll('[id^="postMenu_"]').forEach(x => x.style.display='none'); if(!open) m.style.display='block'; }

function likePost(postId) {
    if (!requireLogin('Please log in to like posts.')) return;
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    const idx = likedPosts.indexOf(postId);
    if (idx > -1) { likedPosts.splice(idx,1); post.likes = Math.max(0, post.likes-1); }
    else { likedPosts.push(postId); post.likes++; }
    localStorage.setItem('petPrestigeLikedPosts', JSON.stringify(likedPosts)); saveCommunityPosts();
    const btn = document.querySelector(`#postCard_${postId} .post-actions button`);
    const isLiked = likedPosts.includes(postId);
    if(btn){ btn.style.color = isLiked?'#e74c3c':'#666'; btn.querySelector('i').className = isLiked?'fas fa-heart':'far fa-heart'; }
    const lc = document.getElementById(`likeCount_${postId}`); if(lc) lc.textContent = post.likes;
}

function addComment(postId) {
    if (!requireLogin('Please log in to comment.')) return;
    const inp = document.getElementById(`commentInput_${postId}`); const text = inp?.value.trim(); if(!text) return;
    const user = getCurrentUser();
    const comment = { id: Date.now(), author: user.name||'Anonymous', text, time: 'Just now', replies: [] };
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    if(!post.comments) post.comments = []; post.comments.unshift(comment); saveCommunityPosts();
    const list = document.getElementById(`postCommentsList_${postId}`); if(list) list.innerHTML = post.comments.map(c => renderComment(c, postId)).join('');
    const cc = document.getElementById(`commentCount_${postId}`); if(cc) cc.textContent = post.comments.length;
    if(inp) inp.value = '';
}

function replyToComment(postId, commentId) {
    if (!requireLogin('Please log in to reply.')) return;
    const box = document.getElementById(`replyBox_${commentId}`); if(!box) return;
    box.style.display = box.style.display === 'none' ? 'flex' : 'none';
    if(box.style.display !== 'none') document.getElementById(`replyInput_${commentId}`)?.focus();
}

function submitReplyComment(postId, commentId) {
    if (!requireLogin('Please log in to reply.')) return;
    const inp = document.getElementById(`replyInput_${commentId}`); const text = inp?.value.trim(); if(!text) return;
    const user = getCurrentUser();
    const reply = { id: Date.now(), author: user.name||'Anonymous', text, time: 'Just now' };
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    const comment = (post.comments||[]).find(c => String(c.id) === String(commentId)); if(!comment) return;
    if(!comment.replies) comment.replies = []; comment.replies.push(reply); saveCommunityPosts();
    if(inp) inp.value = ''; document.getElementById(`replyBox_${commentId}`).style.display = 'none';
    const list = document.getElementById(`postCommentsList_${postId}`); if(list) list.innerHTML = post.comments.map(c => renderComment(c, postId)).join('');
    showToast('Reply posted!');
}

function editComment(postId, commentId) {
    const disp = document.getElementById(`commentText_${commentId}`); if(!disp) return;
    const current = disp.textContent;
    disp.innerHTML = `<div style="display:flex;gap:6px;margin-top:4px;"><input type="text" id="editCommentInp_${commentId}" value="${current.replace(/"/g,'&quot;')}" style="flex:1;padding:6px 10px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.85rem;outline:none;"><button onclick="saveEditComment(${postId},'${commentId}')" style="padding:6px 10px;background:var(--primary);color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.82rem;">Save</button><button onclick="loadCommunityPosts()" style="padding:6px 8px;background:none;border:1.5px solid #ddd;border-radius:8px;cursor:pointer;">✕</button></div>`;
}

function saveEditComment(postId, commentId) {
    const inp = document.getElementById(`editCommentInp_${commentId}`); const newText = inp?.value.trim(); if(!newText) return;
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    const comment = (post.comments||[]).find(c => String(c.id) === String(commentId)); if(!comment) return;
    comment.text = newText; saveCommunityPosts();
    const disp = document.getElementById(`commentText_${commentId}`); if(disp) disp.textContent = newText;
    showToast('Comment updated!');
}

function deleteComment(postId, commentId) {
    if(!confirm('Delete this comment?')) return;
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    post.comments = (post.comments||[]).filter(c => String(c.id) !== String(commentId)); saveCommunityPosts();
    const el = document.getElementById(`comment_${commentId}`); if(el) el.remove();
    const cc = document.getElementById(`commentCount_${postId}`); if(cc) cc.textContent = post.comments.length;
    showToast('Comment deleted.');
}

function deletePost(postId) {
    if(!confirm('Delete this post?')) return;
    communityPosts = communityPosts.filter(p => p.id !== postId); saveCommunityPosts();
    const card = document.getElementById(`postCard_${postId}`); if(card) card.remove();
    showToast('Post deleted.');
}

function startEditPost(postId) {
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    const contentDiv = document.getElementById(`postContent_${postId}`); if(!contentDiv) return;
    document.getElementById(`postMenu_${postId}`).style.display = 'none';
    contentDiv.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px;"><input type="text" id="editTitle_${postId}" value="${post.title.replace(/"/g,'&quot;')}" style="padding:10px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem;outline:none;"><textarea id="editContent_${postId}" rows="3" style="padding:10px;border:1.5px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.9rem;outline:none;resize:vertical;">${post.content}</textarea><div style="display:flex;gap:8px;"><button class="btn btn-primary" style="padding:8px 16px;font-size:0.85rem;" onclick="saveEditPost(${postId})">Save</button><button class="btn btn-outline" style="padding:8px 16px;font-size:0.85rem;" onclick="loadCommunityPosts()">Cancel</button></div></div>`;
}

function saveEditPost(postId) {
    const post = communityPosts.find(p => p.id === postId); if(!post) return;
    const t = document.getElementById(`editTitle_${postId}`)?.value.trim();
    const c = document.getElementById(`editContent_${postId}`)?.value.trim();
    if(!t||!c){ showToast('Cannot be empty.','error'); return; }
    post.title = t; post.content = c; saveCommunityPosts(); loadCommunityPosts(); showToast('Post updated!');
}

function sharePost(postId) { navigator.clipboard?.writeText(window.location.href).then(() => showToast('Link copied!')); }

function showPostModal() {
    if (!requireLogin('Please log in to create a post.')) return;
    const m = document.getElementById('postModal'); if(m) m.classList.add('active');
}
function closePostModal() { const m = document.getElementById('postModal'); if(m) m.classList.remove('active'); }

function submitPost() {
    if (!requireLogin('Please log in to post.')) return;
    const title = document.getElementById('postTitle')?.value.trim();
    const content = document.getElementById('postContent')?.value.trim();
    const topic = document.getElementById('postTopic')?.value || 'general';
    if(!title || !content) { showToast('Please fill in title and content.','error'); return; }
    const user = getCurrentUser();
    const newPost = { id: Date.now(), author: user.name||'Anonymous', avatar: (user.name||'A').charAt(0).toUpperCase(), topic, title, content, image: null, likes: 0, likedBy: [], comments: [], time: 'Just now' };
    const imgFile = document.getElementById('postImageInput')?.files[0];
    const finish = () => { communityPosts.unshift(newPost); saveCommunityPosts(); closePostModal(); loadCommunityPosts(); showToast('Post shared! 🐾'); };
    if(imgFile){ const r = new FileReader(); r.onload = e => { newPost.image = e.target.result; finish(); }; r.readAsDataURL(imgFile); } else finish();
}

// ==========================================
// LOST & FOUND PAGE
// ==========================================
// Single IIFE: seed localStorage with DB records if empty,
// or inject any missing DB records back in if localStorage already exists.
(function() {
    var stored = JSON.parse(localStorage.getItem('petPrestigeLF') || 'null');
    if (!stored) {
        localStorage.setItem('petPrestigeLF', JSON.stringify(DB.lostFound || []));
    } else {
        var changed = false;
        (DB.lostFound || []).forEach(function(sample) {
            if (!stored.some(function(r) { return r.id === sample.id; })) {
                stored.push(sample);
                changed = true;
            }
        });
        if (changed) localStorage.setItem('petPrestigeLF', JSON.stringify(stored));
    }
})();

// lfData always reflects whatever is in localStorage (including admin changes)
function getLFData() {
    return JSON.parse(localStorage.getItem('petPrestigeLF') || JSON.stringify(DB.lostFound || []));
}
let lfData = getLFData();
function saveLFData() {
    localStorage.setItem('petPrestigeLF', JSON.stringify(lfData));
}

function loadLostFound(filter = 'all') {
    const grid = document.getElementById('lfGrid'); if(!grid) return;

    // Apply search query if present
    const searchQuery = (document.getElementById('lfSearch')?.value || '').toLowerCase().trim();

    let items;
    if (filter === 'reunited') {
        // Show ONLY reunited items
        items = lfData.filter(i => i.status === 'reunited');
    } else if (filter === 'all') {
        // Show active items (lost + found), exclude reunited
        items = lfData.filter(i => i.status !== 'reunited');
    } else {
        // 'lost' or 'found' — filter by type, exclude reunited
        items = lfData.filter(i => i.type === filter && i.status !== 'reunited');
    }

    // Apply search filter if query exists
    if (searchQuery) {
        items = items.filter(i =>
            (i.breed || '').toLowerCase().includes(searchQuery) ||
            (i.location || '').toLowerCase().includes(searchQuery) ||
            (i.name || '').toLowerCase().includes(searchQuery) ||
            (i.description || '').toLowerCase().includes(searchQuery)
        );
    }

    grid.innerHTML = items.length ? items.map(createLFCard).join('') : '<p style="text-align:center;padding:40px;color:#aaa;">No reports found.</p>';
}

function createLFCard(item) {
    const user = getCurrentUser();
    const isOwner = user && (user.name === item.contactName || user.email === ADMIN_EMAIL);
    const isReunited = item.status === 'reunited';

    return `<div class="lf-card" id="lfCard_${item.id}" style="${isReunited ? 'opacity:0.7;' : ''}">
        <div style="position:relative;">
            <img src="${item.image}" alt="${item.breed}" class="lf-image"
                 style="width:100%;height:200px;object-fit:cover;border-radius:10px 10px 0 0;"
                 onerror="this.src='https://via.placeholder.com/400x200/FF6B35/fff?text=Pet+Photo'">
            <span class="lf-badge ${item.type}" style="position:absolute;top:10px;left:10px;">${item.type.toUpperCase()}</span>
            ${isReunited ? `<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(39,174,96,0.15);border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center;">
                <span style="background:#27ae60;color:white;padding:8px 20px;border-radius:20px;font-weight:700;font-size:1rem;">🎉 REUNITED!</span>
            </div>` : ''}
        </div>
        <div class="lf-info" style="padding:16px;">
            <h3>${item.breed}${item.name && item.name !== 'Unknown' ? ' — ' + item.name : ''}</h3>
            <div class="lf-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                <span><i class="fas fa-calendar"></i> ${item.date}</span>
            </div>
            <p style="color:#666;font-size:0.9rem;margin:10px 0;">${item.description}</p>
            <div style="background:#fef7f0;border-radius:8px;padding:10px;margin-bottom:12px;">
                <p style="font-weight:600;color:var(--primary);margin:0 0 4px;font-size:0.88rem;">Contact:</p>
                <p style="font-size:0.88rem;margin:0;"><i class="fas fa-user"></i> ${item.contactName} &nbsp; <i class="fas fa-phone"></i> ${item.contactPhone}</p>
            </div>
            ${isOwner && !isReunited ? `
            <button onclick="markReunited(${item.id})"
                style="width:100%;padding:9px;background:#27ae60;color:white;border:none;border-radius:8px;cursor:pointer;font-size:0.85rem;font-family:inherit;margin-bottom:8px;font-weight:600;">
                <i class="fas fa-heart"></i> Mark as Reunited 🎉
            </button>` : ''}
            <button onclick="toggleLFComments(${item.id})"
                style="width:100%;padding:9px;background:#f8f9fa;border:1.5px solid #eee;border-radius:8px;cursor:pointer;font-size:0.85rem;font-family:inherit;">
                <i class="fas fa-comments"></i> Comments (<span id="lfCommentCount_${item.id}">${(item.comments||[]).length}</span>)
            </button>
            <div id="lfComments_${item.id}" style="display:none;margin-top:12px;border-top:1px solid #eee;padding-top:12px;">
                <div id="lfCommentList_${item.id}">
                    ${(item.comments||[]).map(c => `
                        <div style="background:#f8f8f8;border-radius:8px;padding:10px;margin-bottom:8px;font-size:0.88rem;">
                            <strong>${c.author}</strong> <span style="color:#aaa;font-size:0.78rem;">${c.time}</span>
                            <p style="margin:4px 0 0;">${c.text}</p>
                        </div>`).join('') || '<p style="color:#aaa;font-size:0.85rem;text-align:center;">No comments yet.</p>'}
                </div>
                <div style="display:flex;gap:8px;margin-top:10px;">
                    <input type="text" id="lfCommentInput_${item.id}" placeholder="Write a comment..."
                           style="flex:1;padding:8px 12px;border:1.5px solid #ddd;border-radius:8px;font-size:0.88rem;font-family:inherit;outline:none;"
                           onkeypress="if(event.key==='Enter')addLFComment(${item.id})">
                    <button class="btn btn-primary" style="padding:8px 14px;font-size:0.85rem;" onclick="addLFComment(${item.id})">Post</button>
                </div>
            </div>
        </div>
    </div>`;
}

function toggleLFComments(id) { const el = document.getElementById(`lfComments_${id}`); if(el) el.style.display = el.style.display==='none' ? 'block' : 'none'; }

function addLFComment(id) {
    if(!requireLogin('Please log in to comment.')) return;
    const inp = document.getElementById(`lfCommentInput_${id}`); const text = inp?.value.trim(); if(!text) return;
    const user = getCurrentUser();
    const comment = { id: Date.now(), author: user.name||'Anonymous', text, time: 'Just now' };
    lfData = getLFData();
    const item = lfData.find(i => i.id === id); if(!item) return;
    if(!item.comments) item.comments = []; item.comments.unshift(comment); saveLFData();
    const list = document.getElementById(`lfCommentList_${id}`);
    if(list) list.innerHTML = item.comments.map(c => `<div style="background:#f8f8f8;border-radius:8px;padding:10px;margin-bottom:8px;font-size:0.88rem;"><strong>${c.author}</strong> <span style="color:#aaa;font-size:0.78rem;">${c.time}</span><p style="margin:4px 0 0;">${c.text}</p></div>`).join('');
    const cc = document.getElementById(`lfCommentCount_${id}`); if(cc) cc.textContent = item.comments.length;
    if(inp) inp.value='';
}

function filterLF(type) {
    window._lfActiveFilter = type;
    document.querySelectorAll('.lf-tabs button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${type}'`));
    });
    loadLostFound(type);
}
function searchLF() { loadLostFound(window._lfActiveFilter || 'all'); }

function submitReport() {
    if(!requireLogin('Please log in to submit a report.')) return;
    const form = document.getElementById('reportForm'); if(!form) return;
    const user = getCurrentUser();
    // Support both ID naming conventions (form uses short IDs)
    const getVal = (...ids) => { for(const id of ids){ const el = document.getElementById(id); if(el && el.value) return el.value; } return ''; };
    const imgPrev = document.getElementById('imagePreview') || document.getElementById('reportImagePreview');
    const newItem = {
        id: Date.now(),
        type: getVal('reportType') || 'lost',
        petType: 'unknown',
        name: getVal('petName', 'reportPetName') || 'Unknown',
        breed: getVal('breed', 'reportBreed') || 'Unknown',
        color: '',
        size: 'medium',
        location: getVal('location', 'reportLocation') || 'Unknown',
        date: getVal('date', 'reportDate') || new Date().toISOString().split('T')[0],
        contactName: getVal('contactName', 'reportContactName') || user?.name || '',
        contactPhone: getVal('contactPhone', 'reportContactPhone') || '',
        description: getVal('description', 'reportDescription') || '',
        image: (imgPrev && imgPrev.src && imgPrev.src !== window.location.href && !imgPrev.src.endsWith('/'))
            ? imgPrev.src
            : 'https://via.placeholder.com/400x200/FF6B35/fff?text=Pet+Photo',
        status: 'active', comments: []
    };
    lfData.unshift(newItem); saveLFData();
    const m = document.getElementById('reportModal'); if(m) m.classList.remove('active');
    form.reset();
    if(imgPrev){ imgPrev.src=''; imgPrev.style.display='none'; }
    const imgContainer = document.getElementById('imagePreviewContainer');
    if(imgContainer) imgContainer.style.display = 'none';
    loadLostFound(); showToast('Report submitted! 🐾');
}

function previewReportImage(input) {
    if(!input.files||!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = e => {
        // Support both ID conventions
        const prev1 = document.getElementById('imagePreview');
        const prev2 = document.getElementById('reportImagePreview');
        const container = document.getElementById('imagePreviewContainer');
        const prev = prev1 || prev2;
        if(prev){ prev.src = e.target.result; prev.style.display = 'block'; }
        if(container) container.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
}

function showReportModal(type) {
    if(!requireLogin('Please log in to report a pet.')) return;
    const m = document.getElementById('reportModal'); if(m) m.classList.add('active');
    const t = document.getElementById('reportType'); if(t) t.value = type||'lost';
}
function closeReportModal() { const m = document.getElementById('reportModal'); if(m) m.classList.remove('active'); }


// ==========================================
// SAMPLE DATA & HELPERS
// ==========================================
const SAMPLE_ORDERS = [
    { id: 'PP-DEMO-001', items: [{id:1,name:'Royal Canin Adult Dog Food 2kg',price:850,quantity:2,image:'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=100'}], shippingInfo:{firstName:'Maria',lastName:'Santos',phone:'09123456789',email:'maria@email.com',address:'123 Rizal St',city:'Makati',province:'Metro Manila',postal:'1200'}, paymentInfo:{method:'gcash'}, subtotal:1700, shippingCost:0, discount:136, total:1564, status:'delivered', date: new Date(Date.now()-86400000*2).toISOString(), rated:false },
    { id: 'PP-DEMO-002', items: [{id:14,name:'Whiskas Dry Cat Food 1.2kg',price:420,quantity:2,image:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100'}], shippingInfo:{firstName:'Juan',lastName:'Dela Cruz',phone:'09987654321',email:'juan@email.com',address:'456 Mabini Ave',city:'Quezon City',province:'Metro Manila',postal:'1100'}, paymentInfo:{method:'cod'}, subtotal:840, shippingCost:0, discount:0, total:840, status:'shipped', date: new Date(Date.now()-86400000).toISOString(), rated:false },
    { id: 'PP-DEMO-003', items: [{id:5,name:'Kong Classic Dog Toy',price:350,quantity:1,image:'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=100'},{id:8,name:'Adjustable Dog Harness (M)',price:650,quantity:1,image:'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=100'}], shippingInfo:{firstName:'Ana',lastName:'Lim',phone:'09281234567',email:'ana@email.com',address:'789 Bonifacio Blvd',city:'Taguig',province:'Metro Manila',postal:'1630'}, paymentInfo:{method:'paymaya'}, subtotal:1000, shippingCost:0, discount:0, total:1000, status:'processing', date: new Date(Date.now()-3600000*5).toISOString(), rated:false },
    { id: 'PP-DEMO-004', items: [{id:35,name:'Fish Tank Aquarium Starter 20L',price:1500,quantity:1,image:'https://images.unsplash.com/photo-1522069365940-3ccea4d79fa2?w=100'}], shippingInfo:{firstName:'Pedro',lastName:'Reyes',phone:'09171234567',email:'pedro@email.com',address:'321 Luna St',city:'Pasig',province:'Metro Manila',postal:'1600'}, paymentInfo:{method:'bank'}, subtotal:1500, shippingCost:0, discount:135, total:1365, status:'pending', date: new Date(Date.now()-3600000*2).toISOString(), rated:false }
];

const SAMPLE_REVIEWS = {
    1: [
        { id: 101, author: 'Maria Santos', rating: 5, text: 'My dog loves this food! His coat became so shiny and he has more energy. Will definitely buy again.', date: 'March 15, 2024' },
        { id: 102, author: 'Juan Dela Cruz', rating: 4, text: 'Good quality dog food. My Labrador eats it happily every day. Fast delivery too!', date: 'March 10, 2024' }
    ],
    14: [{ id: 201, author: 'Rosa Garcia', rating: 5, text: 'My cat absolutely loves Whiskas! She meows every morning asking for it.', date: 'March 12, 2024' }],
    5:  [{ id: 301, author: 'Jose Cruz', rating: 5, text: 'Amazing toy! Keeps my dog busy for hours. Perfect for mental stimulation.', date: 'March 14, 2024' }]
};

function initSampleData() {
    const existing = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
    if (!existing.some(o => String(o.id).startsWith('PP-DEMO'))) {
        localStorage.setItem('petPrestigeOrders', JSON.stringify([...SAMPLE_ORDERS, ...existing]));
    }
    const existingReviews = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    let changed = false;
    for (const [pid, reviews] of Object.entries(SAMPLE_REVIEWS)) {
        if (!existingReviews[pid]) { existingReviews[pid] = reviews; changed = true; }
    }
    if (changed) localStorage.setItem('petPrestigeReviews', JSON.stringify(existingReviews));
}

// ==========================================
// DOMContentLoaded - Auto-init
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initSampleData();
    updateCartCount();
    updateWishlistCount();

    // Wishlist page
    if (document.getElementById('wishlistGrid')) renderWishlist();

    // Homepage
    if (document.getElementById('featuredProducts')) loadFeaturedProducts();
    if (document.getElementById('recentlyViewedGrid')) loadRecentlyViewed();

    // Shop page
    if (document.getElementById('productGrid')) loadShopProducts();

    // Cart page
    if (document.getElementById('cartItems')) { loadCart(); updateCartCount(); }

    // Checkout page
    if (document.getElementById('summaryItems')) loadCheckoutSummary();

    // Product detail
    if (document.getElementById('productDetail')) loadProductDetail();

    // Learn/guides page
    if (document.getElementById('guidesGrid')) loadGuides();

    // Profile page
    if (document.getElementById('profileName')) loadProfile();

    // Community page
    if (document.getElementById('postsFeed')) loadCommunityPosts();

    // Lost & Found page
    if (document.getElementById('lfGrid')) loadLostFound();

    // Guide detail page
    if (document.getElementById('guideDetail')) loadGuideDetail();

    // Close post menus on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('[id^="postMenu_"]') && !e.target.getAttribute?.('onclick')?.startsWith('togglePostMenu')) {
            document.querySelectorAll('[id^="postMenu_"]').forEach(m => m.style.display='none');
        }
    });

    // Admin link for admin users
    injectBackToAdminBtn();
});

// ==========================================
// RECENTLY VIEWED
// ==========================================
function trackRecentlyViewed(productId) {
    let recent = JSON.parse(localStorage.getItem('petPrestigeRecentlyViewed') || '[]');
    // Remove if already exists, then add to front
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);
    // Keep only last 8
    recent = recent.slice(0, 8);
    localStorage.setItem('petPrestigeRecentlyViewed', JSON.stringify(recent));
}

function loadRecentlyViewed(excludeId = null) {
    const container = document.getElementById('recentlyViewedGrid');
    if (!container) return;
    const recent = JSON.parse(localStorage.getItem('petPrestigeRecentlyViewed') || '[]');
    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];
    const products = recent
        .filter(id => id !== excludeId)
        .map(id => allProducts.find(p => p.id === id))
        .filter(Boolean)
        .slice(0, 4);

    const section = document.getElementById('recentlyViewedSection');
    if (!products.length) {
        if (section) section.style.display = 'none';
        return;
    }
    if (section) section.style.display = 'block';
    container.innerHTML = products.map(createProductCard).join('');
}

// ==========================================
// LOST & FOUND — MARK AS REUNITED
// ==========================================
function markReunited(id) {
    if (!requireLogin('Please log in to update this report.')) return;
    lfData = getLFData();
    const item = lfData.find(i => i.id === id);
    if (!item) return;
    const user = getCurrentUser();
    // Only the reporter or admin can mark as reunited
    if (item.contactName !== user?.name && user?.email !== ADMIN_EMAIL) {
        showToast('Only the reporter can mark this as reunited.', 'error');
        return;
    }
    if (!confirm(`Mark "${item.breed}${item.name !== 'Unknown' ? ' — ' + item.name : ''}" as reunited? This will close the report.`)) return;
    item.status = 'reunited';
    saveLFData();
    showToast('🎉 Marked as reunited! So happy for you!');
    loadLostFound();
}

// ==========================================
// MY REVIEWS (Profile tab)
// ==========================================
function renderMyReviews(user) {
    const el = document.getElementById('myreviews');
    if (!el) return;
    const allReviews = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];
    const myReviews = [];

    Object.keys(allReviews).forEach(productId => {
        allReviews[productId].forEach(r => {
            if (r.author === (user.name || user.email)) {
                const product = allProducts.find(p => p.id === parseInt(productId));
                myReviews.push({ ...r, productId, productName: product?.name || 'Unknown Product', productImage: product?.image || '' });
            }
        });
    });

    myReviews.sort((a, b) => b.id - a.id);

    el.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom:20px;">My Reviews (${myReviews.length})</h3>
            ${myReviews.length ? myReviews.map(r => `
                <div style="display:flex;gap:14px;padding:16px 0;border-bottom:1px solid #eee;align-items:flex-start;">
                    <img src="${r.productImage}" alt="${r.productName}"
                         style="width:60px;height:60px;object-fit:cover;border-radius:8px;flex-shrink:0;"
                         onerror="this.src='https://via.placeholder.com/60?text=P'">
                    <div style="flex:1;">
                        <a href="product-detail.html?id=${r.productId}" style="font-weight:600;color:#222;text-decoration:none;font-size:0.92rem;">${r.productName}</a>
                        <div style="color:#FFE66D;font-size:1rem;margin:4px 0;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                        <p style="color:#555;font-size:0.88rem;margin:0 0 4px;">${r.text}</p>
                        <small style="color:#aaa;">${r.date}</small>
                    </div>
                    <button onclick="deleteMyReview('${r.productId}', ${r.id})"
                        style="background:none;border:none;color:#e74c3c;cursor:pointer;font-size:0.82rem;flex-shrink:0;padding:4px 8px;border-radius:6px;"
                        title="Delete review"><i class="fas fa-trash"></i></button>
                </div>`).join('')
            : '<p style="color:#aaa;text-align:center;padding:40px;">You haven\'t reviewed any products yet. <a href="shop.html">Start shopping!</a></p>'}
        </div>`;
}

function deleteMyReview(productId, reviewId) {
    if (!confirm('Delete this review?')) return;
    const allReviews = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    if (allReviews[productId]) {
        allReviews[productId] = allReviews[productId].filter(r => r.id !== reviewId);
        if (!allReviews[productId].length) delete allReviews[productId];
        localStorage.setItem('petPrestigeReviews', JSON.stringify(allReviews));
    }
    showToast('Review deleted.');
    const user = getCurrentUser();
    if (user) renderMyReviews(user);
}

// ==========================================
// REVIEW PROMPT (after delivery)
// ==========================================
function openReviewPrompt(orderId) {
    var orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
    var order  = orders.find(function(o){ return o.id === orderId; });
    if (!order) return;

    var items = order.items || [];
    var overlay = document.createElement('div');
    overlay.id = 'reviewPromptOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px;';

    var itemsHtml = items.map(function(item, idx) {
        return '<div class="review-item-pick" data-idx="' + idx + '" ' +
            'style="display:flex;align-items:center;gap:12px;padding:10px;border:1.5px solid #eee;border-radius:10px;margin-bottom:8px;cursor:pointer;">' +
            '<img src="' + item.image + '" style="width:48px;height:48px;object-fit:cover;border-radius:8px;" onerror="this.src=\'https://via.placeholder.com/48\'">' +
            '<div style="flex:1;font-size:0.9rem;font-weight:600;">' + item.name + '</div>' +
            '<i class="fas fa-chevron-right" style="color:#aaa;font-size:0.8rem;"></i></div>';
    }).join('');

    overlay.innerHTML =
        '<div style="background:white;border-radius:18px;padding:32px;max-width:480px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.2);">' +
        '<h3 style="margin-bottom:6px;">Rate Your Order</h3>' +
        '<p style="color:#888;font-size:0.88rem;margin-bottom:20px;">Select a product to review from order ' + orderId + '</p>' +
        '<div id="reviewPromptItems">' + itemsHtml + '</div>' +
        '<button id="closeReviewOverlay" style="margin-top:12px;background:none;border:none;color:#aaa;cursor:pointer;font-size:0.85rem;width:100%;">Cancel</button>' +
        '</div>';

    document.body.appendChild(overlay);

    // Wire clicks via event delegation
    overlay.querySelector('#closeReviewOverlay').addEventListener('click', function() { overlay.remove(); });
    overlay.querySelectorAll('.review-item-pick').forEach(function(el) {
        el.addEventListener('mouseover', function() { el.style.borderColor = 'var(--primary)'; });
        el.addEventListener('mouseout',  function() { el.style.borderColor = '#eee'; });
        el.addEventListener('click', function() {
            var idx  = parseInt(el.dataset.idx);
            var item = items[idx];
            startItemReview(item.id, item.name, orderId);
        });
    });
}

function startItemReview(productId, productName, orderId) {
    var overlay = document.getElementById('reviewPromptOverlay');
    if (overlay) overlay.remove();

    var modal = document.createElement('div');
    modal.id = 'quickReviewModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';

    var starsHtml = '';
    for (var i = 1; i <= 5; i++) {
        starsHtml += '<span data-star="' + i + '" style="font-size:2rem;cursor:pointer;color:#ddd;transition:color 0.15s;">&#9733;</span>';
    }

    modal.innerHTML =
        '<div style="background:white;border-radius:18px;padding:32px;max-width:440px;width:100%;">' +
        '<h3 style="margin-bottom:4px;">Review Product</h3>' +
        '<p style="color:#888;font-size:0.88rem;margin-bottom:20px;">' + productName + '</p>' +
        '<div id="quickStars" style="display:flex;gap:4px;margin-bottom:16px;">' + starsHtml + '</div>' +
        '<textarea id="quickReviewText" rows="4" placeholder="Share your experience..." ' +
        'style="width:100%;padding:12px;border:1.5px solid #ddd;border-radius:10px;font-family:inherit;font-size:0.9rem;outline:none;resize:vertical;"></textarea>' +
        '<div style="display:flex;gap:10px;margin-top:16px;">' +
        '<button id="submitReviewBtn" class="btn btn-primary" style="flex:1;">Submit Review</button>' +
        '<button id="cancelReviewBtn" class="btn btn-outline" style="flex:1;">Cancel</button>' +
        '</div></div>';

    document.body.appendChild(modal);
    window._quickRating = 0;

    // Wire stars
    modal.querySelectorAll('#quickStars span').forEach(function(s) {
        s.addEventListener('click', function() { setQuickRating(parseInt(s.dataset.star)); });
        s.addEventListener('mouseover', function() {
            var v = parseInt(s.dataset.star);
            modal.querySelectorAll('#quickStars span').forEach(function(x) {
                x.style.color = parseInt(x.dataset.star) <= v ? '#FFE66D' : '#ddd';
            });
        });
        s.addEventListener('mouseout', function() { setQuickRating(window._quickRating || 0); });
    });
    modal.querySelector('#cancelReviewBtn').addEventListener('click', function() { modal.remove(); });
    modal.querySelector('#submitReviewBtn').addEventListener('click', function() { submitQuickReview(productId, orderId); });
}

function setQuickRating(stars) {
    window._quickRating = stars;
    document.querySelectorAll('#quickStars span').forEach(function(s) {
        s.style.color = parseInt(s.dataset.star) <= stars ? '#FFE66D' : '#ddd';
    });
}

function submitQuickReview(productId, orderId) {
    var rating = window._quickRating || 0;
    var text   = document.getElementById('quickReviewText')?.value.trim();
    if (!rating) { showToast('Please select a star rating.', 'error'); return; }
    if (!text)   { showToast('Please write a short review.', 'error'); return; }

    var user = getCurrentUser();
    var allReviews = JSON.parse(localStorage.getItem('petPrestigeReviews') || '{}');
    if (!allReviews[productId]) allReviews[productId] = [];

    allReviews[productId].push({
        id:     Date.now(),
        author: user ? (user.name || user.email) : 'Anonymous',
        rating: rating,
        text:   text,
        date:   new Date().toLocaleDateString('en-PH')
    });
    localStorage.setItem('petPrestigeReviews', JSON.stringify(allReviews));

    // Mark order as rated
    var orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
    var order  = orders.find(function(o) { return o.id === orderId; });
    if (order) { order.rated = true; localStorage.setItem('petPrestigeOrders', JSON.stringify(orders)); }

    var modal = document.getElementById('quickReviewModal');
    if (modal) modal.remove();
    showToast('Review submitted! Thank you ⭐');
    if (user) renderProfileOrders(user);
}

// ==========================================
// LOYALTY POINTS SYSTEM
// ==========================================
const POINTS_PER_PESO   = 1;     // ₱1 = 1 point
const PESOS_PER_POINT   = 0.50;  // 1 point = ₱0.50 discount
const MIN_REDEEM_POINTS = 100;   // minimum to redeem

function getLoyaltyPoints() {
    var user = getCurrentUser();
    return user ? (user.loyaltyPoints || 0) : 0;
}

function addLoyaltyPoints(pesoAmount) {
    var user = getCurrentUser();
    if (!user) return;
    var pts = Math.floor(pesoAmount * POINTS_PER_PESO);
    user.loyaltyPoints = (user.loyaltyPoints || 0) + pts;
    saveCurrentUser(user);

    // Sync to accounts store
    var accounts = JSON.parse(localStorage.getItem('petPrestigeAccounts') || '[]');
    var acc = accounts.find(function(a) { return a.email === user.email; });
    if (acc) { acc.loyaltyPoints = user.loyaltyPoints; localStorage.setItem('petPrestigeAccounts', JSON.stringify(accounts)); }
    return pts;
}

function redeemLoyaltyPoints(points) {
    var user = getCurrentUser();
    if (!user) return 0;
    var available = user.loyaltyPoints || 0;
    var toRedeem  = Math.min(points, available);
    user.loyaltyPoints = available - toRedeem;
    saveCurrentUser(user);
    return toRedeem;
}

function getLoyaltyDiscount(points) {
    return Math.floor(points * PESOS_PER_POINT);
}

// ==========================================
// PET PROFILES
// ==========================================
function getPetProfiles() {
    var user = getCurrentUser();
    if (!user) return [];
    return user.pets || [];
}

function savePetProfiles(pets) {
    var user = getCurrentUser();
    if (!user) return;
    user.pets = pets;
    saveCurrentUser(user);
}

function renderPetProfiles(user) {
    var el = document.getElementById('petprofiles');
    if (!el) return;
    var pets = user.pets || [];

    var speciesEmoji = {dog:'🐕',cat:'🐈',bird:'🐦',fish:'🐟',rabbit:'🐰',hamster:'🐹',other:'🐾'};
    var categoryMap  = {dog:'dogs',cat:'cats',bird:'birds',fish:'fish',rabbit:'small-pets',hamster:'small-pets',other:'small-pets'};

    var petCards = pets.map(function(pet, i) {
        var emoji = speciesEmoji[pet.species] || '🐾';
        var cat   = categoryMap[pet.species]  || 'small-pets';
        var photo = pet.photo
            ? '<img src="' + pet.photo + '" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid var(--primary);">'
            : '<div style="width:64px;height:64px;border-radius:50%;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:2rem;">' + emoji + '</div>';
        var speciesLabel = pet.species ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1) : '';

        return '<div style="display:flex;align-items:center;gap:16px;padding:16px;border:1.5px solid #eee;border-radius:14px;margin-bottom:12px;transition:box-shadow 0.2s;">' +
            '<div style="flex-shrink:0;">' + photo + '</div>' +
            '<div style="flex:1;">' +
            '<div style="font-weight:700;font-size:1rem;margin-bottom:2px;">' + pet.name + ' <span style="font-size:0.85rem;font-weight:400;color:#888;">' + (pet.breed || '') + '</span></div>' +
            '<div style="font-size:0.82rem;color:#aaa;">' + speciesLabel + (pet.age ? ' · ' + pet.age : '') + '</div>' +
            '<a href="shop.html?category=' + cat + '" style="font-size:0.8rem;color:var(--primary);font-weight:600;text-decoration:none;">Shop for ' + pet.name + ' &#8594;</a>' +
            '</div>' +
            '<button class="delete-pet-btn" data-pet-idx="' + i + '" style="background:none;border:none;color:#e74c3c;cursor:pointer;padding:6px 10px;border-radius:8px;font-size:0.9rem;" title="Remove pet"><i class="fas fa-trash"></i></button>' +
            '</div>';
    }).join('');

    el.innerHTML =
        '<div class="admin-card">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">' +
        '<h3 style="margin:0;">My Pets (' + pets.length + ')</h3>' +
        '<button id="addPetToggleBtn" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Add Pet</button>' +
        '</div>' +

        '<div id="addPetForm" style="display:none;background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:20px;">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
        '<div class="form-group"><label>Pet Name *</label><input type="text" id="petNameInput" placeholder="e.g. Max"></div>' +
        '<div class="form-group"><label>Species *</label>' +
        '<select id="petSpeciesInput" style="width:100%;padding:10px 14px;border:1.5px solid var(--gray-light);border-radius:8px;font-family:inherit;font-size:0.9rem;outline:none;">' +
        '<option value="">Select...</option><option value="dog">Dog</option><option value="cat">Cat</option>' +
        '<option value="bird">Bird</option><option value="fish">Fish</option><option value="rabbit">Rabbit</option>' +
        '<option value="hamster">Hamster</option><option value="other">Other</option>' +
        '</select></div>' +
        '<div class="form-group"><label>Breed</label><input type="text" id="petBreedInput" placeholder="e.g. Golden Retriever"></div>' +
        '<div class="form-group"><label>Age</label><input type="text" id="petAgeInput" placeholder="e.g. 2 years"></div>' +
        '</div>' +
        '<div class="form-group"><label>Photo (optional)</label>' +
        '<input type="file" id="petPhotoInput" accept="image/*">' +
        '<div id="petPhotoPreview" style="display:none;margin-top:8px;">' +
        '<img id="petPhotoImg" style="width:80px;height:80px;object-fit:cover;border-radius:50%;border:3px solid var(--primary);">' +
        '</div></div>' +
        '<div style="display:flex;gap:10px;">' +
        '<button id="savePetBtn" class="btn btn-primary">Save Pet</button>' +
        '<button id="cancelPetBtn" class="btn btn-outline">Cancel</button>' +
        '</div></div>' +

        (pets.length ? petCards
            : '<div style="text-align:center;padding:40px;color:#aaa;"><div style="font-size:3rem;margin-bottom:12px;">&#128062;</div><p>No pets added yet.<br>Add your first pet to get personalized recommendations!</p></div>') +
        '</div>';

    // Wire all event listeners (no inline onclick)
    el.querySelector('#addPetToggleBtn').addEventListener('click', function() { showAddPetForm(); });
    el.querySelector('#cancelPetBtn').addEventListener('click',    function() { document.getElementById('addPetForm').style.display = 'none'; });
    el.querySelector('#savePetBtn').addEventListener('click',      function() { savePet(); });
    el.querySelector('#petPhotoInput').addEventListener('change',  function() { previewPetPhoto(this); });

    el.querySelectorAll('.delete-pet-btn').forEach(function(btn) {
        btn.addEventListener('click', function() { deletePet(parseInt(btn.dataset.petIdx)); });
    });
}

function showAddPetForm() {
    var form = document.getElementById('addPetForm');
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function previewPetPhoto(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('petPhotoImg').src = e.target.result;
        document.getElementById('petPhotoPreview').style.display = 'block';
        window._petPhotoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
}

function savePet() {
    var name    = document.getElementById('petNameInput')?.value.trim();
    var species = document.getElementById('petSpeciesInput')?.value;
    var breed   = document.getElementById('petBreedInput')?.value.trim();
    var age     = document.getElementById('petAgeInput')?.value.trim();
    if (!name)    { showToast("Please enter your pet's name.", 'error'); return; }
    if (!species) { showToast('Please select a species.', 'error'); return; }

    var user = getCurrentUser();
    if (!user) return;
    user.pets = user.pets || [];
    user.pets.push({ name, species, breed, age, photo: window._petPhotoBase64 || null, addedAt: new Date().toISOString() });
    saveCurrentUser(user);

    window._petPhotoBase64 = null;
    document.getElementById('petNameInput').value    = '';
    document.getElementById('petSpeciesInput').value = '';
    document.getElementById('petBreedInput').value   = '';
    document.getElementById('petAgeInput').value     = '';
    document.getElementById('petPhotoInput').value   = '';
    document.getElementById('petPhotoPreview').style.display = 'none';
    document.getElementById('addPetForm').style.display = 'none';

    showToast('Pet added! 🐾');
    renderPetProfiles(user);
}

function deletePet(index) {
    if (!confirm('Remove this pet from your profile?')) return;
    var user = getCurrentUser();
    if (!user) return;
    user.pets = (user.pets || []).filter(function(_, i) { return i !== index; });
    saveCurrentUser(user);
    showToast('Pet removed.');
    renderPetProfiles(user);
}

// ==========================================
// PRINT INVOICE
// ==========================================
function printInvoice(orderId) {
    const orders = JSON.parse(localStorage.getItem('petPrestigeOrders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) { showToast('Order not found.', 'error'); return; }

    const paymentLabels = { cod: 'Cash on Delivery', gcash: 'GCash', paymaya: 'PayMaya', bank: 'Bank Transfer' };
    const win = window.open('', '_blank', 'width=800,height=700');
    win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Invoice ${order.id} — Pet Prestige</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * { margin:0; padding:0; box-sizing:border-box; }
            body { font-family:'Poppins',sans-serif; color:#333; padding:40px; font-size:0.9rem; }
            .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; padding-bottom:20px; border-bottom:2px solid #FF6B35; }
            .brand { color:#FF6B35; font-size:1.5rem; font-weight:700; }
            .brand small { display:block; color:#888; font-size:0.75rem; font-weight:400; }
            .invoice-meta { text-align:right; }
            .invoice-meta h2 { font-size:1.8rem; color:#FF6B35; font-weight:700; }
            .invoice-meta p { color:#888; font-size:0.82rem; }
            .grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; }
            .box h4 { font-size:0.72rem; text-transform:uppercase; letter-spacing:0.5px; color:#aaa; margin-bottom:6px; }
            .box p { line-height:1.7; font-size:0.88rem; }
            .status { display:inline-block; padding:3px 12px; border-radius:20px; font-size:0.78rem; font-weight:600;
                background:${order.status === 'delivered' ? '#d5f5e3' : order.status === 'shipped' ? '#d6eaf8' : '#fdebd0'};
                color:${order.status === 'delivered' ? '#1e8449' : order.status === 'shipped' ? '#1a5276' : '#935116'}; }
            table { width:100%; border-collapse:collapse; margin-bottom:20px; }
            th { background:#f8f9fa; padding:10px 12px; text-align:left; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.3px; color:#888; }
            td { padding:12px; border-bottom:1px solid #eee; font-size:0.88rem; }
            .totals { max-width:280px; margin-left:auto; }
            .total-row { display:flex; justify-content:space-between; padding:6px 0; font-size:0.88rem; color:#555; }
            .total-row.grand { font-size:1.1rem; font-weight:700; color:#222; border-top:2px solid #eee; margin-top:6px; padding-top:10px; }
            .footer { margin-top:40px; padding-top:20px; border-top:1px solid #eee; text-align:center; color:#aaa; font-size:0.78rem; }
            @media print { body { padding:20px; } }
        </style>
    </head>
    <body>
        <div class="header">
            <div>
                <div class="brand">🐾 Pet Prestige<small>hello@petprestige.ph · +63 912 345 6789</small></div>
            </div>
            <div class="invoice-meta">
                <h2>INVOICE</h2>
                <p style="font-family:monospace;font-size:0.95rem;color:#FF6B35;font-weight:600;">${order.id}</p>
                <p>Date: ${new Date(order.date).toLocaleDateString('en-PH', {year:'numeric',month:'long',day:'numeric'})}</p>
                <p style="margin-top:4px;"><span class="status">${order.status.toUpperCase()}</span></p>
            </div>
        </div>

        <div class="grid">
            <div class="box">
                <h4>Bill To</h4>
                <p><strong>${order.shippingInfo?.firstName || ''} ${order.shippingInfo?.lastName || ''}</strong><br>
                ${order.shippingInfo?.address || ''}<br>
                ${order.shippingInfo?.city || ''}, ${order.shippingInfo?.province || ''} ${order.shippingInfo?.postal || ''}<br>
                ${order.shippingInfo?.phone || ''}<br>
                ${order.shippingInfo?.email || ''}</p>
            </div>
            <div class="box">
                <h4>Payment Method</h4>
                <p>${paymentLabels[order.paymentInfo?.method] || order.paymentInfo?.method || 'COD'}</p>
                <h4 style="margin-top:12px;">Order Status</h4>
                <p><span class="status">${order.status.toUpperCase()}</span></p>
            </div>
        </div>

        <table>
            <thead>
                <tr><th>Product</th><th style="text-align:center;">Qty</th><th style="text-align:right;">Unit Price</th><th style="text-align:right;">Total</th></tr>
            </thead>
            <tbody>
                ${(order.items || []).map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td style="text-align:center;">${item.quantity}</td>
                    <td style="text-align:right;">₱${item.price.toLocaleString()}</td>
                    <td style="text-align:right;">₱${(item.price * item.quantity).toLocaleString()}</td>
                </tr>`).join('')}
            </tbody>
        </table>

        <div class="totals">
            <div class="total-row"><span>Subtotal</span><span>₱${(order.subtotal || 0).toLocaleString()}</span></div>
            <div class="total-row"><span>Shipping</span><span>${(order.shippingCost || 0) === 0 ? 'FREE' : '₱' + order.shippingCost.toLocaleString()}</span></div>
            ${order.discount ? `<div class="total-row"><span>Discount</span><span style="color:#27ae60;">-₱${order.discount.toLocaleString()}</span></div>` : ''}
            <div class="total-row grand"><span>Total</span><span>₱${(order.total || 0).toLocaleString()}</span></div>
        </div>

        <div class="footer">
            <p>Thank you for shopping at Pet Prestige! 🐾</p>
            <p>For inquiries: hello@petprestige.ph · +63 912 345 6789 · Manila, Philippines</p>
            <p style="margin-top:8px;">This is a computer-generated invoice and does not require a signature.</p>
        </div>
        <script>window.onload = function() { window.print(); }<\/script>
    </body>
    </html>`);
    win.document.close();
}

// ==========================================
// NEWSLETTER
// ==========================================
function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) { showToast('Please enter a valid email.', 'error'); return false; }
    const subscribers = JSON.parse(localStorage.getItem('petPrestigeNewsletterSubscribers') || '[]');
    if (subscribers.find(e => e.toLowerCase() === email.toLowerCase())) {
        showToast('You\'re already subscribed! 🐾');
        return false;
    }
    subscribers.push(email.toLowerCase());
    localStorage.setItem('petPrestigeNewsletterSubscribers', JSON.stringify(subscribers));
    showToast('🐾 You\'ve been subscribed! Thank you.');
    return true;
}

// ==========================================
// SHARE PRODUCT
// ==========================================
function shareProduct(productId, productName) {
    const url = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '/')  }product-detail.html?id=${productId}`;
    if (navigator.share) {
        navigator.share({ title: productName + ' — Pet Prestige', text: `Check out ${productName} on Pet Prestige!`, url })
            .catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(url) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => showToast('🔗 Link copied to clipboard!'));
    } else {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('🔗 Link copied to clipboard!');
    }
}

// ==========================================
// CLEAR WISHLIST (for wishlist.html)
// ==========================================
// clearWishlist is defined in wishlist.html as a page-level function
// but expose saveWishlist for it
window.saveWishlist = saveWishlist;

// ==========================================
// WINDOW EXPORTS (new functions)
// ==========================================
let wishlist = JSON.parse(localStorage.getItem('petPrestigeWishlist') || '[]');

function saveWishlist() {
    localStorage.setItem('petPrestigeWishlist', JSON.stringify(wishlist));
}

function addToWishlist(id) {
    if (!requireLogin('Please log in to save items to your wishlist.')) return;
    const allProducts = [...DB.products, ...JSON.parse(localStorage.getItem('petPrestigeCustomProducts') || '[]')];
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    if (wishlist.find(i => i.id === id)) {
        showToast('Already in your wishlist!', 'error');
        return;
    }
    wishlist.push({ id, name: product.name, price: product.price, image: product.image, category: product.category });
    saveWishlist();
    updateWishlistCount();
    showToast(`❤️ ${product.name} added to wishlist!`);
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(i => i.id !== id);
    saveWishlist();
    updateWishlistCount();
    if (document.getElementById('wishlistGrid')) renderWishlist();
}

function isInWishlist(id) {
    return !!wishlist.find(i => i.id === id);
}

function toggleWishlist(id) {
    if (isInWishlist(id)) {
        removeFromWishlist(id);
        showToast('Removed from wishlist.');
    } else {
        addToWishlist(id);
    }
}

function updateWishlistCount() {
    document.querySelectorAll('.wishlist-count').forEach(el => el.textContent = wishlist.length);
}

function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    if (!grid) return;
    grid.innerHTML = wishlist.length
        ? wishlist.map(item => `
            <div class="product-card">
                <a href="product-detail.html?id=${item.id}">
                    <img class="product-image" src="${item.image}" alt="${item.name}"
                         onerror="this.src='https://via.placeholder.com/300x300/FF6B35/fff?text=Product'">
                </a>
                <div class="product-info">
                    <div class="product-category">${item.category}</div>
                    <a class="product-name" href="product-detail.html?id=${item.id}">${item.name}</a>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(item.price)}</span>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:10px;">
                        <button class="add-to-cart" onclick="addToCart(${item.id})" style="flex:1;">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button onclick="removeFromWishlist(${item.id})" style="padding:10px 14px;background:none;border:1.5px solid #eee;border-radius:8px;cursor:pointer;color:#e74c3c;" title="Remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>`).join('')
        : '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;"><i class="far fa-heart" style="font-size:3rem;margin-bottom:16px;display:block;"></i><p>Your wishlist is empty.</p><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>';
}

// ==========================================
// Expose to window for inline onclick handlers
window.addToCart           = addToCart;
window.buyNow              = buyNow;
window.removeFromCart      = removeFromCart;
window.updateQuantity      = updateQuantity;
window.setQuantity         = setQuantity;
window.applyVoucher        = applyVoucher;
window.proceedToCheckout   = proceedToCheckout;
window.goToPayment         = goToPayment;
window.backToShipping      = backToShipping;
window.reviewOrder         = reviewOrder;
window.backToPayment       = backToPayment;
window.placeOrder          = placeOrder;
window.performSearch       = performSearch;
window.selectCategory      = selectCategory;
window.selectSubcategory   = selectSubcategory;
window.filterProducts      = filterProducts;
window.filterGuides        = filterGuides;
window.searchGuides        = searchGuides;
window.toggleMobileMenu    = toggleMobileMenu;
window.closeLoginOverlay   = closeLoginOverlay;
window.logout              = logout;
window.changeDetailQty     = changeDetailQty;
window.submitReview        = submitReview;
window.saveProfileSettings = saveProfileSettings;
window.changePassword      = changePassword;
window.showAddAddressForm  = showAddAddressForm;
window.saveAddress         = saveAddress;
window.deleteAddress       = deleteAddress;
window.isLoggedIn          = isLoggedIn;
window.getCurrentUser      = getCurrentUser;

window.loadCommunityPosts    = loadCommunityPosts;
window.togglePostMenu        = togglePostMenu;
window.likePost              = likePost;
window.togglePostComments    = togglePostComments;
window.addComment            = addComment;
window.replyToComment        = replyToComment;
window.submitReplyComment    = submitReplyComment;
window.editComment           = editComment;
window.saveEditComment       = saveEditComment;
window.deleteComment         = deleteComment;
window.deletePost            = deletePost;
window.startEditPost         = startEditPost;
window.saveEditPost          = saveEditPost;
window.sharePost             = sharePost;
window.showPostModal         = showPostModal;
window.closePostModal        = closePostModal;
window.submitPost            = submitPost;
window.loadLostFound         = loadLostFound;
window.filterLF              = filterLF;
window.searchLF              = searchLF;
window.toggleLFComments      = toggleLFComments;
window.addLFComment          = addLFComment;
window.showReportModal       = showReportModal;
window.closeReportModal      = closeReportModal;
window.submitReport          = submitReport;
window.previewReportImage    = previewReportImage;
window.loadGuideDetail       = loadGuideDetail;
window.initSampleData        = initSampleData;

// Wishlist
window.addToWishlist       = addToWishlist;
window.removeFromWishlist  = removeFromWishlist;
window.toggleWishlist      = toggleWishlist;
window.isInWishlist        = isInWishlist;
window.renderWishlist      = renderWishlist;
window.updateWishlistCount = updateWishlistCount;

// Recently Viewed
window.trackRecentlyViewed = trackRecentlyViewed;
window.loadRecentlyViewed  = loadRecentlyViewed;

// Lost & Found
window.markReunited        = markReunited;

// Reviews
window.renderMyReviews     = renderMyReviews;
window.deleteMyReview      = deleteMyReview;

// Invoice
window.printInvoice        = printInvoice;

// Newsletter & Share
window.subscribeNewsletter = subscribeNewsletter;
window.shareProduct        = shareProduct;

// Chat
window.openSupportChat     = openSupportChat;
window.closeSupportChat    = closeSupportChat;
window.sendChatMessage     = sendChatMessage;
window.handleChatKeyPress  = handleChatKeyPress;

// ==========================================
// ORDER NOTIFICATIONS
// ==========================================
function getNotificationsForUser() {
    const user = getCurrentUser();
    if (!user) return [];
    const all = JSON.parse(localStorage.getItem('petPrestigeNotifications') || '[]');
    return all.filter(n => n.email === user.email);
}

function getUnreadNotificationCount() {
    return getNotificationsForUser().filter(n => !n.read).length;
}

function markNotificationsRead(ids) {
    const all = JSON.parse(localStorage.getItem('petPrestigeNotifications') || '[]');
    all.forEach(n => { if (!ids || ids.includes(n.id)) n.read = true; });
    localStorage.setItem('petPrestigeNotifications', JSON.stringify(all));
}

function renderNotificationBell() {
    const bellWrap = document.getElementById('notificationBell');
    if (!bellWrap) return;
    const count = getUnreadNotificationCount();
    bellWrap.innerHTML = `
        <button onclick="toggleNotificationPanel()" title="Notifications" style="position:relative;background:none;border:none;cursor:pointer;font-size:1.2rem;color:#555;padding:4px 8px;">
            <i class="fas fa-bell"></i>
            ${count > 0 ? `<span style="position:absolute;top:-2px;right:-2px;background:#e74c3c;color:white;font-size:0.65rem;font-weight:700;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;">${count}</span>` : ''}
        </button>`;
}

function toggleNotificationPanel() {
    let panel = document.getElementById('notificationPanel');
    if (panel) { panel.remove(); return; }

    const notifications = getNotificationsForUser();
    markNotificationsRead(notifications.map(n => n.id));
    renderNotificationBell(); // clear badge

    panel = document.createElement('div');
    panel.id = 'notificationPanel';
    panel.style.cssText = 'position:fixed;top:70px;right:20px;width:340px;max-height:420px;overflow-y:auto;background:white;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:9999;border:1.5px solid #eee;';
    panel.innerHTML = `
        <div style="padding:14px 16px;border-bottom:1px solid #eee;font-weight:700;font-size:0.92rem;display:flex;justify-content:space-between;align-items:center;">
            <span>🔔 Notifications</span>
            <button onclick="document.getElementById('notificationPanel').remove()" style="background:none;border:none;cursor:pointer;font-size:1rem;color:#aaa;">×</button>
        </div>
        ${notifications.length ? notifications.map(n => `
            <div style="padding:14px 16px;border-bottom:1px solid #f0f0f0;">
                <div style="font-size:1.2rem;margin-bottom:4px;">${n.emoji}</div>
                <div style="font-weight:600;font-size:0.9rem;color:#222;margin-bottom:4px;">${n.title}</div>
                <div style="font-size:0.83rem;color:#666;margin-bottom:6px;line-height:1.5;">${n.body}</div>
                <a href="order-success.html?order=${n.orderId}" style="font-size:0.8rem;color:var(--primary);font-weight:600;">View Order →</a>
                <div style="font-size:0.75rem;color:#bbb;margin-top:4px;">${new Date(n.createdAt).toLocaleString('en-PH',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
            </div>`).join('')
        : '<p style="text-align:center;padding:30px;color:#aaa;font-size:0.9rem;">No notifications yet.</p>'}`;

    document.body.appendChild(panel);

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('#notificationBell')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

window.applySavedAddress       = typeof applySavedAddress !== 'undefined' ? applySavedAddress : function(){};
window.fillAddressFields       = typeof fillAddressFields !== 'undefined' ? fillAddressFields : function(){};
window.renderNotificationBell  = renderNotificationBell;
window.toggleNotificationPanel = toggleNotificationPanel;
window.cancelOrder             = cancelOrder;
window.openReviewPrompt        = openReviewPrompt;
window.startItemReview         = startItemReview;
window.setQuickRating          = setQuickRating;
window.submitQuickReview       = submitQuickReview;
window.getLoyaltyPoints        = getLoyaltyPoints;
window.addLoyaltyPoints        = addLoyaltyPoints;
window.redeemLoyaltyPoints     = redeemLoyaltyPoints;
window.getLoyaltyDiscount      = getLoyaltyDiscount;
window.getLoyaltyRedeemDiscount = getLoyaltyRedeemDiscount;
window.renderPetProfiles       = renderPetProfiles;
window.showAddPetForm          = showAddPetForm;
window.savePet                 = savePet;
window.deletePet               = deletePet;
window.previewPetPhoto         = previewPetPhoto;
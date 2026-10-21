const roastNameGroups: Record<string, string[]> = {
  'North Indian': [
    'The Ghee & Butter Pipeline', 'Heart Attack by Butter Chicken', 'The Ghee-Soaked Guilt Trip', 'The Arterial Clog Curry House', 'Swimming in Dal Makhani Cream', 'The Heavy Gravy Detention Centre', 'Liquid Lard & Murgh Makhani', 'Butter Chicken Blood Clot Co.', 'The Tandoori Grease Fountain', 'Arteries Clogged by Korma', 'The Great Malai Escape',
    'The Carb Heavyweights', 'Chole Bhature: The Afternoon Coma', 'Naan-Stop Expansion', 'The Bhatura Bloat Ward', 'Garlic Naan Gluten Trap', 'The Kulcha Carb Clinic', 'Stuffed Paratha Suffocation', 'The Laccha Parotta Spiral of Doom', 'Endless Bhatura Binge Station', 'The Carb-Loaded Tandoor', 'Naan-Stop Carb Expansion',
    'Mughlai & Meat Comas', 'The Awadhi Fat Fest', 'Rogan Josh Resuscitation Room', 'Mughlai Meat Monstrosity', 'The Mutton Rara Regret', 'Seekh Kebab Suffocation', 'Galouti Melt-in-Your-Veins', 'The Shahi Tukda Insulin Spike', 'Nihari Nutrient Void', 'The Brain Curry Burnout',
    'Veggie Delusions', 'Paneer Tikka Fat Trap', 'The Malai Koeta Calorie Bomb', 'Kadhai Paneer Coronary', 'The Fake Diet Veg Platter', 'Creamy Chaap Disgrace', 'Shahi Paneer Sugar Trap', 'The Alooo-Dumd Carb Pit', 'Veg Jalfrezi Oil Slick', 'The Paneer Butter Masala Crisis', 'Methi Malai Matar Madness',
  ],
  'South Indian': [
    '100% Fermented Regret', 'Drowned in Sambar & Shame', 'The Carb-Loading Conveyor Belt', 'Ghee Roast Diabetes', 'The Infinite Idli Engine', 'Butter Dosa Heartburn Hub', 'The Rava Masala Weight Spike', 'Uttapam Carb Bricks', 'The Mysore Masala Meltdown', 'Set Dosa Suffocation',
    'Podi Palpitations', 'Gunpowder Gastro Disaster', 'The Spicy Chutney Ulcer', 'Podi Ghee Roast Regrets', 'The Fiery Gunpowder Gasket', 'Spicy Andhra Sweat Lodge', 'The Kara Dosa Crisis', 'The Chili-Infused Menu Meltdown', 'Guntur Chili Gastro Ward', 'The Spicy Sambar Scourge',
    'Coconut Milk Calorie Bomb', 'Malabar Parotta Cardiac Arrest', 'Deep-Fried Meen Varuval', 'Kerala Beef Fry Blood Pressure Spike', 'The Coastal Oil Slick', 'Coconut Oil Overdraft', 'The Karimeen Pollichathu Fat Trap', 'Appam & Mutton Stew Suffocation', 'Kozhi Curry Coronary', 'The Chemmeen Fry Heart Attack',
    'The Sambar Rice Sleep Inducer', 'Curd Rice Carb Load', 'Bisi Bele Bhath Bloat Station', 'The Lemon Rice Carb Trap', 'Poha Oil Spill', 'Upma-Induced Lethargy', 'Medu Vada Grease Wheel', 'The Deep-Fried Bonda Binge', 'Parotta-Induced Constipation', 'The Ultimate Tiffin Trap',
  ],
  'Hyderabadi': [
    'Biryani Binge Headquarters', 'Kilo-Biryani Intake Department', 'The Midnight Rice Binge', 'Dum Biryani Internal Destruction', 'The Meat Coma Ward', 'The Basmati Rice Avalanche', 'Chicken Dum Biryani Self-Sabotage', 'The 5-Pound Biryani Trough', 'Mutton Biryani Arterial Clog', 'The Endless Biryani Pit', 'Rice, Spice & Total Vice',
    'Haleem & Fat Liquefaction', 'Haleem: Liquid Fat & Regret', 'The Pure Ghee Haleem Hazard', 'Melted Mutton Monstrosity', 'The Haleem Heart Stop', 'Liquid Meat Mud Pit', 'The High-Calorie Sludge', 'Mutton Fry Blood Pressure Spike', 'Tala Hua Gosht Trauma', 'The Fried Mutton Grease Trap', 'Hyderabadi Haleem Havoc',
    'Mirchi Ka Salan Stomach Burn', 'The Fiery Salan Ulcer', 'Double Ka Meetha Diabetic Shock', 'Khubani Ka Meetha Sugar Trap', 'The Insulin Spike Shahi Tukda', 'Qubani Sugar Overload', 'The Sweet Salan Sabotage', 'Pathar Ka Gosht Gastro Crisis', 'The Spicy Boti Burnout', 'Hyderabadi Heartburn Headquarters',
  ],
  'Bengali': [
    'Drowning in Mustard Oil', 'Luchi-Induced Lethargy', 'Deep-Fried Fish Fat', 'The Prawn Malaikari Calorie Bomb', 'Shorshe Ilish Ulcer Station', 'The Kosha Mangsho Fat Slick', 'Mustard Oil Meltdown', 'The Greasy Chingri Chop', 'Fish Fry Arterial Damage', 'Bhetki Butter Fry Disgrace',
    'The Mishti Doi Diabetic Shock', 'The Sugar-Water Abyss', 'Rosogolla Insulin Explosion', 'Sandesh Sugar Rush HQ', 'Alur Dom Carb Loading', 'The Cholar Dal Sugar Trap', 'Radhaballabhi Greasy Tiffin', 'The Kolkata Kathi Roll Heartburn', 'Mutton Chop Gastric Bypass', 'The Sweet-Syrup Deep Dive',
  ],
  'Gujarati': [
    'Diabetes in a Dhokla Box', 'The Farsan Fat Factory', 'Thepla-Wrapped Disappointments', 'Deep-Fried Fafda Addiction', 'Sugar-Coated Kadhi Crisis', 'Khandvi Calorie Trap', 'The Khaman Oil Slick', 'Jalebi-Fafda Heart Attack', 'The Muthia Mud Pit', 'Patra Pure Grease',
    'The Infinite Carb Thali', 'Shrikhand Sugar Overdose', 'The Undhiyu Oil Fountain', 'Puri-Induced Palpitations', 'The Bottomless Gujarati Thali Trap', 'Aloo Rasila Sugar Rush', 'The Khichdi Ghee Drown', 'Rotli Lard Layer', 'The Dal Dhokli Carb Pit', 'Mohanthal Insulin Spike',
  ],
  'Chettinad': [
    'The Peppercorn Ulcer', 'Spicy Tears & Acid Reflux', 'The Flamin’ Ghee Inferno', 'Sweating Bullets Kitchen', 'Chettinad Chicken Chilli Convoy', 'The Fiery Fennel Foundation', 'Black Pepper Heartburn Hub', 'The Spicy Mutton Varuval Crisis', 'Red Chili Regret', 'The Ultimate Tongue Burn',
    'Ghee Roast Parotta Pit', 'Kozhi Kuzhambu Cardiac Arrest', 'The Greasy Egg Massala', 'Meen Kuzhambu Acid Wash', 'The Spicy Crab Roast Trauma', 'Nandu Fry Heart Attack', 'The Oily Veg Kurma', 'Parotta Suffocation Station', 'The Chettinad Oil Refinery', 'Spicy Salna Suffocation',
  ],
  'Indian Street Food': [
    'Golgappa Gastric Bypass', 'Samosa Oil Spill', 'Aloo Tikki Arterial Damage', 'Papdi Chaat Calorie Bomb', 'The Kachori Heartburn Hub', 'Dahi Bhalla Sugar & Fat Pit', 'Sev Puri Sodium Overdose', 'The Raj Kachori Monstrosity', 'Chole Bhature Sidewalk Coma', 'Pav Bhaji Butter Meltdown',
    'Vada Pav Carb Explosion', 'Misal Pav Stomach Destroyer', 'The Deep-Fried Bread Pakoda', 'Keema Pav Cholesterol Spike', 'Dabeli Sugar & Carb Trap', 'The Butter-Drowned Tawa Pulav', 'Fried Momos Oil Reservoir', 'The Ram Ladoo Grease Trap', 'Chole Kulche Acid Reflux', 'Egg Roll Heartburn Express',
    'Cheese Maggi Sodium Bath', 'The Tandoori Momos Mayo Trap', 'Chilli Potatoes Calorie Fest', 'The Paneer Patty Carb Load', 'Greasy Chowmein Station', 'The Aloo Paratha Butter Lake', 'Bun Maska Heart Attack', 'The Fried Samosa Sanctuary', 'Bhel Puri Sodium Spike', 'Pakoda Oil Refinery', 'Bhajji Blood Pressure Boom', 'Mirchi Bajji Heartburn',
    'The Paneer Pakoda Fat Block', 'Onion Bhaji Cholesterol Castle', 'The Aloo Bonda Binge', 'Fried Cassava Calorie Trap', 'The Crispy Corn Cornucopia', 'Gobi Manchurian Oil Bath', 'The Sweet Potato Sugar Pit', 'Fried Egg Bonda Blunder', 'The Spring Roll Oil Slick', 'Cheese Corn Ball Crisis', 'The Samosa Chaat Swamp', 'Katori Chaat Calorie Cage', 'The Basket Chaat Burden', 'Chana Chaat Sodium Shocker', 'The Peanut Masala Fat Fest', 'Fried Papad Cholesterol Hub', 'The Ultimate Street Grease Trough',
  ],
  'Japanese': [
    'Sodium Poisoning Ramen Co.', 'The MSG Overdose', 'Tonkotsu Pork Fat Infusion', 'The Shoyu Sodium Bath', 'Miso Blood Pressure Spike', 'The Bottomless MSG Bowl', 'Spicy Miso Stomach Burn', 'The Ramen Broth Blood Clot', 'Instant Heart Attack Ramen', 'The Black Garlic Oil Slick',
    'Raw Fish & Pure Desperation', 'Katsu Curry Coronary', 'Tempura Deep-Fried Disgrace', 'Mayo-Drenched Sushi Rolls', 'The Cream Cheese Maki Trap', 'Fried Rice Carbon Overload', 'Donburi Carb Avalanche', 'The Chicken Katsu Calorie Bomb', 'Ebi Fry Oil Sponge', 'The Takoyaki Carb Balls',
    'Yakitori Skin & Fat Skewers', 'Gyoza Oil Pan', 'The Agedashi Tofu Greasy Soak', 'Okonomiyaki Carb Cake', 'Mayo & Teriyaki Suffocation', 'The Matcha Sugar Rush', 'Mochi Rice Carb Clump', 'The Dorayaki Insulin Spike', 'Japanese Cheesecake Calorie Cage', 'The Sweet Taiyaki Trap',
  ],
  'Korean': [
    'Gochujang Ulcer Station', 'Tteokbokki Carb Explosion', 'Mukbang Main Event', 'The Spicy Jjigae Acid Wash', 'Buldak Fire Noodles Chilli Convoy', 'The Tteokbokki Cheese Swamp', 'Spicy Kimchi Stomach Shredder', 'The Army Base Stew Sodium Bomb', 'Sundubu Heartburn Hub', 'The Spicy Pork Fire Pit',
    'The Fried Chicken Fat Trap', 'Bulgogi Blood Pressure Spike', 'Samgyeopsal Pure Pork Fat Grill', 'Yangnyeom Sugar & Oil Slick', 'The Cheesy Fried Chicken Coronary', 'Honey Butter Calorie Catastrophe', 'Galbi Cholesterol Spike', 'The K-BBQ Grease Trench', 'Pork Belly Suffocation', 'The Crunchy Wing Calorie Fest',
    'Kimchi Fried Rice Carbon Load', 'Jjajangmyeon Black Bean Sludge', 'Gimbap Carb Logs', 'Japchae Oil Slick Noodles', 'The Corn Dog Sugar & Cheese Trap', 'Hotteok Brown Sugar Bomb', 'The Bingsu Sweet Avalanche', 'Egg Drop Butter Toast', 'The Rice Cake Carb Clog', 'Twisted Donut Grease Ring',
  ],
  'Chinese': [
    'Ajinomoto Apocalypse', 'Schezwan-Stained Self-Esteem', 'Greasy Hakka Noodle Chokehold', 'Manchurian Mayhem & Bloating', 'Chilli Chicken Oil Reservoir', 'Fried Rice Carbon Avalanche', 'Chow Mein Cholesterol Castle', 'The Sweet & Sour Sugar Trap', 'Kung Pao Sodium Overload', 'Mapo Tofu Oil Slick',
    'The Dim Sum Abyss', 'Deep-Fried Spring Roll Oil Sponge', 'Wonton Greasy Dipping Pit', 'The Pork Bao Carb Pillow', 'Fried Dumpling Dough Clog', 'Scallion Pancake Fat Sheet', 'The Sesame Ball Sugar Trap', 'Crispy Wonton Sodium Shock', 'The Siu Mai Cholesterol Bomb', 'Prawn Toast Grease Soak',
    'Peking Duck Pure Fat Skin', 'The Hot Pot Oil Bath', 'Beef Broccoli Sodium Boom', 'General Tso’s Calorie Citadel', 'Orange Chicken Sugar Glaze', 'The Lo Mein Carb Trap', 'Szechuan Beef Stomach Shredder', 'The Dan Dan Noodle Paste Pit', 'Crispy Duck Fat Flood', 'The Ultimate Wok Grease Trough',
  ],
  'Thai': [
    'Pad Thai Bloat Station', 'Coconut Milk Calories', 'Tom Yum Trauma', 'The Sticky Rice Trap', 'Sweet-and-Spicy Sabotage', 'Massaman Curry Fat Vault', 'Green Curry Calorie Swamp', 'Pad See Ew Wok Grease Noodles', 'Red Curry Arterial Block', 'The Pineapple Fried Rice Carb Mountain',
    'Thai Spring Roll Oil Well', 'Peanut Sauce Calorie Cascade', 'Chicken Satay Skin Skewers', 'Tod Mun Pla Deep Fried Disgrace', 'Crispy Pork Belly Gastro Crisis', 'Basil Chicken Chili Inferno', 'The Papaya Salad Stomach Shredder', 'Yellow Curry Liquid Lard', 'The Crab Omelette Grease Sheet', 'Fried Fish Cake Fat Trap',
  ],
  'Italian': [
    'Gluten-Heavy Carb Avalanche', 'The Cheese Wheel Cardiac Arrest', 'Carb-Loading Capital of Crime', 'Alfredo: Pure Heavy Cream & Denial', 'Pizza Meltdown Room', 'Four-Cheese Arterial Block', 'Lasagna Layered Disgrace', 'The Carbonara Pork Fat Tub', 'Macaroni Molten Cheese Trap', 'Deep-Dish Dough Prison',
    'The Bottomless Alfredo Pit', 'Gnocchi Potato Carb Bricks', 'Ravioli Cream Suffocation', 'Pesto Oil Overdraft', 'Spaghetti Bolognese Bloat', 'Garlic Bread Butter Soaker', 'Risotto Rice Paste Pit', 'The Truffle Cream Calorie Bomb', 'Penne Alla Vodka Liver Damage', 'Seafood Marinara Sodium Bath',
    'Arancini Deep Fried Carb Balls', 'Calzone Dough Fortress', 'The Mozzarella Stick Grease Fountain', 'Tiramisu Sugar & Mascarpone Meltdown', 'Panna Cotta Cream Castle', 'Cannoli Sweet Fat Tubes', 'Gelato Insulin Explosion', 'The Nutella Pizza Disaster', 'Profiterole Sugar Overload', 'Italian Sausage Cholesterol Spike',
  ],
  'Mexican': [
    'Heartburn & Heavy Burritos', 'The 2-Pound Trough of Nachos', 'Guacamole Overdraft', 'Quesadilla Queso Crisis', 'Taco Bell Tolls for Thee', 'The Chimichanga Deep-Fried Disaster', 'Cheesy Enchilada Calorie Swamp', 'The Burrito Bowl Carb Mountain', 'Al Pastor Pork Fat Tacos', 'Loaded Nachos Sodium Explosion',
    'The Queso Dip Molten Volcano', 'Carnitas Lard Cooked Crisis', 'Chorizo Blood Pressure Spike', 'Flauta Deep Fried Oil Sticks', 'Taquito Grease Traps', 'The Tostada Carb Disc', 'Barbacoa Oil Drip', 'The Sour Cream Suffocation', 'Refried Beans Lard Paste', 'The Taco Salad Calorie Illusion',
    'Mole Poblano Calorie Trap', 'Chili Relleno Fried Cheese Bomb', 'The Spicy Salsa Stomach Shredder', 'Churro Sugar & Grease Sticks', 'Tres Leches Soaked Sugar Bomb', 'Flan Sweet Syrup Pit', 'The Sopapilla Fried Sugar Sheet', 'Jalapeño Popper Cheese Hazard', 'The Tamale Carb Brick', 'Mexican Fried Ice Cream Fraud',
  ],
  'Desserts': [
    'The Insulin Spike Crematorium', 'Midnight Sugar Rush Patisserie', 'The Cavity Catalyst', 'Lava Cake Meltdown Ward', 'Deep-Fried Brownie Coronary', 'Cheesecake Calorie Citadel', 'Red Velvet Sugar Shock', 'The Fudge Cake Chocolate Sludge', 'Carrot Cake Cream Cheese Scam', 'Opera Cake Layered Hyperactivity',
    'The Waffle Sugar Swamp', 'Glazed Donut Calorie Ring', 'Pancake Syrup Suffocation', 'The Waffle Ice Cream Mountain', 'Churro Chocolate Drown', 'Deep-Fried Oreos Disgrace', 'Eclair Cream Suffocation', 'Macaron Sugar Rush HQ', 'Apple Pie Crust & Sugar Trap', 'The Cinnamon Roll Butter Glaze',
    'Brownie Sundae Sugar Overlord', 'Cookie Dough Diabetic Shock', 'The Banana Split Sugar Trough', 'Profiterole Cream Flood', 'Crepe Nutella Overload', 'Baklava Honey & Butter Soak', 'Sticky Toffee Pudding Trap', 'The Pavlova Sugar Cloud', 'Bread & Butter Pudding Fat Bomb', 'The Ultimate Sugar Coma Hub',
  ],
  'American & Cafe': [
    'The Triple Bypass Burger Joint', 'Deep-Fried Disgrace Burgers', 'The Bacon-Grease Basement', 'Melted Cheese Suffocation Burgers', 'The 1000-Calorie Slider Trap', 'Heart Attack Hamburger Hub', 'The Crispy Patty Cholesterol Spike', 'Mayo-Drenched Bun Destruction', 'The Pulled Pork Fat Loader', 'Monster Burger Monstrosity',
    'French Fry Oil Refinery', 'Loaded Cheese Fries Heart Attack', 'Peri-Peri Sodium Shocker', 'Sweet Potato Fry Calorie Illusion', 'The Onion Ring Grease Wheel', 'Potato Wedges Carb Bricks', 'Waffle Fries Oil Sponge', 'Tater Tots Cholesterol Bombs', 'The Bacon Fries Lard Pit', 'Truffle Fries Fake Luxury Trap',
    'The Deep-Fried Wing Cult', 'Buffalo Sauce Acid Reflux', 'The 20-Piece Binge Bucket', 'Crispy Chicken Skin Synapses', 'The Honey-Mustard Mayo Drown', 'Fried Chicken Tender Trauma', 'The Garlic Parmesan Oil Slick', 'Popcorn Chicken Calorie Pellets', 'The Nashville Hot Chicken Ulcer', 'Boneless Wing Batter Clog',
    'Pepperoni Pizza Oil Slick', 'The Stuffed-Crust Dough Dungeon', 'Meat Lovers Heart Attack', 'The Cheese Burst Calorie Vault', 'BBQ Chicken Sugar Glaze Pizza', 'The Garlic Knot Butter Sponge', 'Mozzarella Stick Molten Trap', 'Jalapeño Popper Heartburn Hub', 'The Chicken Popper Sodium Bomb', 'Deep Dish Arterial Destruction',
    'The Grilled Cheese Butter Soaker', 'Philly Cheesesteak Calorie Clot', 'Club Sandwich Mayo Fortress', 'The Panini Carb Press', 'Bacon Lettuce Tomato Fat Trap', 'The Sub Sandwich Carb Footlong', 'Quesadilla Cheese Congestion', 'Chicken Wrap Mayo Delivery System', 'The Sloppy Joe Mud Slide', 'Roast Beef Cholesterol Boom',
    'The 1200-Calorie Freakshake', 'Whipped Cream Suffocation', 'The Caramel Frappé Sugar Shower', 'Oreo Shake Diabetes Drive', 'Hot Chocolate Molten Mud Pit', 'The Bubble Tea Sugar Tap', 'Cold Coffee Condensation Calorie', 'The Mocha Syrup Submersion', 'Mango Shake Insulin Surge', 'Peanut Butter Shake Fat Vault',
    'Pancake Syrup Suffocation', 'The Loaded Waffle Weight Spike', 'French Toast Butter Bath', 'Bacon & Egg Cholesterol Engine', 'Hash Brown Grease Square', 'The Cinnamon Roll Sugar Wheel', 'Croissant Pure Butter Layers', 'The Muffin Calorie Clump', 'Blueberry Pancake Sugar Trap', 'Sausage McMuffin Heart Stop', 'Egg Benedict Hollandaise Fat Flood', 'The Breakfast Burrito Brick', 'Waffle Chicken Calorie Collision', 'The Bagel Cream Cheese Brick', 'French Toast Nutella Nightmare', 'English Breakfast Arterial Sweep', 'The Choco-Chip Pancake Pit', 'Maple Syrup Drowning Chamber', 'The Croissant Sandwich Grease Trap',
  ],
}

const cuisineRoasts: Record<string, string> = {
  'North Indian': 'The cream is doing all the heavy lifting, and it still asked for backup.',
  'South Indian': 'The dosa has more layers than the excuse for ordering it.',
  Hyderabadi: 'The biryani pot has been sealed long enough to file for overtime.',
  Bengali: 'The mustard oil has entered the chat, and the pan has stopped asking questions.',
  Gujarati: 'Sweet, salty, fried, and somehow still billed as a light snack.',
  Chettinad: 'The pepper is sweating and it has not even seen the menu.',
  'Indian Street Food': 'The street-food cart saw this order and applied for an event permit.',
  Japanese: 'That roll has more plot twists than a seven-season drama.',
  Korean: 'The gochujang just asked to be listed as a co-signer.',
  Chinese: 'The wok has reached its final form: a very expensive smoke alarm.',
  Thai: 'The coconut milk has turned this curry into a full-time commitment.',
  Italian: 'The cheese is melting faster than this checkout plan.',
  Mexican: 'The salsa has filed to be the main character.',
  Desserts: 'The sugar content has asked to be acknowledged in the credits.',
  'American & Cafe': 'This menu is a drive-through in a trench coat.',
}

function replyForRoast(name: string, cuisine: string) {
  const normalized = name.toLowerCase()
  if (/(oil|grease|lard|fried|butter|ghee|cream|cheese)/.test(normalized)) return 'The kitchen floor just requested a non-slip upgrade.'
  if (/(sugar|sweet|dessert|chocolate|cake|syrup|insulin|jamun|jalebi)/.test(normalized)) return 'The sugar has requested its own seat and a post-credits scene.'
  if (/(carb|rice|naan|dosa|pasta|noodle|biryani|bread|burrito|nacho|taco)/.test(normalized)) return 'That carb convoy needs its own parade route.'
  if (/(spicy|spice|chili|chilli|pepper|fire|hot|gochujang|ulcer)/.test(normalized)) return 'The chilli has already written the kitchen’s incident report.'
  return cuisineRoasts[cuisine]
}

export type RoastSuggestion = { name: string; cuisine: string; reply: string }

export const roastSuggestions: RoastSuggestion[] = Object.entries(roastNameGroups).flatMap(([cuisine, names]) => names.map((name) => ({ name, cuisine, reply: replyForRoast(name, cuisine) })))

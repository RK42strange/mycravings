import { useEffect, useMemo, useRef, useState } from 'react'
import { roastSuggestions, type RoastSuggestion } from './roastSuggestions'
import './App.css'

type MenuItem = {
  id: string
  name: string
  restaurant: string
  cuisine: string
  price: number
  calories: number
  vegetarian: boolean
  description: string
  image: string
  localImage: string
  bestseller?: boolean
  fried?: boolean
  dessert?: boolean
}

type CartLine = { item: MenuItem; quantity: number }
type OrderReceipt = { id: string; lines: CartLine[]; total: number; calories: number }
type RoastCategory = 'heavyweight' | 'volume' | 'dessert' | 'fried'
type RoastLibrary = {
  checkout: Record<RoastCategory, string[]> & { total: string[] }
  searchReplies: Record<string, string[]>
  dishReplies: Record<string, string>
}
type ImageCredit = { file: string; title: string; creator: string; license: string; licenseUrl: string; source: string }
type ImageCredits = Record<string, ImageCredit>

const normalizeSearch = (value: string) => value.toLowerCase().replace(/panner/g, 'paneer').trim()
const dish = (id: string, name: string, restaurant: string, cuisine: string, price: number, calories: number, vegetarian: boolean, description: string, extras: Partial<MenuItem> = {}): MenuItem => ({ id, name, restaurant, cuisine, price, calories, vegetarian, description, image: '/images/dishes/photo-not-added.svg', localImage: `/images/dishes/${id}.jpg`, ...extras })

function searchPoolForDish(item: MenuItem) {
  const text = `${item.id} ${item.name}`.toLowerCase()
  if (/(oil|grease|fried|butter|ghee|cream|cheese|crispy|crisp)/.test(text)) return 'grease'
  if (/(sweet|dessert|chocolate|cake|syrup|jamun|jalebi|tiramisu|rasmalai)/.test(text)) return 'sugar'
  if (/(rice|naan|dosa|pasta|noodle|biryani|bread|burrito|nacho|taco|parotta|roti|kulcha)/.test(text)) return 'carb'
  if (/(spicy|spice|chili|chilli|pepper|fire|hot|gochujang|masala|sambar)/.test(text)) return 'spice'
  return 'general'
}

function selectUnusedRoast(poolId: string, lines: string[], used: string[]) {
  if (!lines.length) return { line: '', key: '' }
  const prefix = `${poolId}:`
  const usedIndexes = used.filter((entry) => entry.startsWith(prefix)).map((entry) => Number(entry.slice(prefix.length)))
  const lastUsedIndex = usedIndexes.at(-1)
  const available = lines.map((_, index) => index).filter((index) => !usedIndexes.includes(index) || (usedIndexes.length >= lines.length && index !== lastUsedIndex))
  const selectedIndex = available.length ? available[Math.floor(Math.random() * available.length)] : Math.floor(Math.random() * lines.length)
  return { line: lines[selectedIndex], key: `${prefix}${selectedIndex}` }
}

const menu: MenuItem[] = [
  dish('Butter-Chicken-and-Naan', 'Butter Chicken & Naan', 'Pepper & Hearth', 'North Indian', 460, 850, false, 'Slow-simmered tomato and cream curry, finished with fenugreek and soft tandoor naan.', { bestseller: true }),
  dish('Smoky-Paneer-Tikka', 'Smoky Paneer Tikka', 'Pepper & Hearth', 'North Indian', 320, 420, true, 'Charred paneer with a lively spice crust, mint chutney and a squeeze of lime.'),
  dish('Garlic-Butter-Naan', 'Garlic Butter Naan', 'Pepper & Hearth', 'North Indian', 110, 310, true, 'Soft tandoor naan brushed with garlic butter and fresh coriander.'),
  dish('Podi-Ghee-Roast-Dosa', 'Podi Ghee Roast Dosa', 'Malli’s Tiffin Room', 'South Indian', 250, 510, true, 'A crisp rice-lentil dosa dusted with house podi and golden ghee.', { bestseller: true, fried: true }),
  dish('Idli-&-Medu-Vada', 'Idli & Medu Vada', 'Malli’s Tiffin Room', 'South Indian', 190, 390, true, 'Soft idlis and a crisp lentil vada with coconut chutney and sambar.', { fried: true }),
  dish('Chicken-Dum-Biryani', 'Chicken Dum Biryani', 'Deccan Dum House', 'Hyderabadi', 390, 740, false, 'Fragrant basmati and spiced chicken sealed together for a slow dum finish.', { bestseller: true }),
  dish('Hyderabadi-Haleem', 'Hyderabadi Haleem', 'Deccan Dum House', 'Hyderabadi', 340, 610, false, 'A patient-cooked blend of lentils, wheat and tender meat, topped with fried onions.'),
  dish('Kosha-Mangsho', 'Kosha Mangsho', 'Mishti Bari', 'Bengali', 420, 680, false, 'A deep, slow-cooked Bengali mutton curry with warming whole spices.'),
  dish('Rosogolla', 'Mishti Doi', 'Mishti Bari', 'Bengali', 140, 220, true, 'Sweetened, gently set yoghurt chilled in a clay pot.', { dessert: true }),
  dish('Khandvi-Rolls', 'Khandvi Rolls', 'Saffron & Sesame', 'Gujarati', 180, 260, true, 'Delicate gram-flour rolls with mustard seeds, curry leaves and fresh coconut.', { bestseller: true }),
  dish('Gujarati-Mini-Thali', 'Gujarati Mini Thali', 'Saffron & Sesame', 'Gujarati', 360, 780, true, 'A bright spread of seasonal shaak, dal, rice, rotli and something sweet.'),
  dish('Chettinad-Pepper-Chicken', 'Chettinad Pepper Chicken', 'Karaikudi Table', 'Chettinad', 390, 590, false, 'Chicken tossed with cracked pepper, curry leaves and roasted masala.'),
  dish('Ghee-Roast-Parotta', 'Ghee Roast Parotta', 'Karaikudi Table', 'Chettinad', 150, 430, true, 'Flaky layered parotta griddled until crisp at the edges.', { fried: true }),
  dish('Mumbai-Pav-Bhaji', 'Mumbai Pav Bhaji', 'Chowpatty Stop', 'Indian Street Food', 220, 560, true, 'Butter-toasted pav beside a bright vegetable bhaji with lemon and onion.', { bestseller: true }),
  dish('Aloo-Tikki-Chaat', 'Samosa Chaat', 'Chowpatty Stop', 'Indian Street Food', 190, 480, true, 'Samosa layered with chickpeas, yoghurt and sweet-spicy chutneys.', { fried: true }),
  dish('Salmon-Avocado-Roll', 'Salmon Avocado Roll', 'Little Tokyo', 'Japanese', 520, 460, false, 'Salmon and ripe avocado rolled with seasoned rice and a dab of wasabi.', { bestseller: true }),
  dish('Spicy-Tuna-Roll', 'Spicy Tuna Roll', 'Little Tokyo', 'Japanese', 490, 430, false, 'Tuna, cucumber and seasoned rice wrapped with nori and a little chilli mayo.'),
  dish('Chicken-Katsu-Curry', 'Chicken Katsu Curry', 'Little Tokyo', 'Japanese', 480, 790, false, 'Crisp panko chicken over rice with a mild Japanese curry.', { fried: true }),
  dish('Garden-Bibimbap', 'Garden Bibimbap', 'Seoul Kitchen', 'Korean', 410, 620, true, 'Rice topped with seasoned vegetables, a sunny egg and gochujang on the side.'),
  dish('Kimchi-Fried-Rice', 'Kimchi Fried Rice', 'Seoul Kitchen', 'Korean', 360, 570, true, 'Wok-fried rice with tangy kimchi, sesame and a soft egg on top.'),
  dish('Yangnyeom-Fried-Chicken', 'Yangnyeom Fried Chicken', 'Seoul Kitchen', 'Korean', 490, 810, false, 'Crisp chicken glazed in a sticky, sweet-heat Korean chilli sauce.', { bestseller: true, fried: true }),
  dish('Chilli-Chicken', 'Chilli Paneer', 'Wok This Way', 'Chinese', 330, 510, true, 'Paneer, peppers and spring onion tossed in a punchy Indo-Chinese sauce.'),
  dish('Veg-Manchow-Soup', 'Veg Manchow Soup', 'Wok This Way', 'Chinese', 190, 240, true, 'A warming, peppery vegetable broth topped with crisp noodles.'),
  dish('Classic-Pad-Thai', 'Classic Pad Thai', 'Lemongrass Lane', 'Thai', 420, 680, true, 'Rice noodles, tamarind, crunchy peanuts and lime, tossed fresh in the wok.', { bestseller: true }),
  dish('Thai-Green-Curry', 'Thai Green Curry', 'Lemongrass Lane', 'Thai', 450, 590, true, 'Fragrant coconut curry with basil and seasonal vegetables, served with jasmine rice.'),
  dish('Woodfired-Margherita', 'Woodfired Margherita', 'Forno Social', 'Italian', 440, 720, true, 'A blistered sourdough base with tomato, mozzarella and fragrant basil.', { bestseller: true }),
  dish('Classic-Tiramisu', 'Classic Tiramisu', 'Forno Social', 'Italian', 260, 390, true, 'Espresso-soaked sponge layered with mascarpone and a cocoa finish.', { dessert: true }),
  dish('Al-Pastor-Tacos', 'Al Pastor Tacos', 'Casa Picante', 'Mexican', 380, 560, false, 'Three soft tacos with achiote-spiced filling, pineapple salsa and lime.'),
  dish('Cheesy-Quesadilla', 'Cheesy Quesadilla', 'Casa Picante', 'Mexican', 340, 610, true, 'Golden folded tortilla with melted cheese, peppers and smoky salsa.'),
  dish('Chocolate-Lava-Cake', 'Chocolate Lava Cake', 'Sugar Theory', 'Desserts', 240, 480, true, 'A warm cocoa cake with a soft, molten centre, ready for a spoon.', { bestseller: true, dessert: true }),
  dish('Rasmalai', 'Gulab Jamun (2 pcs)', 'Sugar Theory', 'Desserts', 160, 330, true, 'Soft milk dumplings steeped in cardamom-scented syrup.', { dessert: true }),
  dish('Tandoori-Sharing-Platter', 'Tandoori Sharing Platter', 'Pepper & Hearth', 'North Indian', 620, 920, false, 'A mixed grill of tandoori chicken, seekh kebab and charred peppers with green chutney.', { bestseller: true, fried: true }),
  dish('Amritsari-Chole-Kulche', 'Chole Bhature', 'Pepper & Hearth', 'North Indian', 280, 740, true, 'Punjabi chickpeas simmered with warming spices beside two puffed bhature.', { fried: true }),
  dish('Butter-Chicken-and-Naan', 'Dal Makhani', 'Pepper & Hearth', 'North Indian', 310, 560, true, 'Black lentils slow-cooked overnight with tomato, butter and a touch of cream.'),
  dish('Onion-Tomato-Uttapam', 'Onion Tomato Uttapam', 'Malli’s Tiffin Room', 'South Indian', 220, 440, true, 'A soft, savoury rice pancake topped with onion, tomato and green chilli.'),
  dish('Appam-with-Vegetable-Stew', 'Appam with Vegetable Stew', 'Malli’s Tiffin Room', 'South Indian', 290, 520, true, 'Lacy appams served with vegetables in a gently spiced coconut milk stew.'),
  dish('Sambar-Rice', 'Sambar Rice', 'Malli’s Tiffin Room', 'South Indian', 210, 430, true, 'Rice and lentils simmered with tamarind, vegetables and a fragrant tempering.'),
  dish('Kachhi-Yakhni-Mutton-Biryani', 'Kachhi Yakhni Mutton Biryani', 'Deccan Dum House', 'Hyderabadi', 520, 890, false, 'Marinated mutton and basmati cook together under a sealed, slow-steamed lid.', { bestseller: true }),
  dish('Mirchi-ka-Salan', 'Mirchi ka Salan', 'Deccan Dum House', 'Hyderabadi', 240, 390, true, 'Green chillies in a tangy peanut, sesame and tamarind gravy.'),
  dish('Shorshe-Ilish', 'Shorshe Ilish', 'Mishti Bari', 'Bengali', 490, 610, false, 'Hilsa steamed in a bright mustard and green-chilli sauce.'),
  dish('Dhokar-Dalna', 'Dhokar Dalna', 'Mishti Bari', 'Bengali', 310, 470, true, 'Bengal gram cakes simmered in a lightly spiced tomato and ginger gravy.'),
  dish('Luchi-&-Aloor-Dom', 'Luchi & Aloor Dom', 'Mishti Bari', 'Bengali', 280, 650, true, 'Puffed luchi with potatoes simmered in a gently spiced Bengali gravy.', { fried: true }),
  dish('Rosogolla', 'Rosogolla (2 pcs)', 'Mishti Bari', 'Bengali', 130, 290, true, 'Soft chhena dumplings soaked in a light, fragrant syrup.', { dessert: true }),
  dish('Sev-Khaman', 'Sev Khaman', 'Saffron & Sesame', 'Gujarati', 170, 310, true, 'Steamed gram-flour cake finished with sev, green chilli and sweet chutney.'),
  dish('Nylon-Khaman-Dhokla', 'Nylon Khaman Dhokla', 'Saffron & Sesame', 'Gujarati', 160, 270, true, 'Soft, airy gram-flour squares topped with mustard seeds and coriander.'),
  dish('Methi-Thepla', 'Methi Thepla (3 pcs)', 'Saffron & Sesame', 'Gujarati', 190, 360, true, 'Fenugreek flatbreads with a mellow spice blend and cooling yoghurt.'),
  dish('Fafda-&-Jalebi', 'Fafda & Jalebi', 'Saffron & Sesame', 'Gujarati', 230, 590, true, 'Crisp chickpea-flour ribbons with warm, syrupy jalebi.', { dessert: true, fried: true }),
  dish('Kozhi-Kuzhambu', 'Kozhi Kuzhambu', 'Karaikudi Table', 'Chettinad', 370, 630, false, 'Chicken in a bold Chettinad gravy with toasted spices and curry leaves.'),
  dish('Meen-Varuval', 'Meen Varuval', 'Karaikudi Table', 'Chettinad', 430, 510, false, 'Fish steaks coated in peppery masala and pan-fried until crisp.', { fried: true }),
  dish('Mumbai-Vada-Pav', 'Pani Puri (6 pcs)', 'Chowpatty Stop', 'Indian Street Food', 140, 290, true, 'Crisp puris with potato, chickpeas and a sharp mint-tamarind pani.', { bestseller: true }),
  dish('Mumbai-Vada-Pav', 'Mumbai Vada Pav', 'Chowpatty Stop', 'Indian Street Food', 130, 430, true, 'Spiced potato fritter tucked into a soft pav with garlic chutney.', { fried: true }),
  dish('Aloo-Tikki-Chaat', 'Aloo Tikki Chaat', 'Chowpatty Stop', 'Indian Street Food', 180, 390, true, 'Crisp potato patties topped with chickpeas, yoghurt and two chutneys.', { fried: true }),
  dish('Amritsari-Chole-Kulche', 'Amritsari Chole Kulche', 'Chowpatty Stop', 'Indian Street Food', 240, 610, true, 'Flaky kulcha with tangy chickpeas, onion and a wedge of lemon.'),
  dish('Salmon-Avocado-Roll', 'Tonkotsu Ramen', 'Little Tokyo', 'Japanese', 510, 790, false, 'Rich pork broth with noodles, bamboo shoots, greens and a jammy egg.', { bestseller: true }),
  dish('Steamed-Vegetable-Dim-Sum', 'Pan-Seared Chicken Gyoza', 'Little Tokyo', 'Japanese', 320, 410, false, 'Six dumplings with crisp golden bases and a ginger-soy dipping sauce.'),
  dish('Prawn-Tempura', 'Prawn Tempura', 'Little Tokyo', 'Japanese', 460, 520, false, 'Lightly battered prawns fried crisp and served with tentsuyu dip.', { fried: true }),
  dish('Spicy-Tteokbokki', 'Spicy Tteokbokki', 'Seoul Kitchen', 'Korean', 350, 540, true, 'Chewy rice cakes in a glossy gochujang sauce with scallions.', { bestseller: true }),
  dish('Jjajangmyeon', 'Jjajangmyeon', 'Seoul Kitchen', 'Korean', 390, 680, false, 'Springy noodles with a savoury black-bean sauce and diced vegetables.'),
  dish('Schezwan-Hakka-Noodles', 'Schezwan Hakka Noodles', 'Wok This Way', 'Chinese', 290, 540, true, 'Wok-tossed noodles with vegetables and a lively chilli-garlic sauce.'),
  dish('Steamed-Vegetable-Dim-Sum', 'Steamed Vegetable Dim Sum', 'Wok This Way', 'Chinese', 280, 320, true, 'Delicate dumplings filled with seasoned vegetables and served with chilli oil.'),
  dish('Chilli-Chicken', 'Chilli Chicken', 'Wok This Way', 'Chinese', 360, 570, false, 'Crisp chicken tossed with chillies, peppers and spring onion.', { fried: true }),
  dish('Veg-Manchurian', 'Veg Manchurian', 'Wok This Way', 'Chinese', 310, 520, true, 'Vegetable dumplings tossed with spring onion in a savoury Indo-Chinese sauce.'),
  dish('Mapo-Tofu', 'Mapo Tofu', 'Wok This Way', 'Chinese', 340, 490, true, 'Silky tofu in a tingling Sichuan pepper and chilli bean sauce.'),
  dish('Thai-Red-Curry', 'Thai Red Curry', 'Lemongrass Lane', 'Thai', 450, 610, true, 'Coconut curry with red chilli, basil and vegetables, served with jasmine rice.'),
  dish('Tom-Yum-Soup', 'Tom Yum Soup', 'Lemongrass Lane', 'Thai', 330, 290, false, 'Hot-and-sour broth with lemongrass, lime and mushrooms.'),
  dish('Mango-Sticky-Rice', 'Mango Sticky Rice', 'Lemongrass Lane', 'Thai', 280, 430, true, 'Sweet coconut sticky rice with ripe mango and toasted sesame.', { dessert: true }),
  dish('Pasta-Carbonara', 'Pasta Carbonara', 'Forno Social', 'Italian', 480, 760, false, 'Silky pasta with parmesan, cracked pepper and crisp pancetta.', { bestseller: true }),
  dish('Beef-Lasagna', 'Beef Lasagna', 'Forno Social', 'Italian', 510, 790, false, 'Layers of pasta, slow-cooked beef ragù and bubbling béchamel.'),
  dish('Fettuccine-Alfredo', 'Fettuccine Alfredo', 'Forno Social', 'Italian', 430, 680, true, 'Ribbons of fettuccine in a parmesan cream sauce with parsley.'),
  dish('Birria-Street-Tacos', 'Birria Street Tacos', 'Casa Picante', 'Mexican', 430, 640, false, 'Slow-braised beef tacos with melted cheese and a side of dipping consomé.', { bestseller: true }),
  dish('Loaded-Bean-Burrito', 'Loaded Bean Burrito', 'Casa Picante', 'Mexican', 390, 720, true, 'A warm tortilla packed with beans, rice, salsa, corn and melted cheese.'),
  dish('Loaded-Nachos', 'Loaded Nachos', 'Casa Picante', 'Mexican', 360, 690, true, 'Crisp tortilla chips with beans, queso, jalapeño and fresh pico de gallo.'),
  dish('Cinnamon-Churros', 'Cinnamon Churros', 'Casa Picante', 'Mexican', 240, 470, true, 'Warm cinnamon-sugar churros with a cup of dark chocolate dip.', { dessert: true, fried: true }),
  dish('New-York-Cheesecake', 'New York Cheesecake', 'Sugar Theory', 'Desserts', 280, 430, true, 'Creamy baked cheesecake on a crumbly biscuit base with berry compote.', { bestseller: true, dessert: true }),
  dish('Rasmalai', 'Rasmalai (2 pcs)', 'Sugar Theory', 'Desserts', 190, 360, true, 'Soft chhena rounds in chilled saffron milk with pistachio.', { dessert: true }),
  dish('Sizzling-Brownie', 'Sizzling Brownie', 'Sugar Theory', 'Desserts', 310, 620, true, 'Warm chocolate brownie with vanilla ice cream and a hot chocolate pour.', { dessert: true }),
]

const cuisines = ['All', ...Array.from(new Set(menu.map((item) => item.cuisine)))]
const walletKey = 'mycravings-wallet'
const usedRoastsKey = 'mycravings-used-roasts'

function readUsedRoasts() {
  try {
    return JSON.parse(localStorage.getItem(usedRoastsKey) ?? '[]') as string[]
  } catch {
    return []
  }
}

function readWallet() {
  const now = new Date()
  const saved = localStorage.getItem(walletKey)
  if (!saved) return { balance: now.getDate() * 500 }
  try {
    const previous = JSON.parse(saved) as { balance: number; timestamp: number }
    const last = new Date(previous.timestamp)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate())
    const elapsed = Math.max(0, Math.floor((today.getTime() - lastDay.getTime()) / 86_400_000))
    return { balance: previous.balance + elapsed * 500 }
  } catch {
    return { balance: now.getDate() * 500 }
  }
}

  type DishPhotoProps = { item: MenuItem; credit?: ImageCredit; compact?: boolean }

function DishPhoto({ item, credit, compact = false }: DishPhotoProps) {
  // Fallback directly to item.localImage if credit isn't found
  const imageSrc = credit ? `/images/dishes/${credit.file}` : item.localImage

  return <>
    <img className={compact ? 'cart-dish-photo' : 'dish-photo'} src={imageSrc} alt={item.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = item.image }} />
  </>
}

function App() {
  const [activeCuisine, setActiveCuisine] = useState('All')
  const [search, setSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [selectedRoast, setSelectedRoast] = useState<RoastSuggestion | null>(null)
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wallet, setWallet] = useState(readWallet)
  const [roastLibrary, setRoastLibrary] = useState<RoastLibrary | null>(null)
  const [imageCredits, setImageCredits] = useState<ImageCredits>({})
  const [message, setMessage] = useState('')
  const [orderComplete, setOrderComplete] = useState(false)
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null)
  const [usedRoasts, setUsedRoasts] = useState<string[]>(readUsedRoasts)
  const [dishRoastLines, setDishRoastLines] = useState<Record<string, string>>({})
  const browseSectionRef = useRef<HTMLElement>(null)
  const filteredMenu = useMemo(() => {
    if (selectedRoast) {
      const stopWords = new Set(['the', 'and', 'for', 'with', 'from', 'by', 'into', 'your', 'pure', 'very'])
      const keywords = normalizeSearch(selectedRoast.name).split(/[^a-z0-9]+/).filter((word) => word.length > 2 && !stopWords.has(word))
      return menu.filter((item) => item.cuisine === selectedRoast.cuisine && keywords.some((word) => normalizeSearch(item.name).includes(word)))
    }
    const normalizedQuery = normalizeSearch(search)
    return menu.filter((item) => (activeCuisine === 'All' || item.cuisine === activeCuisine) && normalizeSearch(`${item.name} ${item.restaurant} ${item.cuisine}`).includes(normalizedQuery))
  }, [activeCuisine, search, selectedRoast])
  const matchingSuggestions = useMemo(() => {
    const normalizedQuery = normalizeSearch(search)
    if (!normalizedQuery) return []
    return roastSuggestions.filter((suggestion) => normalizeSearch(suggestion.name).includes(normalizedQuery) || normalizeSearch(suggestion.cuisine).includes(normalizedQuery)).slice(0, 7)
  }, [search])
  const showSuggestions = searchFocused && search.trim().length > 0 && matchingSuggestions.length > 0
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0)
  const calories = cart.reduce((sum, line) => sum + line.item.calories * line.quantity, 0)
  const mains = cart.reduce((sum, line) => sum + (line.item.dessert ? 0 : line.quantity), 0)
  const desserts = cart.reduce((sum, line) => sum + (line.item.dessert ? line.quantity : 0), 0)
  const hasFried = cart.some((line) => line.item.fried)
  const [today] = useState(() => new Date())

  useEffect(() => {
    let isCurrent = true
    fetch('/data/roasts.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load roast data')
        return response.json() as Promise<RoastLibrary>
      })
      .then((data) => { if (isCurrent) setRoastLibrary(data) })
      .catch(() => { if (isCurrent) setRoastLibrary(null) })
    return () => { isCurrent = false }
  }, [])

  useEffect(() => {
    let isCurrent = true
    fetch('/images/dishes/credits.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load image credits')
        return response.json() as Promise<ImageCredits>
      })
      .then((data) => { if (isCurrent) setImageCredits(data) })
      .catch(() => { if (isCurrent) setImageCredits({}) })
    return () => { isCurrent = false }
  }, [])

  useEffect(() => {
    localStorage.setItem(walletKey, JSON.stringify({ balance: wallet.balance, timestamp: Date.now() }))
  }, [wallet.balance])

  useEffect(() => {
    localStorage.setItem(usedRoastsKey, JSON.stringify(usedRoasts))
  }, [usedRoasts])

  useEffect(() => {
    if (!search.trim() || selectedRoast || !roastLibrary) return
    const timer = window.setTimeout(() => {
      let nextUsed = usedRoasts
      let changed = false
      const nextLines = { ...dishRoastLines }
      for (const item of filteredMenu) {
        if (nextLines[item.id]) continue
        const poolId = `dish:${item.id}`
        const poolName = searchPoolForDish(item)
        const hasDishLine = nextUsed.some((entry) => entry.startsWith(`${poolId}:`))
        const dishLine = roastLibrary.dishReplies[item.id]
        const pool = hasDishLine ? roastLibrary.searchReplies[poolName] : [dishLine, ...roastLibrary.searchReplies[poolName]].filter(Boolean)
        const selected = selectUnusedRoast(poolId, pool, nextUsed)
        if (!selected.line) continue
        nextLines[item.id] = selected.line
        nextUsed = [...nextUsed.filter((entry) => entry !== selected.key), selected.key]
        changed = true
      }
      if (changed) {
        setDishRoastLines(nextLines)
        setUsedRoasts(nextUsed)
      }
    }, 220)
    return () => window.clearTimeout(timer)
  }, [search, activeCuisine, filteredMenu, selectedRoast, roastLibrary, usedRoasts, dishRoastLines])

  useEffect(() => {
    if ((!search.trim() && !selectedRoast) || !window.matchMedia('(max-width: 780px)').matches) return
    const section = browseSectionRef.current
    if (!section) return
    const topbarHeight = document.querySelector('.topbar')?.getBoundingClientRect().height ?? 0
    const top = window.scrollY + section.getBoundingClientRect().top - topbarHeight - 12
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }, [search, selectedRoast, filteredMenu])

  function addToCart(item: MenuItem) {
    setCart((current) => {
      const match = current.find((line) => line.item.id === item.id)
      return match ? current.map((line) => line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { item, quantity: 1 }]
    })
    setMessage('')
    setOrderComplete(false)
    setReceipt(null)
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current.flatMap((line) => {
      if (line.item.id !== id) return [line]
      const quantity = line.quantity + delta
      return quantity > 0 ? [{ ...line, quantity }] : []
    }))
  }

  function selectRoast(suggestion: RoastSuggestion) {
    setSelectedRoast(suggestion)
    setActiveCuisine(cuisines.includes(suggestion.cuisine) ? suggestion.cuisine : 'All')
    setSearch('')
    setSearchFocused(false)
    setActiveSuggestionIndex(0)
  }

  function chooseRoast(poolName: string, lines: string[]) {
    if (!lines.length) return ''
    const prefix = `${poolName}:`
    const usedIndexes = usedRoasts.filter((entry) => entry.startsWith(prefix)).map((entry) => Number(entry.slice(prefix.length))).filter((index) => Number.isInteger(index) && index >= 0 && index < lines.length)
    const available = lines.map((_, index) => index).filter((index) => !usedIndexes.includes(index))
    const selectedIndex = available.length
      ? available[Math.floor(Math.random() * available.length)]
      : usedIndexes[0] ?? Math.floor(Math.random() * lines.length)
    const selectedKey = `${prefix}${selectedIndex}`
    setUsedRoasts((current) => [...current.filter((entry) => entry !== selectedKey), selectedKey])
    return lines[selectedIndex]
  }

  function finishOrder() {
    if (!cart.length) return
    if (wallet.balance < total) {
      setMessage('Your points balance is a little short for this cart. Try a smaller order.')
      return
    }
    setReceipt({ id: `MC-${Date.now().toString().slice(-6)}`, lines: cart, total, calories })
    setWallet((current) => ({ balance: current.balance - total }))
    setOrderComplete(true)
    setCart([])
    const observations: string[] = []
    const weight = (calories / 7700).toFixed(2)
    if (calories > 1500) observations.push(chooseRoast('checkout:heavyweight', roastLibrary?.checkout.heavyweight ?? []))
    if (mains >= 4) observations.push(chooseRoast('checkout:volume', roastLibrary?.checkout.volume ?? []))
    if (desserts >= 2) observations.push(chooseRoast('checkout:dessert', roastLibrary?.checkout.dessert ?? []))
    if (hasFried) observations.push(chooseRoast('checkout:fried', roastLibrary?.checkout.fried ?? []))
    const summaryTemplate = chooseRoast('checkout:total', roastLibrary?.checkout.total ?? []) || '{calories} kcal, about {weight} kg. This order is not being delivered.'
    const summary = summaryTemplate.replaceAll('{calories}', calories.toLocaleString('en-IN')).replaceAll('{weight}', weight)
    observations.push(summary)
    setMessage(observations.filter(Boolean).join(' '))
  }

  function paymentGag(method: 'card' | 'upi' | 'cod') {
    setMessage({ card: 'Declined by your willpower.', upi: '❌ Your diet is not in the network.', cod: 'There is no delivery.' }[method])
  }

  return <div className="site-shell">
    <div className="notice-bar">We deliver the roast. Your dinner stays right where it is <span>·</span> +500 points every calendar day</div>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="mycravings.in home"><span className="brand-mark">m<span>.</span></span><span className="brand-name">mycravings<span>.in</span></span></a>
      <button className="delivery-location" type="button"><span className="pin-icon">⌖</span><span><small>Delivering to</small><strong>Your Imagination</strong></span><span className="chevron">⌄</span></button>
      <div className="search-wrap">
        <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => { setSearch(event.target.value); setDishRoastLines({}); setSelectedRoast(null); setActiveCuisine('All'); setActiveSuggestionIndex(0); setSearchFocused(true) }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && matchingSuggestions.length) { event.preventDefault(); setActiveSuggestionIndex((index) => (index + 1) % matchingSuggestions.length) }
          if (event.key === 'ArrowUp' && matchingSuggestions.length) { event.preventDefault(); setActiveSuggestionIndex((index) => (index - 1 + matchingSuggestions.length) % matchingSuggestions.length) }
          if (event.key === 'Enter' && matchingSuggestions.length) { event.preventDefault(); selectRoast(matchingSuggestions[activeSuggestionIndex]) }
          if (event.key === 'Escape') setSearchFocused(false)
        }} placeholder="Search dishes or roast names" aria-label="Search dishes or roast names" aria-autocomplete="list" aria-expanded={showSuggestions} aria-controls="roast-suggestions" role="combobox" /><kbd>⌘ K</kbd></label>
        {showSuggestions && <div className="autocomplete-list" id="roast-suggestions" role="listbox" aria-label="Roast name suggestions">
          <p className="autocomplete-heading">ROAST NAME MATCHES</p>
          {matchingSuggestions.map((suggestion, index) => <button className={`autocomplete-option ${activeSuggestionIndex === index ? 'active' : ''}`} type="button" role="option" aria-selected={activeSuggestionIndex === index} key={`${suggestion.cuisine}-${suggestion.name}`} onMouseDown={(event) => event.preventDefault()} onClick={() => selectRoast(suggestion)}><span className="autocomplete-copy"><strong>{suggestion.name}</strong><small>{suggestion.cuisine} · {suggestion.reply}</small></span><span className="autocomplete-arrow">↗</span></button>)}
        </div>}
      </div>
      <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><span className="bag-icon">▱</span><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
    </header>

    <main id="top">
      <section className="wallet-strip" aria-label="Points wallet"><div className="wallet-brand"><span className="wallet-icon">✳</span><span><small>MYCRAVINGS WALLET</small><strong>{wallet.balance.toLocaleString('en-IN')} <em>pts</em></strong></span></div><div className="wallet-detail"><span className="wallet-dot" /><span>Day {today.getDate()} of the month</span><span className="wallet-separator">/</span><span>+500 pts added daily</span></div><div className="wallet-rate"><span>1 point</span><strong>=</strong><span>₹1</span></div></section>

      <section className="intro-row"><div><p className="eyebrow">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long' }).toUpperCase()} {today.getDate()} <span>·</span> DINNER PLANS?</p><h1>Cravings delivered.<br /><i>To your imagination.</i></h1><p className="intro-copy">Build a cart, spend some points, and see what the math has to say.</p></div><div className="delivery-promo"><span className="delivery-mark">✦</span><div><strong>Zero-mile delivery</strong><p>Instant arrival, because nothing leaves this browser.</p></div><span className="delivery-arrow">↗</span></div></section>

      <section className="browse-section" ref={browseSectionRef}><div className="section-heading"><div><p className="eyebrow">A MENU FOR EVERY MOOD</p><h2>{selectedRoast ? selectedRoast.name : 'Find your kind of delicious'}</h2></div><p className="results-count">{filteredMenu.length} dishes <span>·</span> 14 cuisines</p></div>
        {selectedRoast && <div className="selected-roast"><div><span className="eyebrow">{selectedRoast.cuisine.toUpperCase()} · ROAST SELECTED</span><p>{selectedRoast.reply}</p></div><button type="button" onClick={() => { setSelectedRoast(null); setActiveCuisine('All') }}>Clear roast ×</button></div>}
        <div className="category-row" aria-label="Filter by cuisine">{cuisines.map((cuisine, index) => <button key={cuisine} className={`category-chip ${activeCuisine === cuisine ? 'active' : ''}`} type="button" onClick={() => { setSelectedRoast(null); setActiveCuisine(cuisine) }}><span className="category-symbol">{index === 0 ? '✳' : ['◉', '◒', '⌁', '❋', '◇', '◌', '✦', '◎', '◍', '⌘', '◉', '✳', '◈', '♡'][index - 1]}</span>{cuisine}</button>)}</div>
        {filteredMenu.length ? <div className="menu-grid">{filteredMenu.map((item, index) => <article className="dish-card" key={item.id} style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}><div className="dish-photo-wrap"><DishPhoto item={item} credit={imageCredits[item.id]} /><span className="photo-label">{item.cuisine.toUpperCase()}</span>{item.bestseller && <span className="bestseller-tag">★ HOUSE FAVOURITE</span>}</div><div className="dish-details"><div className="dish-title-row"><span className={`diet-mark ${item.vegetarian ? 'veg' : 'nonveg'}`} aria-label={item.vegetarian ? 'Vegetarian' : 'Non-vegetarian'}><i /></span><h3>{item.name}</h3></div><p className="restaurant-name">{item.restaurant} <span>·</span> 25–35 min</p><p className="dish-description">{item.description}</p>{search.trim() && <p className="dish-roast">{dishRoastLines[item.id] ?? roastLibrary?.dishReplies[item.id]}</p>}<p className="dish-meta"><strong>₹{item.price}</strong><span className="meta-divider">·</span><span>~{item.calories} kcal</span><span className="meta-spacer" /><button className="add-button" type="button" aria-label={`Add ${item.name} to cart`} onClick={() => addToCart(item)}><span>+</span> ADD</button></p></div></article>)}</div> : <div className="empty-results"><span>⌕</span><h3>{selectedRoast ? selectedRoast.name : 'No dishes found'}</h3><p>{selectedRoast ? selectedRoast.reply : 'Try another search or choose a different cuisine.'}</p><button type="button" onClick={() => { setSearch(''); setSelectedRoast(null); setActiveCuisine('All') }}>Clear filters</button></div>}
      </section>
      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">m<span>.</span></span><span className="brand-name">mycravings<span>.in</span></span></a><span>Cravings stopped cold.</span><span>Demo wallet · No food is delivered</span></footer>
    </main>

    {cartOpen && <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="drawer-header"><div><p className="eyebrow">YOUR EVENING, REVIEWED</p><h2 id="cart-title">Your cart <span>({cartCount})</span></h2></div><button className="close-button" type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
      {orderComplete ? <div className="order-success"><span className="success-icon">✓</span><p className="receipt-kicker">POINTS REDEEMED · KITCHEN NOTIFIED</p><h3>Order confirmed.</h3><p>Your craving has been taken care of. Instant delivery, courtesy of your imagination.</p>{receipt && <div className="receipt-card"><div className="receipt-top"><span>DEMO RECEIPT</span><strong>{receipt.id}</strong></div><div className="receipt-lines">{receipt.lines.map(({ item, quantity }) => <div key={item.id}><span>{quantity} × {item.name}</span><strong>₹{(item.price * quantity).toLocaleString('en-IN')}</strong></div>)}</div><div className="receipt-total"><span>Points redeemed</span><strong>{receipt.total.toLocaleString('en-IN')} pts</strong></div><div className="receipt-balance"><span>Points remaining</span><strong>{wallet.balance.toLocaleString('en-IN')} pts</strong></div></div>}{message && <p className="checkout-message">{message}</p>}<p className="receipt-note">A browser-only simulation. No real payment or delivery service is connected.</p><button className="primary-button" type="button" onClick={() => { setOrderComplete(false); setMessage(''); setCartOpen(false) }}>Back to browsing <span>↗</span></button></div> : cart.length === 0 ? <div className="empty-cart"><span className="empty-cart-icon">＋</span><h3>Your cart is taking a breather</h3><p>Add something tempting, then decide if it’s really the moment.</p><button className="primary-button" type="button" onClick={() => setCartOpen(false)}>Explore the menu <span>↗</span></button></div> : <><div className="cart-lines">{cart.map(({ item, quantity }) => <div className="cart-line" key={item.id}><img src={item.localImage} alt="" onError={(event) => { if (event.currentTarget.src !== item.image) event.currentTarget.src = item.image }} /><div className="cart-item-copy"><strong>{item.name}</strong><small>{item.restaurant}</small><span>₹{item.price} · ~{item.calories} kcal</span></div><div className="quantity-stepper"><button type="button" aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item.id, -1)}>−</button><span>{quantity}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item.id, 1)}>+</button></div></div>)}</div>
        <div className="drawer-body"><div className="checkout-note"><span>✳</span><p>Final check: your kitchen is about to receive absolutely nothing.</p></div><div className="payment-heading"><h3>Payment method</h3><span>DEMO CHECKOUT</span></div>
          <button className="payment-option points-option" type="button" onClick={finishOrder}><span className="payment-icon points-icon">✳</span><span><strong>Pay by Points</strong><small>Balance: {wallet.balance.toLocaleString('en-IN')} pts</small></span><span className="radio selected" /></button>
          <button className="payment-option locked-option" type="button" onClick={() => paymentGag('card')}><span className="payment-icon">▰</span><span><strong>Credit / Debit card</strong><small>Locked · not available</small></span><span className="lock-icon">⌑</span></button>
          <button className="payment-option locked-option" type="button" onClick={() => paymentGag('upi')}><span className="payment-icon">⌁</span><span><strong>UPI · GPay · PhonePe</strong><small>Locked · not available</small></span><span className="lock-icon">⌑</span></button>
          <button className="payment-option locked-option" type="button" onClick={() => paymentGag('cod')}><span className="payment-icon">▣</span><span><strong>Cash on delivery</strong><small>Locked · not available</small></span><span className="lock-icon">⌑</span></button>
          {message && <p role="status" className={`checkout-message ${message.startsWith('❌') ? 'error-message' : ''}`}>{message}</p>}
          <div className="bill-total"><span>Cart total</span><strong>₹{total.toLocaleString('en-IN')} <small>({total.toLocaleString('en-IN')} pts)</small></strong></div><p className="calorie-total">Cart estimate: ~{calories.toLocaleString('en-IN')} kcal</p>
          <button className="primary-button pay-button" type="button" onClick={finishOrder}>Pay {total.toLocaleString('en-IN')} points <span>↗</span></button><p className="no-charge-note">No real payment is processed. Points are for demo purposes.</p></div></>}
    </aside></div>}
  </div>
}

export default App
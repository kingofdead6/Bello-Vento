"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuCategories = [
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "pasta", label: "Pasta & Risotto" },
  { id: "desserts", label: "Desserts" },
  { id: "wine", label: "Wine & Drinks" },
];

const menuItems = {
  starters: [
    {
      name: "Charred Octopus, Saffron Aioli",
      poetic: "The sea, gently kissed by fire",
      price: "28",
    },
    {
      name: "Foie Gras Torchon, Burnt Fig & Brioche",
      poetic: "Velvet forged in quiet fire",
      price: "34",
    },
    {
      name: "Heirloom Tomato, Stracciatella & Basil Oil",
      poetic: "Summer captured in one bite",
      price: "22",
    },
  ],
  mains: [
    {
      name: "Charred Wagyu, Smoked Salt Reduction",
      poetic: "A study in depth and silence",
      price: "68",
    },
    {
      name: "Aged Duck Breast, Cherry Wood Glaze",
      poetic: "Time rendered into one perfect bite",
      price: "52",
    },
    {
      name: "Wild Turbot, Brown Butter & Capers",
      poetic: "The ocean, refined",
      price: "58",
    },
  ],
  pasta: [
    {
      name: "Saffron Risotto, Black Truffle Shavings",
      poetic: "Golden fields meeting ancient earth",
      price: "42",
    },
    {
      name: "Handmade Tagliatelle, Slow-Cooked Ragù",
      poetic: "A Sunday in Emilia, every day",
      price: "38",
    },
    {
      name: "Lobster Ravioli, Lemon Verbena Butter",
      poetic: "Luxury wrapped in silk",
      price: "46",
    },
  ],
  desserts: [
    {
      name: "Dark Chocolate Soufflé, Tonka Bean Crème",
      poetic: "Midnight, distilled",
      price: "24",
    },
    {
      name: "Olive Oil Cake, Rosemary & Candied Citrus",
      poetic: "The garden after rain",
      price: "19",
    },
    {
      name: "Burnt Basque Cheesecake, Wild Berry Compote",
      poetic: "Sweet surrender",
      price: "21",
    },
  ],
  wine: [
    {
      name: "Barolo DOCG 2018 – Piedmont",
      poetic: "Earth and time in a glass",
      price: "28",
    },
    {
      name: "Chablis Premier Cru 2020 – Burgundy",
      poetic: "Mineral purity",
      price: "24",
    },
    {
      name: "Champagne Brut Rosé – Grand Cru",
      poetic: "Celebration in silence",
      price: "32",
    },
  ],
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("starters");

  return (
    <div className="bg-[#0a0806] min-h-screen text-white pb-20">
      {/* Hero Header */}

      <div className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-20 border-b border-amber-900/30 pb-8">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-4 text-lg font-light transition-all duration-300 rounded-full
                ${activeCategory === cat.id 
                  ? "bg-amber-400 text-black" 
                  : "text-amber-100/70 hover:text-white border border-amber-900/50 hover:border-amber-400"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {menuItems[activeCategory].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row justify-between items-start md:items-end border-b border-amber-900/30 pb-10 last:border-none"
              >
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-xl italic text-amber-100/80 font-light max-w-lg">
                    “{item.poetic}”
                  </p>
                </div>

                <div className="mt-6 md:mt-0 text-right">
                  <span className="text-3xl font-light text-amber-400">${item.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Closing Note */}
        <div className="text-center mt-24 text-amber-100/60 text-sm tracking-widest">
          All dishes are prepared to order • Changes and substitutions are respectfully declined
        </div>
      </div>
    </div>
  );
}
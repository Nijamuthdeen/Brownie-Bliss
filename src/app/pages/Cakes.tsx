import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { cakesData } from '../data/products';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { motion } from 'motion/react';

export const Cakes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Birthday Cakes', 'Wedding Cakes', 'Anniversary Cakes', 'Custom Cakes', 'Eggless Cakes'];

  const filteredCakes = selectedCategory === 'All'
    ? cakesData
    : cakesData.filter((cake) => cake.category === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Cakes</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our delightful collection of handcrafted cakes for every occasion
          </p>
        </motion.div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCakes.map((cake) => (
            <ProductCard key={cake.id} product={cake} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCakes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No cakes found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

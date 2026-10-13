import { ProductCard } from '../components/ProductCard';
import { browniesData } from '../data/products';
import { motion } from 'motion/react';

export const Brownies = () => {
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
            Delicious <span className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">Brownies</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Indulge in our rich, fudgy brownies made with premium chocolate
          </p>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 rounded-3xl overflow-hidden"
        >
          <div className="relative h-64 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900">
            <img
              src="https://images.unsplash.com/photo-1589279003619-b2d8de157db7?w=1200"
              alt="Brownies"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">🍫 Freshly Baked Daily</h2>
                <p className="text-xl">Order now and enjoy same-day delivery!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {browniesData.map((brownie) => (
            <ProductCard key={brownie.id} product={brownie} />
          ))}
        </div>
      </div>
    </div>
  );
};

import { ProductCard } from '../components/ProductCard';
import { chocolatesData } from '../data/products';
import { Gift, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'motion/react';

export const Chocolates = () => {
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
            Premium <span className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">Chocolates</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Handcrafted chocolates made with the finest ingredients
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-2 border-pink-200">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-2xl">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Perfect Gift Boxes</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Beautiful packaging for special occasions
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-4 rounded-2xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Made with Love</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Each piece crafted by expert chocolatiers
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chocolatesData.map((chocolate) => (
            <ProductCard key={chocolate.id} product={chocolate} />
          ))}
        </div>
      </div>
    </div>
  );
};

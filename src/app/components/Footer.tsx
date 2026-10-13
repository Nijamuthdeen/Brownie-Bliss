import { Link } from 'react-router';
import { Cake, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-900 via-rose-900 to-pink-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Cake className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Sweet Delight</span>
            </div>
            <p className="text-pink-100 mb-4">
              Crafting happiness through delicious cakes, brownies, and chocolates since 2015.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Cakes', 'Brownies', 'Chocolates', 'Shop', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-pink-100 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-pink-100">
              <li>Birthday Cakes</li>
              <li>Wedding Cakes</li>
              <li>Custom Cakes</li>
              <li>Eggless Cakes</li>
              <li>Brownies & Desserts</li>
              <li>Gift Boxes</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-pink-100">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-pink-100">
                <Mail className="w-4 h-4" />
                <span>info@sweetdelight.com</span>
              </div>
              <div className="flex items-start gap-2 text-pink-100">
                <MapPin className="w-4 h-4 mt-1" />
                <span>123 Bakery Street, Sweet City, SC 12345</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-pink-200"
                />
                <Button className="bg-white text-pink-900 hover:bg-pink-50">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="border-t border-white/20 pt-6 mb-6">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Opening Hours</h4>
            <p className="text-pink-100">
              Monday - Saturday: 8:00 AM - 9:00 PM | Sunday: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-pink-100 flex items-center justify-center gap-2 flex-wrap">
            © 2026 Sweet Delight Cake Shop. Made with
            <Heart className="w-4 h-4 fill-pink-300 text-pink-300" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

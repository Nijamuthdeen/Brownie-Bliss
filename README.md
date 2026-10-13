# 🎂 Sweet Delight Cake Shop

A modern, responsive, and feature-rich cake shop website built with React, TypeScript, and Tailwind CSS. This complete e-commerce solution includes a customer-facing storefront, shopping cart, billing system, and admin dashboard.

![Sweet Delight](https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=400&fit=crop)

## ✨ Features

### Customer Features
- 🏠 **Beautiful Homepage** - Hero section, featured products, testimonials
- 🛍️ **Product Catalog** - Cakes, Brownies, and Chocolates
- 🔍 **Advanced Search & Filtering** - Search by name, filter by category, sort by price/rating
- 🛒 **Shopping Cart** - Add/remove items, update quantities, real-time total calculation
- 💳 **Checkout & Billing** - Complete billing system with GST calculation and discount support
- 📄 **Invoice Generation** - Print and download PDF invoices
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ✉️ **Contact Form** - Get in touch with the bakery
- ⭐ **Product Ratings** - Display ratings and reviews

### Admin Features
- 📊 **Dashboard** - Sales overview, order statistics, revenue charts
- 📦 **Product Management** - Add, edit, delete products
- 📋 **Order Management** - View and manage customer orders
- 📈 **Sales Analytics** - Visual charts using Recharts
- 📦 **Inventory Tracking** - Stock management and alerts
- 📑 **Reports** - Sales reports and customer insights

### Technical Features
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🎨 **Modern UI** - Tailwind CSS v4 with custom design system
- 🎭 **Smooth Animations** - Motion (Framer Motion) for fluid transitions
- 🔔 **Toast Notifications** - Sonner for beautiful notifications
- 🧭 **React Router** - Multi-page navigation with React Router v7
- 📱 **Mobile Menu** - Responsive hamburger navigation
- ⬆️ **Back to Top Button** - Smooth scroll to top
- 🎯 **TypeScript** - Type-safe code for better development experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sweet-delight-cake-shop
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Start the development server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open your browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
sweet-delight-cake-shop/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components
│   │   │   ├── ui/              # Design system components
│   │   │   ├── Layout.tsx       # Main layout wrapper
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Footer component
│   │   │   ├── BackToTop.tsx    # Scroll to top button
│   │   │   └── ProductCard.tsx  # Product display card
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx         # Homepage
│   │   │   ├── Cakes.tsx        # Cakes catalog
│   │   │   ├── Brownies.tsx     # Brownies catalog
│   │   │   ├── Chocolates.tsx   # Chocolates catalog
│   │   │   ├── Shop.tsx         # All products with filters
│   │   │   ├── Cart.tsx         # Shopping cart
│   │   │   ├── Billing.tsx      # Checkout & invoice
│   │   │   ├── Contact.tsx      # Contact page
│   │   │   └── AdminDashboard.tsx # Admin panel
│   │   ├── context/             # React Context
│   │   │   ├── CartContext.tsx  # Shopping cart state
│   │   │   └── ThemeContext.tsx # Dark mode state
│   │   ├── data/                # Mock data
│   │   │   └── products.ts      # Product catalog
│   │   ├── App.tsx              # Root component
│   │   └── routes.tsx           # Route configuration
│   └── styles/                  # CSS files
│       ├── index.css            # Main styles
│       ├── tailwind.css         # Tailwind imports
│       └── theme.css            # Theme variables
├── package.json
├── vite.config.ts
├── README.md
└── BACKEND_SETUP.md             # Backend documentation
```

## 🎨 Design System

This project uses a comprehensive design system with:

- **Colors**: Pink, Rose, Amber, and pastel gradients
- **Components**: Built on Radix UI primitives
- **Typography**: Custom font styling
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and hover effects

### Color Palette
- Primary: Pink (#ec4899) to Rose (#f43f5e)
- Secondary: Amber (#f59e0b) to Orange (#f97316)
- Background: Gradient from Pink-50 to Amber-50
- Dark Mode: Gray-900 base with pink accents

## 🛒 Shopping Cart Features

- **Add to Cart** - Click "Add to Cart" on any product
- **Update Quantity** - Use +/- buttons to adjust quantities
- **Remove Items** - Delete button to remove products
- **Real-time Totals** - Subtotal, GST (18%), and grand total
- **Persistent State** - Cart maintained across page navigation

## 💳 Billing System

### Features
- Customer information form (Name, Mobile, Email, Address)
- Payment method selection (Cash, Card, UPI)
- Discount percentage support
- GST calculation (18%)
- Order number generation
- Invoice preview
- Print invoice functionality
- Download PDF invoice
- Order history tracking

### Invoice Details
- Order number and date
- Customer details
- Itemized product list
- Subtotal, GST, discount breakdown
- Grand total
- Payment method

## 📊 Admin Dashboard

### Analytics
- Total sales revenue
- Total orders count
- Customer count
- Product count
- Sales trend charts
- Order trend graphs

### Management
- **Orders**: View and manage customer orders
- **Products**: Add, edit, delete products
- **Inventory**: Track stock levels and reorder alerts
- **Reports**: Sales and customer insights

## 🌐 Pages Overview

### 1. Home (`/`)
- Hero banner with call-to-action
- Featured products showcase
- Special offers section
- Customer testimonials
- Key features highlight

### 2. Cakes (`/cakes`)
- Category tabs (Birthday, Wedding, Anniversary, Custom, Eggless)
- Product grid with filtering
- Product cards with ratings

### 3. Brownies (`/brownies`)
- Classic, Walnut, Fudge, Choco Chip, Caramel varieties
- Hero banner
- Product showcase

### 4. Chocolates (`/chocolates`)
- Dark, Milk, White chocolate
- Truffles and gift boxes
- Premium presentation

### 5. Shop (`/shop`)
- All products in one place
- Search functionality
- Category filter
- Sort by price, rating, name
- Product count display

### 6. Cart (`/cart`)
- Cart items list
- Quantity management
- Order summary
- Proceed to checkout

### 7. Billing (`/billing`)
- Customer information form
- Order summary
- Payment method selection
- Discount application
- Invoice generation
- PDF download

### 8. Contact (`/contact`)
- Contact information cards
- Contact form
- Map placeholder
- Social media links
- FAQ section

### 9. Admin (`/admin`)
- Dashboard statistics
- Sales charts
- Order management
- Product management
- Inventory tracking
- Reports

## 🎯 Key Technologies

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool
- **Tailwind CSS 4.1.12** - Styling
- **React Router 7.13.0** - Navigation
- **Motion 12.23.24** - Animations
- **Recharts 2.15.2** - Charts
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **jsPDF** - PDF generation

### UI Components
- Radix UI primitives
- Custom design system
- Responsive components
- Accessible (WCAG compliant)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Sweet Delight Cake Shop
```

### Customization

#### Update Colors
Edit `/src/styles/theme.css`:
```css
:root {
  --primary: #ec4899;
  --secondary: #f43f5e;
  /* Add your custom colors */
}
```

#### Update Products
Edit `/src/app/data/products.ts`:
```typescript
export const cakesData: Product[] = [
  {
    id: 'cake-1',
    name: 'Your Cake Name',
    price: 999,
    // ... other properties
  }
];
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Toggle dark mode using the moon/sun icon in the header. Theme preference is saved to localStorage.

## 🖨️ Print Functionality

The billing page includes print styles:
- Header and footer hidden
- Clean invoice layout
- Print-friendly formatting

## 📦 Build for Production

```bash
npm run build
# or
pnpm build
```

The build output will be in the `dist/` directory.

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the dist folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔐 Backend Integration

For backend setup and API integration, see [BACKEND_SETUP.md](./BACKEND_SETUP.md)

The backend provides:
- User authentication (JWT)
- Product management APIs
- Order processing
- Payment handling
- Admin operations
- Database persistence

## 📈 Future Enhancements

- [ ] User authentication and login
- [ ] Order tracking
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Customer loyalty program

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for Sweet Delight Cake Shop

## 📞 Support

For support and queries:
- Email: info@sweetdelight.com
- Phone: +91 98765 43210
- Address: 123 Bakery Street, Sweet City, SC 12345

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI components from [Radix UI](https://radix-ui.com)
- Charts from [Recharts](https://recharts.org)

---

**Made with 🎂 by Sweet Delight Team**

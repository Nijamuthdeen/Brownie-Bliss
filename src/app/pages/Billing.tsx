import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Textarea } from '../components/ui/textarea';
import { useCart } from '../context/CartContext';
import { Download, Printer, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';

export const Billing = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
  });

  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const GST_RATE = 0.18;
  const subtotal = getCartTotal();
  const gst = subtotal * GST_RATE;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + gst - discountAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SD${timestamp}${random}`;
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.mobile || !formData.address) {
      toast.error('Please fill all required fields');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);
    setOrderPlaced(true);
    toast.success('Order placed successfully! 🎉');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(236, 72, 153); // Pink color
    pdf.text('Sweet Delight Cake Shop', 105, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Invoice', 105, 30, { align: 'center' });
    
    // Order Details
    pdf.setFontSize(10);
    pdf.text(`Order Number: ${orderNumber}`, 20, 45);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);
    
    // Customer Details
    pdf.setFontSize(12);
    pdf.text('Customer Details:', 20, 65);
    pdf.setFontSize(10);
    pdf.text(`Name: ${formData.name}`, 20, 72);
    pdf.text(`Mobile: ${formData.mobile}`, 20, 79);
    pdf.text(`Email: ${formData.email}`, 20, 86);
    pdf.text(`Address: ${formData.address}`, 20, 93);
    
    // Items Table Header
    let yPos = 110;
    pdf.setFontSize(12);
    pdf.text('Items:', 20, yPos);
    yPos += 7;
    
    pdf.setFontSize(10);
    pdf.text('Item', 20, yPos);
    pdf.text('Qty', 120, yPos);
    pdf.text('Price', 150, yPos);
    pdf.text('Total', 180, yPos);
    yPos += 5;
    
    // Line
    pdf.line(20, yPos, 190, yPos);
    yPos += 7;
    
    // Items
    cart.forEach((item) => {
      pdf.text(item.name, 20, yPos);
      pdf.text(item.quantity.toString(), 120, yPos);
      pdf.text(`₹${item.price}`, 150, yPos);
      pdf.text(`₹${item.price * item.quantity}`, 180, yPos);
      yPos += 7;
    });
    
    // Line
    yPos += 5;
    pdf.line(20, yPos, 190, yPos);
    yPos += 10;
    
    // Totals
    pdf.text('Subtotal:', 150, yPos);
    pdf.text(`₹${subtotal.toFixed(2)}`, 180, yPos);
    yPos += 7;
    
    pdf.text('GST (18%):', 150, yPos);
    pdf.text(`₹${gst.toFixed(2)}`, 180, yPos);
    yPos += 7;
    
    if (discount > 0) {
      pdf.text(`Discount (${discount}%):`, 150, yPos);
      pdf.text(`-₹${discountAmount.toFixed(2)}`, 180, yPos);
      yPos += 7;
    }
    
    pdf.setFontSize(12);
    pdf.text('Grand Total:', 150, yPos);
    pdf.text(`₹${total.toFixed(2)}`, 180, yPos);
    yPos += 10;
    
    pdf.setFontSize(10);
    pdf.text(`Payment Method: ${formData.paymentMethod.toUpperCase()}`, 20, yPos);
    
    // Footer
    pdf.setFontSize(8);
    pdf.text('Thank you for your order!', 105, 280, { align: 'center' });
    pdf.text('Sweet Delight Cake Shop - Making your celebrations sweeter!', 105, 285, { align: 'center' });
    
    pdf.save(`invoice-${orderNumber}.pdf`);
    toast.success('Invoice downloaded successfully!');
  };

  const handleNewOrder = () => {
    clearCart();
    setOrderPlaced(false);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      address: '',
      paymentMethod: 'cash',
    });
    setDiscount(0);
    navigate('/shop');
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Success Message */}
            <Card className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Order Placed Successfully! 🎉</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Thank you for your order. Your order number is:
                </p>
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {orderNumber}
                </div>
              </CardContent>
            </Card>

            {/* Invoice */}
            <Card ref={invoiceRef} className="invoice-content">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-2">Sweet Delight Cake Shop</CardTitle>
                  <p className="text-pink-100">Invoice</p>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Order Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8 pb-6 border-b">
                  <div>
                    <h3 className="font-bold mb-2">Order Details</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order Number: <span className="font-semibold text-black dark:text-white">{orderNumber}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Date: <span className="font-semibold text-black dark:text-white">{new Date().toLocaleDateString()}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Time: <span className="font-semibold text-black dark:text-white">{new Date().toLocaleTimeString()}</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Customer Details</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Name: <span className="font-semibold text-black dark:text-white">{formData.name}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mobile: <span className="font-semibold text-black dark:text-white">{formData.mobile}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Email: <span className="font-semibold text-black dark:text-white">{formData.email}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Address: <span className="font-semibold text-black dark:text-white">{formData.address}</span>
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                  <h3 className="font-bold mb-4">Order Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Item</th>
                          <th className="text-center py-2">Quantity</th>
                          <th className="text-right py-2">Price</th>
                          <th className="text-right py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-3">{item.name}</td>
                            <td className="text-center py-3">{item.quantity}</td>
                            <td className="text-right py-3">₹{item.price}</td>
                            <td className="text-right py-3">₹{item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%):</span>
                      <span className="font-semibold">₹{gst.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%):</span>
                        <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Grand Total:</span>
                      <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm">
                      <span className="font-semibold">Payment Method:</span> {formData.paymentMethod.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center print:hidden">
                  <Button onClick={handlePrint} variant="outline">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Invoice
                  </Button>
                  <Button onClick={handleDownloadPDF} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={handleNewOrder}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    New Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">
            Checkout & <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Billing</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Billing Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label>Payment Method *</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi">UPI</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center pb-3 border-b">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                      <span className="font-semibold">₹{gst.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between text-xl font-bold">
                      <span>Grand Total</span>
                      <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

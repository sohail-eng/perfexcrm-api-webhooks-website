'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  BarChart3, Users, DollarSign, ShoppingBag, Download, TrendingUp,
  Calendar, Settings, CreditCard, Package, Webhook, LogOut, RefreshCw,
  ExternalLink, Plus, CheckCircle, XCircle, AlertCircle, Loader2,
  ArrowUpRight, ArrowDownRight, Copy, Eye, Mail
} from 'lucide-react';
import StripeSetupModal from '@/components/StripeSetupModal';
import SmtpSettings from '@/components/SmtpSettings';
import type { AdminUser, StripeConfig, Sale, Stats, ChartData } from '@/types/admin';

export default function EnhancedAdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stripe Configuration State
  const [stripeConfig, setStripeConfig] = useState<StripeConfig | null>(null);
  const [stripeConnecting, setStripeConnecting] = useState(false);
  const [productsCreating, setProductsCreating] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  
  // Sales & Stats State
  const [stats, setStats] = useState<Stats | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [period, setPeriod] = useState('30days');

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/check');
      if (!response.ok) {
        router.push('/admin-login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      router.push('/admin-login');
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load configuration
      const configRes = await fetch('/api/admin/config');
      const configData = await configRes.json();
      setStripeConfig(configData.stripe);

      // Load Stripe setup status
      const stripeRes = await fetch('/api/admin/stripe/setup');
      const stripeData = await stripeRes.json();
      if (stripeData.connected) {
        setStripeConfig((prev: StripeConfig | null) => ({ ...prev, ...stripeData.config } as StripeConfig));
      }

      // Load sales data
      const salesRes = await fetch(`/api/admin/sales?period=${period}`);
      const salesData = await salesRes.json();
      setStats(salesData.stats);
      setSales(salesData.recentSales || []);
      setChartData(salesData.chartData || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectStripe = () => {
    setShowStripeModal(true);
  };

  const handleStripeSuccess = () => {
    setShowStripeModal(false);
    loadDashboardData();
  };

  const createProducts = async () => {
    setProductsCreating(true);
    try {
      const response = await fetch('/api/admin/stripe/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create products');
      }

      const data = await response.json();
      alert('Products created successfully!');
      loadDashboardData();
    } catch (error: any) {
      alert(error.message || 'Failed to create products');
    } finally {
      setProductsCreating(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => loadDashboardData()}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stripe Setup Banner */}
      {!stripeConfig?.connected && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-amber-600 mr-3" />
                <div>
                  <p className="font-semibold text-amber-900">Stripe Setup Required</p>
                  <p className="text-sm text-amber-700">Connect your Stripe account to start accepting payments</p>
                </div>
              </div>
              <button
                onClick={connectStripe}
                disabled={stripeConnecting}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                {stripeConnecting ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Connecting...
                  </span>
                ) : (
                  'Connect Stripe'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'sales', label: 'Sales', icon: ShoppingBag },
              { id: 'stripe', label: 'Stripe Setup', icon: CreditCard },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'smtp', label: 'Email Settings', icon: Mail },
              { id: 'webhooks', label: 'Webhooks', icon: Webhook },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +12.5%
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${stats?.totalRevenue || 0}
                </div>
                <div className="text-sm text-slate-600">Total Revenue</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-blue-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +8.2%
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {stats?.totalSales || 0}
                </div>
                <div className="text-sm text-slate-600">Total Sales</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-purple-600">
                    {stats?.regularSales || 0} Regular
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {stats?.extendedSales || 0}
                </div>
                <div className="text-sm text-slate-600">Extended Licenses</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-orange-600">
                    ${stats?.averageOrderValue || 0}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {stripeConfig?.isLive ? 'Live' : 'Test'} Mode
                </div>
                <div className="text-sm text-slate-600">Stripe Status</div>
              </motion.div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Recent Sales</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.customerName || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            sale.licenseType === 'extended'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {sale.licenseType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${(sale.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(sale.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-primary-600 hover:text-primary-700">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">All Sales</h2>
                <select
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                    loadDashboardData();
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="all">All time</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sales.length > 0 ? sales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-900">
                            {sale.id.substring(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.customerName || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              sale.licenseType === 'extended'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {sale.licenseType}
                            </span>
                            <div className="text-xs text-gray-500 mt-1 font-mono">{sale.licenseKey}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${(sale.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            sale.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : sale.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(sale.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          No sales yet. Share your website to start selling!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stripe' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Stripe Configuration</h2>
              
              {stripeConfig?.connected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-semibold text-green-900">Stripe Connected</p>
                        <p className="text-sm text-green-700">Account: {stripeConfig.accountId}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stripeConfig.isLive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {stripeConfig.isLive ? 'Live Mode' : 'Test Mode'}
                    </span>
                  </div>

                  {!stripeConfig.hasProducts && (
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="font-semibold text-amber-900 mb-2">Products Not Created</p>
                      <p className="text-sm text-amber-700 mb-4">
                        Create your products in Stripe to start accepting payments
                      </p>
                      <button
                        onClick={createProducts}
                        disabled={productsCreating}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                      >
                        {productsCreating ? (
                          <span className="flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Creating Products...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Products
                          </span>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="pt-4">
                    <a
                      href="https://dashboard.stripe.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                    >
                      Open Stripe Dashboard
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Connect Your Stripe Account</h3>
                  <p className="text-gray-600 mb-6">
                    Connect your Stripe account to start accepting payments automatically
                  </p>
                  <button
                    onClick={connectStripe}
                    disabled={stripeConnecting}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {stripeConnecting ? (
                      <span className="flex items-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Connecting...
                      </span>
                    ) : (
                      'Connect with Stripe'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Product Configuration</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Regular License */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Regular License</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        $89.00
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Single Domain License</p>
                          <p className="text-sm text-gray-600">Use on one domain only</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">6 Months Support</p>
                          <p className="text-sm text-gray-600">Get help when you need it</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">1 Year Updates</p>
                          <p className="text-sm text-gray-600">All updates and bug fixes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Full API Access</p>
                          <p className="text-sm text-gray-600">Complete REST API endpoints</p>
                        </div>
                      </div>
                    </div>
                    {stripeConfig?.regularPriceId && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">Stripe Price ID:</p>
                        <p className="text-xs font-mono text-gray-800">{stripeConfig.regularPriceId}</p>
                      </div>
                    )}
                  </div>

                  {/* Extended License */}
                  <div className="border rounded-lg p-6 border-purple-200 bg-purple-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Extended License</h3>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        $449.00
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Unlimited Domains</p>
                          <p className="text-sm text-gray-600">Use on unlimited domains</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">12 Months Priority Support</p>
                          <p className="text-sm text-gray-600">Priority assistance and guidance</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Lifetime Updates</p>
                          <p className="text-sm text-gray-600">Never miss an update</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">SaaS & Resale Rights</p>
                          <p className="text-sm text-gray-600">Build and sell your own SaaS</p>
                        </div>
                      </div>
                    </div>
                    {stripeConfig?.extendedPriceId && (
                      <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                        <p className="text-xs text-gray-600">Stripe Price ID:</p>
                        <p className="text-xs font-mono text-gray-800">{stripeConfig.extendedPriceId}</p>
                      </div>
                    )}
                  </div>
                </div>

                {!stripeConfig?.hasProducts && (
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3" />
                      <div>
                        <p className="font-semibold text-amber-900">Products Not Created in Stripe</p>
                        <p className="text-sm text-amber-700 mt-1">
                          Go to the Stripe Setup tab to create your products and start accepting payments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'smtp' && (
          <div className="space-y-6">
            <SmtpSettings />
          </div>
        )}

        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Webhook Events</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <p className="font-semibold text-blue-900">Webhook Endpoint</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Your webhook endpoint is automatically configured when you connect Stripe.
                        </p>
                        <div className="mt-2 p-2 bg-white rounded border border-blue-200">
                          <p className="text-xs font-mono text-gray-800">
                            {process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/api/webhook/stripe
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg">
                    <div className="p-4 bg-gray-50">
                      <h3 className="font-medium">Handled Events</h3>
                    </div>
                    <div className="divide-y">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">checkout.session.completed</p>
                            <p className="text-sm text-gray-600">Triggered when a customer completes payment</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">payment_intent.succeeded</p>
                            <p className="text-sm text-gray-600">Confirms successful payment processing</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">payment_intent.payment_failed</p>
                            <p className="text-sm text-gray-600">Handles failed payment attempts</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">charge.refunded</p>
                            <p className="text-sm text-gray-600">Processes refund requests</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">General Settings</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue="PerfexCRM Modules"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    defaultValue={process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm">Send email on new sale</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm">Send email on failed payment</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm">Daily sales summary</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stripe Setup Modal */}
      <StripeSetupModal
        isOpen={showStripeModal}
        onClose={() => setShowStripeModal(false)}
        onSuccess={handleStripeSuccess}
      />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Key, Mail, Calendar, FileText, Shield, CheckCircle } from 'lucide-react';

export default function MembersArea() {
  const [licenseKey, setLicenseKey] = useState('');
  const [email, setEmail] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/members/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licenseKey, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMemberData(data);
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setError('');

    try {
      const response = await fetch('/api/members/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licenseKey, email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Trigger download
        window.open(data.downloadUrl, '_blank');
        // Refresh member data to update download count
        setTimeout(() => {
          handleVerification({ preventDefault: () => {} });
        }, 1000);
      } else {
        setError(data.error || 'Download failed');
      }
    } catch (error) {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Members Area
            </h1>
            <p className="text-xl text-blue-200">
              Access your PerfexCRM API & Webhooks Module downloads and license information
            </p>
          </div>

          {!memberData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Shield className="mr-3 text-blue-400" />
                License Verification
              </h2>

              <form onSubmit={handleVerification} className="space-y-6">
                <div>
                  <label className="block text-white mb-2 font-medium">
                    License Key
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter your license key"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-200">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Access Members Area'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-gray-300 text-sm text-center">
                  Enter the license key and email address you received after purchase to access your downloads.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* License Info Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="mr-3 text-green-400" />
                  License Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Product Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="font-medium">Product:</span> {memberData.product.name}
                      </p>
                      <p className="text-gray-300">
                        <span className="font-medium">License Type:</span>{' '}
                        <span className="capitalize bg-blue-500/20 px-2 py-1 rounded text-blue-200">
                          {memberData.product.licenseType}
                        </span>
                      </p>
                      <p className="text-gray-300">
                        <span className="font-medium">Customer:</span> {memberData.customerName || memberData.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Usage Statistics</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Purchased: {new Date(memberData.purchaseDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-300 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Downloads: {memberData.downloadCount}
                      </p>
                      {memberData.lastDownloadAt && (
                        <p className="text-gray-300">
                          <span className="font-medium">Last Download:</span>{' '}
                          {new Date(memberData.lastDownloadAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="mr-3 text-blue-400" />
                  Download Module
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-white">
                      PerfexCRM API & Webhooks Module ({memberData.product.licenseType})
                    </h3>
                    <p className="text-gray-300">
                      Latest version with all features and documentation
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {downloading ? 'Preparing...' : 'Download Now'}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-200">{error}</p>
                  </div>
                )}
              </div>

              {/* License Features */}
              {memberData.product.features && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    License Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(memberData.product.features).map(([key, value]) => (
                      <div key={key} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        {typeof value === 'boolean' && value && (
                          <span className="ml-2 text-green-400">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setMemberData(null);
                    setLicenseKey('');
                    setEmail('');
                    setError('');
                  }}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Access Different License
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
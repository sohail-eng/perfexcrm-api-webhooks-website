'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LicensePage() {
  const regularFeatures = [
    'Use on single domain/installation',
    '6 months of support included',
    '1 year of updates',
    'Full source code access',
    'API documentation',
    'Installation support',
  ];

  const extendedFeatures = [
    'Use on unlimited domains/installations',
    'Can be used in SaaS applications',
    'White-label for clients',
    '12 months of support included',
    'Lifetime updates',
    'Priority support',
    'Custom feature requests',
    'Full source code access',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6"
          >
            <FileText className="w-10 h-10 text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Commercial License Agreement
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            PerfexCRM API & Webhooks Module License Terms
          </motion.p>
        </div>
      </section>

      {/* License Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">License Types</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Regular License */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Regular License</h3>
                <span className="text-3xl font-bold text-primary-600">$89</span>
              </div>
              <ul className="space-y-3 mb-6">
                {regularFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#pricing"
                className="block w-full py-3 bg-slate-100 text-slate-700 text-center rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                Purchase Regular License
              </Link>
            </motion.div>

            {/* Extended License */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg p-8 border-2 border-primary-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Extended License</h3>
                <span className="text-3xl font-bold text-primary-600">$449</span>
              </div>
              <ul className="space-y-3 mb-6">
                {extendedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#pricing"
                className="block w-full py-3 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Purchase Extended License
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* License Terms */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">License Terms</h2>
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. License Grant</h3>
              <p className="text-slate-600">
                This license grants you the right to use one copy of the software on a single PerfexCRM installation
                according to the license type purchased.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Restrictions</h3>
              <p className="text-slate-600">
                You may NOT redistribute the source code, sell or sublicense the module, remove copyright notices,
                claim authorship of the code, or use without a valid license.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Support</h3>
              <p className="text-slate-600">
                Support is provided according to your license type. Regular License includes 6 months of support,
                Extended License includes 12 months. Extended support can be purchased separately.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Updates</h3>
              <p className="text-slate-600">
                Updates are provided according to your license type. Regular License includes 1 year of updates,
                Extended License includes lifetime updates.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">5. Warranty Disclaimer</h3>
              <p className="text-slate-600">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">6. Limitation of Liability</h3>
              <p className="text-slate-600">
                IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">7. Termination</h3>
              <p className="text-slate-600">
                This license is effective until terminated. It will terminate automatically without notice if you
                fail to comply with any provision of this license. Upon termination, you must destroy all copies
                of the software.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">8. Governing Law</h3>
              <p className="text-slate-600">
                This license shall be governed by and construed in accordance with applicable laws without regard
                to its conflict of law provisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I use the Regular License for multiple domains?</h3>
              <p className="text-slate-600">
                No, the Regular License is for a single domain/installation only. For multiple domains,
                you need the Extended License.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I modify the source code?</h3>
              <p className="text-slate-600">
                Yes, you can modify the source code for your own use. However, you cannot redistribute
                the modified code.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">What happens when my support expires?</h3>
              <p className="text-slate-600">
                The module will continue to work, but you won\'t receive support. You can purchase
                extended support separately if needed.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-slate-600">
                We offer a 30-day money-back guarantee. See our <Link href="/refund" className="text-primary-600 hover:text-primary-700">refund policy</Link> for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Questions about licensing?</h2>
          <p className="text-slate-600 mb-6">
            Contact our sales team for help choosing the right license for your needs.
          </p>
          <Link
            href="/support"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
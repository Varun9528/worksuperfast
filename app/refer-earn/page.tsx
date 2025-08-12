'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReferEarn() {
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    verifiedJobs: 0,
    totalEarnings: 0,
    pendingRewards: 0
  });
  const [referralHistory, setReferralHistory] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let userCode = localStorage.getItem('referralCode');
    if (!userCode) {
      userCode = 'WSF' + crypto.randomUUID().slice(0, 8).toUpperCase();
      localStorage.setItem('referralCode', userCode);
    }
    setReferralCode(userCode);

    setReferralStats({
      totalReferrals: 12,
      verifiedJobs: 8,
      totalEarnings: 800,
      pendingRewards: 300
    });

    setReferralHistory([
      {
        id: 1,
        referredUser: 'Rahul Sharma',
        joinDate: '2024-01-15',
        jobCompleted: '2024-01-20',
        reward: 100,
        status: 'rewarded'
      },
      {
        id: 2,
        referredUser: 'Priya Patel',
        joinDate: '2024-01-18',
        jobCompleted: '2024-01-25',
        reward: 100,
        status: 'rewarded'
      },
      {
        id: 3,
        referredUser: 'Amit Kumar',
        joinDate: '2024-01-22',
        jobCompleted: null,
        reward: 100,
        status: 'pending'
      },
      {
        id: 4,
        referredUser: 'Deepika Reddy',
        joinDate: '2024-01-25',
        jobCompleted: '2024-01-30',
        reward: 100,
        status: 'rewarded'
      },
      {
        id: 5,
        referredUser: 'Suresh Gupta',
        joinDate: '2024-01-28',
        jobCompleted: null,
        reward: 100,
        status: 'pending'
      }
    ]);
  }, []);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareReferral = (platform) => {
    const message = `Join WorkSuperFast and start earning! Use my referral code: ${referralCode} to get started. https://worksuperfast.com/register?ref=${referralCode}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=https://worksuperfast.com/register?ref=${referralCode}&text=${encodeURIComponent(message)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=https://worksuperfast.com/register?ref=${referralCode}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Refer & Earn
            </h1>
            <p className="text-xl text-gray-600">
              Earn ₹100 for every successful referral when they complete their first job
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Referral Code</h2>

                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Your unique referral code:</p>
                      <p className="text-3xl font-bold text-blue-600">{referralCode}</p>
                    </div>
                    <button
                      onClick={copyReferralCode}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
                    >
                      <i className="ri-file-copy-line"></i>
                      <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share on Social Media</h3>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => shareReferral('whatsapp')}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
                    >
                      <i className="ri-whatsapp-line"></i>
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => shareReferral('telegram')}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 whitespace-nowrap"
                    >
                      <i className="ri-telegram-line"></i>
                      <span>Telegram</span>
                    </button>

                    <button
                      onClick={() => shareReferral('facebook')}
                      className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2 whitespace-nowrap"
                    >
                      <i className="ri-facebook-line"></i>
                      <span>Facebook</span>
                    </button>

                    <button
                      onClick={() => shareReferral('twitter')}
                      className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2 whitespace-nowrap"
                    >
                      <i className="ri-twitter-line"></i>
                      <span>Twitter</span>
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">How It Works</h3>
                  <div className="space-y-3 text-yellow-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">1</div>
                      <p>Share your referral code with friends and family</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">2</div>
                      <p>They register using your code and join as contractors</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">3</div>
                      <p>When they complete their first verified job, you earn ₹100</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Referral History</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Referred User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Job Completed</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Reward</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralHistory.map((referral, index) => (
                        <tr key={referral.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">{referral.referredUser}</td>
                          <td className="py-4 px-4">{referral.joinDate}</td>
                          <td className="py-4 px-4">{referral.jobCompleted || 'Pending'}</td>
                          <td className="py-4 px-4">₹{referral.reward}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${referral.status === 'rewarded'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {referral.status === 'rewarded' ? 'Rewarded' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Earnings Summary</h2>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">₹{referralStats.totalEarnings}</div>
                    <div className="text-gray-600">Total Earnings</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 mb-1">{referralStats.totalReferrals}</div>
                      <div className="text-sm text-gray-600">Total Referrals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600 mb-1">{referralStats.verifiedJobs}</div>
                      <div className="text-sm text-gray-600">Verified Jobs</div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-200">
                    <div className="text-xl font-bold text-yellow-600 mb-2">₹{referralStats.pendingRewards}</div>
                    <div className="text-gray-600">Pending Rewards</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-4">Referral Tips</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <i className="ri-lightbulb-line text-yellow-400 text-xl mt-1"></i>
                    <p className="text-sm">Share your code with skilled professionals who are looking for work opportunities</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="ri-group-line text-yellow-400 text-xl mt-1"></i>
                    <p className="text-sm">Use social media and professional networks to reach more people</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="ri-heart-line text-yellow-400 text-xl mt-1"></i>
                    <p className="text-sm">Help your referrals complete their first job to unlock your reward</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
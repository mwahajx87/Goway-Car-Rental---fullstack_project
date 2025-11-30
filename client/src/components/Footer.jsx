import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, }}
            className='px-2 md:px-6 lg:px-9 xl:px-12 mt-60-sm mt-20 text-gray-500'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='flex flex-wrap justify-between items-start  gap-8 pb-6 py-4 border-bordercolor border-b border-t'>
                <div className=''>
                    <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        src={assets.logo} alt="logo" className=' h-8 md:h-9' />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='max-w-80 mt-3'>
                        Premium car rental services with a wide selection of luxury and everyday vehicels for all your driving needs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='flex items-center gap-3 mt-6'>
                        <a href="#"><img src={assets.facebook_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.instagram_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.twitter_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.gmail_logo} className='w-5 h-5' alt="" /></a>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='flex flex-wrap w-1/2  justify-between gap-8'>
                    <div>
                        <h2 className='text-base ont-medium text-gray-800 uppercase'>Quick Links</h2>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Browser Cars</a></li>
                            <li><a href="#">List Your Car</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-base ont-medium text-gray-800 uppercase'>Resources</h2>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms Of Services</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-base ont-medium text-gray-800 uppercase'>Contact</h2>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="#">123 Luxuey Drive</a></li>
                            <li><a href="#">san francisco'CA 94107</a></li>
                            <li><a href="#">+923323613357</a></li>
                            <li><a href="#">info@example.com</a></li>
                        </ul>
                    </div>

                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All right reversed.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#"></a></li><li>|</li>
                    <li><a href="#">Terms</a></li><li>|</li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </motion.div>
        </motion.div>

    )
}

export default Footer

import Title from "../components/Title";
import { motion } from "motion/react";

const About_us = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-2 md:px-6 lg:px-9 xl:px-12 py-12 md:py-16 lg:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Title
          title="About Goway Car Rental"
          subtitle="Your journey begins with comfort, safety, and reliability."
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-16">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Goway Car Rental is a customer-focused vehicle rental service
            committed to offering reliable, affordable, and convenient
            transportation options. Whether you are traveling for business,
            leisure, or long-term use, we provide a wide selection of vehicles
            designed to fit your needs.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Our mission is simple: make renting a car easy, transparent, and
            stress-free. We aim to raise industry standards by providing
            exceptional service, well-maintained vehicles, and a seamless
            booking experience from start to finish.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc ml-4 md:ml-6 text-gray-600 space-y-2 text-sm md:text-base">
            <li>Wide selection of vehicles for every budget and purpose</li>
            <li>24/7 customer support and roadside assistance</li>
            <li>Transparent pricing with no hidden fees</li>
            <li>Quick and easy online booking</li>
            <li>Regularly serviced and well-maintained vehicles</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
            Our Promise
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            At Goway Car Rental, your safety and satisfaction come first. Every
            vehicle goes through a thorough inspection before each rental to
            ensure a smooth, comfortable, and worry-free ride. Our team works
            tirelessly to deliver an experience that keeps you coming back.
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
            Customer Commitment
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            We are dedicated to providing a hassle-free rental experience with a
            customer-first mindset. Our team is always ready to assist you with
            bookings, support, or selecting the perfect vehicle for your needs.
          </p>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
            Fleet Quality & Safety
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Our vehicles undergo regular maintenance, safety checks, and deep
            cleaning. From compact cars to SUVs and luxury options, every car in
            our fleet is kept in top condition to ensure a smooth and safe
            driving experience.
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About_us;

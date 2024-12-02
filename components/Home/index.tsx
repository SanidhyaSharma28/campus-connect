"use client";
import { SignInButton } from "@clerk/nextjs";
import React from "react";
import CustomCarousel from "../carousel";
import { motion } from "framer-motion"; // Import framer-motion

const HomePage = () => {
  // Animation variants for hero section text and image
  const textVariant = {
    hidden: { opacity: 0, x: -100 }, // Text slides in from the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, // Transition effect
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 100 }, // Image slides in from the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, // Transition effect
  };

  // Variant for sliding in from the bottom (for carousel and footer sections)
  const slideFromBottom = {
    hidden: { opacity: 0, y: 100 }, // Start from below the viewport
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Animate to original position
  };

  // Features section animation variants
  const featureImageVariant = {
    hidden: { opacity: 0, x: -100 }, // Left-side image slides in from left
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Transition
  };

  const featureTextVariant = {
    hidden: { opacity: 0, x: 100 }, // Right-side text slides in from right
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Transition
  };

  // Hassle Free section sliding in from left
  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 }, // Start from the left
    visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Animate to original position
  };

  return (
    <div style={{ backgroundColor: "#FDF6F6" }}>
      <div>
        <title>Your Company</title>
        <meta name="description" content="Your awesome product landing page" />
      </div>

      {/* Hero Section */}
      <header className="bg-white">
        <nav
          className="container mx-auto flex justify-between items-center py-2"
          style={{ backgroundColor: "#002C54" }}
        >
          <div className="text-2xl font-bold text-white">Campus Connect</div>
          <div>
            <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 mr-4">
              About
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Contact
            </a>
          </div>
        </nav>

        {/* Hero Section Content */}
        <div className="container mx-auto flex items-center mb-10">
          {/* Left Side: Text (1/3 width) */}
          <motion.div
            className="w-2/5 text-center"
            variants={textVariant} // Apply text animation
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Connecting Students to Success.
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Resources and Alumni connections at Your Fingertips!
            </p>
            <a className="mt-6 inline-block px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-blue-700 transition">
              <SignInButton>SIGN IN</SignInButton>
            </a>
          </motion.div>

          {/* Right Side: Image (60% width) */}
          <motion.div
            className="w-3/5"
            variants={imageVariant} // Apply image animation
            initial="hidden"
            animate="visible"
          >
            <img
              src="/hero.jpg" // Replace with your image path
              alt="Your Product Image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto mt-5 mb-10 flex items-center"
      >
        {/* Left Side: Image */}
        <motion.div
          className="w-7/12 ml-5"
          variants={featureImageVariant} // Apply left-side image animation
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} // Only animate once when in view
        >
          <img
            src="resources.png"
            alt="Features"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Side: Text */}
        <motion.div
          className="w-5/12 pl-8"
          variants={featureTextVariant} // Apply right-side text animation
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ​​Welcome to Campus Connect!
          </h2>

          <p className="mt-2 text-gray-600">
            Your one-stop destination for comprehensive campus placement and
            internship resources, designed to connect students with
            opportunities and empower their career journeys!
          </p>
        </motion.div>
      </section>

      {/* Call to Action Section (Carousel) */}
      <motion.section
        className="text-center text-white"
        variants={slideFromBottom} // Apply slide-in from bottom animation
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Only animate once when in view
      >
        <CustomCarousel />
      </motion.section>

      {/* Hassle Free Section */}
      <motion.section
        className="bg-pink-100 py-20"
        variants={slideFromLeft} // Slide in the entire section from left
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Reducing all the hassle
          </h2>
          <p className="text-xl text-gray-600 mb-12 px-[70px]">
            Our mission is to simplify campus placements and internships by
            consolidating resources, tools, and connections—everything you
            currently manage across WhatsApp, Telegram, and Drive—into one
            efficient platform. We aim to make career readiness more accessible
            for students and alumni.
          </p>
          <div className="flex justify-center space-x-10">
            <div className="flex flex-col items-center">
              <img
                src="/Whats_app.jpg"
                alt="WhatsApp"
                className="w-72 h-64 mb-4 transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/telegram.jpg"
                alt="Telegram"
                className="w-72 h-64 mb-4 transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/google_drive.jpg"
                alt="Google Drive"
                className="w-72 h-64 mb-4 transform transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        className="bg-gray-800 py-10"
        variants={slideFromBottom} // Apply slide-in from bottom animation for footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center text-white">
          <div className="justify-center flex">
            <img className="h-14 w-20 rounded-md" src="/logo.png" />
          </div>
          <p className="mt-4 text-gray-500">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;

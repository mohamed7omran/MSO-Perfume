"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  console.log(theme);
  return (
    <div className="py-12">
      <div className="container">
        {/* Title with Fade-in Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-3xl font-bold md:text-4xl">About Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the story of Omran Perfumes, our vision, and our values.
          </p>
        </motion.div>

        {/* Image & Text Section */}
        <div className="mt-12 grid gap-12 md:grid-cols-2 items-center">
          {/* Image with Fade-in Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={theme === "dark" ? "/logo2.png" : "/logo.png"}
              alt="عطور عمران"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </motion.div>

          {/* Text with Slide-in Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-lg">
              {" "}
              Omran Perfumes began its journey over ten years ago, born out of a
              deep passion for authentic Arabian fragrances and a commitment to
              delivering high-quality products that merge tradition with
              modernity.
            </p>
            <p className="text-lg">
              At Omran Perfumes, we carefully select the finest natural
              ingredients from around the world. Our perfumes are created by
              expert perfumers to ensure unique and exceptional blends that meet
              our customers' tastes.
            </p>
            <h2 className="text-2xl font-bold pt-4">Our Vision</h2>
            <p className="text-lg">
              We aim to be the first choice for customers seeking luxurious,
              high-quality perfumes and to promote authentic Arabian fragrance
              culture locally and globally.
            </p>
            <h2 className="text-2xl font-bold pt-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-lg pr-4">
              <li>
                Quality: We are committed to offering high-quality products
                without compromise.
              </li>
              <li>
                Authenticity: We preserve the Arabic identity in our products
                with a modern twist.
              </li>
              <li>
                Innovation: We always strive to develop our offerings with
                unique fragrance formulas.
              </li>
              <li>
                Customer Satisfaction: Our customers’ satisfaction is our top
                priority.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Why Choose Us Section with Staggered Animation */}
        <div className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-bold text-center mb-8"
          >
            Why Choose Omran Perfumes?
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "High Quality",
                desc: "We use the finest natural ingredients and follow the highest quality standards in perfume making.",
              },
              {
                title: "Unique Blends",
                desc: "Our perfumes offer unique and distinctive compositions that combine traditional Arabian heritage with modern elegance.",
              },
              {
                title: "Exceptional Service",
                desc: "We provide outstanding customer service and strive to meet our clients’ needs in the best possible way.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="rounded-lg border p-6 text-center"
              >
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

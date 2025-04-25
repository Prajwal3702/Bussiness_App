import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Gallery categories
  const categories = ["Images", "Videos"];
  const [activeCategory, setActiveCategory] = useState("All");
// Gallery images data - using translations from translation file
const galleryImages = [
  {
    id: 1,
    src: "https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1745234896/Business_App/fgwfyycfr5tdx1kg2qlh.jpg",
    alt: t("gallery.image1.alt"), // "Farmers in Field"
    title: t("gallery.image1.title"), // "Our Farming Partners"
    description: t("gallery.image1.description"), // "Working closely with local farmers to ensure sustainable agricultural practices."
    category: t("gallery.category"),
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1745234885/Business_App/komxqhoaxvyo8ad07xrb.jpg",
    alt: t("gallery.image2.alt"), // "Harvesting Process"
    title: t("gallery.image2.title"), // "Harvest Season"
    description: t("gallery.image2.description"), // "Farmers harvesting crops using traditional and modern methods."
    category: t("gallery.category"),
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1745234884/Business_App/cfhb9ffo3vpaqyrrhalp.jpg",
    alt: t("gallery.image3.alt"), // "Organic Farming"
    title: t("gallery.image3.title"), // "Organic Cultivation"
    description: t("gallery.image3.description"), // "Promoting organic farming practices for better yield and sustainability."
    category: t("gallery.category"),
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1745234884/Business_App/wprvo8mjv0pmxbcwet3c.jpg",
    alt: t("gallery.image4.alt"), // "Farmer Training"
    title: t("gallery.image4.title"), // "Farmer Education Program"
    description: t("gallery.image4.description"), // "Regular training sessions to share modern farming techniques."
    category: t("gallery.category"),
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1745235158/Business_App/dofsxe03fxf3gbbtynx5.jpg",
    alt: t("gallery.image5.alt"), // "Farmer Training"
    title: t("gallery.image5.title"), // "World Of Spices"
    description: t("gallery.image5.description"), // "Common spices include cinnamon, black pepper, turmeric, cumin, and cardamom. Each spice has its unique taste."
    category: t("gallery.category"),
  },
];

  // Filter images based on category
  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1744972460/Business_App/yodt9st9oag7hdabcxs4.jpg"
            alt="Gallery Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center  items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-5xl md:text-6xl font-bold text-white mb-6"
>
  {t("gallery.title")}
</motion.h1>
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="text-xl text-white/90 leading-relaxed max-w-2xl"
>
  {t("gallery.description")}
</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        {/* Category Filter */}
        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

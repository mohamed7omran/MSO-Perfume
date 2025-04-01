"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold md:text-4xl">من نحن؟</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            تعرف على قصة عطور عمران ورؤيتنا وقيمنا
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
              src="/logo2.png?height=600&width=600&text=صورة العلامة التجارية"
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
            <h2 className="text-2xl font-bold">قصتنا</h2>
            <p className="text-lg">
              بدأت رحلة عطور عمران منذ أكثر من عشر سنوات، حيث انطلقنا من شغفنا
              بالعطور العربية الأصيلة وحرصنا على تقديم منتجات ذات جودة عالية
              تجمع بين الأصالة والحداثة.
            </p>
            <p className="text-lg">
              نحرص في عطور عمران على اختيار أجود المكونات الطبيعية من مختلف
              أنحاء العالم، ونعتمد على خبراء متخصصين في صناعة العطور لضمان تقديم
              منتجات فريدة ومميزة تلبي أذواق عملائنا.
            </p>
            <h2 className="text-2xl font-bold pt-4">رؤيتنا</h2>
            <p className="text-lg">
              نسعى لأن نكون الخيار الأول للعملاء الباحثين عن العطور الفاخرة ذات
              الجودة العالية، وأن نساهم في نشر ثقافة العطور العربية الأصيلة
              محلياً وعالمياً.
            </p>
            <h2 className="text-2xl font-bold pt-4">قيمنا</h2>
            <ul className="list-disc list-inside space-y-2 text-lg pr-4">
              <li>الجودة: نلتزم بتقديم منتجات ذات جودة عالية دون مساومة.</li>
              <li>
                الأصالة: نحافظ على الهوية العربية في منتجاتنا مع لمسة عصرية.
              </li>
              <li>
                الابتكار: نسعى دائماً لتطوير منتجاتنا وتقديم تركيبات عطرية
                فريدة.
              </li>
              <li>رضا العملاء: نضع رضا عملائنا في مقدمة أولوياتنا.</li>
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
            لماذا تختار عطور عمران؟
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "جودة عالية",
                desc: "نستخدم أجود المكونات الطبيعية ونتبع أعلى معايير الجودة في صناعة عطورنا.",
              },
              {
                title: "تركيبات فريدة",
                desc: "نقدم تركيبات عطرية فريدة ومميزة تجمع بين الأصالة العربية والحداثة العالمية.",
              },
              {
                title: "خدمة متميزة",
                desc: "نقدم خدمة عملاء متميزة ونحرص على تلبية احتياجات عملائنا بأفضل طريقة ممكنة.",
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

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">من نحن؟</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            تعرف على قصة عطور العمران ورؤيتنا وقيمنا
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/logo.png?height=600&width=600&text=صورة العلامة التجارية"
              alt="عطور العمران"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">قصتنا</h2>
            <p className="text-lg">
              بدأت رحلة عطور العمران منذ أكثر من عشر سنوات، حيث انطلقنا من شغفنا
              بالعطور العربية الأصيلة وحرصنا على تقديم منتجات ذات جودة عالية
              تجمع بين الأصالة والحداثة.
            </p>
            <p className="text-lg">
              نحرص في عطور العمران على اختيار أجود المكونات الطبيعية من مختلف
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
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            لماذا تختار عطور العمران؟
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6 text-center">
              <h3 className="text-xl font-bold mb-4">جودة عالية</h3>
              <p>
                نستخدم أجود المكونات الطبيعية ونتبع أعلى معايير الجودة في صناعة
                عطورنا.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <h3 className="text-xl font-bold mb-4">تركيبات فريدة</h3>
              <p>
                نقدم تركيبات عطرية فريدة ومميزة تجمع بين الأصالة العربية
                والحداثة العالمية.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <h3 className="text-xl font-bold mb-4">خدمة متميزة</h3>
              <p>
                نقدم خدمة عملاء متميزة ونحرص على تلبية احتياجات عملائنا بأفضل
                طريقة ممكنة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

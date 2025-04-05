"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ReturnPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex min-h-screen flex-col"
    >
      <main className="flex-1 container py-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">سياسة الإرجاع والاستبدال</h1>
          <p className="text-muted-foreground">آخر تحديث: ١ أبريل ٢٠٢٤</p>

          <Card>
            <CardHeader>
              <CardTitle>شروط الإرجاع</CardTitle>
              <CardDescription>الشروط العامة لإرجاع المنتجات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                في OMRAN-PERFUMES، نحن نسعى جاهدين لضمان رضاك التام عن مشترياتك.
                إذا كنت غير راضٍ عن منتج اشتريته منا، يمكنك إرجاعه وفقًا للشروط
                التالية:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>يجب إرجاع المنتج في غضون 3 يومًا من تاريخ الاستلام.</li>
                <li>
                  يجب أن يكون المنتج في حالته الأصلية، غير مستخدم وبعبوته
                  الأصلية.
                </li>
                <li>يجب تقديم إيصال الشراء أو دليل الشراء.</li>
                <li>
                  لا يمكن إرجاع العطور المفتوحة أو المستخدمة لأسباب صحية وأمنية.
                </li>
                <li>
                  لا يمكن إرجاع المنتجات المخفضة أو المباعة في عروض خاصة إلا في
                  حالة وجود عيب مصنعي.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>عملية الإرجاع</CardTitle>
              <CardDescription>كيفية إرجاع المنتج</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>لإرجاع منتج، يرجى اتباع الخطوات التالية:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  اتصل بخدمة العملاء على الرقم 201030576522+ لإبلاغنا برغبتك في
                  الإرجاع.
                </li>
                {/* <li>
                  قم بتعبئة نموذج الإرجاع الذي سيتم إرساله إليك عبر البريد
                  الإلكتروني.
                </li> */}
                <li>قم بتغليف المنتج بشكل آمن في عبوته الأصلية.</li>
                {/* <li>أرسل المنتج إلى العنوان المذكور في نموذج الإرجاع.</li> */}
                <li>
                  بمجرد استلام المنتج وفحصه، سنقوم بمعالجة الإرجاع خلال ٧-١٠
                  أيام عمل.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>سياسة الاستبدال</CardTitle>
              <CardDescription>شروط استبدال المنتجات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                إذا كنت ترغب في استبدال منتج بدلاً من إرجاعه، فإننا نقدم خدمة
                الاستبدال وفقًا للشروط التالية:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>يمكن استبدال المنتج في غضون 3 يومًا من تاريخ الاستلام.</li>
                <li>
                  يجب أن يكون المنتج في حالته الأصلية، غير مستخدم وبعبوته
                  الأصلية.
                </li>
                <li>
                  يمكن استبدال المنتج بمنتج آخر من نفس القيمة أو أعلى (مع دفع
                  الفرق).
                </li>
                <li>
                  في حالة عدم توفر المنتج المطلوب للاستبدال، يمكنك اختيار منتج
                  آخر أو استرداد المبلغ.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>استرداد المبالغ</CardTitle>
              <CardDescription>كيفية استرداد المبالغ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                في حالة الموافقة على إرجاع المنتج، سيتم استرداد المبلغ وفقًا
                للشروط التالية:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>سيتم استرداد المبلغ بنفس طريقة الدفع الأصلية.</li>
                <li>
                  قد يستغرق استرداد المبلغ من ٧ إلى ١٤ يوم عمل، اعتمادًا على
                  البنك أو شركة بطاقة الائتمان.
                </li>
                <li>
                  سيتم خصم تكاليف الشحن الأصلية من المبلغ المسترد، ما لم يكن سبب
                  الإرجاع هو عيب في المنتج.
                </li>
                <li>
                  في حالة استلام منتج معيب أو تالف، سنقوم باسترداد كامل المبلغ
                  بما في ذلك تكاليف الشحن.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الاستثناءات</CardTitle>
              <CardDescription>المنتجات غير القابلة للإرجاع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>بعض المنتجات غير قابلة للإرجاع أو الاستبدال، وتشمل:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>العطور المفتوحة أو المستخدمة.</li>
                <li>المنتجات المخصصة حسب الطلب.</li>
                <li>
                  المنتجات المباعة كجزء من مجموعة أو حزمة، إلا إذا تم إرجاع
                  الحزمة بأكملها.
                </li>
                <li>
                  المنتجات المشتراة خلال عروض "البيع النهائي" أو "لا إرجاع".
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>اتصل بنا</CardTitle>
              <CardDescription>
                للاستفسارات حول سياسة الإرجاع والاستبدال
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                إذا كان لديك أي استفسارات حول سياسة الإرجاع والاستبدال، يرجى
                الاتصال بنا:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>البريد الإلكتروني: info@omranperfumes.com</li>
                <li>الهاتف: 201030576522+</li>
                <li>
                  ساعات العمل: من السبت إلى الخميس، من ٩ صباحًا حتى ٦ مساءً
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </motion.div>
  );
}

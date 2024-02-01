// إنشاء مثيل من Pixi Application
const app = new PIXI.Application({
  width: 800, // عرض النافذة
  height: 600, // ارتفاع النافذة
  backgroundColor: 0x000000, // لون الخلفية
});

// إضافة عنصر canvas إلى الصفحة
document.body.appendChild(app.view);

// تحميل الصورة والملف المساعد
app.loader
  .add("image", "water.") // الصورة التي سيتم تطبيق التأثير عليها
  .add("displacement", "displacement.png") // الملف المساعد لإنشاء تأثير الانحراف
  .load(setup);

// هذه الدالة تعمل بعد اكتمال التحميل
function setup() {
  // إنشاء رذاذ من الصورة
  const sprite = new PIXI.Sprite(app.loader.resources.image.texture);

  // إضافة الرذاذ إلى المرحلة
  app.stage.addChild(sprite);

  // إنشاء رذاذ من الملف المساعد
  const displacementSprite = new PIXI.Sprite(
    app.loader.resources.displacement.texture
  );

  // إنشاء مرشح انحراف باستخدام الرذاذ
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );

  // إضافة الرذاذ والمرشح إلى المرحلة
  app.stage.addChild(displacementSprite);
  app.stage.filters = [displacementFilter];

  // تعديل بعض الخصائص للحصول على تأثير موجة مائية
  displacementSprite.scale.x = 4;
  displacementSprite.scale.y = 4;
  displacementFilter.scale.x = 100;
  displacementFilter.scale.y = 100;

  // إنشاء حركة متكررة للرذاذ باستخدام GSAP
  gsap.to(displacementSprite, {
    duration: 2, // مدة الحركة بالثواني
    x: "+=200", // تحريك الرذاذ بمقدار 200 بكسل على محور السينات
    repeat: -1, // تكرار الحركة إلى ما لا نهاية
    yoyo: true, // عكس الحركة في كل تكرار
    ease: "sine.inOut", // نوع الحركة
  });
}
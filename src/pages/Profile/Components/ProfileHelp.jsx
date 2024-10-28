import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdContentCopy } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileHelp = () => {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@yalli.org");
      toast.success('Email panoya kopyalandı!');
    } catch (error) {
      toast.error('Email kopyalama uğursuz oldu');
    }
  };
  return (
    <div className="profile-help">
      <div className="head">
        <h4>Tez-tez Verilən Suallar (FAQ)</h4>
        <p>
          Platforma ilə bağlı suallarınız varsa və ya hər hansı bir mövzuda
          köməyə ehtiyacınız varsa aşağıya nəzər salın.
        </p>
      </div>
    <div className="accordion-con">
        <div className="accordion mt-4" id="faqAccordion">
          {[
            {
              id: "item1",
              question: "Platformanın məqsədi nədir?",
              answer: "Məqsədimiz, dünyadakı Azərbaycanlıları bir araya gətirərək güclü bir icma yaratmaqdır. Platformamız vasitəsilə insanlar bir-biri ilə əlaqə qura bilər, təcrübə və biliklərini paylaşa bilər, eyni zamanda sosial və professional əlaqələrini genişləndirə bilərlər. Həmçinin dünyanın müxtəlif ölkələrində mövcud olan fərqli icmalarla bir mərkəzdə tanış ola bilərlər. Yekun olaraq biz, həmyerlilərimizi Azərbaycan mədəniyyətini və dəyərlərini qorumaqla, həmrəyliyi və qarşılıqlı dəstəyə təşviq edirik."
            },
            {
              id: "item2",
              question: "İcmalara kim qoşula bilər?",
              answer: "Xaricdə yaşayan, təhsil alan və ya köçməyi planlaşdıran hər bir azərbaycanlı və ya bu mövzulara maraqlı olan şəxslər icmalara qoşula bilər."
            },
            {
              id: "item3",
              question: "Bu platformadan hansı köməyi gözləyə bilərəm?",
              answer: "Bu platformadan müxtəlif formalarda dəstək gözləyə bilərsiniz: digər Azərbaycanlılarla tanışlıq və networking imkanı, xaricdə yaşam, təhsil və işlə bağlı təcrübə və məlumat mübadiləsi, mentor dəstəyi almaq, eləcə də icma tədbirlərindən xəbərdar olmaq. Bu platforma sizin üçün həm sosial, həm də professional inkişaf mühiti yaradacaq."
            },
            {
              id: "item4",
              question: "Platformaya necə töhfə verə bilərəm?",
              answer: "Öz təcrübələrinizi mentor olaraq paylaşa, öz icmanızı platformaya əlavə edə və sizə maraqlı olan icmalara qoşula bilərsiniz. Həmçinin tədbirlərə qoşularaq həmyerlilərimizlə sosial bağınızı artıraraq, fotoları və xatirələri bizimlə bölüşə bilərsiniz. Həmçinin bizi sosial medianızda paylaşa bilərsiniz."
            },
            {
              id: "item5",
              question: "Gedəcəyim ölkədəki digər azərbaycanlılarla necə əlaqə qura bilərəm?",
              answer: "Müxtəlif ölkələr üzrə fərqli kateqoriyalarda qruplarımız var. Bu qruplarda siz qrup haqqında məlumatı və qalereyanı gösrəcəksiniz ki, bu da sizdə icma haqqında fikirləri formalaşdıracaq. Əgər arzulasanız, qrupa qoşul butonuna klikləyərək müvafiq platformaya keçid edəcəksiniz. Bu da bir çox icmalarla əlaqə qurmaq üçün sizə daha əlçatanlıq yaradacaq."
            },
            {
              id: "item6",
              question: "Platformaya qoşulmaq üçün ödəniş varmı?",
              answer: "Xeyr, platformaya qoşulmaq və iştirak etmək hər kəs üçün tamamilə ödənişsizdir."
            },
            {
              id: "item7",
              question: "Tədbir və görüşlər haqqında necə məlumat ala bilərəm?",
              answer: 'Müxtəlif ölkələrdə keçirilən Azərbaycan tədbirləri, mədəniyyət görüşləri və toplantılar haqqında müntəzəm olaraq məlumat paylaşırıq. Bu barədə məlumat almaq üçün veb-saytımızda "Tədbirlər" bölməsinə keçid edə  və ya sosial media səhifələrimizi izləyə bilərsiniz. Həmçinin sizə olduğunuz ölkənin tədbirləri ilə bağlı bildirişlər də gələcək.'
            },
            {
              id: "item8",
              question: "Məlumatlarımın təhlükəsizliyi necə təmin olunur?",
              answer: "Sizin məlumatlarınızın təhlükəsizliyi bizim üçün prioritetdir. Platformada qeydiyyatdan keçən və paylaşdığınız şəxsi məlumatlar müasir təhlükəsizlik standartlarına uyğun olaraq qorunur. Məlumatlarınız şifrələnir və üçüncü tərəflərlə paylaşılmır. İstifadəçi məlumatlarının məxfiliyi və təhlükəsizliyini təmin etmək üçün mütəmadi olaraq təhlükəsizlik yeniləmələri və yoxlamalar həyata keçirilir."
            }
          ].map(({ id, question, answer }) => (
            <div className="accordion-item" key={id}>
              <h2 className="accordion-header" id={`heading${id}`}>
                <button
                  className={`accordion-button ${open === id ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggle(id)}
                  aria-expanded={open === id}
                >
                  {question}
                </button>
              </h2>
              <div
                id={`collapse${id}`}
                className={`accordion-collapse collapse ${open === id ? "show" : ""}`}
                aria-labelledby={`heading${id}`}
              >
                <div className="accordion-body">
                  {answer}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
      <div className="bottom w-100">
        <div className="bottom-con">
          <h4>Əlavə sualınız var mı?</h4>
          <p className="py-2">
            Əgər sizı maraqlı olan suala burada cavab tapmadınızsa, bizə yazın!
          </p>
          <div className="email-copy dp-bettween" onClick={handleCopyEmail}>
            <p>contact@yalli.org</p>
            <MdContentCopy />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    
  );
};

export default ProfileHelp;

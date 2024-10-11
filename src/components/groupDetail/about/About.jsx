import React from "react";
import styles from "./style.module.scss";
const About = ({group}) => {
  return (
    <div className={styles["about"]}>
      <div className="container">
        <div className={styles["about"]}>
          <div>
            {group.country}da yaşayan Azərbaycanlılar üçün bu icma, həmvətənlərimizi bir
            araya gətirərək mədəni, sosial və ictimai həyatı daha zəngin və
            maraqlı etmək məqsədi ilə fəaliyyət göstərir. Bizim icmamızın əsas
            məqsədi Azərbaycanlıların birliyini möhkəmləndirmək, onların
            bir-biri ilə əlaqələrini gücləndirmək və mədəniyyətimizi daha geniş
            auditoriyaya çatdırmaqdır. İcma daxilində mütəmadi olaraq bir çox
            tədbirlər təşkil edilir ki, bu da həm vətənpərvərlik ruhunun
            artırılmasına, həm də Azərbaycan mədəniyyətinin təbliğinə xidmət
            edir.
            <p>
              Hər il ənənəvi olaraq keçirilən “{group.country}da Novruz Bayramı Şənliyi”
              icmamızın ən sevilən tədbirlərindən biridir. Bu bayramı qeyd
              etməklə, həm Novruz adətlərini yaşadırıq, həm də yeni nəsillərə
              milli bayramlarımızı sevdirməyə çalışırıq. Bundan əlavə, Qurban
              Bayramı Ziyafəti və Respublika Günü Qutlaması kimi böyük milli
              bayramlarımızın da xüsusi qeyd olunması təşkil edilir.{" "}
            </p>
          </div>

          <div>
            Bu tədbirlər yalnız Azərbaycanlıların deyil, {group.country}da yaşayan digər
            millətlərin də diqqətini cəlb edir, Azərbaycan ənənələri ilə
            yaxından tanış olmaq üçün bir fürsət yaradır. Mədəni tədbirlərimiz
            bununla bitmir. İcma üzvlərimizlə birgə “Azərbaycan Film Axşamları”
            keçirir, həmvətənlərimizə milli kinomuzun incilərini təqdim edirik.
            “Kitab Sevgisi Günü” isə kitabsevərlər üçün unikal bir məkan yaradır
            – burada həm Azərbaycan, həm də dünya ədəbiyyatının seçmə əsərləri
            müzakirə olunur.
          </div>
          <div>
            Şəhərin müxtəlif parklarında təşkil edilən “Bakıdan {group.country}ya
            Gəzinti” və həftəsonu “Açıq Hava Piknikləri” də üzvlər arasında
            böyük marağa səbəb olur, açıq hava tədbirlərimiz hər dəfə daha çox
            iştirakçını cəlb edir. Bundan başqa, icmamız xaricdə təhsil və iş
            imkanları ilə bağlı mütəmadi olaraq məsləhət görüşləri təşkil edir. 
            “Varşavada Təhsil və Karyera Günü” adlı tədbirimiz tələbələr və gənc
            mütəxəssislər üçün əvəzolunmaz bir şəbəkələşmə məkanıdır. Burada həm
            peşəkar təcrübə mübadilələri aparılır, həm də xaricdə karyera
            qurmağın yolları müzakirə olunur.{" "}
          </div>
       
        <div>
          Biz bu cür tədbirləri keçirərək Azərbaycanlı gənclərə dəstək olmağa,
          onların gələcək uğurlarına töhfə verməyə çalışırıq. Məqsədimiz,
          Azərbaycanlılar arasında birlik və dostluğu möhkəmləndirməklə yanaşı,
          yerli ictimaiyyətlə mədəniyyətimizi paylaşaraq onları Azərbaycan
          ənənələri ilə tanış etməkdir. İcma üzvlərimiz həm milli mədəniyyətin
          daşıyıcıları, həm də yerli {group.country} icmasında fəal iştirak edən
          insanlardır. “Azərbaycan Mədəniyyət Günü” tədbiri isə Polşalıları
          Azərbaycan mətbəxi, musiqisi və rəqsləri ilə tanış etmək üçün
          icmamızın təşkil etdiyi ən böyük tədbirlərdən biridir. Bu tədbir
          çərçivəsində həmvətənlərimiz milli dəyərlərimizi qorumaqla yanaşı,
          Polşa cəmiyyətinə Azərbaycan mədəniyyətini sevdirirlər.
        </div>
        </div>

      </div>
    </div>
  );
};

export default About;

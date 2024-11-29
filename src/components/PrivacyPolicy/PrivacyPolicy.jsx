import { MdOutlineMailOutline } from "react-icons/md";
import "./Policy.css";
const PrivacyPolicy = ({setPolicyState}) => {
  return (
    <div className="policy">
      <div className="policy-con">
        <h4>Məxfilik sözləşməsi və İstifadə şərtləri</h4>
        <span className="date">Tətbiq Tarixi: [Tarix]</span>
        <p>
          Yalli.org olaraq, məxfiliyinizi yüksək qiymətləndiririk və şəxsi
          məlumatlarınızı qorumağa sadiqik. Bu Məxfilik Siyasəti, topladığımız
          məlumatların növlərini, onları necə istifadə etdiyimizi və
          məlumatlarınızı qorumaq üçün gördüyümüz tədbirləri izah edir.
          Platformamızdan istifadə etməklə bu siyasətdə göstərilən təcrübələrə
          razı olduğunuzu təsdiq edirsiniz. <br /> 
           1. Topladığımız Məlumatlar
          Platformamızda qeydiyyatdan keçərkən və ya xidmətlərimizdən istifadə
          edərkən aşağıdakı şəxsi məlumatları toplayırıq: <br />
           Ad və Soyad <br /> 
           Doğum Tarixi  <br />
           Yaşadığınız Ölkə və şəhər <br /> E-poçt Ünvanı Ən Yüksək Təhsil
          Dərəcəsi Telefon Nömrəsi (ixtiyari)
        </p>
        <span className="send-message-span"><MdOutlineMailOutline />Surəti e-poçtuma göndərin</span>
        <div className="btns">
          <button onClick={()=>setPolicyState(false)} className="first btn">Ləğv edin</button>
          <button onClick={()=>setPolicyState(false)} className="btn">Qəbul edin</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

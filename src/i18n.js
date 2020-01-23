import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        Introduction: "Introduction",
        "Sign in":
          "Sign in",
        username: "User Name",
        "User Name": "User Name",
        passowrd: "Passowrd",
        "Passowrd": "Passowrd",
        forget_password: "Forgot password",
        "Forgot password": "Forgot password",
        signUp: "Don't have an account? Sign Up",
        "Don't have an account? Sign Up": "Don't have an account? Sign Up"
      }
    },
    ar: {
      translations: {
        Introduction: "Introduction",
        "Sign in":
          "تسجيل الدخول",
        username: "User Name",
        "User Name":
          "أدخل أسم المستخدم",
          passowrd: "Passowrd",
        "Passowrd": "رمز المرور",
        forget_password: "Forgot password",
        "Forgot password": "نسيت طلمة المرور؟",
        signUp: "Don't have an account? Sign Up",
        "Don't have an account? Sign Up": "ليس لديك حساب؟ سجل من هنا"

      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;

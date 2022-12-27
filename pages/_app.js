import { AuthProvider } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer theme='colored' position='bottom-right' />
    </AuthProvider>
  );
}

export default MyApp;

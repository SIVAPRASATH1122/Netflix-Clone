import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB85VHyFzAsB_V74oCo2DTU--0DqktTLQU",
  authDomain: "netflix-clone-da86e.firebaseapp.com",
  projectId: "netflix-clone-da86e",
  storageBucket: "netflix-clone-da86e.firebasestorage.app",
  messagingSenderId: "746459772129",
  appId: "1:746459772129:web:f820873dc45e25bbabb3a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ SIGNUP
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("🎉 Signup Successful");

  } catch (error) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      toast.error("📧 Email already in use");
    } else {
      toast.error("🙅 Invalid Credential");
    }
  }
};

// ✅ LOGIN
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful ✅");

  } catch (error) {
    console.log(error);
    toast.error(`🙅 Invalid Credential`);   // ✅ FIXED
  }
};

// ✅ LOGOUT
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully 👋");  // ✅ added toast
  } catch (error) {
    console.log(error);
    toast.error(`🙅 Invalid Credential`);
  }
};

export { auth, db, login, signup, logout };
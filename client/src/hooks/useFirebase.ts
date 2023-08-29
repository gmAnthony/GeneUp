import { auth, storage, db } from "../firebase/firebase";

function useFirebase() {
  return { auth, storage, db };
}

export { useFirebase };

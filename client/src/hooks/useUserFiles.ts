import { useState, useEffect } from "react";
import { useFirebase } from "../hooks/useFirebase";
import { query, where, getDocs, collection } from "firebase/firestore";

const useUserFiles = () => {
  const { auth, db } = useFirebase();
  const [files, setFiles] = useState<any[]>([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const fetchFiles = async () => {
      try {
        const fileQuery = query(
          collection(db, "files"),
          where("owner.userId", "==", uid)
        );

        const querySnapshot = await getDocs(fileQuery);
        const fil = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFiles(fil);
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    };

    fetchFiles();
  }, [uid, db]);

  return files;
};

export { useUserFiles };

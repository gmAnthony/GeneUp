import { useState, useEffect } from "react";
import { useFirebase } from "../hooks/useFirebase";
import { query, where, getDocs, collection } from "firebase/firestore";

const useUserOrganizations = () => {
  const { auth, db } = useFirebase();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const fetchOrganizations = async () => {
      try {
        const organizationsQuery = query(
          collection(db, "organizations"),
          where("members", "array-contains", uid)
        );

        const querySnapshot = await getDocs(organizationsQuery);
        const orgs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrganizations(orgs);
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    };

    fetchOrganizations();
  }, [uid, db]);

  return organizations;
};

export { useUserOrganizations };

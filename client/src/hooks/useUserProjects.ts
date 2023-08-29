import { useState, useEffect } from "react";
import { useFirebase } from "../hooks/useFirebase";
import { query, where, getDocs, collection } from "firebase/firestore";

const useUserProjects = () => {
  const { auth, db } = useFirebase();
  const [projects, setProjects] = useState<any[]>([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const fetchProjects = async () => {
      try {
        const projectsQuery = query(
          collection(db, "projects"),
          where("collaborators", "array-contains", uid)
        );

        const querySnapshot = await getDocs(projectsQuery);
        const projs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projs);
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    };

    fetchProjects();
  }, [uid, db]);

  return projects;
};

export { useUserProjects };

import React, { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFirebase } from "../hooks/useFirebase";
import { Progress, Toast } from "flowbite-react";
import Dropzone from "react-dropzone";
import { IconFileDescription, IconCheck } from "@tabler/icons-react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { UploadForm } from "../components";
import formatBytes from "../utils/formatBytes";

function UploadFilesPage() {
  const { auth, storage, db } = useFirebase();
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState({
    id: "",
    displayName: "",
    owner: { userId: "", displayName: "" },
    downloadURL: "",
  });
  const [formData, setFormData] = useState({
    description: "",
    dateCollected: "",
    source: "",
    experimentType: "",
    location: "",
    tags: "",
    project: "",
  });

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFileData = {
      ...fileData,
      ...formData,
    };
    const docRef = doc(db, "files", fileData.id);
    await updateDoc(docRef, updatedFileData);

    displayToast("File information updated.");

    setProgress(0);
    setUploadError("");
    setUploadedFile(null);
    setFileData({
      id: "",
      displayName: "",
      owner: { userId: "", displayName: "" },
      downloadURL: "",
    });
    setFormData({
      description: "",
      dateCollected: "",
      source: "",
      experimentType: "",
      location: "",
      tags: "",
      project: "",
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);

      const userId = auth.currentUser?.uid || "";
      if (!userId) {
        setUploadError("You must be logged in to upload a file.");
        return;
      }
      const displayName = auth.currentUser?.displayName || "";
      const fileId = uuidv4();
      const storageRef = ref(
        storage,
        `gene-up/${userId}/${fileId}` + file.name
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploadError("");
          console.log(
            "Upload is " +
              Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ) +
              "% done"
          );
          setProgress(() =>
            Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          console.error("Upload Error:", error);
          setUploadError(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const initialFileData = {
            id: fileId,
            displayName: file.name,
            owner: {
              userId,
              displayName,
            },
            downloadURL,
          };
          await setDoc(doc(db, "files", fileId), initialFileData);
          setFileData(initialFileData);
          displayToast("File uploaded.");
        }
      );
    },
    [auth, db]
  );

  return (
    <>
      {progress > 0 && (
        <Progress
          labelProgress
          labelText
          color="purple"
          progressLabelPosition="inside"
          textLabel="Upload Progress"
          textLabelPosition="outside"
          progress={progress}
          size="sm"
          className="mb-4"
        />
      )}
      <Dropzone
        onDrop={onDrop}
        accept={{
          "text/plain": [
            ".fasta",
            ".fastq",
            ".sam",
            ".bam",
            ".vcf",
            ".gff",
            ".gtf",
          ],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="flex flex-col justify-center items-center cursor-pointer w-full h-1/2 border-4 p-2 hover:border-blue-500 border-dashed border-slate-400 text-slate-400 mb-4"
          >
            <input {...getInputProps()} />
            <IconFileDescription size={128} />
            <span className="">Drop file here</span>
          </div>
        )}
      </Dropzone>
      <span>
        Drag and drop a file here or click to select a file. File formats
        supported: FASTA, FASTQ, SAM, BAM, VCF, GFF, GTF.
      </span>
      {uploadError && <span className="text-red-500">{uploadError}</span>}
      {uploadedFile && (
        <>
          <hr className="mb-8 mt-4" />
          <div className="flex flex-col mt-4">
            <span className="text-xl">File Details</span>
            <span>Name: {uploadedFile.name}</span>
            <span>Size: {formatBytes(uploadedFile.size)}</span>
          </div>
        </>
      )}
      {uploadedFile && (
        <>
          <hr className="mb-8 mt-4" />
          <span className="text-xl">Additional Information</span>
          <UploadForm
            fields={formData}
            setFields={setFormData}
            handleSubmit={handleSubmit}
          />
        </>
      )}
      {showToast && (
        <Toast className="w-1/4 fixed top-10 left-1/2 right-1/2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <IconCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          <Toast.Toggle />
        </Toast>
      )}
    </>
  );
}

export { UploadFilesPage };

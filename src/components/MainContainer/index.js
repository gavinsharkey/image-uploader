import { useState } from "react";
import { Loading, Error } from "../../common";
import UploadContainer from "../UploadContainer";
import ViewingContainer from "../ViewingContainer";
import "./index.css";

const getBase64FromFile = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const { result } = reader;

    callback(result.split("base64,")[1]);
  });

  reader.readAsDataURL(file);
};

const MainContainer = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageInfo, setUploadedImageInfo] = useState({
    src: "",
    path: ""
  })
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("selecting");

  const handleSubmit = () => {
    if (!file) {
      return;
    }
    setStatus("loading");

    getBase64FromFile(file, async (base64String) => {
      try {
        const resp = await fetch("api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            file: base64String,
          }),
        });
        const data = await resp.json();

        if (resp.status === 201) {
          setUploadedImageInfo(data.imageInfo);
          setStatus("success");
        } else {
          setError(data.error);
          setStatus("error");
        }
      } catch (e) {
        setError(e);
        setStatus("error");
      }
    });
  };

  const resetUploader = () => {
    setFile(null);
    setUploadedImageInfo({
      src: "",
      path: ""
    });
    setError(null);
    setStatus("selecting");
  };

  const renderContent = () => {
    switch (status) {
      case "selecting":
        return (
          <UploadContainer
            file={file}
            setFile={setFile}
            handleSubmit={handleSubmit}
          />
        );
      case "success":
        return <ViewingContainer imageInfo={uploadedImageInfo} />;
      case "loading":
        return <Loading />;
      case "error":
        return <Error error={error} />;
      default:
        return null;
    }
  };

  return renderContent();
};

export default MainContainer;

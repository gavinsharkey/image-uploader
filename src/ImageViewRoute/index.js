import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Error, Loading } from "../common";
import ContainerPhoto from "../components/ContainerPhoto";

const ImageViewRoute = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("loading");
  const { key } = useParams();

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/image/${key}`);

      if (resp.status === 200) {
        setStatus("success");
      } else {
        const data = await resp.json();
        setError(data.error);
        setStatus("error");
      }
    })();
  }, [key]);

  if (status === "loading") {
    return <Loading />
  }

  if (status === 'error') {
    return <Error error={error} />
  }

  return (
    <>
    <h2>{key}</h2>
    <ContainerPhoto src={`/api/image/${key}`} />
    </>
  )
};

export default ImageViewRoute;

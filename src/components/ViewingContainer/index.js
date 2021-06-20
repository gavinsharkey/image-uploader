import ContainerPhoto from "../ContainerPhoto";
import "./index.css";

const ViewingContainer = ({ fileLink, isImageView = false }) => {
  return (
    <>
      {isImageView ? null : <h2>Uploaded successfully!</h2> }
      <ContainerPhoto src={fileLink} />
    </>
  );
};

export default ViewingContainer;

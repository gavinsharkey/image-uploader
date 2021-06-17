import { useState } from 'react';
import UploadContainer from '../UploadContainer';
import './index.css';

const MainContainer = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    console.log(file)
  }

  return <div className="main-container">
    <UploadContainer file={file} setFile={setFile} handleSubmit={handleSubmit} />
  </div>;
};

export default MainContainer;

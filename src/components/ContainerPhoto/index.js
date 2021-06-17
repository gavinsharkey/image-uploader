import "./index.css"

const ContainerPhoto = ({ children, alt = "", className = "", ...props }) => {
  return (
    <img alt={alt} className={`container-photo ${className}`} {...props}>
      {children}
    </img>
  );
};

export default ContainerPhoto

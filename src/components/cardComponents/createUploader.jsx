import uploadIcon from "/generic/uploadIcon.png";
import "../../assets/styles/cardCSS/createUploader.css";

function Uploader({ image, handleFileChange }) {

  const handleClick = () => {
    document.querySelector(".input-field").click();
  };

  return (
    <form className="imgForm" onClick={handleClick}>
      <input
        type="file"
        accept="image/*"
        className="input-field"
        hidden
        name="img"
        onChange={handleFileChange}
        required
      />

      <img src={image} className="img-upload" name="img" />
      <img src={uploadIcon} className="icon-upload-image" />
      <p>Choose Image</p>
    </form>
  );
}

export default Uploader;
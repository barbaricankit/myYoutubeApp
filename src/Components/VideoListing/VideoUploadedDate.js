import "../../App.css";

const VideoUploadedDate = ({ uploadedDate }) => {
  return <div> Uploaded on April {uploadedDate.substring(0, 4)} </div>;
};

export default VideoUploadedDate;

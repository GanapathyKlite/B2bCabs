import fileDefault from "../../../Assets/file-blank-solid-240.png";
import fileJPG from "../../../Assets/jpg.jpg";
import filePdf from "../../../Assets/file-pdf-solid-240.png";
import filePng from "../../../Assets/file-png-solid-240.png";

interface ImageConfigType {
  default: string;
  pdf: string;
  png: string;
  jpg: string;
  [key: string]: string; // Allows for future extensions with additional file types
}

export const ImageConfig: ImageConfigType = {
  default: fileDefault,
  pdf: filePdf,
  png: filePng,
  jpg: fileJPG,
};

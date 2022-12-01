import { PickerOverlay } from "filestack-react";
import { ReactNode, useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_FILESTACK_APIKEY;

interface IFilestackUploaded {
  filename: string;
  mimetype: string;
  size: number;
  source: string;
  url: string;
}

interface IFilestackResult {
  filesFailed: IFilestackUploaded[];
  filesUploaded: IFilestackUploaded[];
}

interface IFilestackProps {
  children: ReactNode;
  onSuccess: (blobArr: Blob[]) => void;
}

const Filestack = ({ children, onSuccess }: IFilestackProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [uploadedContents, setUploadedContents] = useState<IFilestackUploaded[] | null>(null);

  const handleClickVisible = () => {
    setIsPickerVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!uploadedContents) return;

    const blobsPromise = uploadedContents.map(async (uploadedContent) => {
      const response = await fetch(uploadedContent.url);
      const blob = await response.blob();
      return blob;
    });

    Promise.all(blobsPromise).then((res) => onSuccess(res));
  }, [uploadedContents]);

  const PickerOptions = {
    maxFiles: 20,
    accept: ["image/*", "video/*"],
    onClose: () => {
      setIsPickerVisible(false);
    },
  };

  return (
    <>
      <div onClick={handleClickVisible}>{children}</div>
      {isPickerVisible && (
        <PickerOverlay
          apikey={API_KEY ? API_KEY : ""}
          onError={(error) => {
            console.log("err", error);
          }}
          onUploadDone={(data: any) => {
            const result: IFilestackResult = data;
            setUploadedContents(result.filesUploaded);
          }}
          pickerOptions={PickerOptions}
        />
      )}
    </>
  );
};

export default Filestack;

import { ReactNode, useEffect, useState } from "react";
import DropboxChooser from "react-dropbox-chooser";

const APP_KEY = process.env.NEXT_PUBLIC_DROPBOX_APIKEY;

interface IDropboxContent {
  bytes: number;
  icon: string;
  id: string;
  isDir: boolean;
  link: string;
  linkType: string;
  name: string;
  thumbnailLink: string;
}

interface IDropboxProps {
  children: ReactNode;
  onSuccess: (blobArr: Blob[]) => void;
}

const Dropbox = ({ children, onSuccess }: IDropboxProps) => {
  const [dropboxContents, setDropboxContents] = useState<IDropboxContent[] | null>(null);

  useEffect(() => {
    if (!dropboxContents) return;

    const blobsPromise = dropboxContents.map(async (dropboxContent) => {
      const response = await fetch(dropboxContent.link);
      const blob = await response.blob();
      return blob;
    });

    Promise.all(blobsPromise).then((res) => onSuccess(res));
  }, [dropboxContents]);

  return (
    <>
      <DropboxChooser
        appKey={APP_KEY ? APP_KEY : ""}
        success={(files: any) => {
          setDropboxContents(files);
        }}
        cancel={() => {
          console.log("calcel");
        }}
        multiselect={true}
        extensions={[".png", ".jpg", ".mp4", ".jpge"]}
        linkType="direct"
      >
        {children}
      </DropboxChooser>
    </>
  );
};

export default Dropbox;

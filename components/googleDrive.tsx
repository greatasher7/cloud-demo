import { ReactNode, useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";

interface IGoogleDriveContent {
  id: string;
  embedUrl: string;
  mimeType: string;
  name: string;
  url: string;
}

interface IGoogleDriveProps {
  children: ReactNode;
  onSuccess: (blobArr: Blob[]) => void;
}

const APP_KEY = process.env.NEXT_PUBLIC_GOOGLE_APIKEY;
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID;

const GoogleDrive = ({ children, onSuccess }: IGoogleDriveProps) => {
  const [openPicker, authResponse] = useDrivePicker();
  const [googleDriveContents, setGoogleDriveContents] = useState<IGoogleDriveContent[] | null>(
    null
  );

  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID ? CLIENT_ID : "",
      developerKey: APP_KEY ? APP_KEY : "",
      viewId: "DOCS_IMAGES_AND_VIDEOS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        // if (data.action === "cancel") {
        //   console.log("User clicked cancel/close button");
        // }
        console.log(data);
        setGoogleDriveContents(data.docs);
      },
    });
  };

  useEffect(() => {
    if (!googleDriveContents) return;

    const blobsPromise = googleDriveContents.map(async (googleDriveContent) => {
      const response = await fetch(googleDriveContent.url);

      console.log("res", response);
      const blob = await response.blob();
      return blob;
    });

    Promise.all(blobsPromise).then((res) => onSuccess(res));
  }, [googleDriveContents]);

  return <div onClick={handleOpenPicker}>{children}</div>;
};

export default GoogleDrive;

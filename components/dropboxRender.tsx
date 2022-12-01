import styled from "styled-components";
// import { getFileTypeFromName } from "utils/common";

interface IDropboxRenderProps {
  url: string;
  alt: string;
  name: string;
}

const getFileTypeFromName = (name: string) => {
  return name.substring(name.lastIndexOf(".") + 1, name.length);
};

export const DropboxRender = ({ url, alt, name }: IDropboxRenderProps) => {
  const type = getFileTypeFromName(name);

  let isVideo = false;
  if (type === "mp4") {
    isVideo = true;
  }

  return (
    <>
      <>
        {isVideo ? (
          <Video poster={url} autoPlay loop muted>
            <source src={url} />
          </Video>
        ) : (
          <Img src={url} alt={alt} />
        )}
      </>
    </>
  );
};

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

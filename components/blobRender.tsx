import styled from "styled-components";

interface IBlobRenderProps {
  blob: Blob;
  alt: string;
}

export const BlobRender = ({ blob, alt }: IBlobRenderProps) => {
  let isVideo = false;
  if (blob.type.includes("mp4")) {
    isVideo = true;
  }

  const url = window.URL.createObjectURL(blob);

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

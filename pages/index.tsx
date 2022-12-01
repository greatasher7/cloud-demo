// React & Next
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlobRender } from "components/blobRender";
import Dropbox from "components/dropbox";
import GoogleDrive from "components/googleDrive";
import Filestack from "components/filestack";

const Home: NextPage = () => {
  const [dropboxBlobs, setDropboxBlobs] = useState<Blob[]>([]);
  const [googleDriveBlobs, setGoogleDriveBlobs] = useState<Blob[]>([]);
  const [filestackBlobs, setFilestackBlobs] = useState<Blob[]>([]);

  useEffect(() => {
    console.log("dropbox blobs", dropboxBlobs);
  }, [dropboxBlobs]);

  useEffect(() => {
    console.log("googleDrive blobs", googleDriveBlobs);
  }, [googleDriveBlobs]);

  useEffect(() => {
    console.log("filestack blobs", filestackBlobs);
  }, [filestackBlobs]);

  return (
    <Wrapper>
      <Container>
        <Dropbox
          onSuccess={(blobArr: Blob[]) => {
            setDropboxBlobs(blobArr);
          }}
        >
          <Btn className="dropbox-button">Dropbox</Btn>
        </Dropbox>
        <List>
          {dropboxBlobs.map((blob) => (
            <Content key={blob.size}>
              <BlobRender blob={blob} alt="dropbox image" />
            </Content>
          ))}
        </List>
      </Container>
      <Container>
        <GoogleDrive
          onSuccess={(blobArr: Blob[]) => {
            setGoogleDriveBlobs(blobArr);
          }}
        >
          <Btn>googleDrive</Btn>
        </GoogleDrive>
      </Container>
      <Container>
        <Filestack
          onSuccess={(blobArr: Blob[]) => {
            setFilestackBlobs(blobArr);
          }}
        >
          <Btn>Filestack</Btn>
        </Filestack>
        <List>
          {filestackBlobs.map((blob) => (
            <Content key={blob.size}>
              <BlobRender blob={blob} alt="filestack image" />
            </Content>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  padding: 100px 100px;
  display: flex;
  gap: 30px;
`;

const Container = styled.div`
  width: 33%;
  border: 1px solid #fff;
  min-height: 1000px;
`;

const List = styled.ul`
  width: 100%;
`;

const Content = styled.li`
  width: 100px;
  height: 100px;
`;

const Btn = styled.button`
  color: ${({ theme }) => theme.colors.background_color};
  font-size: 20px;
`;

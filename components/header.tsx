// React & Next
import { useRouter } from "next/router";
import { useState } from "react";
// Style
import styled from "styled-components";
// Mobx
import { useStore } from "store";
import { observer } from "mobx-react-lite";

const Header = () => {
  const [nameValue, setNameValue] = useState("");

  const router = useRouter();
  const { themeStore, userStore } = useStore();

  const doPush = (url: string) => {
    router.push(url);
  };

  const setThemeClick = () => {
    themeStore.changeTheme();
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleClickSignin = () => {
    userStore.signIn(nameValue);
    setNameValue("");
  };

  const handleClickSignout = () => {
    userStore.signOut();
  };

  return (
    <>
      <Wrapper>
        <div className="sign_box"></div>
        <div className="container">
          <Nav>
            <li
              onClick={() => {
                doPush("/");
              }}
            >
              Home
            </li>
          </Nav>
        </div>
        <span className="set_theme" onClick={setThemeClick}>
          Change Theme
        </span>
      </Wrapper>
    </>
  );
};

export default observer(Header);

const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.nav_color};
  backdrop-filter: blur(5px);
  position: sticky;
  top: 0;
  z-index: 10;
  .container {
    margin: 0 auto;
    width: 500px;
    height: 70px;
    ${({ theme }) => theme.mixin.flexCenter}
  }
  .sign_box {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    input {
      background-color: ${({ theme }) => theme.colors.background_color};
      font-size: 2rem;
      width: 150px;
      border: 0;
      margin-right: 10px;
      border-radius: 2rem;
      padding: 0.4rem 2rem;
    }
    button {
      background-color: ${({ theme }) => theme.colors.background_color};
      font-size: 2rem;
      border-radius: 2rem;
      padding: 0.4rem 2rem;
      border: 0;
      cursor: pointer;
    }
  }
  .set_theme {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background-color: ${({ theme }) => theme.colors.background_color};
    padding: 0.4rem 2rem;
    border-radius: 2rem;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  li {
    cursor: pointer;
    font-size: 30px;
    &:hover {
      color: ${({ theme }) => theme.colors.primary_color};
    }
  }
`;

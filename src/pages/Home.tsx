import { useState } from "react";
import { styled } from "styled-components";
import AudioPlayer from "../components/AudioPlayer";
import Image from "../components/Image";
import List from "../components/List";
import Title from "../components/Title";
import { LOADING_BUTTON } from "../constants/imgConstants";
import useGlobalModal from "../hooks/useGlobalModal";
import { useGetMusicURLQuery, useGetMusicsQuery } from "../quries/musicsQuery";
import { CurrentAudio, Music } from "../types/musicType";

const Home = () => {
  const { openGlobalModal } = useGlobalModal();
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio>({
    id: "",
    title: "",
    playing: null,
  });
  const [error, setError] = useState(false);

  const getMusics = useGetMusicsQuery(
    () => setError(false),
    () => setError(true)
  );
  const getMusicURL = useGetMusicURLQuery(currentAudio.id, () => {
    openGlobalModal("음원 재생에 실패했습니다.");
    setCurrentAudio((state) => ({ ...state, playing: false }));
  });

  return (
    <HomeStyled>
      <div className="lists">
        <Title>플레이리스트</Title>
        {error && (
          <span className="error">
            음원 리스트를 불러오는데
            <br />
            오류가 생겼습니다.
          </span>
        )}
        {getMusics.items
          ?.sort((a, b) => (a.public_date < b.public_date ? 1 : -1))
          ?.map((item: Music) => (
            <List
              key={item.id}
              item={item}
              loading={getMusicURL.isFetching && getMusicURL.isLoading}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
            />
          ))}
      </div>
      {currentAudio.playing !== null && (
        <AudioPlayer
          URL={getMusicURL.url}
          loading={getMusicURL.isFetching && getMusicURL.isLoading}
          isError={getMusicURL.isError}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
        />
      )}
      {getMusicURL.isFetching && getMusicURL.isLoading && (
        <div className="dimmed">
          <Image size={100}>
            <img src={LOADING_BUTTON.src} width={40} alt={LOADING_BUTTON.alt} />
          </Image>
        </div>
      )}
    </HomeStyled>
  );
};

export default Home;

const HomeStyled = styled.div`
  padding: 80px 20px 120px;

  .lists {
    max-width: 1280px;
    margin: 0 auto;

    .error {
      position: fixed;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      color: #666;
      line-height: 1.7;
    }
  }

  .dimmed {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.5);
  }
`;

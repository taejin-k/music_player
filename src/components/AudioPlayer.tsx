import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { LOADING_BUTTON, PAUSE, PLAY } from "../constants/imgConstants";
import { CurrentAudio } from "../types/musicType";
import { changeTimeFormat } from "../utils/time";
import Image from "./Image";
import Text from "./Text";
import useGlobalModal from "../hooks/useGlobalModal";

interface AudioPlayerProps {
  URL?: string;
  loading: boolean;
  isError: boolean;
  currentAudio: CurrentAudio;
  setCurrentAudio: Dispatch<SetStateAction<CurrentAudio>>;
}

const AudioPlayer = (props: AudioPlayerProps) => {
  const { URL, loading, isError, currentAudio, setCurrentAudio } = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const { openGlobalModal } = useGlobalModal();
  const [totalTime, setTotalTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentPercent, setCurrentPercent] = useState(0);

  const handleTogglePlaying = () => {
    if (isError) {
      openGlobalModal("음원 재생에 실패했습니다.");
    } else {
      setCurrentAudio((state) => ({ ...state, playing: !state.playing }));
    }
  };

  useEffect(() => {
    if (currentAudio.playing) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [currentAudio.playing]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (loading) audioRef.current.pause();

    audioRef.current.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audioRef.current!.duration / 60);
      const seconds = Math.floor(audioRef.current!.duration % 60);

      setTotalTime(
        changeTimeFormat(minutes) + " : " + changeTimeFormat(seconds)
      );
    });

    audioRef.current.addEventListener("timeupdate", () => {
      const minutes = Math.floor(audioRef.current!.currentTime / 60);
      const seconds = Math.floor(audioRef.current!.currentTime % 60);

      setCurrentTime(
        changeTimeFormat(minutes) + " : " + changeTimeFormat(seconds)
      );
      setCurrentPercent(
        (audioRef.current!.currentTime / audioRef.current!.duration) * 100
      );

      if (loading) {
        setCurrentTime("00 : 00");
        setCurrentPercent(0);
      }
    });
  }, [loading]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const percent = Number(event.target.value);

    audioRef.current!.currentTime =
      (audioRef.current!.duration / 100) * percent;
    setCurrentPercent(percent);
  };

  return (
    <AudioPlayerStyled>
      <div className="wrap">
        <audio controls src={URL} ref={audioRef} autoPlay></audio>
        <div>
          <Image size={50} onClick={handleTogglePlaying}>
            <img
              src={!currentAudio.playing || loading ? PLAY.src : PAUSE.src}
              width={10}
              alt={!currentAudio.playing || loading ? PLAY.alt : PAUSE.alt}
            />
          </Image>
          <Text width={200}>{currentAudio.title}</Text>
        </div>
        <div>
          <Text width={60} center="center">
            {currentTime}
          </Text>
          <input
            type="range"
            min="0"
            max="100"
            value={isNaN(currentPercent) ? 0 : currentPercent}
            onChange={onChange}
          />
          {loading ? (
            <Image size={60}>
              <img
                src={LOADING_BUTTON.src}
                alt={LOADING_BUTTON.alt}
                width={20}
              />
            </Image>
          ) : (
            <Text width={60} center="center">
              {totalTime}
            </Text>
          )}
        </div>
      </div>
    </AudioPlayerStyled>
  );
};

export default AudioPlayer;

const AudioPlayerStyled = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #eee;
  border-top: 1px solid #ccc;

  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: 840px;
    gap: 80px;

    audio {
      position: absolute;
      top: 0;
      left: 0;
      visibility: hidden;
    }

    > div {
      display: flex;
      align-items: center;
      height: 100%;

      input {
        flex-grow: 1;
        cursor: pointer;
      }

      &:nth-of-type(1) {
        padding-left: 10px;
        gap: 20px;
      }

      &:nth-of-type(2) {
        padding-right: 30px;
        gap: 30px;
        flex-grow: 1;
      }
    }
  }
`;

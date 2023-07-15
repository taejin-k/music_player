import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";
import { PAUSE, PLAY } from "../constants/imgConstants";
import { CurrentAudio, Music } from "../types/musicType";
import Image from "./Image";
import Text from "./Text";

interface ListProps {
  item: Music;
  loading: boolean;
  currentAudio: CurrentAudio;
  setCurrentAudio: Dispatch<SetStateAction<CurrentAudio>>;
}

const List = (props: ListProps) => {
  const { item, loading, currentAudio, setCurrentAudio } = props;
  const [playing, setPlaying] = useState(false);

  const handleTogglePlaying = (playing: boolean, item: Music) => {
    setCurrentAudio({ id: item.id, title: item.title, playing: !playing });
  };

  useEffect(() => {
    if (currentAudio.playing === null) return;
    if (loading) return;

    if (currentAudio.id !== item.id) setPlaying(false);
    else setPlaying(currentAudio.playing);
  }, [currentAudio.id, currentAudio.playing, loading, item.id]);

  return (
    <ListStyled>
      <div>
        <Image size={50} onClick={() => handleTogglePlaying(playing, item)}>
          <img
            src={playing ? PAUSE.src : PLAY.src}
            width={10}
            alt={playing ? PAUSE.alt : PLAY.alt}
          />
        </Image>
        <Text>{item.title}</Text>
      </div>
      <div>
        <Text>#{item.moods.join(" #")}</Text>
        <Text width={90} center="center">
          #{item.genre}
        </Text>
        <Text>{moment(item.public_date).format("YYYY.MM.DD")}</Text>
      </div>
    </ListStyled>
  );
};

export default List;

const ListStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 13px;

  &:last-of-type {
    margin-bottom: 0;
  }

  > div {
    display: flex;
    align-items: center;

    &:nth-of-type(1) {
      padding-left: 10px;
      gap: 20px;
    }

    &:nth-of-type(2) {
      padding-right: 30px;
      gap: 60px;
    }
  }
`;

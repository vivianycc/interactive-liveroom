import React from "react";
import styled from "styled-components";


const RoomTopicWrapper = styled.div`
    background-image: 
    repeating-linear-gradient(
        -45deg,
        var(--white10),
        var(--white10) 10px,
        var(--white0) 10px,
        var(--white0) 20px
      ),linear-gradient(90deg, #FD856D 0%, rgba(253,133,109,0.00) 100%);
    border-radius:12px;
`;
const TopicText = styled.p`
    text-shadow:var(--text-shadow-for-white);
    color:var(--white);
    margin:2px 8px;
`;

export default function RoomTopic(){
  return(
    <RoomTopicWrapper className="room-topic">
        <TopicText className="t-title2">How is your day?</TopicText>
    </RoomTopicWrapper>
  )
}

import styled, { keyframes } from 'styled-components';
/*

.bouncing-loader {
  display: flex;
  justify-content: center;
  margin: 40px auto;
}

.bouncing-loader > div {
  width: 16px;
  height: 16px;
  margin: 3px 6px;
  border-radius: 50%;
  background-color: #a3a1a1;
  opacity: 1;
  animation: bouncing-loader 0.6s infinite alternate;
}

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translateY(-16px);
  }
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
  */

export const Dots = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;

    div {
        width: 5px;
        height: 5px;
        margin: 2px;
        border-radius: 50%;
        background-color: #a3a1a1;
        opacity: 1;
        animation: ${keyframes`
            to {
                opacity: 0.1;
                transform: translateY(-5px);
            }
        `} 0.6s infinite alternate;
    }

    div:nth-child(2) {
        animation-delay: 0.2s;
    }

    div:nth-child(3) {
        animation-delay: 0.4s;
    }


`;
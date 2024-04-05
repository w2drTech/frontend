import React from "react";
import styled, { keyframes } from "styled-components";
import { useSpring, animated } from "react-spring";

// Animation keyframes
const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
`;

// Styled components
const MaintenanceContainer = styled.div`
  text-align: center;
`;

const Illustration = styled(animated.div)`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  animation: ${bounce} 1s infinite alternate;
`;

const Text = styled.div`
  font-size: 24px;
  color: #646262;
  margin-bottom: 30px;
`;

const Maintenance = () => {
  // React-spring animation
  const illustrationAnimation = useSpring({
    loop: { reverse: true },
    from: { translateY: 0 },
    to: { translateY: -10 },
  });

  return (
    <MaintenanceContainer>
      <Illustration style={illustrationAnimation} />
      <Text>Sorry, this page is under maintenance. We'll be back soon!</Text>
    </MaintenanceContainer>
  );
};

export default Maintenance;

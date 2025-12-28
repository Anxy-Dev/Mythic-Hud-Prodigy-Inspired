import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrapper = styled(Box)(() => ({
  width: 220,
  height: 220,
  borderRadius: '50%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const Container = styled(Box)(() => ({
  position: 'absolute',
  bottom: 10,
  right: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1000,
}));

const SpeedText = styled(Typography)(() => ({
  fontSize: 34,
  fontWeight: 700,
  color: '#fff',
  marginTop: 12,
}));

const UnitText = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 500,
  color: '#c0c0c0',
  marginTop: -4,
  textTransform: 'uppercase',
}));

const LabelColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
}));

const LabelText = styled(Typography)(() => ({
  color: '#ccc',
  fontSize: 12,
  fontWeight: 500,
}));

const LabelBar = styled(Box)(({ color }) => ({
  height: 6,
  width: 30,
  borderRadius: 3,
  backgroundColor: color,
}));

const Labels = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,
  marginTop: -16,
}));

const LabelIcon = styled(Box)(({ color }) => ({
  width: 26,
  height: 26,
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 0 6px ${color}`,
}));

const TickContainer = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  borderRadius: '50%',
  pointerEvents: 'none',
}));

const Tick = styled(Box)(({ rotate }) => ({
  position: 'absolute',
  top: '8px',
  left: '50%',
  width: 3,
  height: 14,
  backgroundColor: '#FFFFFF',
  opacity: 0.3,
  transform: `translateX(-50%) rotate(${rotate}deg)`,
  transformOrigin: 'center 82px',
}));

const Arc = styled('svg')({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'rotate(135deg)',
  overflow: 'visible',
});

const Speedometer = () => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ bottom: 10, right: 120 });

  const showing = useSelector((state) => state.vehicle.showing);
  const ignition = useSelector((state) => state.vehicle.ignition);
  const speed = useSelector((state) => state.vehicle.speed);
  const speedMeasure = useSelector((state) => state.vehicle.speedMeasure || 'MPH');
  const rpm = useSelector((state) => state.vehicle.rpm || 0);
  const seatbelt = useSelector((state) => state.vehicle.seatbelt);
  const fuel = useSelector((state) => state.vehicle.fuel);
  const engineHealth = useSelector((state) => state.vehicle.engineHealth || 100);
  const fuelHide = useSelector((state) => state.vehicle.fuelHide);
  const engineHealthHide = useSelector((state) => state.vehicle.engineHealthHide);

  const maxSpeed = 220;
  const totalArc = 270;
  const speedPercent = Math.min((speed / maxSpeed) * 100, 100);
  const angle = (speedPercent / 100) * totalArc;

  return (
    <Fade in={showing && ignition}>
      <Container
        ref={containerRef}
        style={{
          bottom: `${position.bottom}px`,
          right: `${position.right}px`,
        }}
      >
        <Box mt={10}>
          <Wrapper>
            <Arc width="220" height="220">
              <defs>
                <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#92db24" />
                  <stop offset="100%" stopColor="#FF3838" />
                </linearGradient>
              </defs>
              <circle
                r="100"
                cx="110"
                cy="110"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 100 * (totalArc / 360)} ${2 * Math.PI * 100}`}
                strokeLinecap="round"
              />
              {speed > 0 && (
                <circle
                  r="100"
                  cx="110"
                  cy="110"
                  fill="none"
                  stroke="url(#speedGradient)"
                  strokeWidth="12"
                  strokeDasharray={`${(2 * Math.PI * 100 * (angle / 360)).toFixed(2)} ${2 * Math.PI * 100}`}
                  strokeLinecap="round"
                  transform="rotate(0 110 110)"
                />
              )}
            </Arc>

            <TickContainer>
              {Array.from({ length: 8 }).map((_, i) => {
                const totalTicks = 8;
                const startAngle = 135;
                const endAngle = 405;
                const angle = startAngle + (i * (endAngle - startAngle)) / (totalTicks - 1);
                const rad = (angle * Math.PI) / 180;

                const center = 110;
                const radiusTick = 98;
                const radiusText = 120;

                const tickX = center + radiusTick * Math.cos(rad);
                const tickY = center + radiusTick * Math.sin(rad);

                const textX = center + radiusText * Math.cos(rad);
                const textY = center + radiusText * Math.sin(rad);

                return (
                  <React.Fragment key={i}>
                    <Box
                      sx={{
                        position: 'absolute',
                        width: 4,
                        height: 20,
                        backgroundColor: '#ffffff',
                        opacity: 0.8,
                        top: tickY,
                        left: tickX,
                        transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                        transformOrigin: 'center center',
                        borderRadius: 2,
                        boxShadow: '0 0 6px rgba(255,255,255,0.5)',
                      }}
                    />

                    <Typography
                      sx={{
                        position: 'absolute',
                        top: textY,
                        left: textX,
                        transform: 'translate(-50%, -50%)',
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#ffffff',
                        fontFamily: '"Oswald"',
                      }}
                    >
                      {i + 1}
                    </Typography>
                  </React.Fragment>
                );
              })}
            </TickContainer>

            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: '"Oswald"',
                  letterSpacing: '2px',
                }}
              >
                {String(speed).padStart(3, '0')}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#c0c0c0',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginTop: '-4px',
                }}
              >
                {speedMeasure}
              </Typography>
            </Box>
          </Wrapper>

          <Labels>
            <LabelColumn>
              <LabelText>ENG</LabelText>
              <LabelBar color={!engineHealthHide ? (engineHealth > 50 ? '#92db24' : 'rgb(255, 50, 50)') : '#666'} />
            </LabelColumn>
            <LabelColumn>
              <LabelText>BELT</LabelText>
              <LabelBar color={seatbelt ? 'orange' : '#666'} />
            </LabelColumn>
          </Labels>
        </Box>
      </Container>
    </Fade>
  );
};

export default Speedometer;
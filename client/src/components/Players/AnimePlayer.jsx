import {
  Player,
  Hls,
  DefaultUi,
  Control,
  Controls,
  PlaybackControl,
  Tooltip,
} from "@vime/react";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
export default function AnimePlayer({ src }) {
  const hlsConfig = {
    crossOrigin: "anonymous",
    enableWorker: false,
  };
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <Player
        currentTime={time}
        onVmCurrentTimeChange={(e) => {
          setTime(e.detail);
        }}
        onVmError={(e) => {
          toast.error("Cant play that one now! going back to home");
          navigate("/");
        }}
        hlsConfig={hlsConfig}
        theme="dark"
        style={{
          "--vm-player-theme": "rgba(255, 255, 255, .3)",
          "--vm-slider-track-height": "8px",
          "--vm-slider-thumb-height": "8px",
          "--vm-slider-track-focused-height": "8px",
          "--vm-slider-value-color": "#FC4747",
        }}
        autoplay={true}
      >
        <Hls version="latest" config={hlsConfig}>
          <source data-src={src} type="application/x-mpegURL" />
        </Hls>
        <DefaultUi>
          <Controls
            align="center"
            pin="center"
            justify="space-evenly"
            hideOnMouseLeave={true}
            activeDuration={1000}
          >
            <Control keys="p" label="Rewind 15 seconds">
              <svg
                onClick={() => {
                  setTime((prevTime) => prevTime - 15);
                }}
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                height={30}
                width={30}
                style={{ padding: 3 }}
                fill={"white"}
                enableBackground="new 0 0 120.64 122.88"
                version="1.1"
                viewBox="0 0 120.64 122.88"
                xmlSpace="preserve"
              >
                <path d="M66.6 108.91a8.288 8.288 0 012.28 5.85c-.03 2.11-.84 4.2-2.44 5.79l-.12.12a7.948 7.948 0 01-5.61 2.2 7.947 7.947 0 01-5.55-2.37C37.5 102.85 20.03 84.9 2.48 67.11c-.07-.05-.13-.1-.19-.16A8.301 8.301 0 010 61.08c.03-2.11.85-4.21 2.45-5.8l.27-.26C20.21 37.47 37.65 19.87 55.17 2.36A7.974 7.974 0 0160.71 0c2.01-.03 4.03.7 5.61 2.21l.15.15a8.318 8.318 0 012.41 5.76c.03 2.1-.73 4.22-2.28 5.85L19.38 61.23l47.22 47.68zm51.77-2a8.265 8.265 0 012.26 5.83c-.03 2.11-.84 4.2-2.44 5.79l-.12.12a7.985 7.985 0 01-5.61 2.21 7.947 7.947 0 01-5.55-2.37C89.63 101.2 71.76 84.2 54.24 67.12c-.07-.05-.14-.11-.21-.17a8.335 8.335 0 01-2.28-5.87c.03-2.11.85-4.21 2.45-5.8 17.5-16.95 35.07-33.84 52.6-50.77l.12-.13a7.945 7.945 0 015.54-2.35c2.01-.03 4.03.7 5.61 2.21l.15.15a8.318 8.318 0 012.41 5.76c.03 2.1-.73 4.22-2.28 5.85L71.17 61.23l47.2 45.68z"></path>
              </svg>
              <Tooltip>- 15s</Tooltip>
            </Control>
            <PlaybackControl hideTooltip keys="k/" />
            <Control keys="n" label="Forward 15 seconds">
              <svg
                onClick={() => {
                  setTime((prevTime) => prevTime + 15);
                }}
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                height={30}
                width={30}
                fill={"white"}
                style={{ padding: 3 }}
                enableBackground="new 0 0 120.64 122.88"
                version="1.1"
                viewBox="0 0 120.64 122.88"
                xmlSpace="preserve"
              >
                <path d="M54.03 108.91a8.288 8.288 0 00-2.28 5.85c.03 2.11.84 4.2 2.44 5.79l.12.12c1.58 1.5 3.6 2.23 5.61 2.2 2.01-.03 4.01-.82 5.55-2.37 17.66-17.66 35.13-35.61 52.68-53.4.07-.05.13-.1.19-.16a8.335 8.335 0 002.28-5.87 8.323 8.323 0 00-2.45-5.8l-.27-.26C100.43 37.47 82.98 19.87 65.46 2.36A7.956 7.956 0 0059.92 0c-2.01-.03-4.03.7-5.61 2.21l-.15.15a8.318 8.318 0 00-2.41 5.76c-.03 2.1.73 4.22 2.28 5.85l47.22 47.27-47.22 47.67zm-51.77-2A8.265 8.265 0 000 112.74c.03 2.11.84 4.2 2.44 5.79l.12.12c1.57 1.5 3.6 2.23 5.61 2.21 2.01-.03 4.02-.82 5.55-2.37C31.01 101.2 48.87 84.2 66.39 67.12c.07-.05.14-.11.21-.17a8.335 8.335 0 002.28-5.87 8.323 8.323 0 00-2.45-5.8C48.94 38.33 31.36 21.44 13.83 4.51l-.12-.13a7.945 7.945 0 00-5.54-2.35c-2.01-.03-4.03.7-5.61 2.2l-.15.15A8.336 8.336 0 000 10.14c-.03 2.1.73 4.22 2.28 5.85l47.18 45.24-47.2 45.68z"></path>
              </svg>
              <Tooltip className="text-xs">+ 15s</Tooltip>
            </Control>
          </Controls>
        </DefaultUi>
      </Player>
      <Toaster></Toaster>
    </div>
  );
}

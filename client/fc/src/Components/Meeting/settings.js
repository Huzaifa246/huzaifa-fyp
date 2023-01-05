import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "f7b03d2790e4450998e7d665131df58b";
const token =
  "007eJxTYHB4cH8p81fZwnlp11pifR/X6p47lvL0rdGEZ/EFiYFeMZcVGNLMkwyMU4zMLQ1STUxMDSwtLVLNU8zMTA2NDVPSTC2STAS2JzcEMjJsctvNwAiFID4LQ25iZh4DAwCqMiAR";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";

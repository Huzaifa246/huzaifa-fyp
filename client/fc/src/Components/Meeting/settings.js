import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "f7b03d2790e4450998e7d665131df58b";
const token =
  "007eJxTYCifffBM1Vyb3xfrbBZmdic3V6+aobPu0kPFn/9/HTGTu/RLgSHNPMnAOMXI3NIg1cTE1MDS0iLVPMXMzNTQ2DAlzdQiyV9/c3JDICPD4d1VTIwMEAjiszDkJmbmMTAAAFGYIpc=";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";

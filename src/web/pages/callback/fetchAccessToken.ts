import { DiscordAuthResponse } from "../../types";
import { securePost } from "../../utils";
import { setCookie } from "../../hooks";

const fetchAccessToken = async (urlParamsString: string) => {
    const urlParams = new URLSearchParams(urlParamsString);
    const code = urlParams.get('code');
    const { data } = await securePost<DiscordAuthResponse>('/api/auth/discord/callback', { code });
    data && setCookie({ name: 'refresh_token', value: data.refresh_token, time: data.expires_in, priority: 'high', SameSite: 'Strict', Secure: true });
    if(data) return data;
}

export default fetchAccessToken;
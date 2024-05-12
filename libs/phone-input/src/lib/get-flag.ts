const FLAGS_PROVIDER_URL = 'https://flagcdn.com';

export const getFlag = (countryCode: string, ext: 'svg' | 'png' = 'svg'): string => {
    const URL = ext === 'png' ? `${FLAGS_PROVIDER_URL}/16x12` : FLAGS_PROVIDER_URL;

    return `${URL}/${countryCode.toLowerCase()}.${ext}`;
};

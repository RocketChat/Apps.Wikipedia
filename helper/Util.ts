import { WPcodes } from '@dictionary/WPcodes';

export const checkIfIsValidWPcodes = (code: string) => {
    return WPcodes.includes(code);
};

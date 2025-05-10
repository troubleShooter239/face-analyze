const BASE_URL: string = 'http://localhost:8000';
const AI: string = BASE_URL + '/ai';
export const AUTH: string = BASE_URL + '/auth';
export const SIGN_IN: string = AUTH + '/sign_in';
export const SIGN_UP: string = AUTH + '/sign_up';
export const ANALYZE: string = AI + '/analyze';
export const EXTRACT: string = AI + '/extract_faces';
export const VERIFY: string = AI + '/verify';

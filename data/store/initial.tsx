//FIXME: NEED CHANGE IN NEW PJ: Add action types and action creators here
// export interface ExampleInitInter {
//     example: string;
// }
// export interface Action {
//     type: string;
//     payload?: any;
// }
// export const initialState: ExampleInit = {
//     example: 'example'
// };

import { UserFormat } from "../interfaceFormat";

export interface CurrentCache {
    user: UserFormat;
    currentGameLvl: number
}

export interface Action {
    type: string;
    payload?: UserFormat | string | number;
}

export const initialState: CurrentCache = {
    user: {
        name: '',
        id: '',
        star: 10
    },
    currentGameLvl: 0
};
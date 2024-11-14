export interface StorageItem {
    user: UserFormat,
    match: MatchHistoryFormat,
    room: RoomFormat,
    guide: GuideFormat
}

export interface UserFormat {
    synced?: boolean;
    name: string;
    age?: number;
    loginMethod?: string;
    email: string;
    dataCollect?: boolean;
    data?: {
        interest: string[];
        favorite: string[];
        job?: string;
    }
}

export interface MatchHistoryFormat {
    date: Date
    time: {
        start: number,
        end: number
    }
    lvl: 'Beginner' | 'Intermediate' | 'Expert'
    rounds: {
        start: number,
        end: number
    }[]
    result: number
}

export interface RoomFormat {
    match: MatchHistoryFormat,
    no: number,
    pass: string | number,
    public: boolean,
}

export interface GuideFormat {
    title: string
}
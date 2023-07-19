export interface Users {
    id: number;
    name: string;
    email: string;
    password: null;
};

export interface Chirps {
    id?: number;
    userid: Users['id'];
    content: string;
    location: string;
};

export interface Mentions {
    userid: Users['id'];
    chirpid: Chirps['id'];
};

export interface ChirpsWithUsers {
    id: Chirps['id'];
    username: Users['name'];
    content: Chirps['content'];
};
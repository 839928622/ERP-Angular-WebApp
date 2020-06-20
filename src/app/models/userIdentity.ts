export interface UserIdentity {
    access_token: string;
    expires_at: number;
    id_token: string;
    profile: UserProfile;
    scope: string;
    session_state: string;
    token_type: string;

}

export interface UserProfile {
    amr: string[];
    at_hash: string;
    auth_time: number;
    branchId: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    idp: string;
    iss: string; // idp endpoint
    name: string;
    nbf: number;
    nonce: string;
    phone_number: string;
    preferred_username: string;
    role: string[];
    sid: string;
    sub: string;

}

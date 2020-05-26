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
    auth_time: number;
    branchId: string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    idp: string;
    name: string;
    phone_number: string;
    preferred_username: string;
    role: string[];
    s_hash: string;
    sid: string;
    sub: string;

}

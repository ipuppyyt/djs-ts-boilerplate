import type { User, Role, RoleFlagsBitField, PermissionsBitField, UserFlagsBitField } from "discord.js";

export interface DiscordUserType extends User {
    accent_color: number;
    avatar: string | null;
    avatar_decoration_data: string | null;
    banner: string | null;
    banner_color: string | null;
    clan: string | null;
    discriminator: string;
    email: string | null;
    flags: Readonly<UserFlagsBitField>;
    global_name: string | null;
    id: string;
    locale: string | null;
    mfa_enabled: boolean;
    premium_type: number;
    public_flags: number;
    username: string;
    verified: boolean;
}

export interface DiscordRoleType extends Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: Readonly<PermissionsBitField>;
    managed: boolean;
    mentionable: boolean;
    description: string | null;
    flags: RoleFlagsBitField;
    icon: string | null;
    permissions_new: string;
    unicode_emoji: string | null;
}


export interface DiscordUserRolesType {
    some(arg0: (role: { id: string; }) => boolean): unknown;
    [index: number]: DiscordRoleType;
}

export interface DiscordAuthContextType {
    isLoading: boolean;
    isAuthed: boolean;
    user: User | null;
    roles: Role | null;
    verifiedUser: boolean;
    isAdmin: boolean;
    setIsAuthed: (isAuthed: boolean) => void;
    setUser: (user: DiscordUserType | null) => void;
    setUserRoles: (roles: DiscordRoleType | null) => void;
    setVerifiedUser: (verifiedUser: boolean) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    children?: React.ReactNode;
}

export interface DiscordAuthResponse {
    refresh_token: string;
    expires_in: number;
    user: DiscordUserType;
    roles: DiscordRoleType;
}
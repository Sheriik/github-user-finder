export interface UserData {
  login: string;
  name?: string | null;
  avatar_url?: string;
  bio?: string | null;
  followers?: number;
  following?: number;
  html_url?: string;
  public_repos?: number;
}

export interface Repo {
  id: number;
  name: string;
  description?: string | null;
  stargazers_count: number;
  html_url: string;
}

export interface GitHubUser {
    login: string;
    avatar_url: string;
    name: string | null;
    location: string | null;
    email: string | null;
    html_url: string;
    company: string | null;
    bio?: string;
  }

export interface Challenge {
  id: string;
  title: string;
  description: string;
  file?: string;
  url?: string;
  flag: string;
  hint: string;
}

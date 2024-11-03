export interface Person {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
}

export interface StarWarsState {
  data: Person[];
  loading: boolean;
  error: string | null;
}

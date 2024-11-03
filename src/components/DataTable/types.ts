export interface Person {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
}

export interface DataTableProps {
  data: Person[];
  loading: boolean;
  error: string | null;
}

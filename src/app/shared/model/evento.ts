 export interface Evento {
  title: string;
  startTime?: Date;
  endTime: Date;
  categoria: string;
  allDay: boolean;
  cliente?: string; // Use "?" para propriedades opcionais
  endereco?: string;
}




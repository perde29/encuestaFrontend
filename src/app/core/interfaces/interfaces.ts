export interface Questionary {
  id?: number;
  title?: string;
  status?: number;
  orden?: number;
}

export interface Questions {
  id?: number;
  title?: string;
  cant_questions?: string;
  inputType?: string;
  status?: number;
  allSectors?: number;
  questionnaireResponse?: number;
  questionaryId?: number;
  categories?: any[];
}

export interface Category {
  id?: number;
  title?: string;
  state?: number;
}

export interface Alternative {
  id?: number;
  texto?: string;
  idAlternative?: number;
}

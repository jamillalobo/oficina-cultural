import { Pessoa } from "./pessoa.entity";

export class Aluno extends Pessoa {
  cursos: string[];

  constructor(
  ) {
    super();
    this.cursos = []
  }
}

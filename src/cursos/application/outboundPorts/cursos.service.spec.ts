import { CursosService } from './cursos.service';
import { CursoRepository } from '../inboundPorts/curso.repository';

describe('CursosService', () => {
  it('should create a curso', async () => {
    const cursoRepository = new CursoRepository();
    const service = new CursosService(cursoRepository);
    
    const esperado = {
      idCurso: 1,
      titulo: 'Curso Python',
      descricao: 'Descricao A',
      alunos: []
    }

    const resultado = await service.create({ titulo: 'Curso Python', descricao: 'Descricao A' });

    expect(resultado).toEqual(esperado);
  
  });
});

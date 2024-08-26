import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { CursosModule } from './cursos/cursos.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AlunosModule, CursosModule],
})
export class AppModule {}

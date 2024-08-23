import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AlunosModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AlunosService } from './application/outboundPorts/alunos.service';
import { AlunosController } from './alunos.controller';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}

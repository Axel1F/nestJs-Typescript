import { forwardRef, Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from './text-block.model';

@Module({
  providers: [TextBlockService],
  exports: [TextBlockService],
  controllers: [TextBlockController],
  imports: [
    SequelizeModule.forFeature([TextBlock])
  ]
  
})
export class TextBlockModule {}

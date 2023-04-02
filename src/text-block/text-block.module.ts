import { Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';

@Module({
  providers: [TextBlockService],
  controllers: [TextBlockController]
})
export class TextBlockModule {}

import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RunDto } from './dto/run.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  getConfig() {
    return this.appService.getConfig();
  }

  @UsePipes(new ValidationPipe())
  @Post('run')
  async run(@Body() dto: RunDto) {
    return this.appService.run(dto);
  }
}

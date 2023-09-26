import { Injectable } from '@nestjs/common';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getConfig() {
    const service = readFileSync(
      resolve(__dirname, '..', 'src', 'data/service.json'),
      {
        encoding: 'utf-8',
      },
    );

    return service;
  }

  async run({
    input_num,
    input_text,
  }: {
    input_num: number;
    input_text: string;
  }) {
    const workerProcess = spawnSync(
      `${resolve(__dirname, '..', 'src', 'start.sh')}`,
      [`${input_num}`, input_text],
      { encoding: 'utf-8' },
    );

    return workerProcess.stdout;
  }
}

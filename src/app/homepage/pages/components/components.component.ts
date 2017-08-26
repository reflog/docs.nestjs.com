import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { BasePageComponent } from '../page/page.component';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsComponent extends BasePageComponent {
  get catsService() {
    return `
import { Component } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Component()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
`;
  }

  get catsController() {
    return `
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}`;
  }

  get constructorSyntax() {
    return `
constructor(private readonly catsService: CatsService) {}`;
  }

  get appModule() {
    return `
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
    controllers: [CatsController],
    components: [CatsService],
})
export class ApplicationModule {}
`;
  }
}
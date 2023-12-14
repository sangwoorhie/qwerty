import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // 신고기능
  // POST http://localhost:3000/report/:reportedUserId
  @Post('/:commentId')
  async createReport(
    @Param(
      'commentId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    commentId: number,
    @Req() req: any,
    @Body() reportDto: CreateReportDto,
  ) {
    return await this.reportsService.createReport(
      req.user.id,
      commentId,
      reportDto.description,
    );
  }

  // 관리자 계정, 모든 신고기록 조회
  // GET http://localhost:3000/report
  @Get('/')
  async getAllReports(
    @Req() req: any,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const status = req.user.status;
    return await this.reportsService.getAllReports(status, page, pageSize);
  }

  //관리자 계정, commentId에 해당하는 모든 신고기록들 조회
  // GET http://localhost:3000/report/:commentId
  @Get('/:commentId')
  async getReportsByCommentId(
    @Param(
      'commentId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    commentId: number,
    @Req() req: any,
  ) {
    return await this.reportsService.getReportsByCommentId(
      commentId,
      req.user.status,
    );
  }
}

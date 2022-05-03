import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsDiscoverUpcoming } from 'src/utils/multer';
import { DiscoverService } from './discover.service';
import { CreateUpcomingDTO } from './dto/create-upcoming.dto';

@Controller('discover')
export class DiscoverController {
    constructor(private readonly discoverService: DiscoverService){}

    @UseInterceptors(FileInterceptor('IMAGE', multerOptionsDiscoverUpcoming))
    @Post("upcoming")
    postUpcomingData(@Body() body: CreateUpcomingDTO, @UploadedFile() file: Express.Multer.File){

        return this.discoverService.postUpcomingData(body, file);
    }
}

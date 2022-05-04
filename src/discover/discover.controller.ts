import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptionsDiscoverUpcoming } from 'src/utils/multer';
import { DiscoverService } from './discover.service';
import { CreateTopbannerDTO } from './dto/create-topbanner.dto';
import { CreateUpcomingDTO } from './dto/create-upcoming.dto';

@Controller('discover')
export class DiscoverController {
    constructor(private readonly discoverService: DiscoverService){}

    @Post("topbanner")
    postTopbannerData(@Body() body: CreateTopbannerDTO){
        return this.discoverService.postTopbannerData(body);
    }

    @UseInterceptors(FileFieldsInterceptor([
        {name: 'cover', maxCount: 1},
        {name: 'market', maxCount: 5},
    ], multerOptionsDiscoverUpcoming))
    @Post("upcoming")
    postUpcomingData(@Body() body: CreateUpcomingDTO, @UploadedFiles() files: {cover?: Express.Multer.File[], market?: Express.Multer.File[]}){
        console.log(files)
        return this.discoverService.postUpcomingData(body, files);
    }
}

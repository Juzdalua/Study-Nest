import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptionsLocal } from 'src/utils/multer';
import { UploadService } from './upload.service';

@Controller('uploadFile')
export class UploadController {
    constructor(readonly uploadService: UploadService){}


    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'file', maxCount: 2},
        {name: 'img', maxCount: 2},
    ], multerOptionsLocal))
    async postImages(@Body() body: any, @UploadedFiles() files: {file?: Express.Multer.File[], img?: Express.Multer.File[]}){
        console.log(files)
        return {body, files}
        return this.uploadService.postImages(body, files);
    }
};

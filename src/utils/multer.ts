import { BadRequestException } from "@nestjs/common";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import { extname } from "path";
import "dotenv/config"

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

const fileFilter = (req: Express.Request, file:Express.Multer.File, cb:Function) => {
    if(!file.mimetype.match(/\/(jpg|jpeg|png)$/))
        cb(new BadRequestException(400, 'Invalid Image type.'), false);
    else
        cb(null, true);
};

export const multerOptionsUserAvatar = {
    fileFilter,

    storage:
    multerS3({
        s3: s3,
        bucket: `${process.env.AWS_S3_BUCKET_NAME}/user/avatar`,
        acl: 'public-read',
        key: function(req: Express.Request, file:Express.Multer.File, cb:Function){
            cb(null, `${Date.now()}${extname(file.originalname)}`)
        },
    }),

    limits: {
        fieldNameSize: 200,
        fileSize: 1048576, // byte => 1MB,
        files: 1,
    },
};

export const multerOptionsDiscoverUpcoming = {
    fileFilter,

    storage:
    multerS3({
        s3: s3,
        bucket: `${process.env.AWS_S3_BUCKET_NAME}/discover/upcoming`,
        acl: 'public-read',
        key: function(req: Express.Request, file:Express.Multer.File, cb:Function){
            cb(null, `${Date.now()}${extname(file.originalname)}`)
        },
    }),

    limits: {
        fieldNameSize: 200,
        fileSize: 5242880, // byte => 5MB,
        files: 1,
    },
};
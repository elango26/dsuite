import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'file-upload-process',
    templateUrl: './FileuploadProcess.component.html',
    styleUrls: []
})
export class FileuploadProcessComponent implements OnInit {
    selectedFiles: FileList;
    currentFile: File;
    progress = 0;
    message = '';
    fileInfos: Observable<any>;
    constructor(private uploadService: UploadFileService) { }

    ngOnInit(){
        this.fileInfos = this.uploadService.getFiles();
    }

    upload() {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        this.uploadService.upload(this.currentFile).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
      }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }
}
import { Component } from '@angular/core';
import { FileUploaderComponent } from '@components/file-uploader.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@Component({
  selector: 'app-product-photo',
  imports: [DropzoneModule,FileUploaderComponent],
  templateUrl: './product-photo.component.html',
  styles: ``,
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ProductPhotoComponent {

}

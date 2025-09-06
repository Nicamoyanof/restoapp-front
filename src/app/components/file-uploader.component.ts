import { Component, Input, type OnInit } from '@angular/core'
import {
  DROPZONE_CONFIG,
  DropzoneConfigInterface,
  DropzoneModule,
} from 'ngx-dropzone-wrapper'
// import { DropzoneEvent } from 'ngx-dropzone-wrapper/lib/dropzone.interfaces'

type UploadedFile = {
  name: string
  size: number
  type: string
  dataURL?: string
}

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
}

@Component({
  selector: 'FileUploader',
  standalone: true,
  imports: [DropzoneModule],
  template: ` <dropzone
      class="dropzone"
      [config]="dropzoneConfig"
      [message]="dropzone"
      (success)="onUploadSuccess($event)"
    ></dropzone>

    @if (showPreview && uploadedFiles) {
      <div class="list-unstyled mb-0 mt-2" id="file-previews">
        @for (file of uploadedFiles; track $index) {
          <div class="border rounded">
                        <div class="d-flex p-2">
                             <div class="flex-shrink-0 me-3">
                                  <div class="avatar-sm bg-light rounded">
                                       <img data-dz-thumbnail   [src]="file.dataURL" class="img-fluid rounded d-block" src="#" alt="Dropzone-Image" />
                                  </div>
                             </div>
                             <div class="flex-grow-1">
                                  <div class="pt-1">
                                       <h5 class="fs-14 mb-1" data-dz-name>{{file.name}}</h5>
                                       <p class="fs-13 text-muted mb-0" data-dz-size>{{ file.size }}</p>
                                       <strong class="error text-primary" data-dz-errormessage></strong>
                                  </div>
                             </div>
                             <div class="flex-shrink-0 ms-3">
                                  <button data-dz-remove (click)="removeFile($index)" class="btn btn-sm btn-primary">Delete</button>
                             </div>
                        </div>
                   </div>
        }
      </div>
    }`,
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class FileUploaderComponent implements OnInit {
  @Input() showPreview: boolean = false
  uploadedFiles: UploadedFile[] = []

  dropzoneConfig: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    clickable: true,
    addRemoveLinks: true,
  }

  dropzone = `   <div class="dz-message needsclick">
                                                  <i class="bx bx-cloud-upload fs-48 text-primary"></i>
                                                  <h3 class="mt-4">Drop your images here, or <span class="text-primary">click to browse</span></h3>
                                                  <span class="text-muted fs-13">
                                                       1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
                                                  </span>
                                             </div>`

  ngOnInit(): void {
    if (this.showPreview == true) {
      this.dropzoneConfig.previewsContainer = false
    }
  }
  // File Upload
  imageURL: string = ''
  onUploadSuccess(event: UploadedFile[]) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0])
    }, 100)
  }

  // File Remove
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1)
  }
}

import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sweetalert',
  imports: [],
  templateUrl: './sweetalert.component.html',
  styles: ``
})
export class SweetalertComponent {
  error() {
    Swal.fire({
      title: 'Oops...',
      text: 'Something went wrong!',
      icon: 'error',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      footer: '<a href="">Why do I have this issue?</a>',
      showCloseButton: false
    })
  }

  success() {
    Swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        cancelButton: 'btn btn-danger w-xs mt-2',
      },
      showCloseButton: false
    })
  }

  longContent() {
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 1500,
      imageAlt: 'A tall image',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      showCloseButton: false
    })
  }
  cancel() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: "#DD6B55",
      customClass: {
        cancelButton: 'btn btn-danger w-xs mt-2',
      },
      showCloseButton: true,
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        })
      }
    })
  }


  info() {
    Swal.fire({
      title: 'Oops...',
      text: 'Something went wrong!',
      icon: 'info',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      footer: '<a href="">Why do I have this issue?</a>',
      showCloseButton: false
    })
  }

  basicMessage() {
    Swal.fire({
      title: 'Any fool can use a computer',
      confirmButtonText:'Yes, delete it!',
      confirmButtonColor:'#DD6B55',
      showCloseButton: false,
    })
  }

  warning() {
    Swal.fire({
      title: 'Oops...',
      text: 'Something went wrong!',
      icon: 'warning',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      footer: '<a href="">Why do I have this issue?</a>',
      showCloseButton: false
    })
  }

  titleText() {
    Swal.fire({
      title: "The Internet?",
            text: 'That thing is still around?',
            icon: 'question',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            showCloseButton: false
    })
  }
}

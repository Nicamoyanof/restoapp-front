import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ClipboardModule, ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-clip-board',
  imports: [ClipboardModule, FormsModule],
  templateUrl: './clip-board.component.html',
  styles: ``
})
export class ClipBoardComponent {
  text: string = 'name@example.com'
  text1: string = 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga.'
  paragraph = "Just because you can doesn't mean dfdyou should — clipboard.js"
  constructor(private clipboardService: ClipboardService) { }

  cutText(inputElement: HTMLInputElement | HTMLTextAreaElement): void {
    this.clipboardService.copyFromContent(inputElement.value)
    inputElement.value = ''
  }
}

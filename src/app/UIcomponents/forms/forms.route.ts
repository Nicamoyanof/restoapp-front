import { Route } from "@angular/router";
import { BasicElementComponent } from "./basic-element/basic-element.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { ChoiceSelectComponent } from "./choice-select/choice-select.component";
import { ClipBoardComponent } from "./clip-board/clip-board.component";
import { FlatPickrComponent } from "./flat-pickr/flat-pickr.component";
import { ValidationComponent } from "./validation/validation.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { EditorComponent } from "./editor/editor.component";
import { InputMaskComponent } from "./input-mask/input-mask.component";
import { SliderComponent } from "./slider/slider.component";

export const FORMS_ROUTE: Route[] = [
    {
        path: 'basic',
        component: BasicElementComponent,
        data: { title: 'Basic' },
    },
    {
        path: 'checkbox-radio',
        component: CheckboxComponent,
        data: { title: 'Checkbox Radio' },
    },
    {
        path: 'choices',
        component: ChoiceSelectComponent,
        data: { title: 'Choices' },
    },
    {
        path: 'clipboard',
        component: ClipBoardComponent,
        data: { title: 'Clipboard' },
    },
    {
        path: 'flatpickr',
        component: FlatPickrComponent,
        data: { title: 'Flatpickr' },
    },
    {
        path: 'validation',
        component: ValidationComponent,
        data: { title: 'Validation' },
    },
    {
        path: 'fileupload',
        component: FileUploadComponent,
        data: { title: 'Fileupload' },
    },
    {
        path: 'editors',
        component: EditorComponent,
        data: { title: 'Editors' },
    },
    {
        path: 'inputmask',
        component: InputMaskComponent,
        data: { title: 'Inputmask' },
    },
    {
        path: 'slider',
        component: SliderComponent,
        data: { title: 'Slider' },
    },

]
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { SignaturePad } from '../libs/signature-pad/angular2-signaturepad.component'
import * as jsonLogic from 'json-logic-js';
import Swal from 'sweetalert2'

@Component({
  selector: 'mwd-form-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class MWDFormViewerComponent implements OnInit {

  @ViewChild("fileUpload", { static: false })
  fileUpload!: ElementRef; files = [];
  signaturePadOptions = { // passed through to szimek/signature_pad constructor

  };

  @ViewChildren(SignaturePad) public sigs!: QueryList<SignaturePad>;
  @ViewChildren('sigContainer') public sigContainer!: QueryList<ElementRef>;
  @Input() public form_data: any = {
    fields: []
  };
  @Output() public onSaveEvent: EventEmitter<any>;


  activePage = 0;

  constructor() {
    this.onSaveEvent = new EventEmitter();

  }

  ngOnInit(): void {
    if (!this.form_data.title) {
      console.log('Getting from local')
      this.form_data = JSON.parse(localStorage.getItem('formPreview') || '{}')
      this.form_data.dataset = [
        {
          "id": "619d085a5d77a4cbf8293553",
          "name": "Random Words",
          "dataset": [
            {
              "id": "619d085aa29c3a21e99cf7d6",
              "value": "sunt",
              "label": "sunt"
            },
            {
              "id": "619d085adb74b57108cf2862",
              "value": "labore",
              "label": "labore"
            },
            {
              "id": "619d085aaa1a7e0226fee5e7",
              "value": "culpa",
              "label": "culpa"
            },
            {
              "id": "619d085a0cdaf65496317eb5",
              "value": "in",
              "label": "in"
            },
            {
              "id": "619d085a84ef634a1036a470",
              "value": "nulla",
              "label": "nulla"
            },
            {
              "id": "619d085a1853e6fc2ddf9c69",
              "value": "aliqua",
              "label": "aliqua"
            },
            {
              "id": "619d085a2a1eac5f521c50b6",
              "value": "deserunt",
              "label": "deserunt"
            }
          ]
        }, {
          id: '619d085a5d77a4cbf8293554',
          name: 'Locations',
          "dataset": [
            {
              "id": "3434352sfsdf",
              "value": "Corporate",
              "label": "Corporate"
            },
            {
              "id": "fsdfvsdf",
              "value": "Odessa",
              "label": "Odessa"
            },
            {
              "id": "fsdfvsdf",
              "value": "North Dakota",
              "label": "North Dakota"
            },
          ]
        }
      ]
    }

    //this.initTranslate('de');
    //  this.injectDatasets();

  }
  public ngAfterViewInit() {
    this.beResponsive();
  }


  injectDatasets() {
    this.form_data.pages.forEach((page: any) => {
      page.fields.forEach(async (field: any) => {
        if (field.type == 'select' && field.settings.source != 'customFormBuilderList') {
          field.settings.items = this.form_data.dataset.find((x: any) => x.id === field.settings.source).dataset;

        }
      });
    });
  }

  initTranslate(to: string) {
    this.form_data.pages.forEach((page: any) => {
      page.fields.forEach(async (field: any) => {
        //  translate.push(field.title)
        field.title = await this.translate(field.title, to)
        if (field.settings.items && Array.isArray(field.settings.items))
          field.settings.items.forEach(async (item: any) => {
            item.label = await this.translate(item.label, to)
          });
      });
    });



  }

  async translate(text: string, target: any) {

    const res = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text.toLocaleLowerCase(),
        source: "en",
        target: target
      }),
      headers: { "Content-Type": "application/json" }
    });
    var returnData = await res.json();


    const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ""

    return capitalize(returnData.translatedText);
    //return await res.json();

  }
  // curl --location --request POST 'https://dev-api.itranslate.com/translation/v2/' --header 'Authorization: Bearer 603160b7-cee1-4c13-bcd7-37420b55211d' --header 'Content-Type: application/json' --data-raw '{
  //   "source": {"dialect": "en", "text": "back"},
  //   "target": {"dialect": "es"}
  async translate3(text: string, target: any) {

    const res = await fetch("https://dev-api.itranslate.com/translation/v2/", {
      method: "POST",
      body: JSON.stringify({
        "source": { "dialect": "en", "text": text },
        "target": { "dialect": target }
      }),
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
        "Authorization": "Bearer 603160b7-cee1-4c13-bcd7-37420b55211d"
      }
    });
    var returnData = await res.json();


    return returnData.target.text;
    //return returnData.translatedText;
    //return await res.json();

  }




  onFileUpload() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        //  const file = fileUpload.files[index];  
        //  this.files.push({ data: file, inProgress: false, progress: 0});  
      }
      //   this.uploadFiles();  
    };
    fileUpload.click();
  }

  submit() {

    this.onSaveEvent.emit(this.form_data);

  }

  nextPage() {









    if (this.canProceed()) {
      this.activePage = this.activePage + 1;
      setTimeout(() => {
        this.beResponsive();

      }, 100);
    } else {
      //  alert('Please fill required fields.')
      Swal.fire({
        title: 'Oops!',
        text: 'Please complete the required fields.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000

      })
    }


  }
  previousPage() {
    this.activePage = this.activePage - 1;

    setTimeout(() => {
      this.beResponsive();

    }, 100);
  }


  canProceed(): boolean {
    var canProceed: boolean = true;

    this.form_data.pages[this.activePage].fields.forEach((field: any) => {
      if (field.required && !field.value && this.isVisible(field, 0)) {
        console.log(field)
        canProceed = false
      }
      if (Array.isArray(field.value)) {
        if (field.value.length < 1)
          canProceed = false

      }
      //else{
      //   Swal.fire({
      //     title: 'Oops!',
      //     text: 'Please complete the required fields.',
      //     icon: 'error',
      //     showConfirmButton:false,
      //     timer: 1500

      //   })
      // }
    });
    return canProceed;

  }


  loopThroughFields(obj: any): RulesLogic {


    var condition: any = [];
    obj.rules.forEach((element: any) => {
      var ruleValue = this.form_data.pages[this.activePage].fields[this.form_data.pages[this.activePage].fields.findIndex((field: any) => field.id === element.field)].value;
      var rOperator: string = '==';


      switch (element.operator) {
        case '=':
          rOperator = "=="
          break;
        case '!=':
          rOperator = "!="
          break;
        case 'in':
          rOperator = "=="
          break;
        case 'not in':
          rOperator = "!="
          break;

        default:
          break;
      }

      if (Array.isArray(element.value)) {

        var arrayCondion: any = {
          or: []
        }

        element.value.forEach((element2: any) => {
          arrayCondion.or.push({
            [element.operator]: [element2, ruleValue]
          })
        });

        condition.push(arrayCondion);

      } else {
        condition.push({
          [rOperator]: [element.value, ruleValue]
        })
      }







    });



    if (obj.condition == 'and') {
      return ({
        'and': condition
      })
    } else {
      return ({
        'or': condition
      })
    }
  }

  isVisible(field: any, index: number) {




    if (field.hidden) {
      return false
    } else {

      try {
        if (typeof field.conditions !== 'undefined' && field.conditions.rules.length >= 1) {
          return (jsonLogic.apply(this.loopThroughFields(field.conditions)))
        } else {

          return true
        }
      } catch (ex) {
        return false
      }



    }


  }

  public beResponsive() {
    //  console.log('Resizing signature pad canvas to suit container size');
    this.sigContainer.forEach((element, index) => {
      this.size(element, this.sigs.toArray()[index]);

    });
  }

  public size(container: ElementRef, sig: SignaturePad) {
    sig.set('canvasWidth', container.nativeElement.clientWidth);
    sig.set('canvasHeight', container.nativeElement.clientHeight);

    this.reDraw(sig)
  }

  reDraw(sig: SignaturePad) {


    var objIndex = this.form_data.pages[this.activePage].fields.findIndex((obj: any) => obj.id == sig.options.id);
    if (this.form_data.pages[this.activePage].fields[objIndex].value)
      sig.fromDataURL(this.form_data.pages[this.activePage].fields[objIndex].value)


  }
  drawEnded(field: any) {
    try {
      var objIndex = this.form_data.pages[this.activePage].fields.findIndex((obj: any) => obj.id == field.id);
      var objs = this.form_data.pages[this.activePage].fields.filter((obj: any) => obj.type == 'signature')
      var currentObjIndex = objs.findIndex((obj: any) => obj.id == field.id);
      this.form_data.pages[this.activePage].fields[objIndex].value = this.sigs.toArray()[currentObjIndex].toDataURL()
    } catch (error) {
      console.log(error)
    }

  }
  selectedCheckbox(field: any, value: any, checked: boolean) {
    var formArray: any[] = [];
    if (Array.isArray(field.value)) {
      formArray = field.value;
    }

    if (checked) {
      formArray.push(value)
      field.value = formArray;
    } else {
      let index = formArray.findIndex(x => x == value)
      formArray.splice(index, 1);
      field.value = formArray;
    }
  }

}

export type RulesLogic =
  | boolean
  | string
  | number

  // AccessingData
  | { var: RulesLogic | [RulesLogic] | [RulesLogic, any] | [RulesLogic, any] }
  | { missing: RulesLogic | any[] }
  | { missing_some: [RulesLogic, RulesLogic | any[]] }

  // LogicBooleanOperations
  | { if: [any, any, any, ...any[]] }
  | { '==': [any, any] }
  | { '===': [any, any] }
  | { '!=': [any, any] }
  | { '!==': [any, any] }
  | { '!': any }
  | { '!!': any }
  | { or: RulesLogic[] }
  | { and: RulesLogic[] }

  // NumericOperations
  | { '>': [RulesLogic, RulesLogic] }
  | { '>=': [RulesLogic, RulesLogic] }
  | { '<': [RulesLogic, RulesLogic] | [RulesLogic, RulesLogic, RulesLogic] }
  | { '<=': [RulesLogic, RulesLogic] | [RulesLogic, RulesLogic, RulesLogic] }
  | { max: RulesLogic[] }
  | { min: RulesLogic[] }
  | { '+': RulesLogic[] | RulesLogic }
  | { '-': RulesLogic[] | RulesLogic }
  | { '*': RulesLogic[] | RulesLogic }
  | { '/': RulesLogic[] | RulesLogic }
  | { '%': [RulesLogic, RulesLogic] }

  // ArrayOperations
  | { map: [RulesLogic, RulesLogic] }
  | { filter: [RulesLogic, RulesLogic] }
  | { reduce: [RulesLogic, RulesLogic, RulesLogic] }
  | { all: [RulesLogic[], RulesLogic] | [RulesLogic, RulesLogic] }
  | { none: [RulesLogic[], RulesLogic] | [RulesLogic, RulesLogic] }
  | { some: [RulesLogic[], RulesLogic] | [RulesLogic, RulesLogic] }
  | { merge: Array<RulesLogic[] | RulesLogic> }
  | { in: [RulesLogic, RulesLogic[]] }

  // StringOperations
  | { in: [RulesLogic, RulesLogic] }
  | { cat: RulesLogic[] }
  | { substr: [RulesLogic, RulesLogic] | [RulesLogic, RulesLogic, RulesLogic] }

  // MiscOperations
  | { log: RulesLogic };
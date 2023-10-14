import { Component } from '@angular/core';

type PCComponent = {
  id: number;
  name: string;
  description: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // LAS VARIABLES DEBEN SER PÚBLICAS PARA QUE SE PUEDA ACCEDER EN EL TEMPLATE
  name = 'Isra';
  progressValue = 10;
  showThing = false;
  age = 50;
  coolImage =
    'https://images.unsplash.com/photo-1694845482698-accfce9310f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NTk1NjQxMQ&ixlib=rb-4.0.3&q=80&w=1080';
  isBtnDisabled = true;
  inputName = 'Angularbro';
  person = {
    name: 'BigBOss',
    profilePic:
      'https://images.unsplash.com/photo-1693778472450-ded02c16bd16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NTk1NzUwNw&ixlib=rb-4.0.3&q=80&w=1080',
    description: "Hello bros, what's up",
  };

  emojis = ['😀', '😆', '😂', '😥'];
  itemName = '';
  pcComponents: Array<PCComponent> = [
    {
      id: 1,
      name: 'Monitor',
      description: `Los monitores más veloces del oeste`,
    },
    {
      id: 2,
      name: 'CASE',
      description: `Los Cases más especiales solo puedes encontrarlos en un solo lugar`,
    },
    {
      id: 3,
      name: 'Keyboards',
      description: `Keyboards cómodos, clickys o no clickys. Lo que 
    quieras o necesites, lo tenemos 😎`,
    },
  ];

  elementSelected = '';

  get beyondHalf() {
    return this.progressValue > 50;
  }

  handleToggleBtn() {
    this.isBtnDisabled = !this.isBtnDisabled;
  }

  moreProgress() {
    if (this.progressValue >= 100) return;
    this.progressValue += 10;
  }

  lessProgress() {
    if (this.progressValue <= 0) return;
    this.progressValue -= 10;
  }

  toggleThing() {
    this.showThing = !this.showThing;
  }

  addNewItem($event: Event) {
    $event.preventDefault();
    this.emojis.push(this.itemName);
    this.itemName = '';
  }
  removeItem(idx: number) {
    this.emojis.splice(idx, 1);
  }
  trackByItems(index: number, item: PCComponent) {
    console.log('i dont get it?', { index, item });
    return item.id;
  }

  selectElement(element: string) {
    this.elementSelected = element;
  }
}

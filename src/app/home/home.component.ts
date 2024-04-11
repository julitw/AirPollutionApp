import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   
    animatedWords: string[] = [];

    constructor() { }

    ngOnInit(): void {
        const text = 'Check the air condition around the world!';
        this.animateWords(text);
    }

    animateWords(text: string): void {
        const words = text.split(' ');
        let index = 0;
        const interval = setInterval(() => {
            if (index < words.length) {
                this.animatedWords.push(words[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 200);
    }
}

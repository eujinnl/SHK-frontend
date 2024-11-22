import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EditorComponent } from '../components/editor/editor.component';
import { LevelTestComponent } from '../components/levels/level_template.component';

@Component({
  standalone: true,
  imports: [RouterLink,EditorComponent, LevelTestComponent],
  template: `
    <div class="flex w-full h-full justify-center items-center  bg-center bg-cover bg-no-repeat">
        <game-component class="w-full h-full"></game-component>        
    </div>
  `,
})
export class TestViewComponent{

  constructor(private router: Router) {
  }
  navigateToLevel1Overview() {
    this.router.navigate(['game']);
  }

}
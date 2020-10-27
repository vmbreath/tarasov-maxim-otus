import {Component} from '@angular/core';
import {faCogs, faGraduationCap, faList} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'words-memorizer';
  faCogs = faCogs;
  faGraduationCap = faGraduationCap;
  faList = faList;
}

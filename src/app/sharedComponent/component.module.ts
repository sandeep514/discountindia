import { NgModule } from "@angular/core";
import { FooterTabsComponent } from '../footer-tabs/footer-tabs.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations : [FooterTabsComponent],
    exports : [FooterTabsComponent],
    imports: [IonicModule],
})

export class ComponentModule{}
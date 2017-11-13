import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}

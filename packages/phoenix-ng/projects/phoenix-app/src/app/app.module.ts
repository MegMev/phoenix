import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GeometryComponent } from './sections/geometry/geometry.component';
import { AtlasComponent } from './sections/atlas/atlas.component';
import { LHCbComponent } from './sections/lhcb/lhcb.component';
import { VPToggleComponent } from './sections/lhcb/vp-toggle/vp-toggle.component';
import { CMSComponent } from './sections/cms/cms.component';
import { TrackmlComponent } from './sections/trackml/trackml.component';
import { PlaygroundComponent } from './sections/playground/playground.component';
import { MegatComponent } from './sections/megat/megat.component';

import { PhoenixUIModule } from 'phoenix-ui-components';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let routes: Routes;

if (environment?.singleEvent) {
  routes = [{ path: '', component: AtlasComponent }];
} else {
  routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'geometry', component: GeometryComponent },
    { path: 'atlas', component: AtlasComponent },
    { path: 'lhcb', component: LHCbComponent },
    { path: 'cms', component: CMSComponent },
    { path: 'trackml', component: TrackmlComponent },
    { path: 'playground', component: PlaygroundComponent },
    { path: 'megat', component: MegatComponent },
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeometryComponent,
    AtlasComponent,
    LHCbComponent,
    VPToggleComponent,
    CMSComponent,
    TrackmlComponent,
    PlaygroundComponent,
    MegatComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: environment?.singleEvent ? false : true,
    }),
    BrowserAnimationsModule,
    PhoenixUIModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

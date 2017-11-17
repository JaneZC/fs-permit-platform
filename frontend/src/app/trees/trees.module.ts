import { NgModule } from '@angular/core';

import { ContactInfoComponent } from './forests/tree-guidelines/contact-info/contact-info.component';
import { SharedModule } from '../_shared/shared.module';
import { TreeGuidelinesComponent } from './forests/tree-guidelines/tree-guidelines.component';
import { TreeCuttingDatesComponent } from './forests/tree-guidelines/tree-cutting-dates.component';
import { TreeSelectionComponent } from './forests/tree-guidelines/tree-selection/tree-selection.component';
import { TreeSpeciesComponent } from './forests/tree-guidelines/tree-selection/tree-species/tree-species.component';

import { TreeCuttingComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting.component';
import { TreeCuttingCleanupComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting-cleanup/tree-cutting-cleanup.component';
import { TreeToolsComponent } from './forests/tree-guidelines/tree-cutting/tree-tools/tree-tools.component';

import { TripPlanningComponent } from './forests/tree-guidelines/trip-planning/trip-planning.component';

import { TreesService } from './_services/trees.service';
import { SidebarViewComponent } from './forests/tree-guidelines/sidebar-view.component';
import { TreeCuttingRulesComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting-rules/tree-cutting-rules.component';
import { TreeLocationsProhibitedComponent } from './forests/tree-guidelines/tree-locations/tree-locations-prohibited/tree-locations-prohibited.component';
import { TreeLocationsAllowedComponent } from './forests/tree-guidelines/tree-locations/tree-locations-allowed/tree-locations-allowed.component';
import { TreeLocationsMapsComponent } from './forests/tree-guidelines/tree-locations/tree-locations-maps/tree-locations-maps.component';

import { TreeRulesComponent } from './forests/tree-guidelines/tree-rules.component';

import { ForestService } from './_services/forest.service';
import { ForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';

@NgModule({
  declarations: [
    ContactInfoComponent,
    TreeCuttingComponent,
    TreeCuttingCleanupComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeLocationsMapsComponent,
    TreeLocationsProhibitedComponent,
    TreeLocationsAllowedComponent,
    TreeSelectionComponent,
    TreeSpeciesComponent,
    TripPlanningComponent,
    TreeRulesComponent,
    TreeToolsComponent,
    SidebarViewComponent,
    ForestFinderComponent,
    RemovePuncPipe
  ],
  exports: [
    ContactInfoComponent,
    TreeCuttingComponent,
    TreeCuttingCleanupComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeSelectionComponent,
    TreeSpeciesComponent,
    TripPlanningComponent,
    TreeRulesComponent,
    TreeToolsComponent,
    SidebarViewComponent
  ],
  imports: [SharedModule],
  providers: [TreesService, ForestService]
})
export class TreesModule {}

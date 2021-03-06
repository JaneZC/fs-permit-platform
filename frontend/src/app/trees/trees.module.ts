import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../_shared/shared.module';
import { TreeGuidelinesComponent } from './forests/tree-guidelines/tree-guidelines.component';
import { TreeCuttingDatesComponent } from './forests/tree-guidelines/tree-cutting-dates/tree-cutting-dates.component';
import { TreeSpeciesComponent } from './forests/tree-guidelines/tree-species/tree-species.component';
import { ChristmasTreesService } from './_services/christmas-trees.service';
import { TreeCuttingRulesComponent } from './forests/tree-guidelines/tree-cutting-rules/tree-cutting-rules.component';
import { ForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { LineBreakFormatterPipe } from '../_pipes/line-break-formatter.pipe';
import { ColumnizeArrayPipe } from '../_pipes/columnize-array.pipe';
import { ChristmasTreesApplicationService } from './_services/christmas-trees-application.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { ChristmasTreesAdminService } from './admin/christmas-trees-admin.service';
import { AdminDistrictDatesComponent } from './admin/district-dates/district-dates.component';
import { ChristmasTreeMapDetailsComponent } from './forests/christmas-tree-map-details/christmas-tree-map-details.component';
import { ChristmasTreeMapDetailsService } from './forests/christmas-tree-map-details/christmas-tree-map-details.service';
import { TreeGuidelinesFooterComponent } from './forests/tree-guidelines/tree-guidelines-footer.component';

@NgModule({
  declarations: [
    ReportComponent,
    ReportResultsComponent,
    AdminDistrictDatesComponent,
    AdminSeasonDatesComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    ForestFinderComponent,
    ChristmasTreeMapDetailsComponent,
    TreeGuidelinesFooterComponent,
    RemovePuncPipe,
    LineBreakFormatterPipe,
    ColumnizeArrayPipe
  ],
  exports: [
    ReportComponent,
    ReportResultsComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeGuidelinesFooterComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    ChristmasTreeMapDetailsComponent,
    LineBreakFormatterPipe,
    ColumnizeArrayPipe
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [ChristmasTreesService, ChristmasTreesAdminService, ChristmasTreesApplicationService, ChristmasTreeMapDetailsService]
})
export class TreesModule {}

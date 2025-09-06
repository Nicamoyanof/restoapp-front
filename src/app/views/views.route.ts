import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './apps/orders/orders.component';
import { ListingComponent } from './apps/products/listing/listing.component';
import { AddEditComponent } from './apps/products/add-edit/add-edit.component';
import { CategoryListingComponent } from './apps/categories/listing/listing.component';
import { Title } from '@angular/platform-browser';
import { CategoryAddEditComponent } from './apps/categories/add-edit/add-edit.component';
import { CustomersComponent } from './apps/customers/customers.component';
import { MenuCardsComponent } from './apps/menu-cards/menu-cards.component';
import { PosComponent } from './apps/pos/pos.component';
import { ReportsComponent } from './apps/reports/reports.component';
import { RidersComponent } from './apps/riders/riders.component';
import { OffersComponent } from './apps/offers/offers.component';
import { LocationsComponent } from './apps/locations/locations.component';
import { MediaComponent } from './apps/media/media.component';
import { StoreSettingComponent } from './apps/store-setting/store-setting.component';
import { TodoComponent } from './apps/todo/todo.component';
import { ManageAppsComponent } from './apps/manage-apps/manage-apps.component';
import { OnvoiceComponent } from './apps/invoices/onvoice/onvoice.component';
import { OnvoiceDetailComponent } from './apps/invoices/onvoice-detail/onvoice-detail.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { PricingComponent } from './pages/pricing/pricing.component';

export const VIEWS_ROUTES: Route[] = [
  {
    path: 'index',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'Order' },
  },
  {
    path: 'product/listing',
    component: ListingComponent,
    data: { title: 'Product Listing' },
  },
  {
    path: 'product/add-edit',
    component: AddEditComponent,
    data: { title: 'Product Add Edit' },
  },
  {
    path: 'categories/listing',
    component: CategoryListingComponent,
    data: { title: 'Category Listing' },
  },
  {
    path: 'categories/add-edit',
    component: CategoryAddEditComponent,
    data: { title: 'Category Add Edit' },
  },
  {
    path: 'categories/edit/:id',
    component: CategoryAddEditComponent,
    data: { title: 'Category Add Edit' },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { title: 'Customers' },
  },
  {
    path: 'menu-cards',
    component: MenuCardsComponent,
    data: { title: 'Menu Cards' },
  },
  {
    path: 'pos',
    component: PosComponent,
    data: { title: 'POS' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { title: 'Report' },
  },
  {
    path: 'riders',
    component: RidersComponent,
    data: { title: 'Rider' },
  },
  {
    path: 'offers',
    component: OffersComponent,
    data: { title: 'Offer' },
  },
  {
    path: 'locations',
    component: LocationsComponent,
    data: { title: 'Location' },
  },
  {
    path: 'media',
    component: MediaComponent,
    data: { title: 'Media' },
  },
  {
    path: 'settings',
    component: StoreSettingComponent,
    data: { title: 'Media' },
  },
  {
    path: 'todo',
    component: TodoComponent,
    data: { title: 'Todo' },
  },
  {
    path: 'manage-apps',
    component: ManageAppsComponent,
    data: { title: 'Manage Apps' },
  },
  {
    path: 'invoices',
    component: OnvoiceComponent,
    data: { title: 'Invoices' },
  },
  {
    path: 'invoice-details',
    component: OnvoiceDetailComponent,
    data: { title: 'Invoices Detail' },
  },
  {
    path: 'pages/starter',
    component: WelcomeComponent,
    data: { title: 'Welcome' },
  },
  {
    path: 'pages/profile',
    component: ProfileComponent,
    data: { title: 'Profile' },
  },
  {
    path: 'pages/faqs',
    component: FaqsComponent,
    data: { title: 'FAQs' },
  },
  {
    path: 'pages/gallery',
    component: GalleryComponent,
    data: { title: 'Gallery' },
  },
  {
    path: 'pages/timeline',
    component: TimelineComponent,
    data: { title: 'Timeline' },
  },
  {
    path: 'pages/pricing',
    component: PricingComponent,
    data: { title: 'Pricing' },
  },
];

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
import { RestaurantTablesComponent } from './apps/restaurant-tables/restaurant-tables.component';
import { PaymentMethodsComponent } from './apps/payment-methods/payment-methods.component';
import { HistoricalOrdersComponent } from './apps/historical-orders/historical-orders.component';
import { clientGuard } from '../guards/client.guard';
import { EditOrderComponent } from './apps/edit-order/edit-order.component';
import { KitchenSettingsComponent } from './apps/settings/kitchen-settings/kitchen-settings.component';
import { IngredientsComponent } from './apps/ingredients/ingredients.component';
import { AddIngredientsComponent } from './apps/ingredients/add-ingredients/add-ingredients.component';
import { StoreSettingComponent } from './apps/settings/store-setting/store-setting.component';
import { ControlStockComponent } from './apps/inventory/control-stock/control-stock.component';
import { StockMovementComponent } from './apps/inventory/stock-movement/stock-movement.component';
import { ListSpentComponent } from './apps/spent/list-spent/list-spent.component';
import { AddSpentComponent } from './apps/spent/add-spent/add-spent.component';
import { CountStockComponent } from './apps/inventory/count-stock/count-stock.component';

export const VIEWS_ROUTES: Route[] = [
  {
    path: 'index',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [clientGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'Order' },
    canActivate: [clientGuard],
  },
  {
    path: 'product/listing',
    component: ListingComponent,
    data: { title: 'Product Listing' },
    canActivate: [clientGuard],
  },
  {
    path: 'product/add',
    component: AddEditComponent,
    data: { title: 'Product Add Edit' },
    canActivate: [clientGuard],
  },
  {
    path: 'product/edit/:id',
    component: AddEditComponent,
    data: { title: 'Product Add Edit' },
    canActivate: [clientGuard],
  },
  {
    path: 'categories/listing',
    component: CategoryListingComponent,
    data: { title: 'Category Listing' },
    canActivate: [clientGuard],
  },
  {
    path: 'categories/add-edit',
    component: CategoryAddEditComponent,
    data: { title: 'Category Add Edit' },
    canActivate: [clientGuard],
  },
  {
    path: 'categories/edit/:id',
    component: CategoryAddEditComponent,
    data: { title: 'Category Add Edit' },
    canActivate: [clientGuard],
  },
  {
    path: 'settings',
    component: StoreSettingComponent,
    data: { title: 'Media' },
  },
  {
    path: 'restaurant-tables',
    component: RestaurantTablesComponent,
    data: { title: 'Restaurant Tables' },
    canActivate: [clientGuard],
  },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent,
    data: { title: 'Payment Methods' },
    canActivate: [clientGuard],
  },
  {
    path: 'order-historical',
    component: HistoricalOrdersComponent,
    data: { title: 'Order Historical' },
    canActivate: [clientGuard],
  },
  {
    path: 'edit-order/:id',
    component: EditOrderComponent,
    data: { title: 'Editar Pedido' },
    canActivate: [clientGuard],
  },
  {
    path: 'settings/kitchen',
    component: KitchenSettingsComponent,
    data: { title: 'Configuración de Cocina' },
    canActivate: [clientGuard],
  },
  {
    path: 'ingredients/listing',
    component: IngredientsComponent,
    data: { title: 'Listado de Ingredientes' },
    canActivate: [clientGuard],
  },
  {
    path: 'ingredients/add',
    component: AddIngredientsComponent,
    data: { title: 'Agregar Ingrediente' },
    canActivate: [clientGuard],
  },
  {
    path: 'ingredients/edit/:id',
    component: AddIngredientsComponent,
    data: { title: 'Agregar Ingrediente' },
    canActivate: [clientGuard],
  },
  {
    path: 'stock/control',
    component: ControlStockComponent,
    data: { title: 'Control de Stock' },
    canActivate: [clientGuard],
  },
  {
    path: 'stock/movements',
    component: StockMovementComponent,
    data: { title: 'Movimientos de Stock' },
    canActivate: [clientGuard],
  },
  {
    path: 'spent/list',
    component: ListSpentComponent,
    data: { title: 'Movimientos de Gastos' },
    canActivate: [clientGuard],
  },
  {
    path: 'spent/add',
    component: AddSpentComponent,
    data: { title: 'Agregar Gastos' },
    canActivate: [clientGuard],
  },
  {
    path: 'stock/count',
    component: CountStockComponent,
    data: { title: 'Conteo de Stock' },
    canActivate: [clientGuard],
  },
];

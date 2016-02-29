import {DeviceListService} from './device-list.service';

const DEVICE_LIST_TPL = require('./device-list.component.tpl.html');

export function DeviceListComponent(): ng.IDirective {
  return {
    template: DEVICE_LIST_TPL,
    scope: {},
    bindToController: {},
    controllerAs: 'deviceList',
    controller: DeviceListController
  };
}

class DeviceListController {

  public items: any[];
  public loading: boolean = false;
  public pageNumber: number;
  public totalCount: number;
  public pageSize: number;
  public hasSelected: boolean = false;
  public isAllSelected: boolean = false;
  public selectedCount: number = 0;

  /* @ngInject */
  constructor(private deviceList: DeviceListService) {
    this.pageSize = deviceList.size;
    this.synchronizePage();
  }

  public load = () => {
      this.loading = true;
      this.deviceList.loadDevices(this.pageNumber, this.pageSize).finally(() => {
        this.loading = false;
        this.synchronizePage();
      });
  };

  public activate = () => {
    this.loading = true;
    this.deviceList.activateDevices().finally(() => {
      this.loading = false;
      this.synchronizePage();
    });
  };

  public deactivate = () => {
    this.loading = true;
    this.deviceList.deactivateDevices().finally(() => {
      this.loading = false;
      this.synchronizePage();
    });
  };

  public delete = () => {
    this.loading = true;
    this.deviceList.deleteDevices().finally(() => {
      this.loading = false;
      this.synchronizeSelection();
      this.synchronizePage();
    });
  };

  public export = () => {
    this.deviceList.saveToCSV();
  };

  public selectAll = (selected: boolean) => {
    this.deviceList.selectAll(selected);
    this.synchronizeSelection();
  };

  public select = (item: any, selected: boolean) => {
    this.deviceList.select(item, selected);
    this.synchronizeSelection();
  };

  public get hasNoData() {
    return this.items.length === 0;
  }

  public changePage() {
    this.isAllSelected = false;
    this.load();
  }

  public changeSize() {
    this.isAllSelected = false;
    this.pageNumber = 1;
    this.load();
  }

  private synchronizePage() {
    this.items = this.deviceList.data;
    this.pageNumber = this.deviceList.page;
    this.totalCount = this.deviceList.totalCount;
  }

  private synchronizeSelection() {
    this.hasSelected = this.deviceList.hasSelected;
    this.selectedCount = this.deviceList.selectedCount;
  }
}

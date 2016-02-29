import {RestService} from '../live-objects/rest.service';

import * as moment from 'moment';
import {exportToCsv} from '../common/utils/csv-exporter';

export class DeviceListService {

  private _page: number = 1;
  private _size: number = 10;
  private _totalCount: number = 0;
  private _data: any[];

  public constructor(private $q: ng.IQService, private restService: RestService) {
  }

  public loadDevices = (page: number = 0, size: number = 10) => {
    let restPage: number = page - 1;
    return this.restService.getLoraDevices(restPage, size).then((result: any) => {
      this._data = this.toDevices(result.data);
      this._page = result.page + 1;
      this._size = result.size;
      this._totalCount = result.totalCount;
      return this;
    }, this.$q.reject);
  };

  public activateDevices = () => {
    // TODO Brancher à l'API
    this.selectedItems.forEach((device) => {
      device.src.status = 'ACTIVATED';
      device.ui.activated = true;
    });
    return this.$q.when(this.data);
  };

  public deactivateDevices = () => {
    // TODO Brancher à l'API
    this.selectedItems.forEach((device) => {
      device.src.status = 'DEACTIVATED';
      device.ui.activated = false;
    });
    return this.$q.when(this.data);
  };

  public deleteDevices = () => {
    return this.$q.all(this.selectedItems.map((device) => {
      return this.restService.deleteDevice(device.src.devEUI);
    })).finally(() => this.loadDevices(this._page, this._size));
  };

  public saveToCSV = () => {
    exportToCsv('devices_' + moment().format('L[_]HHmmss'), this.data.map((item: any) => item.src));
  };

  public select = (item: any, selected: boolean) => {
    item.list.isSelected = selected;
  };

  public selectAll = (selected: boolean) => {
    this._data.forEach((item: any) => this.select(item, selected));
  };

  public get hasSelected() {
    return _.some(this._data, (item: any) => item.list.isSelected);
  }

  public get selectedCount() {
    return this.selectedItems.length;
  }

  public set size(size: number) {
    this._size = size;
  }

  public get data(): any[] {
    return this._data;
  }

  public get page(): number {
    return this._page;
  }

  public get size(): number {
    return this._size;
  }

  public get totalCount(): number {
    return this._totalCount;
  }

  private get selectedItems(): any[] {
    return this.data.reduce((items: any[], item: any) => {
      if (item.list.isSelected) {
        items.push(item);
      }
      return items;
    }, []);
  }

  private toDevice(lora: any): any {
    return {
      src: lora,
      ui: {
        activated: lora.status === 'ACTIVATED',
        lastCom: moment(lora.lastComTs).format('YYYY/MM/DD HH:mm:ss')
      },
      list: {
        isSelected: false
      }
    };
  }

  private toDevices(loraDevices: any[]): any[] {
    return loraDevices.map(this.toDevice);
  }
}

export class DeviceListProvider implements ng.IServiceProvider {

  /* @ngInject */
  public $get($q: ng.IQService, loRest: RestService): DeviceListService {
    return new DeviceListService($q, loRest);

  }

  /* @ngInject */
  public deviceListResolve(deviceList: DeviceListService) {
    return deviceList.loadDevices();
  }
}

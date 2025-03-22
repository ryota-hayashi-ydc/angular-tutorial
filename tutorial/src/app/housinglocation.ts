export interface HousingLocation {
    id              : number;   //識別子
    name            : string;   //名前
    city            : string;   //都市名
    state           : string;   //州名
    photo           : string;   //写真名
    availableUnits  : number;   //部屋数
    hasWifi         : boolean;  //Wi-fi環境
    hasLaundry      : boolean;  //洗濯機
}

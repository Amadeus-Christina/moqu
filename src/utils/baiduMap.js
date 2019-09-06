// 获取城市
export function getCurrentCityName() {
    return new Promise(function (resolve) {
        let myCity = new BMap.LocalCity()
        myCity.get(function (result) {
            resolve(result)
        })
    })
}
// 连接百度地图
export function MP() {
    return new Promise(function (resolve, reject) {
        
        window.onload = function () {
            resolve(BMap)
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + 'RszLDzcAw7RWcTEne5NogAbRtQuR3KY2' + "&callback=init";
        script.onerror = reject;
        document.head.appendChild(script);
    })
}
// 经纬度逆解析地址
export function getLocation(lng, lat) {
    return new Promise(resolve => {
        var geoc = new BMap.Geocoder();
        geoc.getLocation(new BMap.Point(lng, lat), function (rs) {
            console.log(rs)
            resolve(rs)
        })
    })
}

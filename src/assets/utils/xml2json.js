/**
 * @description: xml 转换成 dom 对象
 * @param {String} xml
 * @return {String} xmlDom
 */

const xml2dom = function xml2dom(xml) {
  let xmlDom = null;
  if (document.all) {
    const dom = new ActiveXObject('Microsoft.XMLDOM');
    dom.loadXML(xml);
    xmlDom = dom;
  } else {
    xmlDom = new DOMParser().parseFromString(xml, 'text/xml');
  }
  return xmlDom;
}

/**
 * @description: 从 dom 对象中提取内容组合成 json 对象返出
 * @param {String} dom
 * @return {Object} json
 */
const dom2json = function dom2json(xml) {
  try {
    let obj = {};
    if (xml.children.length > 0) {
      for (let i = 0, len = xml.children.length; i < len; i++) {
        const item = xml.children.item(i);
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] == 'undefined') {
          obj[nodeName] = dom2json(item);
        } else {
          if (typeof obj[nodeName].push == 'undefined') {
            let old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(dom2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
    console.log(e.message);
  }
}

/*
 * xml 转 json 对象
 * @param String xml
*/
const xml2json = function (xml, el, tag) {
  let xmlDom = xml2dom(xml);

  // 需要二次解析
  if (tag) {
    const node = xmlDom.getElementsByTagName(el);
    let str = node && node[0].textContent;
    if (str.includes(tag)) {
      xmlDom = xml2dom(str);
    }
  }

  let jsonObj = {};
  if (xmlDom.childNodes.length > 0) {
    jsonObj = dom2json(xmlDom);
  }
  return jsonObj;
};

export {
  xml2json
};

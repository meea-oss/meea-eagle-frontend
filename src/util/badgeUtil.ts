import badge from '../../config/badge'
import {getValue} from "rc-field-form/es/utils/valueUtil";

export function buildBadge(code: string, area: string) {
  if (code && area) {
    code = code.toUpperCase();
    //解析基础dom
    const parser = new DOMParser();
    const badgeXml = parser.parseFromString(badge.badgeMain, "application/xml");
    //编号添加到这个节点
    const codeElement = badgeXml.getElementById("code");
    code.split('').forEach((indexC, index) => {
      const indexCodeElement = buildBadgeCode(indexC, index, parser);
      codeElement!.innerHTML += indexCodeElement;
    })

    const areaElement = badgeXml.getElementById("area");
    console.log(area)
    area.split('').forEach((indexC, index) => {
      const areaCodeElement = buildBadgeArea(indexC, index, parser);
      areaElement!.innerHTML += areaCodeElement;
    })

    const serializer = new XMLSerializer();
    return serializer.serializeToString(badgeXml);
  } else {
    return `<></>`;
  }
}

function buildBadgeCode(code: string, index: number, parser: DOMParser) {
  const badgeMainCode = badge.badgeMainCode;
  const value = getValue(badgeMainCode, ["c" + code, "i" + index]);
  const indexCodeElement = parser.parseFromString(value, "application/xml");
  indexCodeElement.documentElement.innerHTML = getValue(badgeMainCode, ["c" + code, "code"])
  return indexCodeElement.documentElement.outerHTML
}

function buildBadgeArea(code: string, index: number, parser: DOMParser) {
  const areaCode = badge.areaCode;
  const value = getValue(areaCode, ["a" + code, "i" + index]);
  const indexCodeElement = parser.parseFromString(value, "application/xml");
  indexCodeElement.documentElement.innerHTML = getValue(areaCode, ["a" + code, "code"])
  return indexCodeElement.documentElement.outerHTML

}
